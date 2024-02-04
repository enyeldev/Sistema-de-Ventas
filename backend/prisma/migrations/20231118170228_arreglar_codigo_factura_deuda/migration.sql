/*
  Warnings:

  - The primary key for the `FacturasDeudas` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `codigoFacturaDedua` on the `FacturasDeudas` table. All the data in the column will be lost.
  - Added the required column `codigoFacturaDeuda` to the `FacturasDeudas` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FacturasDeudas" (
    "codigoFacturaDeuda" TEXT NOT NULL PRIMARY KEY,
    "codigoDedua" TEXT NOT NULL,
    CONSTRAINT "FacturasDeudas_codigoDedua_fkey" FOREIGN KEY ("codigoDedua") REFERENCES "Deudas" ("codigoDeuda") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_FacturasDeudas" ("codigoDedua") SELECT "codigoDedua" FROM "FacturasDeudas";
DROP TABLE "FacturasDeudas";
ALTER TABLE "new_FacturasDeudas" RENAME TO "FacturasDeudas";
CREATE UNIQUE INDEX "FacturasDeudas_codigoDedua_key" ON "FacturasDeudas"("codigoDedua");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
