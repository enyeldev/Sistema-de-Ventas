/*
  Warnings:

  - You are about to drop the column `nombreProducot` on the `DevolucionAlContado` table. All the data in the column will be lost.
  - Added the required column `nombreProducto` to the `DevolucionAlContado` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DevolucionAlContado" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombreProducto" TEXT NOT NULL,
    "codigoVenta" TEXT NOT NULL,
    "codigoProducto" TEXT NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "precioCadaUno" DECIMAL NOT NULL,
    "total" DECIMAL NOT NULL,
    "fecha" TEXT NOT NULL,
    CONSTRAINT "DevolucionAlContado_codigoVenta_fkey" FOREIGN KEY ("codigoVenta") REFERENCES "Ventas" ("codigoVenta") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DevolucionAlContado_codigoProducto_fkey" FOREIGN KEY ("codigoProducto") REFERENCES "Productos" ("codigoProducto") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_DevolucionAlContado" ("cantidad", "codigoProducto", "codigoVenta", "fecha", "id", "precioCadaUno", "total") SELECT "cantidad", "codigoProducto", "codigoVenta", "fecha", "id", "precioCadaUno", "total" FROM "DevolucionAlContado";
DROP TABLE "DevolucionAlContado";
ALTER TABLE "new_DevolucionAlContado" RENAME TO "DevolucionAlContado";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
