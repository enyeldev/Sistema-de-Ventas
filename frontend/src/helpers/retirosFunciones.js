import { clienteAxios } from '../config/axios'
import { obtenerFechaYHoraActual } from '../helpers/fechaHoraActual'

export const generarNuevoRetiro = async (montoRetiro, descripcion) => {
    const datosRetiro = {

        montoRetiro,
        fecha: obtenerFechaYHoraActual(),
        descripcion
    }

    try {
        const url = '/retiro/agregar'
        const respuesta = await clienteAxios.post(url, datosRetiro)
        return respuesta
    } catch (error) {
        console.log(error);
    }
}