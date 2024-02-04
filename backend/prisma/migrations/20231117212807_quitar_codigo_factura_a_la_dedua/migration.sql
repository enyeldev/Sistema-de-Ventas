/*
  Warnings:

  - You are about to drop the column `codigoFacturaDedua` on the `Deudas` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Deudas" (
    "codigoDeuda" TEXT NOT NULL PRIMARY KEY,
    "nombreCliente" TEXT NOT NULL,
    "telefonoCliente" TEXT NOT NULL,
    "montoDeuda" DECIMAL NOT NULL,
    "montoActualDeuda" DECIMAL NOT NULL,
    "fecha" TEXT NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_Deudas" ("codigoDeuda", "estado", "fecha", "montoActualDeuda", "montoDeuda", "nombreCliente", "telefonoCliente") SELECT "codigoDeuda", "estado", "fecha", "montoActualDeuda", "montoDeuda", "nombreCliente", "telefonoCliente" FROM "Deudas";
DROP TABLE "Deudas";
ALTER TABLE "new_Deudas" RENAME TO "Deudas";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
