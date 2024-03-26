/*
  Warnings:

  - You are about to drop the `DevolucionAlContado` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "DevolucionAlContado";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "DevolucionesAlContado" (
    "codigoDevolucion" TEXT NOT NULL PRIMARY KEY,
    "codigoVenta" TEXT NOT NULL,
    CONSTRAINT "DevolucionesAlContado_codigoVenta_fkey" FOREIGN KEY ("codigoVenta") REFERENCES "Ventas" ("codigoVenta") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProductosDevolucionAlContado" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombreProducto" TEXT NOT NULL,
    "codigoDevolucion" TEXT NOT NULL,
    "codigoProducto" TEXT NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "precioCadaUno" DECIMAL NOT NULL,
    "total" DECIMAL NOT NULL,
    "fecha" TEXT NOT NULL,
    CONSTRAINT "ProductosDevolucionAlContado_codigoDevolucion_fkey" FOREIGN KEY ("codigoDevolucion") REFERENCES "DevolucionesAlContado" ("codigoDevolucion") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProductosDevolucionAlContado_codigoProducto_fkey" FOREIGN KEY ("codigoProducto") REFERENCES "Productos" ("codigoProducto") ON DELETE RESTRICT ON UPDATE CASCADE
);
