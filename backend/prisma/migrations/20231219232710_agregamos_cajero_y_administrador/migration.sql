-- CreateTable
CREATE TABLE "UsuariosAdminiistrativos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userName" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "UsuarioCajero" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userName" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

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
    "usuarioCajeroId" INTEGER,
    CONSTRAINT "Deudas_usuarioCajeroId_fkey" FOREIGN KEY ("usuarioCajeroId") REFERENCES "UsuarioCajero" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Deudas" ("codigoDeuda", "estado", "fecha", "fechaUltimoPago", "montoActualDeuda", "montoDeuda", "nombreCliente", "telefonoCliente") SELECT "codigoDeuda", "estado", "fecha", "fechaUltimoPago", "montoActualDeuda", "montoDeuda", "nombreCliente", "telefonoCliente" FROM "Deudas";
DROP TABLE "Deudas";
ALTER TABLE "new_Deudas" RENAME TO "Deudas";
CREATE TABLE "new_Ventas" (
    "codigoVenta" TEXT NOT NULL PRIMARY KEY,
    "costoTotal" DECIMAL NOT NULL,
    "pagoCliente" DECIMAL NOT NULL,
    "devueltaCliente" DECIMAL NOT NULL,
    "fecha" TEXT NOT NULL,
    "usuarioCajeroId" INTEGER,
    CONSTRAINT "Ventas_usuarioCajeroId_fkey" FOREIGN KEY ("usuarioCajeroId") REFERENCES "UsuarioCajero" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Ventas" ("codigoVenta", "costoTotal", "devueltaCliente", "fecha", "pagoCliente") SELECT "codigoVenta", "costoTotal", "devueltaCliente", "fecha", "pagoCliente" FROM "Ventas";
DROP TABLE "Ventas";
ALTER TABLE "new_Ventas" RENAME TO "Ventas";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
