import e from "express";
import { prisma } from "../config/db.js";
import {
  existeCodigoFactura,
  existeCodigoFacturaDeduda,
  existeCodigoFacturaDevolucion,
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

    // console.log(productosDeLaVenta);

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
    const codigoFacturaDeuda = await existeCodigoFacturaDeduda();

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
        fecha: existeDeuda.fecha,
        fechaUltimoPago: existeDeuda.fechaUltimoPago,
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

export const generarFacturaDevolucionContado = async (req, res) => {
  const { codigoDevolucion } = req.params;

  try {
    // Validar si ya existe una factura de esta devolucion y no crearla
    const existeFactura = await prisma.facturasDevolucionesAlContado.findFirst({
      where: {
        codigoDevolucion,
      },
    });

    if (existeFactura) {
      console.log("ya existe la factura, solo retorna el codigo para imrpirla");
      res.json({
        msg: "Factura generada",
        codigoFacturaDevolucion: existeFactura.codigoFactura,
      });
      return;
    }

    const codigoFacturaDevolucion = await existeCodigoFacturaDevolucion();

    const nuevaFactura = {
      codigoFactura: codigoFacturaDevolucion,
      codigoDevolucion,
    };

    // Crear la nueva factura
    const nuevaFacturaDevolucion =
      await prisma.facturasDevolucionesAlContado.create({
        data: nuevaFactura,
      });

    console.log("Factura devolucion creada");
    res.json({ msg: "Factura generada", codigoFacturaDevolucion });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
};

export const imprimirFacturaDevolucionContado = async (req, res) => {
  const { codigoFacturaDevolucion } = req.params;

  try {
    // Validar si existe esta la factura
    const existeFactura = await prisma.facturasDevolucionesAlContado.findFirst({
      where: {
        codigoFactura: codigoFacturaDevolucion,
      },
    });

    if (!existeFactura) {
      console.log("No existe esta factura");
      res.status(404).json({ msg: "No existe esta factura" });
      return;
    }

    // validar si existe la devolucion de esta factura
    const existeDevolucion = await prisma.devolucionesAlContado.findFirst({
      where: {
        codigoDevolucion: existeFactura.codigoDevolucion,
      },
    });

    if (!existeDevolucion) {
      console.log("No existe la devolucion");
      res.status(404).json({ msg: "No existe la devolucion" });
    }

    // buscar productos de la devolucion
    const productosDevolucion =
      await prisma.productosDevolucionAlContado.findMany({
        where: {
          codigoDevolucion: existeDevolucion.codigoDevolucion,
        },
      });

    // validar si no hay productos de esta devolucion
    if (productosDevolucion.length == 0) {
      console.log("No hay productos de esta devolucion");
      res.status(404).json({ msg: "No hay productos de esta devolucion" });
      return;
    }

    // organizar datos de la factura
    const facturaObj = {
      codigoFactura: existeFactura.codigoFactura,
      datosDevolucion: {
        total: existeDevolucion.total,
        fecha: existeDevolucion.fecha,
      },
      productosDevolucion,
    };
    res.json({ facturaObj });
  } catch (error) {
    console.log();
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

export const mostrarTodasFacturasContado = async (req, res) => {
  try {
    const facturasContado =
      await prisma.$queryRaw`SELECT codigoFactura , * FROM Facturas INNER JOIN Ventas on Facturas.codigoVenta = Ventas.codigoVenta`;

    const arrArreglado = facturasContado.map((e) => {
      e.costoTotal = parseFloat(e.costoTotal);
      e.pagoCliente = parseFloat(e.pagoCliente);
      e.devueltaCliente = parseFloat(e.devueltaCliente);

      return e;
    });

    res.json({ msg: "Todos las facturas", facturasContado: arrArreglado });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
};

export const mostrarTodasFacturasDevolucionesContado = async (req, res) => {
  try {
    const facturasDevolucionContado =
      await prisma.$queryRaw`SELECT codigoFactura , * FROM FacturasDevolucionesAlContado INNER JOIN DevolucionesAlContado on FacturasDevolucionesAlContado.codigoDevolucion = DevolucionesAlContado.codigoDevolucion`;

    const arrArreglado = facturasDevolucionContado.map((e) => {
      e.total = parseFloat(e.total);
      return e;
    });

    console.log(facturasDevolucionContado);
    res.json({
      msg: "Todos las facturas",
      facturasDevolucionContado: arrArreglado,
    });
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
    res.status(400).json({ msg: error });
  }
};

export const buscarFacturasDeudasPorNombreCliente = async (req, res) => {
  const { nombreCliente } = req.params;

  try {
    const existeDeuda = await prisma.deudas.findFirst({
      where: {
        nombreCliente: {
          contains: nombreCliente,
        },
      },
    });

    if (!existeDeuda) {
      console.log("No existen facturas a este nombre");
      res.status(404).json({ msg: "No existen facturas a este nombre" });
    }

    const existeFactura = await prisma.facturasDeudas.findFirst({
      where: {
        codigoDeuda: existeDeuda.codigoDeuda,
      },
    });

    const { codigoFacturaDeuda } = existeFactura;

    const datosFactura = { codigoFacturaDeuda, ...existeDeuda };

    res.json({ msg: "Factura encontrada", datosFactura });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
};

export const buscarFacturaContadoPorCodigo = async (req, res) => {
  const { codigoFactura } = req.params;

  try {
    const existeFacutra = await prisma.facturas.findFirst({
      where: {
        codigoFactura,
      },
    });

    if (!existeFacutra) {
      console.log("No existen facturas con este codigo");
      res.status(404).json({ msg: "Factura no existe" });
      return;
    }

    const { codigoVenta } = existeFacutra;

    const existeVenta = await prisma.ventas.findFirst({
      where: {
        codigoVenta,
      },
    });

    if (!existeVenta) {
      console.log("No exiten ventas para esta factura");
      res.status(404).json({ msg: "No existen ventas para esta factura" });
      return;
    }

    const datosFactura = {
      codigoFactura: existeFacutra.codigoFactura,
      ...existeVenta,
    };

    res.json({ msg: "Factura encontrada", datosFactura });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
};

export const buscarFacturasDevolucionContadoPorCodigo = async (req, res) => {
  const { codigoFactura } = req.params;

  try {
    // Validar si existe la factura
    const existeFactura = await prisma.facturasDevolucionesAlContado.findFirst({
      where: {
        codigoFactura,
      },
    });

    if (!existeFactura) {
      console.log("No existe la factura");
      res.status(404).json({ msg: "No existe la factura" });
      return;
    }

    // Validar si existe la devolucion
    const existeDevolucion = await prisma.devolucionesAlContado.findFirst({
      where: {
        codigoDevolucion: existeFactura.codigoDevolucion,
      },
    });

    if (!existeDevolucion) {
      console.log("No existe la devolucion");
      res.status(404).json({ msg: "No existe la devolucion" });
      return;
    }

    const datosFactura = {
      codigoFactura: existeFactura.codigoFactura,
      ...existeDevolucion,
    };

    res.json({ msg: "Factura encontrada", datosFactura });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
};

export const generarFacturaDevolucionCedito = async (req, res) => {
  const { codigoDevolucion } = req.params;

  try {
    // Validar si ya existe una factura de esta devolucion y no crearla
    const existeFactura = await prisma.facturasDevolucionesACredito.findFirst({
      where: {
        codigoDevolucion,
      },
    });

    if (existeFactura) {
      console.log("ya existe la factura, solo retorna el codigo para imrpirla");
      res.json({
        msg: "Factura generada",
        codigoFacturaDevolucion: existeFactura.codigoFactura,
      });
      return;
    }

    const codigoFacturaDevolucion = await existeCodigoFacturaDevolucion();

    const nuevaFactura = {
      codigoFactura: codigoFacturaDevolucion,
      codigoDevolucion,
    };

    // Crear la nueva factura
    const nuevaFacturaDevolucion =
      await prisma.facturasDevolucionesACredito.create({
        data: nuevaFactura,
      });

    console.log("Factura devolucion creada");
    res.json({ msg: "Factura generada", codigoFacturaDevolucion });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
};

export const imprimirFacturaDevolucionCredito = async (req, res) => {
  const { codigoFacturaDevolucion } = req.params;

  try {
    // Validar si existe esta la factura
    const existeFactura = await prisma.facturasDevolucionesACredito.findFirst({
      where: {
        codigoFactura: codigoFacturaDevolucion,
      },
    });

    if (!existeFactura) {
      console.log("No existe esta factura");
      res.status(404).json({ msg: "No existe esta factura" });
      return;
    }

    // validar si existe la devolucion de esta factura
    const existeDevolucion = await prisma.devolucionACredito.findFirst({
      where: {
        codigoDevolucion: existeFactura.codigoDevolucion,
      },
    });

    if (!existeDevolucion) {
      console.log("No existe la devolucion");
      res.status(404).json({ msg: "No existe la devolucion" });
    }

    // buscar productos de la devolucion
    const productosDevolucion =
      await prisma.productosDevueltosACredito.findMany({
        where: {
          codigoDevolucion: existeDevolucion.codigoDevolucion,
        },
      });

    // validar si no hay productos de esta devolucion
    if (productosDevolucion.length == 0) {
      console.log("No hay productos de esta devolucion");
      res.status(404).json({ msg: "No hay productos de esta devolucion" });
      return;
    }

    // organizar datos de la factura
    const facturaObj = {
      codigoFactura: existeFactura.codigoFactura,
      datosDevolucion: {
        total: existeDevolucion.total,
        fecha: existeDevolucion.fecha,
      },
      productosDevolucion,
    };
    res.json({ facturaObj });
  } catch (error) {
    console.log();
  }
};
