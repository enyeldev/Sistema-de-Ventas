/*
  Warnings:

  - You are about to drop the column `fecha` on the `ProductosDevolucionAlContado` table. All the data in the column will be lost.
  - Added the required column `fecha` to the `DevolucionesAlContado` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProductosDevolucionAlContado" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombreProducto" TEXT NOT NULL,
    "codigoDevolucion" TEXT NOT NULL,
    "codigoProducto" TEXT NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "precioCadaUno" DECIMAL NOT NULL,
    "total" DECIMAL NOT NULL,
    CONSTRAINT "ProductosDevolucionAlContado_codigoDevolucion_fkey" FOREIGN KEY ("codigoDevolucion") REFERENCES "DevolucionesAlContado" ("codigoDevolucion") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProductosDevolucionAlContado_codigoProducto_fkey" FOREIGN KEY ("codigoProducto") REFERENCES "Productos" ("codigoProducto") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ProductosDevolucionAlContado" ("cantidad", "codigoDevolucion", "codigoProducto", "id", "nombreProducto", "precioCadaUno", "total") SELECT "cantidad", "codigoDevolucion", "codigoProducto", "id", "nombreProducto", "precioCadaUno", "total" FROM "ProductosDevolucionAlContado";
DROP TABLE "ProductosDevolucionAlContado";
ALTER TABLE "new_ProductosDevolucionAlContado" RENAME TO "ProductosDevolucionAlContado";
CREATE TABLE "new_DevolucionesAlContado" (
    "codigoDevolucion" TEXT NOT NULL PRIMARY KEY,
    "codigoVenta" TEXT NOT NULL,
    "fecha" TEXT NOT NULL,
    CONSTRAINT "DevolucionesAlContado_codigoVenta_fkey" FOREIGN KEY ("codigoVenta") REFERENCES "Ventas" ("codigoVenta") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_DevolucionesAlContado" ("codigoDevolucion", "codigoVenta") SELECT "codigoDevolucion", "codigoVenta" FROM "DevolucionesAlContado";
DROP TABLE "DevolucionesAlContado";
ALTER TABLE "new_DevolucionesAlContado" RENAME TO "DevolucionesAlContado";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
