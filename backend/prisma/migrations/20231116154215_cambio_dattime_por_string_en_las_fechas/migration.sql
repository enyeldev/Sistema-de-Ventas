-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ingresos" (
    "codigoIngreso" TEXT NOT NULL PRIMARY KEY,
    "codigoProducto" TEXT,
    "codigoVenta" TEXT,
    "codigoDeuda" TEXT,
    "Fecha" TEXT NOT NULL
);
INSERT INTO "new_Ingresos" ("Fecha", "codigoDeuda", "codigoIngreso", "codigoProducto", "codigoVenta") SELECT "Fecha", "codigoDeuda", "codigoIngreso", "codigoProducto", "codigoVenta" FROM "Ingresos";
DROP TABLE "Ingresos";
ALTER TABLE "new_Ingresos" RENAME TO "Ingresos";
CREATE TABLE "new_Ventas" (
    "codigoVenta" TEXT NOT NULL PRIMARY KEY,
    "costoTotal" DECIMAL NOT NULL,
    "pagoCliente" DECIMAL NOT NULL,
    "devueltaCliente" DECIMAL NOT NULL,
    "fecha" TEXT NOT NULL
);
INSERT INTO "new_Ventas" ("codigoVenta", "costoTotal", "devueltaCliente", "fecha", "pagoCliente") SELECT "codigoVenta", "costoTotal", "devueltaCliente", "fecha", "pagoCliente" FROM "Ventas";
DROP TABLE "Ventas";
ALTER TABLE "new_Ventas" RENAME TO "Ventas";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
