import { prisma } from "../config/db.js";


export const agregarTipoDeIngreso = (req, res) => {
    const tiposDeIngresos = req.body;

    console.log(tiposDeIngresos);

    try {
        tiposDeIngresos.forEach(async (e) => {
            const agregarNuevoTipo = await prisma.tiposIngresos.create({
                data: {
                    tipoIngreso: e.tipoIngreso
                }
            })
        });

        res.json({ msg: 'Nuevos tipo de ingreso agregado' })
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: error })
    }
}