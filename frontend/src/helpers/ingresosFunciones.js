import { clienteAxios } from '../config/axios'
import { obtenerFechaYHoraActual } from '../helpers/fechaHoraActual'

export async function generarNuevoIngresoVenta(montoIngreso, tipoId, descripcion) {

    const datosIngresoVenta = {
        montoIngreso,
        fecha: obtenerFechaYHoraActual(),
        tipoId: parseInt(tipoId),
        descripcion
    }

    try {
        const url = '/ingresos/agregar'
        const respuesta = await clienteAxios.post(url, datosIngresoVenta)
        return respuesta
    } catch (error) {
        console.log(error);
    }
}