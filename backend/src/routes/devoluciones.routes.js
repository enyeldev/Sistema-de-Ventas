import express from "express";
import {
  buscarProductosFactura,
  devolverProductos,
  imprimirFacturasDevolucionContado,
  generarDevolucion,
} from "../controller/devolucionesController.js";

const router = express.Router();

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

export default router;
