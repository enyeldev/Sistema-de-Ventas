import { prisma } from "../config/db.js";
import { existeCodigoIngreso } from "../helpers/verificarCodigos.js";


export const agregarIngresos = async (req, res) => {
    try {

        const { montoIngreso, fecha, tipoId, descripcion } = req.body;

        const codigoIngreso = await existeCodigoIngreso();

        const nuevoIngreso = await prisma.ingresos.create({
            data: {
                codigoIngreso,
                montoIngreso,
                fecha,
                tipoId,
                descripcion
            }
        })

        res.json({ msg: 'Ingreso agregado correctamente' })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: error
        })
    }
}