/*
  Warnings:

  - You are about to drop the column `codigoDeduda` on the `ProductosDeudas` table. All the data in the column will be lost.
  - You are about to drop the column `codigoDedua` on the `FacturasDeudas` table. All the data in the column will be lost.
  - Added the required column `codigoDeuda` to the `ProductosDeudas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `codigoDeuda` to the `FacturasDeudas` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProductosDeudas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "codigoDeuda" TEXT NOT NULL,
    "codigoProducto" TEXT NOT NULL,
    "cantidadProducto" INTEGER NOT NULL,
    CONSTRAINT "ProductosDeudas_codigoDeuda_fkey" FOREIGN KEY ("codigoDeuda") REFERENCES "Deudas" ("codigoDeuda") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProductosDeudas_codigoProducto_fkey" FOREIGN KEY ("codigoProducto") REFERENCES "Productos" ("codigoProducto") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ProductosDeudas" ("cantidadProducto", "codigoProducto", "id") SELECT "cantidadProducto", "codigoProducto", "id" FROM "ProductosDeudas";
DROP TABLE "ProductosDeudas";
ALTER TABLE "new_ProductosDeudas" RENAME TO "ProductosDeudas";
CREATE TABLE "new_FacturasDeudas" (
    "codigoFacturaDeuda" TEXT NOT NULL PRIMARY KEY,
    "codigoDeuda" TEXT NOT NULL,
    CONSTRAINT "FacturasDeudas_codigoDeuda_fkey" FOREIGN KEY ("codigoDeuda") REFERENCES "Deudas" ("codigoDeuda") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_FacturasDeudas" ("codigoFacturaDeuda") SELECT "codigoFacturaDeuda" FROM "FacturasDeudas";
DROP TABLE "FacturasDeudas";
ALTER TABLE "new_FacturasDeudas" RENAME TO "FacturasDeudas";
CREATE UNIQUE INDEX "FacturasDeudas_codigoDeuda_key" ON "FacturasDeudas"("codigoDeuda");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
