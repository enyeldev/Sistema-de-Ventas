import { clienteAxios } from '../config/axios'

export async function descontarProductoStock(arrProductosVent) {

    try {
        const url = '/producto/vender'

        const productosVendidos = arrProductosVent

        const respuesta = await clienteAxios.post(url, productosVendidos)
        console.log(respuesta);
    } catch (error) {
        console.log(error);
    }

}