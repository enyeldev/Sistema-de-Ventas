import express from "express";
import { cerrarCaja } from "../controller/cerrarCajaController.js";

const router = express.Router();

// Ruta para cierre de caja
router.post("/api/cerrarCaja", cerrarCaja);

export default router;
