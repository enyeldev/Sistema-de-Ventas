import { obtenerFechaYHoraActual } from './fechaHoraActual'
import { clienteAxios } from '../config/axios'

export async function generarNuevaVenta({ totalVenta, pagoCliente, devueltaCliente, auth, nombreCliente, telefonoCliente, atendidoPor }) {

    const datosVenta = {
        costoTotal: parseFloat(totalVenta),
        pagoCliente: parseFloat(pagoCliente),
        devueltaCliente: parseFloat(devueltaCliente),
        fecha: obtenerFechaYHoraActual(),
        usuarioCajeroId: auth.id,
        nombreCliente,
        telefonoCliente,
        atendidoPor
    }

    try {
        const url = '/ventas/generar'
        const respuesta = await clienteAxios.post(url, datosVenta)
        return respuesta.data.codigoVenta
    } catch (error) {
        console.log(error);
    }
}

export async function generarVentasItems(arrProductosVent, codigoVenta) {

    const productosVendidos = arrProductosVent.map((e) => {
        return { ...e, codigoVenta }
    })



    try {
        const url = '/ventas/ventasItem'
        const respuesta = await clienteAxios.post(url, productosVendidos)
        console.log(respuesta);
    } catch (error) {
        console.log(error);
    }
}