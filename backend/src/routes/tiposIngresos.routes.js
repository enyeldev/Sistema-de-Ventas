import express from 'express';
import { agregarTipoDeIngreso } from '../controller/tipoDeIngresoController.js';

const router = express.Router();


router.post('/api/tipoIngresos/agregar', agregarTipoDeIngreso);


export default router;