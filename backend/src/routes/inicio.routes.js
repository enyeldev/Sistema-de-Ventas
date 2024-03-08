import express from "express";

import { datosProductos } from "../controller/inicioController.js";

const router = express.Router();

router.get("/api/inicio/datosProductos", datosProductos);

export default router;
