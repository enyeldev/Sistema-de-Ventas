/*
  Warnings:

  - The primary key for the `UsuariosAdministrativos` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `UsuarioCajero` table will be changed. If it partially fails, the table could be left without primary key constraint.

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
    "fechaUltimoPago" TEXT NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "usuarioCajeroId" TEXT,
    CONSTRAINT "Deudas_usuarioCajeroId_fkey" FOREIGN KEY ("usuarioCajeroId") REFERENCES "UsuarioCajero" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Deudas" ("codigoDeuda", "estado", "fecha", "fechaUltimoPago", "montoActualDeuda", "montoDeuda", "nombreCliente", "telefonoCliente", "usuarioCajeroId") SELECT "codigoDeuda", "estado", "fecha", "fechaUltimoPago", "montoActualDeuda", "montoDeuda", "nombreCliente", "telefonoCliente", "usuarioCajeroId" FROM "Deudas";
DROP TABLE "Deudas";
ALTER TABLE "new_Deudas" RENAME TO "Deudas";
CREATE TABLE "new_UsuariosAdministrativos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userName" TEXT NOT NULL,
    "password" TEXT NOT NULL
);
INSERT INTO "new_UsuariosAdministrativos" ("id", "password", "userName") SELECT "id", "password", "userName" FROM "UsuariosAdministrativos";
DROP TABLE "UsuariosAdministrativos";
ALTER TABLE "new_UsuariosAdministrativos" RENAME TO "UsuariosAdministrativos";
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
CREATE TABLE "new_UsuarioCajero" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userName" TEXT NOT NULL,
    "password" TEXT NOT NULL
);
INSERT INTO "new_UsuarioCajero" ("id", "password", "userName") SELECT "id", "password", "userName" FROM "UsuarioCajero";
DROP TABLE "UsuarioCajero";
ALTER TABLE "new_UsuarioCajero" RENAME TO "UsuarioCajero";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
