import express from "express";
import {
  buscarProductosFactura,
  devolverProductos,
  imprimirFacturasDevolucionContado,
  generarDevolucion,
  buscarProdcutosFacturasACredito,
  generarDevolucionACredito,
  devolverProductosACredivo,
} from "../controller/devolucionesController.js";

const router = express.Router();
// Rutas de devoluciones al contado
router.get(
  "/api/devoluciones/buscarProductosFactura/:codigoFactura",
  buscarProductosFactura
);

router.post("/api/devoluciones/generarDevolucion", generarDevolucion);
router.post(
  "/api/devoluciones/devolverProductos/:codigoDevolucion",
  devolverProductos
);

router.get(
  "/api/devoluciones/imprimirFacturaDevolucionContado/:codigoFactura",
  imprimirFacturasDevolucionContado
);

// Rutas de devoluciones a credito
router.get(
  "/api/devoluciones/buscarProductosFacturaCredito/:codigoFactura",
  buscarProdcutosFacturasACredito
);

router.post(
  "/api/devoluciones/generarDevolucionACredito",
  generarDevolucionACredito
);

router.post(
  "/api/devoluciones/devolverProductosACredito/:codigoDevolucion",
  devolverProductosACredivo
);

export default router;
