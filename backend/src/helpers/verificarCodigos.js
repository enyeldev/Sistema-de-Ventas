import { generarID } from "../helpers/generarCodigo.js";
import { generarCodigo4Digitos } from "./generarCodigo4Digitos.js";
import { prisma } from "../config/db.js";

export const existeCodigoProducto = async () => {
  let codigoProducto = generarCodigo4Digitos();

  let existeCodigoProducto = await prisma.productos.findFirst({
    where: {
      codigoProducto,
    },
  });

  while (existeCodigoProducto) {
    codigoProducto = generarCodigo4Digitos();

    existeCodigoProducto = await prisma.productos.findFirst({
      where: {
        codigoProducto,
      },
    });
  }

  return codigoProducto;
};

export const existeCodigoDeuda = async () => {
  let codigoDeuda = generarID();

  let existeDeuda = await prisma.deudas.findFirst({
    where: {
      codigoDeuda,
    },
  });

  while (existeDeuda) {
    codigoDeuda = generarID();

    existeDeuda = await prisma.deudas.findFirst({
      where: {
        codigoDeuda,
      },
    });
  }

  return codigoDeuda;
};

export const existeCodigoVenta = async () => {
  let codigoVenta = generarID();

  let existeVenta = await prisma.ventas.findFirst({
    where: {
      codigoVenta,
    },
  });

  while (existeVenta) {
    codigoVenta = generarID();

    existeVenta = await prisma.ventas.findFirst({
      where: {
        codigoVenta,
      },
    });
  }

  return codigoVenta;
};

export const existeCodigoIngreso = async () => {
  let codigoIngreso = generarID();

  let existeIngreso = await prisma.ingresos.findFirst({
    where: {
      codigoIngreso,
    },
  });

  while (existeIngreso) {
    codigoIngreso = generarID();

    existeIngreso = await prisma.ingresos.findFirst({
      where: {
        codigoIngreso,
      },
    });
  }

  return codigoIngreso;
};

export const existeCodigoRetiro = async () => {
  let codigoRetiro = generarID();

  let existeRetiro = await prisma.retiros.findFirst({
    where: {
      codigoRetiro,
    },
  });

  while (existeRetiro) {
    codigoRetiro = generarID();

    existeRetiro = await prisma.retiros.findFirst({
      where: {
        codigoRetiro,
      },
    });
  }

  return codigoRetiro;
};

export const existeCodigoFactura = async () => {
  let codigoFacturaVenta = generarCodigo4Digitos();

  let existeFacturaVenta = await prisma.facturas.findFirst({
    where: {
      codigoFactura: codigoFacturaVenta,
    },
  });

  while (existeFacturaVenta) {
    codigoFacturaVenta = generarCodigo4Digitos();

    existeFacturaVenta = await prisma.facturas.findFirst({
      where: {
        codigoFactura: codigoFacturaVenta,
      },
    });
  }

  return codigoFacturaVenta;
};

export const existeCodigoFacturaDevolucion = async () => {
  let codigoFacturaDevolucionContado = generarCodigo4Digitos();

  let existeFacturaDevolucionContado =
    await prisma.facturasDevolucionesAlContado.findFirst({
      where: {
        codigoFactura: codigoFacturaDevolucionContado,
      },
    });

  while (existeFacturaDevolucionContado) {
    codigoFacturaDevolucionContado = generarCodigo4Digitos();

    existeFacturaDevolucionContado =
      await prisma.facturasDevolucionesAlContado.findFirst({
        where: {
          codigoFactura: codigoFacturaDevolucionContado,
        },
      });
  }

  return codigoFacturaDevolucionContado;
};

export const existeCodigoFacturaDeduda = async () => {
  let codigoFacturaVentaDeuda = generarCodigo4Digitos();

  let existeFacturaDeuda = await prisma.facturasDeudas.findFirst({
    where: {
      codigoFactura: codigoFacturaVentaDeuda,
    },
  });

  while (existeFacturaDeuda) {
    codigoFacturaVentaDeuda = generarCodigo4Digitos();

    existeFacturaDeuda = await prisma.facturasDeudas.findFirst({
      where: {
        codigoFactura: codigoFacturaVentaDeuda,
      },
    });
  }

  return codigoFacturaVentaDeuda;
};

export const existeCodigoDevolucionAlContado = async () => {
  let codigoDevolucionAlContado = generarID();

  let existeDevolucionAlContado = await prisma.devolucionesAlContado.findFirst({
    where: {
      codigoDevolucion: codigoDevolucionAlContado,
    },
  });

  while (existeDevolucionAlContado) {
    codigoDevolucionAlContado = generarID();

    existeDevolucionAlContado = await prisma.facturasDeudas.findFirst({
      where: {
        codigoDevolucion: codigoDevolucionAlContado,
      },
    });
  }

  return codigoDevolucionAlContado;
};
