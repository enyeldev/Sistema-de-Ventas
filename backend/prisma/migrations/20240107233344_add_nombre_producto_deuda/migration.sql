/*
  Warnings:

  - Added the required column `nombreProducto` to the `ProductosDeudas` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProductosDeudas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "codigoDeuda" TEXT NOT NULL,
    "codigoProducto" TEXT NOT NULL,
    "nombreProducto" TEXT NOT NULL,
    "cantidadProducto" INTEGER NOT NULL,
    "costoProducto" DECIMAL NOT NULL,
    "monto" DECIMAL NOT NULL,
    CONSTRAINT "ProductosDeudas_codigoDeuda_fkey" FOREIGN KEY ("codigoDeuda") REFERENCES "Deudas" ("codigoDeuda") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProductosDeudas_codigoProducto_fkey" FOREIGN KEY ("codigoProducto") REFERENCES "Productos" ("codigoProducto") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ProductosDeudas" ("cantidadProducto", "codigoDeuda", "codigoProducto", "costoProducto", "id", "monto") SELECT "cantidadProducto", "codigoDeuda", "codigoProducto", "costoProducto", "id", "monto" FROM "ProductosDeudas";
DROP TABLE "ProductosDeudas";
ALTER TABLE "new_ProductosDeudas" RENAME TO "ProductosDeudas";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
