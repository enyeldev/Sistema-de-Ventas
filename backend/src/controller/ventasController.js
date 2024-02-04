import { prisma } from "../config/db.js";
import { existeCodigoVenta } from "../helpers/verificarCodigos.js"




export const generarVenta = async (req, res) => {

    try {

        const codigoVenta = await existeCodigoVenta();

        const { costoTotal, pagoCliente, devueltaCliente, fecha, usuarioCajeroId, nombreCliente, telefonoCliente, atendidoPor } = req.body;

        const nuevaVenta = {
            codigoVenta,
            costoTotal,
            pagoCliente,
            devueltaCliente,
            fecha,
            usuarioCajeroId,
            nombreCliente: nombreCliente || '',
            telefonoCliente: telefonoCliente || '',
            atendidoPor: atendidoPor || ''
        }


        const guardarNuevaVenta = await prisma.ventas.create({
            data: nuevaVenta
        })
        res.json({ msg: 'Venta agregada correctamente', codigoVenta })
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: error })
    }
}

export const generarVentaItem = async (req, res) => {

    /*
    
    {
        "codigoProducto": "9400045050",
        "cantidadVendida": 3,
        "codigoVenta": "y0ZB7X23JbxLzxVfucPXB",
        "costoVentaItem": 825.00
    }
    
    */

    const productosVendidos = req.body;


    try {
        productosVendidos.forEach(async (e) => {
            const { codigoProducto, cantidad, codigoVenta, total, monto, nombre } = e

            const nuevoItemVenta = await prisma.ventasItem.create({
                data: {
                    codigoProducto,
                    codigoVenta,
                    cantidadProducto: parseInt(cantidad),
                    costoVentaItem: total,
                    costoActualProducto: parseFloat(total / cantidad),
                    nombreProducto: nombre
                }
            })
        });

        res.json({ msg: 'Venta Item agregado correctamente' })
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: error })
    }



}