import express from 'express';
import { agregarRetiro } from '../controller/retiroController.js'

const router = express.Router();

router.post('/api/retiro/agregar', agregarRetiro)

export default router;