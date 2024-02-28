import { prisma } from "../config/db.js";
import { existeCodigoVenta } from "../helpers/verificarCodigos.js";

export const generarVenta = async (req, res) => {
  try {
    const codigoVenta = await existeCodigoVenta();

    const {
      costoTotal,
      pagoCliente,
      devueltaCliente,
      fecha,
      usuarioCajeroId,
    } = req.body;

    const nuevaVenta = {
      codigoVenta,
      costoTotal,
      pagoCliente,
      devueltaCliente,
      fecha,
      usuarioCajeroId,
    };

    const guardarNuevaVenta = await prisma.ventas.create({
      data: nuevaVenta,
    });
    res.json({ msg: "Venta agregada correctamente", codigoVenta });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
};

export const generarVentaItem = async (req, res) => {
  const productosVendidos = req.body;
  try {
    productosVendidos.forEach(async (e) => {
      const {
        codigoProducto,
        cantidad,
        codigoVenta,
        total,
        precioVentaUnd,
        nombre,
        descuento,
      } = e;

      const nuevoItemVenta = await prisma.ventasItem.create({
        data: {
          codigoProducto,
          codigoVenta,
          cantidadProducto: parseInt(cantidad),
          costoVentaItem: total,
          costoActualProducto: parseFloat(precioVentaUnd),
          nombreProducto: nombre,
          descuento: parseFloat(descuento),
        },
      });
    });

    res.json({ msg: "Venta Item agregado correctamente" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
};
