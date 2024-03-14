import { prisma } from "../config/db.js";
import { existeCodigoDeuda } from "../helpers/verificarCodigos.js";

export const agregarDeuda = async (req, res) => {
  try {
    const codigoDeuda = await existeCodigoDeuda();

    const {
      nombreCliente,
      fecha,
      montoDeuda,
      fechaUltimoPago,
      usuarioCajeroId,
      montoActualDeuda,
    } = req.body;

    const nuevaDedua = await prisma.deudas.create({
      data: {
        codigoDeuda,
        nombreCliente,
        montoDeuda: parseFloat(montoDeuda),
        montoActualDeuda: parseFloat(montoActualDeuda),
        fecha,
      },
    });

    res.json({ msg: "Deuda agregada correctamente", codigoDeuda });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
};

export const agregarProductosEnDedua = (req, res) => {
  const productosDeudas = req.body;

  try {
    productosDeudas.forEach(async (e) => {
      const {
        codigoDeuda,
        codigoProducto,
        cantidad,
        precioVentaUnd,
        total,
        nombre,
        descuento,
      } = e;

      const nuevoItemVenta = await prisma.productosDeudas.create({
        data: {
          codigoDeuda,
          codigoProducto,
          cantidadProducto: cantidad,
          costoProducto: parseFloat(precioVentaUnd),
          monto: parseFloat(total),
          nombreProducto: nombre,
          descuento: parseFloat(descuento),
        },
      });
    });

    res.json({ msg: "Productos de la deuda agregado correctamente" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
};

export const buscarTodasLasDeudas = async (req, res) => {
  try {
    const todasLasDeudas = await prisma.deudas.findMany({
      where: {
        estado: true,
      },
    });

    if (todasLasDeudas.length == 0) {
      res.status(404).json({ msg: "No hay deduas" });
      return;
    }

    res.json({ todasLasDeudas });
  } catch (error) {
    console.log(error);
  }
};

export const buscarDeudaPorCodigo = async (req, res) => {
  const { codigoFacturaDeuda } = req.params;

  try {
    //Buscar factura
    const existeFactura = await prisma.facturasDeudas.findFirst({
      where: {
        codigoFacturaDeuda,
      },
    });

    if (!existeFactura) {
      console.log("El codigo de la factura es invalido");
      return res
        .status(404)
        .json({ msg: "El codigo de la factura es invalido" });
    }

    const codigoDeuda = existeFactura.codigoDeuda;

    const existeDeuda = await prisma.deudas.findFirst({
      where: {
        codigoDeuda,
        estado: true,
      },
    });

    if (!existeDeuda) {
      console.log("La deuda no existe");
      return res.status(404).json({ msg: "La deuda no existe" });
    }

    console.log(existeDeuda);

    res.json({ msg: "Deuda encontrada", datosDeuda: existeDeuda });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
};

export const buscarDeudaPorNombre = async (req, res) => {
  const { nombreCliente } = req.params;

  console.log(nombreCliente);

  try {
    const existeDeuda = await prisma.deudas.findMany({
      where: {
        nombreCliente: {
          contains: nombreCliente,
        },
        estado: true,
      },
    });

    if (existeDeuda.length == 0) {
      return res.status(404).json({ msg: "No hay deduas a ese nombre" });
    }

    console.log(existeDeuda);
    res.json({ msg: "Deuda encontrada", deudas: existeDeuda });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
};

export const pagarDeuda = async (req, res) => {
  const { codigoDeuda, montoPago, fecha } = req.body;

  console.log(codigoDeuda, montoPago);

  try {
    const deduaSalda = await prisma.deudas.findFirst({
      where: {
        codigoDeuda,
      },
    });

    if (!deduaSalda.estado) {
      return res.status(400).json({ msg: "La dedua ya esta pagada" });
    }

    let deudaPago = await prisma.deudas.update({
      where: {
        codigoDeuda,
      },
      data: {
        montoActualDeuda: {
          decrement: montoPago,
        },
        fechaUltimoPago: fecha,
      },
    });

    if (deudaPago.montoActualDeuda == 0) {
      deudaPago = await prisma.deudas.update({
        where: {
          codigoDeuda,
        },
        data: {
          estado: false,
        },
      });
    }
    console.log(deudaPago);

    res.json({ msg: "Pago realizado correctamente", deudaPago });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
};

export const agregarPagoHistorial = async (req, res) => {
  const { codigoDeuda, montoPago, fecha } = req.body;

  try {
    const nuevoPago = await prisma.historialPagosDeudas.create({
      data: {
        fecha,
        codigoDedua: codigoDeuda,
        motoPago: parseFloat(montoPago),
      },
    });

    res.json({ msg: "Pago agregado", nuevoPago });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
};

export const buscarCodigoFactura = async (req, res) => {
  const { codigoDeuda } = req.params;

  try {
    const factura = await prisma.facturasDeudas.findFirst({
      where: {
        codigoDeuda,
      },
    });

    res.json({
      msg: "Codigo facuta encontrado",
      codigo: factura.codigoFacturaDeuda,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
};

export const buscarProductosDelaDeuda = async (req, res) => {
  const { codigoDeuda } = req.params;

  try {
    const productosDeudas = await prisma.productosDeudas.findMany({
      where: {
        codigoDeuda,
      },
    });

    if (!productosDeudas) {
      console.log("No existen productos para esta deuda");
      res.status(404).json({ msg: "No existen productos para esta deuda" });
      return;
    }

    res.json({ msg: "Productos encontrados", productosDeudas });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
};
