/*
  Warnings:

  - You are about to drop the column `monto` on the `VentasItem` table. All the data in the column will be lost.
  - Added the required column `costoActualProducto` to the `VentasItem` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_VentasItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "codigoVenta" TEXT NOT NULL,
    "codigoProducto" TEXT NOT NULL,
    "cantidadProducto" INTEGER NOT NULL,
    "costoVentaItem" DECIMAL NOT NULL,
    "costoActualProducto" DECIMAL NOT NULL,
    CONSTRAINT "VentasItem_codigoProducto_fkey" FOREIGN KEY ("codigoProducto") REFERENCES "Productos" ("codigoProducto") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "VentasItem_codigoVenta_fkey" FOREIGN KEY ("codigoVenta") REFERENCES "Ventas" ("codigoVenta") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_VentasItem" ("cantidadProducto", "codigoProducto", "codigoVenta", "costoVentaItem", "id") SELECT "cantidadProducto", "codigoProducto", "codigoVenta", "costoVentaItem", "id" FROM "VentasItem";
DROP TABLE "VentasItem";
ALTER TABLE "new_VentasItem" RENAME TO "VentasItem";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
