import { prisma } from "../config/db.js";

// export async function descontarStock(prodcutosVendidos) {

//     const transaction = await prisma.$transaction(
//         prodcutosVendidos.map(async (producto) => {
//             try {
//                 const productoExiste = await prisma.productos.findFirst({
//                     where: {
//                         codigoProducto: producto.codigoProducto
//                     }
//                 });

//                 await prisma.productos.update({
//                     where: {
//                         codigoProducto: productoExiste.codigoProducto
//                     },
//                     data: {
//                         cantidadStock: productoExiste.cantidadStock - producto.cantidadVendida
//                     }
//                 });

//             } catch (error) {
//                 console.log(error);
//             }
//         })
//     )

//     return transaction;

// }
