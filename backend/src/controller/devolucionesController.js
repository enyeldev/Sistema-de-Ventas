import { prisma } from "../config/db.js";
import {
  existeCodigoDevolucionAlContado,
  existeCodigoDevolucionACredito,
} from "../helpers/verificarCodigos.js";

// Buscar productos de facturas al contado
export const buscarProductosFactura = async (req, res) => {
  const { codigoFactura } = req.params;

  try {
    const existeFactura = await prisma.facturas.findFirst({
      where: {
        codigoFactura,
      },
    });

    if (!existeFactura) {
      res.status(404).json({ msg: "No existe esta factura" });
      console.log("No existe esta factura");
      return;
    }

    const { codigoVenta } = existeFactura;

    const existeVenta = await prisma.ventas.findFirst({
      where: {
        codigoVenta,
      },
    });

    if (!existeVenta) {
      res.status(404).json({ msg: "No existe esta venta" });
      console.log("No existe esta venta");
      return;
    }

    // Si la factura y la venta existen buscar los productos de la venta
    const productosVenta = await prisma.ventasItem.findMany({
      where: {
        codigoVenta,
      },
    });

    if (!productosVenta) {
      res.status(404).json({ msg: "No existen productos de esta venta" });
      console.log("No existen productos de esta venta");
    }

    console.log("producos de la venta", productosVenta);

    // validar si se han hecho devoluciones de esta venta
    const existenDevolucionesVenta =
      await prisma.devolucionesAlContado.findFirst({
        where: {
          codigoVenta: existeVenta.codigoVenta,
        },
      });

    console.log("Devoluciones de esta venta", existenDevolucionesVenta);

    if (existenDevolucionesVenta) {
      const productosDevueltos = await prisma.$transaction(
        productosVenta.map(({ codigoProducto }) => {
          return prisma.productosDevolucionAlContado.findFirst({
            where: {
              codigoDevolucion: existenDevolucionesVenta.codigoDevolucion,
              codigoProducto,
            },
          });
        })
      );

      const productosDevueltosFiltrados = productosDevueltos.filter(
        (productoDevuelto) => productoDevuelto !== null
      );

      const productosAMostrar = productosVenta.map((producto) => {
        const instancia = productosDevueltosFiltrados.find((e) => {
          return e.codigoProducto == producto.codigoProducto;
        });

        console.log("instancia", instancia);
        if (!instancia) {
          return producto;
        }

        const nuevaCantidad =
          parseFloat(producto.cantidadProducto) -
          parseFloat(instancia.cantidad);

        producto.cantidadProducto = nuevaCantidad;
        producto.costoVentaItem =
          parseFloat(nuevaCantidad) * parseFloat(producto.costoActualProducto);

        console.log("productoo", producto);
        return producto;
      });

      console.log("productos a mostarr", productosAMostrar);
      console.log("ya se devolvio");
      res.json({
        msg: "Productos de la venta",
        productosVenta: productosAMostrar.filter((e) => e.cantidadProducto > 0),
        codigoVenta,
        venta: existeVenta,
      });
      return;
    }

    console.log("Productos sin devovler");
    res.json({
      msg: "Productos de la venta",
      productosVenta,
      codigoVenta,
      venta: existeVenta,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error });
  }
};

// Buscar productos de facturas a credito
export const buscarProdcutosFacturasACredito = async (req, res) => {
  const { codigoFactura } = req.params;

  try {
    const existeFactura = await prisma.facturasDeudas.findFirst({
      where: {
        codigoFacturaDeuda: codigoFactura,
      },
    });

    if (!existeFactura) {
      res.status(404).json({ msg: "No existe esta factura" });
      console.log("No existe esta factura");
      return;
    }

    const { codigoDeuda } = existeFactura;

    const existeDeuda = await prisma.deudas.findFirst({
      where: {
        codigoDeuda,
      },
    });

    if (!existeDeuda) {
      res.status(404).json({ msg: "No existe esta deuda" });
      console.log("No existe esta deuda");
      return;
    }

    // Si la factura y la venta existen buscar los productos de la venta
    const productosDeuda = await prisma.productosDeudas.findMany({
      where: {
        codigoDeuda,
      },
    });

    if (!productosDeuda) {
      res.status(404).json({ msg: "No existen productos de esta deuda" });
      console.log("No existen productos de esta deuda");
    }

    console.log("producos de la deuda", productosDeuda);

    // validar si se han hecho devoluciones de esta venta
    const existenDevolucionesDeuda = await prisma.devolucionACredito.findFirst({
      where: {
        codigoDeuda: existeDeuda.codigoDeuda,
      },
    });

    console.log("Devoluciones de esta deuda", existenDevolucionesDeuda);

    if (existenDevolucionesDeuda) {
      const productosDevueltos = await prisma.$transaction(
        productosDeuda.map(({ codigoProducto }) => {
          return prisma.productosDevueltosACredito.findFirst({
            where: {
              codigoDevolucion: existenDevolucionesDeuda.codigoDevolucion,
              codigoProducto,
            },
          });
        })
      );

      const productosDevueltosFiltrados = productosDevueltos.filter(
        (productoDevuelto) => productoDevuelto !== null
      );

      const productosAMostrar = productosDeuda.map((producto) => {
        const instancia = productosDevueltosFiltrados.find((e) => {
          return e.codigoProducto == producto.codigoProducto;
        });

        console.log("instancia", instancia);
        if (!instancia) {
          return producto;
        }

        const nuevaCantidad =
          parseFloat(producto.cantidadProducto) -
          parseFloat(instancia.cantidad);

        console.log("nueva cantidad", nuevaCantidad);
        producto.cantidadProducto = nuevaCantidad;
        producto.monto =
          parseFloat(nuevaCantidad) * parseFloat(producto.costoProducto);
        console.log("productoo", producto);
        return producto;
      });

      console.log("productos a mostarr", productosAMostrar);
      console.log("ya se devolvio");
      res.json({
        msg: "Productos de la venta",
        productosDeuda: productosAMostrar.filter((e) => e.cantidadProducto > 0),
        codigoDeuda,
        deuda: existeDeuda,
      });
      return;
    }

    console.log("Productos sin devovler");
    res.json({
      msg: "Productos de la deuda",
      productosDeuda,
      codigoDeuda,
      deuda: existeDeuda,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error });
  }
};

// Generar una devolucion al contado
export const generarDevolucion = async (req, res) => {
  const { codigoFactura, totalDevolver, fecha } = req.body;

  try {
    // verificar si existe la factura
    const existeFactura = await prisma.facturas.findFirst({
      where: { codigoFactura },
    });

    if (!existeFactura) {
      console.log("No existe la factrua");
      res.status(404).json({ msg: "No existe la factura" });
      return;
    }

    // validar si existe la venta para extraer el codigo de la venta
    const existeVenta = await prisma.ventas.findFirst({
      where: {
        codigoVenta: existeFactura.codigoVenta,
      },
    });

    if (!existeVenta) {
      console.log("No existe la venta");
      res.status(404).json({ msg: "No existe la venta" });
    }

    // ir a la tabla de devoluciones y ver si existe una devolucion de esta venta
    const existeDevolucion = await prisma.devolucionesAlContado.findFirst({
      where: {
        codigoVenta: existeVenta.codigoVenta,
      },
    });

    // si existe una devolucion actualizar la cantidad a devolver y la fecha
    if (existeDevolucion) {
      await prisma.devolucionesAlContado.update({
        where: {
          codigoDevolucion: existeDevolucion.codigoDevolucion,
        },
        data: {
          total: totalDevolver,
          fecha,
        },
      });
      res.json({
        msg: "Devolucion actualizada",
        codigoDevolucion: existeDevolucion.codigoDevolucion,
      });
      return;
    }

    // si no exixte una devolucion hay que crear una nueva
    const codigoDevolucion = await existeCodigoDevolucionAlContado();

    const datosDevolucion = {
      codigoDevolucion,
      codigoVenta: existeVenta.codigoVenta,
      fecha,
      total: totalDevolver,
    };

    const nuevaDevolucion = await prisma.devolucionesAlContado.create({
      data: datosDevolucion,
    });

    res.json({ msg: "Nueva devolucion creada", codigoDevolucion });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
};

// Generar devolucion a credito
export const generarDevolucionACredito = async (req, res) => {
  const {
    codigoFactura,
    totalDevolver,
    montoRestante,
    totalSeleccionado,
    fecha,
  } = req.body;

  console.log(req.body);

  try {
    // Validar si existe la factura
    const existeFactura = await prisma.facturasDeudas.findFirst({
      where: {
        codigoFacturaDeuda: codigoFactura,
      },
    });

    if (!existeFactura) {
      console.log("La factura no existe");
      res.status(404).json({ msg: "No existe esta factura" });
      return;
    }

    // Validar si existe la deuda
    const existeDeuda = await prisma.deudas.findFirst({
      where: {
        codigoDeuda: existeFactura.codigoDeuda,
      },
    });

    if (!existeDeuda) {
      console.log("No existe esta dedua");
      res.status(404).json({ msg: "No existe esta deuda" });
      return;
    }

    // Validar si existe uan devolucion
    const existeDevolucion = await prisma.devolucionACredito.findFirst({
      where: {
        codigoDeuda: existeDeuda.codigoDeuda,
      },
    });

    if (existeDevolucion) {
      if (totalSeleccionado >= montoRestante) {
        // Devolver el restante (totalADevolver) y saldar deuda
        await prisma.devolucionACredito.update({
          where: {
            codigoDeuda: existeDeuda.codigoDeuda,
          },
          data: {
            fecha,
            total: totalDevolver,
          },
        });

        // saldar dedua
        await prisma.deudas.update({
          where: {
            codigoDeuda: existeDeuda.codigoDeuda,
          },
          data: {
            estado: false,
          },
        });

        res.json({
          msg: "Devolucion actualizada",
          codigoDevolucion: existeDevolucion.codigoDevolucion,
        });
        return;
      }

      if (totalSeleccionado < montoRestante) {
        await prisma.devolucionACredito.update({
          where: {
            codigoDeuda: existeDeuda.codigoDeuda,
          },
          data: {
            fecha,
            total: parseFloat(totalDevolver),
          },
        });

        // descontar al montoActualDeuda el totalSeleccioando
        await prisma.deudas.update({
          where: {
            codigoDeuda: existeDeuda.codigoDeuda,
          },
          data: {
            montoActualDeuda: {
              decrement: parseFloat(totalSeleccionado),
            },
          },
        });
        res.json({
          msg: "Devolucion creada",
          codigoDevolucion: existeDevolucion.codigoDevolucion,
        });
        return;
      }
    }

    if (totalSeleccionado >= montoRestante) {
      // Devolver el restante (totalADevolver) y saldar deuda
      const codigoDevolucion = await existeCodigoDevolucionACredito();

      await prisma.devolucionACredito.create({
        data: {
          codigoDeuda: existeDeuda.codigoDeuda,
          codigoDevolucion,
          fecha,
          total: totalDevolver,
        },
      });

      // saldar dedua
      await prisma.deudas.update({
        where: {
          codigoDeuda: existeDeuda.codigoDeuda,
        },
        data: {
          estado: false,
        },
      });

      res.json({ msg: "Devolucion creada", codigoDevolucion });
      return;
    }

    if (totalSeleccionado < montoRestante) {
      const codigoDevolucion = await existeCodigoDevolucionACredito();

      await prisma.devolucionACredito.create({
        data: {
          codigoDeuda: existeDeuda.codigoDeuda,
          codigoDevolucion,
          fecha,
          total: parseFloat(totalDevolver),
        },
      });

      // descontar al montoActualDeuda el totalSeleccioando
      await prisma.deudas.update({
        where: {
          codigoDeuda: existeDeuda.codigoDeuda,
        },
        data: {
          montoActualDeuda: {
            decrement: parseFloat(totalSeleccionado),
          },
        },
      });
      res.json({ msg: "Devolucion creada", codigoDevolucion });
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
};

// Devolver productos de facturas al contado
export const devolverProductos = async (req, res) => {
  const data = req.body;
  const { codigoDevolucion } = req.params;
  console.log(data);

  try {
    // agregar productos a las devoluciones
    data.forEach(
      async ({
        nombreProducto,
        cantidad,
        codigoProducto,
        costoActualProducto,
        descuento,
        total,
      }) => {
        const existeProductoDevuelto =
          await prisma.productosDevolucionAlContado.findFirst({
            where: {
              codigoDevolucion,
              codigoProducto,
            },
          });

        if (existeProductoDevuelto) {
          const nuevaCantidad =
            parseFloat(existeProductoDevuelto.cantidad) + parseFloat(cantidad);
          await prisma.productosDevolucionAlContado.update({
            where: {
              id: existeProductoDevuelto.id,
              codigoDevolucion: existeProductoDevuelto.codigoDevolucion,
              codigoProducto: existeProductoDevuelto.codigoProducto,
            },
            data: {
              cantidad: parseInt(nuevaCantidad),
              precioCadaUno: costoActualProducto,
              total:
                parseFloat(nuevaCantidad) * parseFloat(costoActualProducto),
            },
          });

          // actualiza la cantidad en mi stock
          const producoCantidadActualizada = await prisma.productos.update({
            where: {
              codigoProducto: existeProductoDevuelto.codigoProducto,
            },
            data: {
              cantidadStock: {
                increment: parseInt(cantidad),
              },
            },
          });

          // validar si no esta agotado pero aun sigue en baja
          if (
            producoCantidadActualizada.cantidadStock > 0 &&
            producoCantidadActualizada.cantidadStock <=
              producoCantidadActualizada.minStock
          ) {
            await prisma.productos.update({
              where: {
                codigoProducto: producoCantidadActualizada.codigoProducto,
              },
              data: {
                agotado: false,
                enBaja: true,
              },
            });
          }
          // Validar si ya no esta en baja, por ende tampoco estara agotado
          if (
            producoCantidadActualizada.cantidadStock >
            producoCantidadActualizada.minStock
          ) {
            await prisma.productos.update({
              where: {
                codigoProducto: producoCantidadActualizada.codigoProducto,
              },
              data: {
                enBaja: false,
                agotado: false,
              },
            });
          }
          return;
        }

        await prisma.productosDevolucionAlContado.create({
          data: {
            nombreProducto,
            cantidad: parseInt(cantidad),
            precioCadaUno: descuento
              ? parseFloat(costoActualProducto - descuento)
              : parseFloat(costoActualProducto),
            total,
            codigoProducto,
            codigoDevolucion,
          },
        });

        // actualiza la cantidad en mi stock
        const producoCantidadActualizada = await prisma.productos.update({
          where: {
            codigoProducto,
          },
          data: {
            cantidadStock: {
              increment: parseInt(cantidad),
            },
          },
        });

        // validar si no esta agotado pero aun sigue en baja
        if (
          producoCantidadActualizada.cantidadStock > 0 &&
          producoCantidadActualizada.cantidadStock <=
            producoCantidadActualizada.minStock
        ) {
          await prisma.productos.update({
            where: {
              codigoProducto: producoCantidadActualizada.codigoProducto,
            },
            data: {
              agotado: false,
              enBaja: true,
            },
          });
        }
        // Validar si ya no esta en baja, por ende tampoco estara agotado
        if (
          producoCantidadActualizada.cantidadStock >
          producoCantidadActualizada.minStock
        ) {
          await prisma.productos.update({
            where: {
              codigoProducto: producoCantidadActualizada.codigoProducto,
            },
            data: {
              enBaja: false,
              agotado: false,
            },
          });
        }
      }
    );

    res.json({ msg: "Devolucion realizada correctamente" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
};

// Devovler productos de facturas a credito
export const devolverProductosACredivo = async (req, res) => {
  const data = req.body;
  const { codigoDevolucion } = req.params;
  console.log(data);

  try {
    // agregar productos a las devoluciones
    data.forEach(
      async ({
        nombreProducto,
        cantidad,
        codigoProducto,
        costoActualProducto,
        descuento,
        total,
      }) => {
        const existeProductoDevuelto =
          await prisma.productosDevueltosACredito.findFirst({
            where: {
              codigoDevolucion,
              codigoProducto,
            },
          });

        if (existeProductoDevuelto) {
          const nuevaCantidad =
            parseFloat(existeProductoDevuelto.cantidad) + parseFloat(cantidad);
          await prisma.productosDevueltosACredito.update({
            where: {
              id: existeProductoDevuelto.id,
              codigoDevolucion: existeProductoDevuelto.codigoDevolucion,
              codigoProducto: existeProductoDevuelto.codigoProducto,
            },
            data: {
              cantidad: nuevaCantidad,
              precioCadaUno: costoActualProducto,
              total:
                parseFloat(nuevaCantidad) * parseFloat(costoActualProducto),
            },
          });

          // actualiza la cantidad en mi stock
          const producoCantidadActualizada = await prisma.productos.update({
            where: {
              codigoProducto: existeProductoDevuelto.codigoProducto,
            },
            data: {
              cantidadStock: {
                increment: parseInt(cantidad),
              },
            },
          });

          // validar si no esta agotado pero aun sigue en baja
          if (
            producoCantidadActualizada.cantidadStock > 0 &&
            producoCantidadActualizada.cantidadStock <=
              producoCantidadActualizada.minStock
          ) {
            await prisma.productos.update({
              where: {
                codigoProducto: producoCantidadActualizada.codigoProducto,
              },
              data: {
                agotado: false,
                enBaja: true,
              },
            });
          }
          // Validar si ya no esta en baja, por ende tampoco estara agotado
          if (
            producoCantidadActualizada.cantidadStock >
            producoCantidadActualizada.minStock
          ) {
            await prisma.productos.update({
              where: {
                codigoProducto: producoCantidadActualizada.codigoProducto,
              },
              data: {
                enBaja: false,
                agotado: false,
              },
            });
          }
          return;
        }

        await prisma.productosDevueltosACredito.create({
          data: {
            nombreProducto,
            cantidad: parseInt(cantidad),
            precioCadaUno: descuento
              ? parseFloat(costoActualProducto - descuento)
              : parseFloat(costoActualProducto),
            total,
            codigoProducto,
            codigoDevolucion,
          },
        });

        // actualiza la cantidad en mi stock
        const producoCantidadActualizada = await prisma.productos.update({
          where: {
            codigoProducto,
          },
          data: {
            cantidadStock: {
              increment: cantidad,
            },
          },
        });

        // validar si no esta agotado pero aun sigue en baja
        if (
          producoCantidadActualizada.cantidadStock > 0 &&
          producoCantidadActualizada.cantidadStock <=
            producoCantidadActualizada.minStock
        ) {
          await prisma.productos.update({
            where: {
              codigoProducto: producoCantidadActualizada.codigoProducto,
            },
            data: {
              agotado: false,
              enBaja: true,
            },
          });
        }
        // Validar si ya no esta en baja, por ende tampoco estara agotado
        if (
          producoCantidadActualizada.cantidadStock >
          producoCantidadActualizada.minStock
        ) {
          await prisma.productos.update({
            where: {
              codigoProducto: producoCantidadActualizada.codigoProducto,
            },
            data: {
              enBaja: false,
              agotado: false,
            },
          });
        }
      }
    );

    res.json({ msg: "Devolucion realizada correctamente" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
};

export const imprimirFacturasDevolucionContado = async (req, res) => {
  const { codigoFactura } = req.params;

  // Vemos si existe la factura
  const existeFactura = await prisma.facturas.findFirst({
    where: {
      codigoFactura,
    },
  });

  if (!existeFactura) {
    console.log("No existe esta factura");
    res.status(404).json({ msg: "No existe esta factura" });
    return;
  }

  // Validar si hay productos devueltos
  const productosDevolucion = await prisma.devolucionAlContado.findMany({
    where: {
      codigoVenta: existeFactura.codigoVenta,
    },
  });

  if (productosDevolucion.length == 0) {
    console.log("No hay productos devueltos");
    res.status(404).json({ msg: "No hay productos devueltos" });
    return;
  }

  const totalADevovler = productosDevolucion.reduce((total, e) => {
    return total + parseFloat(e.total);
  }, 0);

  const facturaObj = {
    codigoFactura,
    totalADevovler,
    productosDevolucion,
  };

  res.json({ msg: "Imprimiendo factura", facturaObj });
};
