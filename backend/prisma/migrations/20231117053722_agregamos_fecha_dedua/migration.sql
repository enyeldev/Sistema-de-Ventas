/*
  Warnings:

  - Added the required column `fecha` to the `Deudas` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Deudas" (
    "codigoDeuda" TEXT NOT NULL PRIMARY KEY,
    "nombreCliente" TEXT NOT NULL,
    "telefonoCliente" TEXT NOT NULL,
    "montoDeuda" DECIMAL NOT NULL,
    "fecha" TEXT NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_Deudas" ("codigoDeuda", "estado", "montoDeuda", "nombreCliente", "telefonoCliente") SELECT "codigoDeuda", "estado", "montoDeuda", "nombreCliente", "telefonoCliente" FROM "Deudas";
DROP TABLE "Deudas";
ALTER TABLE "new_Deudas" RENAME TO "Deudas";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
