import express from "express";
import {
    agregarProductos,
    buscarProductos,
    eliminarProductos,
    actualizarProductos,
    venderProductos,
    generarCodigoProducto,
    buscarParaComprar,
    buscarPorNombre
} from '../controller/productosController.js';



const router = express.Router();

//Rutas para comprar o agregar productos
router.post('/api/productos/agregar', agregarProductos);

//buscar productos en la base de datos
router.get('/api/producto/buscarProductoPorCodigo/:codigoProducto', buscarProductos);

// buscar productos por nombre
router.get('/api/producto/buscarProductoPorNombre/:nombre', buscarPorNombre)

// Buscar para comprar
router.get('/api/producto/buscarParaComprar/:codigoProducto', buscarParaComprar)

//generar codigo producto
router.get('/api/producto/generarCodigoProducto', generarCodigoProducto)

//eliminar productos
router.delete('/api/producto/eliminar/:codigoProducto', eliminarProductos);


//actualizar Productos
router.put('/api/producto/actualizar/:codigoProducto', actualizarProductos);

//vender un producto
router.post('/api/producto/vender', venderProductos);


export default router;