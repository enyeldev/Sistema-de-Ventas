import jwt from 'jsonwebtoken'
import { prisma } from "../config/db.js";

export const checkAuth = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];

            const tokenDecoded = jwt.verify(token, process.env.CLAVE_SECRETA_JWT)

            const usuarioAutenticado = await prisma.usuarioCajero.findFirst({
                where: {
                    id: tokenDecoded.id
                }
            })
            const { id, userName } = usuarioAutenticado

            req.usuario = {
                id,
                userName
            }

            return next();
        } catch (error) {
            res.status(403).json('Token no valido')
        }
    }
}