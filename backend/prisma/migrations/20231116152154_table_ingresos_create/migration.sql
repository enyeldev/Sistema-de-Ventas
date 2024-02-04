-- CreateTable
CREATE TABLE "Ingresos" (
    "codigoIngreso" TEXT NOT NULL PRIMARY KEY,
    "codigoProducto" TEXT,
    "codigoVenta" TEXT,
    "codigoDeuda" TEXT,
    "Fecha" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
