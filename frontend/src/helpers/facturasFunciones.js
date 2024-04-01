import { clienteAxios } from "../config/axios";

export async function generarFacturaVenta(codigoVenta) {
  try {
    const url = `/facturas/generarFacturaVenta/${codigoVenta}`;
    const respuesta = await clienteAxios.get(url);
    return respuesta.data.codigoFactura;
  } catch (error) {
    console.log(error);
  }
}

export async function generarFacturaDeuda(codigoDeuda) {
  try {
    const url = `/facturas/generarFacturaDeuda/${codigoDeuda}`;
    const respuesta = await clienteAxios.get(url);
    return respuesta.data.codigoFacturaDeuda;
  } catch (error) {
    console.log(error);
  }
}

export async function generarFacturaDevolucionContado(codigoDevolucion) {
  try {
    const url = `/facturas/generarFacturaDevolucionAlContado/${codigoDevolucion}`;
    const respuesta = await clienteAxios.get(url);
    return respuesta.data.codigoFacturaDevolucion;
  } catch (error) {
    console.log(error);
  }
}

export async function generarFacturaDevolucionCredito(codigoDevolucion) {
  try {
    const url = `/facturas/generarFacturaDevolucionACredito/${codigoDevolucion}`;
    const respuesta = await clienteAxios.get(url);
    return respuesta.data.codigoFacturaDevolucion;
  } catch (error) {
    console.log(error);
  }
}

export async function imprimirFacturaVenta(codigoFactura) {
  try {
    const url = `/facturas/imprimirFacturaVenta/${codigoFactura}`;
    const respuesta = await clienteAxios.get(url);

    return respuesta.data.facturaObj;
  } catch (error) {
    console.log(error);
  }
}

export async function imprimirFacturaDeuda(codigoFacturaDeuda) {
  try {
    const url = `/facturas/imprimirFacturaDeuda/${codigoFacturaDeuda}`;
    const respuesta = await clienteAxios.get(url);

    return respuesta.data.facturaObj;
  } catch (error) {
    console.log(error);
  }
}

export async function imprimirFacturaDevolucionContado(
  codigoFacturaDevolucion
) {
  try {
    const url = `/facturas/imprimirFacturaDevolucionContado/${codigoFacturaDevolucion}`;
    const respuesta = await clienteAxios.get(url);
    return respuesta.data.facturaObj;
  } catch (error) {
    console.log(error);
  }
}

export async function imprimriFacturaDevolucionCredito(
  codigoFacturaDevolucion
) {
  try {
    const url = `/facturas/imprimirFacturaDevolucionACredito/${codigoFacturaDevolucion}`;
    const respuesta = await clienteAxios.get(url);
    return respuesta.data.facturaObj;
  } catch (error) {
    console.log(error);
  }
}
