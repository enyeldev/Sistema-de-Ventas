import { clienteAxios } from '../config/axios'


export async function generarFacturaVenta(codigoVenta) {

    try {
        const url = `/facturas/generarFacturaVenta/${codigoVenta}`
        const respuesta = await clienteAxios.get(url)
        return respuesta.data.codigoFactura
    } catch (error) {
        console.log(error);
    }

}

export async function generarFacturaDeuda(codigoDeuda) {

    try {
        const url = `/facturas/generarFacturaDeuda/${codigoDeuda}`
        const respuesta = await clienteAxios.get(url)
        return respuesta.data.codigoFacturaDeuda
    } catch (error) {
        console.log(error);
    }

}


export async function imprimirFacturaVenta(codigoFactura) {
    try {
        const url = `/facturas/imprimirFacturaVenta/${codigoFactura}`
        const respuesta = await clienteAxios.get(url)

        return respuesta.data.facturaObj
    } catch (error) {
        console.log(error);
    }
}

export async function imprimirFacturaDeuda(codigoFacturaDeuda) {
    try {
        const url = `/facturas/imprimirFacturaDeuda/${codigoFacturaDeuda}`
        const respuesta = await clienteAxios.get(url)

        return respuesta.data.facturaObj
    } catch (error) {
        console.log(error);
    }
}





