/*
  Warnings:

  - You are about to alter the column `motoPago` on the `HistorialPagosDeudas` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_HistorialPagosDeudas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "codigoDedua" TEXT NOT NULL,
    "motoPago" INTEGER NOT NULL,
    "fecha" TEXT NOT NULL,
    CONSTRAINT "HistorialPagosDeudas_codigoDedua_fkey" FOREIGN KEY ("codigoDedua") REFERENCES "Deudas" ("codigoDeuda") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_HistorialPagosDeudas" ("codigoDedua", "fecha", "id", "motoPago") SELECT "codigoDedua", "fecha", "id", "motoPago" FROM "HistorialPagosDeudas";
DROP TABLE "HistorialPagosDeudas";
ALTER TABLE "new_HistorialPagosDeudas" RENAME TO "HistorialPagosDeudas";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
