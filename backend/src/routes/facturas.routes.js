import express from 'express';
import { generarFacturaVenta, imprimirFacturaVenta, generarFacturaDeuda, imprimirFacturaDeuda, mostrarTodasFacturasDeudas } from '../controller/facturasController.js';


const router = express.Router();

router.get('/api/facturas/generarFacturaVenta/:codigoVenta', generarFacturaVenta);
router.get('/api/facturas/generarFacturaDeuda/:codigoDeuda', generarFacturaDeuda);

router.get('/api/facturas/imprimirFacturaVenta/:codigoFactura', imprimirFacturaVenta);

router.get('/api/facturas/imprimirFacturaDeuda/:codigoFacturaDeuda', imprimirFacturaDeuda);

router.get('/api/facturas/mostrarTodasFacturasDeudas', mostrarTodasFacturasDeudas);


export default router;