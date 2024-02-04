/*
  Warnings:

  - Added the required column `fechaUltimoPago` to the `Deudas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ingresos" ADD COLUMN "descripcion" TEXT;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Deudas" (
    "codigoDeuda" TEXT NOT NULL PRIMARY KEY,
    "nombreCliente" TEXT NOT NULL,
    "telefonoCliente" TEXT NOT NULL,
    "montoDeuda" DECIMAL NOT NULL,
    "montoActualDeuda" DECIMAL NOT NULL,
    "fecha" TEXT NOT NULL,
    "fechaUltimoPago" TEXT NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_Deudas" ("codigoDeuda", "estado", "fecha", "montoActualDeuda", "montoDeuda", "nombreCliente", "telefonoCliente") SELECT "codigoDeuda", "estado", "fecha", "montoActualDeuda", "montoDeuda", "nombreCliente", "telefonoCliente" FROM "Deudas";
DROP TABLE "Deudas";
ALTER TABLE "new_Deudas" RENAME TO "Deudas";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
