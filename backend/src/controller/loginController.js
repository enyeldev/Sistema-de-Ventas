import { prisma } from "../config/db.js";
import { generarJWT } from '../helpers/generarJWT.js'
import { existeCodigoCajero } from '../helpers/verificarCodigoUsuario.js'

export const autenticarCajero = async (req, res) => {
    const { userName, password } = req.params;

    try {
        const existeCajero = await prisma.usuarioCajero.findFirst({
            where: {
                userName
            }
        })

        if (!existeCajero) {
            res.status(404).json({ msg: 'El usuario no existe' })
            return
        }

        if (existeCajero.password != password) {
            res.status(403).json({ msg: 'La contraseña es incorrecta' })
            return
        }

        const { id } = existeCajero;
        //Generar y devolver token
        const token = generarJWT({ id })

        const usuario = {
            id,
            nombre: existeCajero.userName,
            token
        }
        res.json({ msg: 'Autenticacion completada', usuario })
    } catch (error) {
        console.log(error);
        res.status(403).json({ msg: error })
    }


}

export const agregarCajero = async (req, res) => {
    const { userName, password } = req.body


    // Verificar si ya existe un cajero con ese nombre de usuario
    try {
        const existeCajero = await prisma.usuarioCajero.findFirst({
            where: {
                userName
            }
        })

        if (existeCajero) {
            res.status(403).json({ msg: 'El usuario ya existe' })
            return
        }


        const idCajero = await existeCodigoCajero();



        await prisma.usuarioCajero.create({
            data: {
                id: idCajero,
                userName,
                password
            }
        })

        res.json({ msg: 'Cajero registrado correctamente' })

    } catch (error) {
        console.log(error);
        res.json({ msg: error })
    }

}


export const obtenerDataCajero = async (req, res) => {
    const { usuario } = req
    res.json({ usuario })
}