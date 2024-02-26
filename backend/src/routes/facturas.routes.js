import express from "express";
import {
  generarFacturaVenta,
  imprimirFacturaVenta,
  generarFacturaDeuda,
  imprimirFacturaDeuda,
  mostrarTodasFacturasDeudas,
  buscarFacturaDeudaPorCodigo,
  buscarFacturasDeudasPorNombreCliente,
  mostrarTodasFacturasContado,
  buscarFacturaContadoPorCodigo,
} from "../controller/facturasController.js";

const router = express.Router();
// Endpoint para generar facturas
router.get(
  "/api/facturas/generarFacturaVenta/:codigoVenta",
  generarFacturaVenta
);
router.get(
  "/api/facturas/generarFacturaDeuda/:codigoDeuda",
  generarFacturaDeuda
);
// Endpoint para generar facturas

// Endpoint para imprimir facturas
router.get(
  "/api/facturas/imprimirFacturaVenta/:codigoFactura",
  imprimirFacturaVenta
);
router.get(
  "/api/facturas/imprimirFacturaDeuda/:codigoFacturaDeuda",
  imprimirFacturaDeuda
);
// Endpoint para imprimir facturas

// Endpoint para mostrar todas las facturas de deudas
router.get(
  "/api/facturas/mostrarTodasFacturasDeudas",
  mostrarTodasFacturasDeudas
);

// Endpoint para buscar factruas de deudas por codigo
router.get(
  "/api/facturas/buscarFacturasDeudasPorCodigo/:codigoFactura",
  buscarFacturaDeudaPorCodigo
);

// Endpoint para buscar facturas deuda por nombre del cliente
router.get(
  "/api/facturas/buscarFacturasDeudasPorNombreCliente/:nombreCliente",
  buscarFacturasDeudasPorNombreCliente
);

// Endpoint para mostrar todas las facturas al contado
router.get(
  "/api/facturas/mostrarTodasFacturasContado",
  mostrarTodasFacturasContado
);

// Endpoint para buscar facturas contado por codigo
router.get(
  "/api/facturas/buscarFacturasPorCodigo/:codigoFactura",
  buscarFacturaContadoPorCodigo
);

export default router;
