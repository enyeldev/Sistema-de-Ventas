import express from 'express';
import { agregarIngresos } from '../controller/ingresosController.js';

const router = express.Router();

router.post('/api/ingresos/agregar', agregarIngresos);


export default router;