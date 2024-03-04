import { obtenerFechaYHoraActual } from "./fechaHoraActual";
import { clienteAxios } from "../config/axios";

export const generarNuevaDeuda = async (nombreCliente, montoDeuda) => {
  const data = {
    nombreCliente,
    fecha: obtenerFechaYHoraActual(),
    montoDeuda,
    montoActualDeuda: montoDeuda,
  };

  try {
    const url = "/deudas/generar";
    const respuesta = await clienteAxios.post(url, data);
    return respuesta.data.codigoDeuda;
  } catch (error) {
    console.log(error);
  }
};

export const generarProductosDeuda = async (arrProductosVent, codigoDeuda) => {
  const productosDeuda = arrProductosVent.map((e) => {
    return { ...e, codigoDeuda };
  });

  console.log(productosDeuda);

  try {
    const url = "/deudas/agregarProductosEnDeuda";
    const respuesta = await clienteAxios.post(url, productosDeuda);
    console.log(respuesta);
  } catch (error) {
    console.log(error);
  }
};

export const buscarCodigoFacturaDeuda = async (codigoDeuda) => {
  try {
    const url = `/deudas/buscarCodigoFactura/${codigoDeuda}`;
    const respuesta = await clienteAxios.get(url);

    return respuesta.data.codigo;
  } catch (error) {
    console.log(error);
  }
};
