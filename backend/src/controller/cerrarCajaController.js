import { prisma } from "../config/db.js";

export const cerrarCaja = async (req, res) => {
  const { fecha } = req.body;
  const fechaSeparada = fecha.split(",")[0];
  try {
    // Obtener todos los productos vendidos del dia
    const todasLasVentas = await prisma.ventas.findMany();

    const ventasDelDia = todasLasVentas.filter((e) => {
      return e.fecha.split(",")[0] == fechaSeparada;
    });

    const productosVendidos = await prisma.$transaction(
      ventasDelDia.map((e) => {
        return prisma.ventasItem.findMany({
          where: {
            codigoVenta: e.codigoVenta,
          },
        });
      })
    );

    let totalVendido = 0;

    if (productosVendidos.length > 0) {
      totalVendido = productosVendidos[0].reduce((total, e) => {
        return parseFloat(total) + parseFloat(e.costoVentaItem);
      }, 0);
    }

    console.log("productos del dia", productosVendidos[0], totalVendido);
    // Obtener todos los productos vendidos del dia
    // Obtener todos los ingresos extra del dia
    const todosLosIngresos = await prisma.ingresos.findMany({
      where: {
        tipoId: {
          not: 1,
        },
      },
    });

    const ingresosDelDia = todosLosIngresos.filter((e) => {
      return e.fecha.split(",")[0] == fechaSeparada;
    });

    let totalIngreso = 0;

    if (ingresosDelDia.length > 0) {
      totalIngreso = ingresosDelDia.reduce((total, e) => {
        return parseFloat(total) + parseFloat(e.montoIngreso);
      }, 0);
    }

    console.log("ingresos del dia", ingresosDelDia, totalIngreso);
    // Obtener todos los ingresos extra del dia

    // Obtener todos los retiros del dia
    const todosLosRetiros = await prisma.retiros.findMany();

    const retirosDelDia = todosLosRetiros.filter((e) => {
      return e.fecha.split(",")[0] == fechaSeparada;
    });

    let totalRetiro = 0;

    if (retirosDelDia.length > 0) {
      totalRetiro = retirosDelDia.reduce((total, e) => {
        return parseFloat(total) + parseFloat(e.montoRetiro);
      }, 0);
    }

    console.log("retisros del dia", retirosDelDia, totalRetiro);
    // Obtener todos los retiros del dia

    // Obtener pagos de deudas del dia
    const todosLosPagos = await prisma.historialPagosDeudas.findMany();

    const pagosDelDia = todosLosPagos.filter((e) => {
      return e.fecha.split(",")[0] == fechaSeparada;
    });

    let totalPagos = 0;

    if (pagosDelDia.length > 0) {
      totalPagos = pagosDelDia.reduce((total, e) => {
        return parseFloat(total) + parseFloat(e.motoPago);
      }, 0);
    }

    console.log("pagos del dia", pagosDelDia, totalPagos);
    // Obtener pagos de deudas del dia

    res.json({
      productosVendidos: productosVendidos[0],
      ingresosDelDia,
      retirosDelDia,
      pagosDelDia,
      totalesDatos: {
        totalVendido,
        totalIngreso,
        totalRetiro,
        totalPagos,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
