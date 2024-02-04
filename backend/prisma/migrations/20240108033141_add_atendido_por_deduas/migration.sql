/*
  Warnings:

  - Added the required column `despachadoPor` to the `Deudas` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Deudas" (
    "codigoDeuda" TEXT NOT NULL PRIMARY KEY,
    "nombreCliente" TEXT NOT NULL,
    "telefonoCliente" TEXT NOT NULL,
    "despachadoPor" TEXT NOT NULL,
    "montoDeuda" DECIMAL NOT NULL,
    "montoActualDeuda" DECIMAL NOT NULL,
    "fecha" TEXT NOT NULL,
    "fechaUltimoPago" TEXT NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "usuarioCajeroId" TEXT,
    CONSTRAINT "Deudas_usuarioCajeroId_fkey" FOREIGN KEY ("usuarioCajeroId") REFERENCES "UsuarioCajero" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Deudas" ("codigoDeuda", "estado", "fecha", "fechaUltimoPago", "montoActualDeuda", "montoDeuda", "nombreCliente", "telefonoCliente", "usuarioCajeroId") SELECT "codigoDeuda", "estado", "fecha", "fechaUltimoPago", "montoActualDeuda", "montoDeuda", "nombreCliente", "telefonoCliente", "usuarioCajeroId" FROM "Deudas";
DROP TABLE "Deudas";
ALTER TABLE "new_Deudas" RENAME TO "Deudas";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
