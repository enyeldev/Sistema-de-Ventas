/*
  Warnings:

  - You are about to drop the column `despachadoPor` on the `Deudas` table. All the data in the column will be lost.
  - You are about to drop the column `telefonoCliente` on the `Deudas` table. All the data in the column will be lost.
  - You are about to drop the column `atendidoPor` on the `Ventas` table. All the data in the column will be lost.
  - You are about to drop the column `nombreCliente` on the `Ventas` table. All the data in the column will be lost.
  - You are about to drop the column `telefonoCliente` on the `Ventas` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Deudas" (
    "codigoDeuda" TEXT NOT NULL PRIMARY KEY,
    "nombreCliente" TEXT NOT NULL,
    "montoDeuda" DECIMAL NOT NULL,
    "montoActualDeuda" DECIMAL NOT NULL,
    "fecha" TEXT NOT NULL,
    "fechaUltimoPago" TEXT,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "usuarioCajeroId" TEXT,
    CONSTRAINT "Deudas_usuarioCajeroId_fkey" FOREIGN KEY ("usuarioCajeroId") REFERENCES "UsuarioCajero" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Deudas" ("codigoDeuda", "estado", "fecha", "fechaUltimoPago", "montoActualDeuda", "montoDeuda", "nombreCliente", "usuarioCajeroId") SELECT "codigoDeuda", "estado", "fecha", "fechaUltimoPago", "montoActualDeuda", "montoDeuda", "nombreCliente", "usuarioCajeroId" FROM "Deudas";
DROP TABLE "Deudas";
ALTER TABLE "new_Deudas" RENAME TO "Deudas";
CREATE TABLE "new_Ventas" (
    "codigoVenta" TEXT NOT NULL PRIMARY KEY,
    "costoTotal" DECIMAL NOT NULL,
    "pagoCliente" DECIMAL NOT NULL,
    "devueltaCliente" DECIMAL NOT NULL,
    "fecha" TEXT NOT NULL,
    "usuarioCajeroId" TEXT,
    CONSTRAINT "Ventas_usuarioCajeroId_fkey" FOREIGN KEY ("usuarioCajeroId") REFERENCES "UsuarioCajero" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Ventas" ("codigoVenta", "costoTotal", "devueltaCliente", "fecha", "pagoCliente", "usuarioCajeroId") SELECT "codigoVenta", "costoTotal", "devueltaCliente", "fecha", "pagoCliente", "usuarioCajeroId" FROM "Ventas";
DROP TABLE "Ventas";
ALTER TABLE "new_Ventas" RENAME TO "Ventas";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
