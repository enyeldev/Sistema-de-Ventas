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
    "fechaUltimoPago" TEXT,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "usuarioCajeroId" TEXT,
    CONSTRAINT "Deudas_usuarioCajeroId_fkey" FOREIGN KEY ("usuarioCajeroId") REFERENCES "UsuarioCajero" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Deudas" ("codigoDeuda", "despachadoPor", "estado", "fecha", "fechaUltimoPago", "montoActualDeuda", "montoDeuda", "nombreCliente", "telefonoCliente", "usuarioCajeroId") SELECT "codigoDeuda", "despachadoPor", "estado", "fecha", "fechaUltimoPago", "montoActualDeuda", "montoDeuda", "nombreCliente", "telefonoCliente", "usuarioCajeroId" FROM "Deudas";
DROP TABLE "Deudas";
ALTER TABLE "new_Deudas" RENAME TO "Deudas";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
