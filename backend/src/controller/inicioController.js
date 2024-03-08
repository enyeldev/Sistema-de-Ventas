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
      return e.enBaja == true;
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
