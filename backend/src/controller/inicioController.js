import { prisma } from "../config/db.js";

// Controler que devuelve la cantidad total de productos existentes
export const datosProductos = async (req, res) => {
  try {
    // Traemos todos los producto de la base de datos
    const productos = await prisma.productos.findMany();
    // Sacamos las cantidades en stock de cada producto
    const arrCantidades = productos.map((e) => {
      return e.cantidadStock;
    });
    // Obtenemos la cantidad total de productos en stock
    const cantidadTotal = arrCantidades.reduce((a, b) => {
      return a + b;
    }, 0);

    // Obtenemos los produtos que estan en baja en stock
    const arrProductosEnbaja = productos.map((e) => {
      return e.enBaja == true && e.agotado == false;
    });

    // Calculamos la cantidad de productos en baja
    const cantidadProductosEnBaja = arrProductosEnbaja.reduce((a, b) => {
      return a + b;
    }, 0);

    // Obtenemos los productos agotados
    const arrProductosAgotados = productos.map((e) => {
      return e.agotado == true;
    });

    // Calculamos la cantidad de productos agotados
    const cantidadProductosAgotados = arrProductosAgotados.reduce((a, b) => {
      return a + b;
    }, 0);

    const datosProductos = {
      cantidadTotal,
      cantidadProductosEnBaja,
      cantidadProductosAgotados,
    };

    res.json({ msg: "Todos los productos existentes", datosProductos });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
};

// Controller que devuelve todos los productos
export const todosLosProductos = async (req, res) => {
  try {
    const productos = await prisma.productos.findMany();

    res.json({ msg: "Todos los productos", listaProductos: productos });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
};

// Controller que devuelve todos los productos en baja
export const productosEnBaja = async (req, res) => {
  try {
    const todosLosProductosEnbaja = await prisma.productos.findMany({
      where: {
        enBaja: true,
        agotado: false,
      },
    });

    res.json({
      msg: "Todos los productos en baja",
      listaProductos: todosLosProductosEnbaja,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
};

// Controller que devuelve todos los productos agotados
export const productosAgotados = async (req, res) => {
  try {
    const todosLosProductosAgotados = await prisma.productos.findMany({
      where: {
        agotado: true,
      },
    });

    res.json({
      msg: "Todos los productos agotados",
      listaProductos: todosLosProductosAgotados,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
};

// Controller que devuelve los productos que contengan el nombre
export const filtrarProductosPorNombre = async (req, res) => {
  const { nombre } = req.params;

  try {
    const producotsFiltrado = await prisma.productos.findMany({
      where: {
        nombre: {
          contains: nombre,
        },
      },
    });

    res.json({ producotsFiltrado });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

// Controller que devuelve los productos agotados que contengan el nombre
export const filtrarProductosAgotadosPorNombre = async (req, res) => {
  const { nombre } = req.params;

  try {
    const productosFiltrados = await prisma.productos.findMany({
      where: {
        nombre: {
          contains: nombre,
        },
        agotado: true,
      },
    });

    res.json({ productosFiltrados });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

// Controller que deveyelve los productos en baja que contengan el nombre
export const filtrarProductosEnBajaPorNombre = async (req, res) => {
  const { nombre } = req.params;

  try {
    const productosEnBaja = await prisma.productos.findMany({
      where: {
        nombre: {
          contains: nombre,
        },
        enBaja: true,
      },
    });

    const productosFiltrados = productosEnBaja.filter((e) => e.agotado != true);

    res.json({ productosFiltrados });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};
