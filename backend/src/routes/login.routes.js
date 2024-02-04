import express from 'express'
import { agregarCajero, autenticarCajero, obtenerDataCajero } from '../controller/loginController.js'
import { checkAuth } from '../middlewares/authMiddleware.js'


const router = express.Router();

// Auth cajero
router.get('/api/loginCajero/:userName/:password', autenticarCajero);
router.post('/api/agregarCajero', agregarCajero);

router.get('/api/obtenerPerfilCajero', checkAuth, obtenerDataCajero)

export default router