import { generarID } from "../helpers/generarCodigoUsuario.js";
import { prisma } from "../config/db.js";


export const existeCodigoCajero = async () => {
    let codigoCajero = generarID();

    let existeUsuario = await prisma.usuarioCajero.findFirst({
        where: {
            id: codigoCajero
        }
    })

    while (existeUsuario) {
        codigoCajero = generarID();

        existeUsuario = await prisma.usuarioCajero.findFirst({
            where: {
                id: codigoCajero
            }
        })
    }

    return codigoCajero;
}