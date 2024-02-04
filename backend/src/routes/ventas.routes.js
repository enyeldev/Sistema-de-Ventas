import express from "express";
import { generarVenta, generarVentaItem } from "../controller/ventasController.js";


const router = express.Router();


router.post('/api/ventas/generar', generarVenta);

//Generar ventas itmes
router.post('/api/ventas/ventasItem', generarVentaItem)


export default router