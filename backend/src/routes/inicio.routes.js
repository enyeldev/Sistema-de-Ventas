import express from "express";

import {
  datosProductos,
  todosLosProductos,
  productosEnBaja,
  productosAgotados,
} from "../controller/inicioController.js";

const router = express.Router();
// Endpoint que muestra la cantidad de productos los que etan en baja y agotados
router.get("/api/inicio/datosProductos", datosProductos);

// Endpoint para ver todos los productos
router.get("/api/inicio/todosProductos", todosLosProductos);

// EndPoint para ver los productos en baja
router.get("/api/inicio/productosEnBaja", productosEnBaja);

// EndPoint para ver todos los productos agotados
router.get("/api/inicio/productosAgotados", productosAgotados);

export default router;
