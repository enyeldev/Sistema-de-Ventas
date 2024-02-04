/*
  Warnings:

  - You are about to drop the column `nombreCleinte` on the `Deudas` table. All the data in the column will be lost.
  - Added the required column `nombreCliente` to the `Deudas` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Deudas" (
    "codigoDeuda" TEXT NOT NULL PRIMARY KEY,
    "nombreCliente" TEXT NOT NULL,
    "telefonoCliente" TEXT NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_Deudas" ("codigoDeuda", "estado", "telefonoCliente") SELECT "codigoDeuda", "estado", "telefonoCliente" FROM "Deudas";
DROP TABLE "Deudas";
ALTER TABLE "new_Deudas" RENAME TO "Deudas";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
