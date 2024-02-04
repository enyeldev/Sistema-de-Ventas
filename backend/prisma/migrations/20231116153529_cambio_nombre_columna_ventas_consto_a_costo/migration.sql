/*
  Warnings:

  - You are about to drop the column `constoTotal` on the `Ventas` table. All the data in the column will be lost.
  - Added the required column `costoTotal` to the `Ventas` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ventas" (
    "codigoVenta" TEXT NOT NULL PRIMARY KEY,
    "costoTotal" DECIMAL NOT NULL,
    "pagoCliente" DECIMAL NOT NULL,
    "devueltaCliente" DECIMAL NOT NULL,
    "fecha" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Ventas" ("codigoVenta", "devueltaCliente", "fecha", "pagoCliente") SELECT "codigoVenta", "devueltaCliente", "fecha", "pagoCliente" FROM "Ventas";
DROP TABLE "Ventas";
ALTER TABLE "new_Ventas" RENAME TO "Ventas";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
