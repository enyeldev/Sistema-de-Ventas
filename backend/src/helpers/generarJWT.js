import jwt from 'jsonwebtoken'

export const generarJWT = (payload) => {
    const token = jwt.sign(payload, process.env.CLAVE_SECRETA_JWT, {
        expiresIn: '2d'
    })

    return token
}