import { prisma } from "../config/db.js";
import { existeCodigoProducto } from "../helpers/verificarCodigos.js";
// import { descontarStock } from "../helpers/venderProductos.js";

export const generarCodigoProducto = async (req, res) => {
  const codigo = await existeCodigoProducto();

  res.json({ codigo });
};

export const buscarProductos = async (req, res) => {
  const { codigoProducto } = req.params;

  try {
    const existeProducto = await prisma.productos.findFirst({
      where: {
        codigoProducto,
      },
    });

    if (existeProducto) {
      res.json(existeProducto);
    } else {
      res
        .status(404)
        .json({ msg: "No existe este producto en la base de datos" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const buscarPorNombre = async (req, res) => {
  const { nombre } = req.params;

  console.log(nombre);

  try {
    const existeProducto = await prisma.productos.findMany({
      where: {
        nombre: {
          contains: nombre,
        },
      },
    });

    if (existeProducto.length == 0) {
      return res
        .status(404)
        .json({ msg: "No existen productos con ese nombre" });
    }

    console.log(existeProducto);
    res.json({ msg: "Productos Encontrados", productos: existeProducto });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
};

export const buscarParaComprar = async (req, res) => {
  const { codigoProducto } = req.params;

  try {
    const existeProducto = await prisma.productos.findFirst({
      where: {
        codigoProducto,
      },
    });

    if (existeProducto) {
      res.json(existeProducto);
    } else {
      res.json({ msg: "No existe este producto en la base de datos" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const agregarProductos = async (req, res) => {
  const {
    codigoProducto,
    nombre,
    cantidadStock,
    minStock,
    precioCompraUnd,
    ganancia,
  } = req.body;

  const precioVentaUnd = Math.round(precioCompraUnd + ganancia);

  try {
    const nuevoProducto = await prisma.productos.create({
      data: {
        codigoProducto,
        nombre,
        cantidadStock,
        minStock,
        precioCompraUnd,
        precioVentaUnd,
        ganancia,
      },
    });

    console.log(nuevoProducto);
  } catch (error) {
    console.log(error);
    res.status(403).json({ msg: "Ocurrio un error al agregar el producto" });
  }

  res.json({ msg: "Producto agregado a la base de datos" });
};

export const eliminarProductos = async (req, res) => {
  const { codigoProducto } = req.params;

  try {
    // const productoEliminado = await prisma.ventasItem.delete()

    const productosEliminados =
      await prisma.$queryRaw`DELETE FROM ventas`;

    res.json({ msg: "Producto eliminado correctamente" });
  } catch (error) {
    console.log(error);
  }
};

export const actualizarProductos = async (req, res) => {
  const { codigoProducto } = req.params;
  const {
    nombreNuevo,
    cantidadStockNuevo,
    minStockNuevo,
    precioCompraUndNuevo,
    gananciaNuevo,
  } = req.body;

  const precioVentaUndNuevo = Math.round(precioCompraUndNuevo + gananciaNuevo);

  console.log();

  try {
    //Asignar nuevo valores al producto
    const producto = await prisma.productos.findFirst({
      where: {
        codigoProducto,
      },
    });

    producto.nombre = nombreNuevo;
    producto.cantidadStock = producto.cantidadStock + cantidadStockNuevo;
    producto.minStock = minStockNuevo;
    producto.precioCompraUnd = precioCompraUndNuevo;
    producto.ganancia = gananciaNuevo;
    producto.precioVentaUnd = precioVentaUndNuevo;

    if (producto.cantidadStock > 0) {
      producto.agotado = false;
    }

    if (producto.cantidadStock > producto.minStock) {
      producto.enBaja = false;
    }

    const actualizarProducto = await prisma.productos.update({
      where: {
        codigoProducto,
      },
      data: producto,
    });

    res.json({ msg: "Producto actualizado" });
  } catch (error) {
    console.log(error);
    res.status(403).json({ msg: "Ocurrio un error al actualizar " });
  }
};

export const venderProductos = async (req, res) => {
  const productosVendidos = req.body;

  try {
    const respuesta = await prisma.$transaction(
      productosVendidos.map((e) => {
        return prisma.productos.update({
          where: {
            codigoProducto: e.codigoProducto,
          },
          data: {
            cantidadStock: {
              decrement: parseInt(e.cantidad),
            },
          },
          select: {
            codigoProducto: true,
            nombre: true,
            cantidadStock: true,
            minStock: true,
            enBaja: true,
            agotado: true,
          },
        });
      })
    );

    const existeProductoAgotado = respuesta.some((e) => {
      return e.cantidadStock == 0;
    });

    const existeProductoEnBaja = respuesta.some((e) => {
      return e.cantidadStock <= e.minStock;
    });

    if (existeProductoAgotado) {
      // Filtrar y obtener productos agotados
      const productosAgotados = respuesta.filter((e) => e.cantidadStock == 0);

      const actualizaEnBaja = await prisma.$transaction(
        productosAgotados.map((e) => {
          return prisma.productos.update({
            where: {
              codigoProducto: e.codigoProducto,
            },
            data: {
              agotado: true,
            },
            select: {
              codigoProducto: true,
              nombre: true,
              cantidadStock: true,
              minStock: true,
              enBaja: true,
              agotado: true,
            },
          });
        })
      );
    }

    if (existeProductoEnBaja) {
      // Filtrar y obtener productos en baja
      const productosEnBaja = respuesta.filter(
        (e) => e.cantidadStock <= e.minStock
      );

      const actualizaEnBaja = await prisma.$transaction(
        productosEnBaja.map((e) => {
          return prisma.productos.update({
            where: {
              codigoProducto: e.codigoProducto,
            },
            data: {
              enBaja: true,
            },
            select: {
              codigoProducto: true,
              nombre: true,
              cantidadStock: true,
              minStock: true,
              enBaja: true,
              agotado: true,
            },
          });
        })
      );
    }

    console.log(respuesta);

    res.json({ msg: "Productos vendidos" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
};
