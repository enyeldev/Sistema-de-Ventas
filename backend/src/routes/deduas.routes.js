import express from "express";
import {
  agregarDeuda,
  agregarProductosEnDedua,
  buscarDeudaPorCodigo,
  buscarDeudaPorNombre,
  pagarDeuda,
  buscarTodasLasDeudas,
  agregarPagoHistorial,
  buscarCodigoFactura,
  buscarProductosDelaDeuda,
} from "../controller/deudasController.js";

const router = express.Router();

router.post("/api/deudas/generar", agregarDeuda);
router.post("/api/deudas/agregarProductosEnDeuda", agregarProductosEnDedua);

router.get("/api/deduas/buscarTodasDeudas", buscarTodasLasDeudas);
router.get(
  "/api/deudas/buscarDeudaPorCodigo/:codigoFacturaDeuda",
  buscarDeudaPorCodigo
);
router.get(
  "/api/deudas/buscarDeudaPorNombre/:nombreCliente",
  buscarDeudaPorNombre
);
router.get("/api/deudas/buscarCodigoFactura/:codigoDeuda", buscarCodigoFactura);
router.get(
  "/api/deudas/buscarProductosDeuda/:codigoDeuda",
  buscarProductosDelaDeuda
);

router.put("/api/deudas/pagarDeudas", pagarDeuda);
router.post("/api/deudas/historialDePagos", agregarPagoHistorial);

export default router;
