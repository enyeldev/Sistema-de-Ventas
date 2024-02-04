import { prisma } from "../config/db.js";
import { existeCodigoRetiro } from "../helpers/verificarCodigos.js";

export const agregarRetiro = async (req, res) => {
    try {

        const { montoRetiro, fecha, descripcion } = req.body;

        const codigoRetiro = await existeCodigoRetiro();

        const nuevoRetiro = await prisma.retiros.create({
            data: {
                codigoRetiro,
                montoRetiro,
                fecha,
                descripcion
            }
        })

        res.json({ msg: 'Retiro agregado correctamente' })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: error
        })
    }
}