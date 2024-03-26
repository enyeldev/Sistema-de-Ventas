/* eslint-disable no-unused-vars */
import { clienteAxios } from "../config/axios";
import { obtenerFechaYHoraActual } from "../helpers/fechaHoraActual";

export const generarNuevaDevolucionAlContado = async ({
  codigoFactura,
  totalDevolver,
}) => {
  try {
    const url = "/devoluciones/generarDevolucion";
    const respuesta = await clienteAxios.post(url, {
      codigoFactura,
      totalDevolver,
      fecha: obtenerFechaYHoraActual(),
    });

    return respuesta.data.codigoDevolucion;
  } catch (error) {
    console.log(error);
  }
};

export const devovlerProductosAlContado = async ({
  arrProductosDevolucion,
  codigoDevolucion,
}) => {
  try {
    const url = `/devoluciones/devolverProductos/${codigoDevolucion}`;
    const respuesta = await clienteAxios.post(url, arrProductosDevolucion);
    return respuesta.data.msg;
  } catch (error) {
    console.log(error);
  }
};

export const imprimirFacturaDevolucionContado = async (codigoFactura) => {
  try {
    const url = `/devoluciones/imprimirFacturaDevolucionContado/${codigoFactura}`;
    const respuesta = await clienteAxios.get(url);

    return respuesta.data.facturaObj;
  } catch (error) {
    console.log(error);
  }
};
