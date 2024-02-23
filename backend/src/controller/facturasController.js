import { prisma } from "../config/db.js";
import {
  existeCodigoFactura,
  existeCodigoFacturaDeduda,
} from "../helpers/verificarCodigos.js";

export const generarFacturaVenta = async (req, res) => {
  const { codigoVenta } = req.params;

  try {
    const codigoFactura = await existeCodigoFactura();

    const nuevaFactura = {
      codigoFactura,
      codigoVenta,
    };
    const nuevaFacturaVenta = await prisma.facturas.create({
      data: nuevaFactura,
    });

    res.json({ msg: "Factura generada correctamente", codigoFactura });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
};

export const imprimirFacturaVenta = async (req, res) => {
  const { codigoFactura } = req.params;

  try {
    const existeFactura = await prisma.facturas.findFirst({
      where: {
        codigoFactura,
      },
    });

    const codigoVenta = existeFactura.codigoVenta;

    const existeVenta = await prisma.ventas.findFirst({
      where: {
        codigoVenta,
      },
    });

    const cajero = await prisma.usuarioCajero.findFirst({
      where: {
        id: existeVenta.usuarioCajeroId,
      },
    });

    const { id, userName } = cajero;

    const productosDeLaVenta = await prisma.ventasItem.findMany({
      where: {
        codigoVenta,
      },
    });

    console.log(productosDeLaVenta);

    const nuevoArregloProductos = productosDeLaVenta.map((producto) => {
      const {
        codigoProducto,
        cantidadProducto,
        costoVentaItem,
        nombreProducto,
        descuento,
        costoActualProducto,
      } = producto;

      return {
        codigoProducto: codigoProducto,
        cantidadProducto: cantidadProducto,
        costoVentaItem: descuento
          ? parseFloat(costoActualProducto) - parseFloat(descuento)
          : parseFloat(costoActualProducto),
        nombre: nombreProducto,
        totalVentaItem: parseFloat(costoVentaItem),
        descuento: parseFloat(descuento),
      };
    });

    console.log(nuevoArregloProductos);

    const facturaObj = {
      codigoFactura,
      datosVenta: {
        costoTotal: parseFloat(existeVenta.costoTotal),
        pagoCliente: parseFloat(existeVenta.pagoCliente),
        devueltaCliente: parseFloat(existeVenta.devueltaCliente),
        fecha: existeVenta.fecha,
        cajero: { id, userName },
        despachadoPor: existeVenta.atendidoPor || "",
        nombreCleinte: existeVenta.nombreCliente || "",
        telefonoCliente: existeVenta.telefonoCliente || "",
      },
      productosVendidos: nuevoArregloProductos,
    };

    res.json({ facturaObj });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
};

export const generarFacturaDeuda = async (req, res) => {
  const { codigoDeuda } = req.params;

  try {
    const codigoFacturaDeuda = await existeCodigoFactura();

    const nuevaFacturaDeuda = {
      codigoFacturaDeuda,
      codigoDeuda,
    };

    const nuevaFactura = await prisma.facturasDeudas.create({
      data: nuevaFacturaDeuda,
    });

    res.json({ msg: "Factura generada correctamente", codigoFacturaDeuda });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
};

export const imprimirFacturaDeuda = async (req, res) => {
  const { codigoFacturaDeuda } = req.params;

  try {
    const existeFactura = await prisma.facturasDeudas.findFirst({
      where: {
        codigoFacturaDeuda,
      },
    });

    const codigoDeuda = existeFactura.codigoDeuda;

    const existeDeuda = await prisma.deudas.findFirst({
      where: {
        codigoDeuda,
      },
    });

    const productosDeLaDeuda = await prisma.productosDeudas.findMany({
      where: {
        codigoDeuda,
      },
    });

    let historialDePagos =
      await prisma.$queryRaw`SELECT * FROM HistorialPagosDeudas WHERE codigoDedua = ${codigoDeuda}`;

    // let respuestaHistorialDePagos;

    // if (historialDePagos.length == 0) {
    //     respuestaHistorialDePagos = 'No se ha hecho ningun pago'
    // } else {
    //     respuestaHistorialDePagos = historialDePagos;
    // }

    const nuevoArregloProductos = productosDeLaDeuda.map((producto) => ({
      codigoProducto: producto.codigoProducto,
      nombreProducto: producto.nombreProducto,
      cantidadProducto: producto.cantidadProducto,
      costoProducto: producto.costoProducto,
      monto: producto.monto,
      descuento: producto.descuento,
    }));

    const facturaObj = {
      codigoFacturaDeuda,
      datosDeuda: {
        montoInicial: existeDeuda.montoDeuda,
        montoActual: existeDeuda.montoActualDeuda,
        nombreCleinte: existeDeuda.nombreCliente,
        telefonoCliente: existeDeuda.telefonoCliente,
        fecha: existeDeuda.fecha,
        fechaUltimoPago: existeDeuda.fechaUltimoPago,
        despachadoPor: existeDeuda.despachadoPor,
        estado: existeDeuda.estado,
      },
      productosDeuda: nuevoArregloProductos,
      historialPagos: historialDePagos,
    };

    console.log(facturaObj);
    res.json({ facturaObj });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
};

export const mostrarTodasFacturasDeudas = async (req, res) => {
  try {
    const facturasDeudas =
      await prisma.$queryRaw`SELECT codigoFacturaDeuda , * FROM FACTURASDEUDAS INNER JOIN DEUDAS  ON FACTURASDEUDAS.codigoDeuda = DEUDAS.codigoDeuda`;

    const arrArreglado = facturasDeudas.map((e) => {
      e.montoDeuda = parseFloat(e.montoDeuda);
      e.montoActualDeuda = parseFloat(e.montoActualDeuda);
      return e;
    });

    res.json({ msg: "Todos las facturas", facturasDeudas: arrArreglado });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
};

export const buscarFacturaDeudaPorCodigo = async (req, res) => {
  const { codigoFactura } = req.params;

  try {
    const facturaExiste = await prisma.facturasDeudas.findFirst({
      where: {
        codigoFacturaDeuda: codigoFactura,
      },
    });

    if (!facturaExiste) {
      console.log("No existe la factura");
      res.status(404).json({ msg: "Factura no existe" });
      return;
    }

    const { codigoDeuda, codigoFacturaDeuda } = facturaExiste;

    const deudaExiste = await prisma.deudas.findFirst({
      where: {
        codigoDeuda,
      },
    });

    if (!deudaExiste) {
      console.log("No existe la deuda");
      res.status(404).json({ msg: "Deuda no existe" });
      return;
    }

    const datosFactura = { codigoFacturaDeuda, ...deudaExiste };
    console.log(datosFactura);

    res.json({ msg: "Factura encontrada", datosFactura });
  } catch (error) {
    console.log(error);
  }
};
