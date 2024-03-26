/*
  Warnings:

  - Added the required column `total` to the `DevolucionesAlContado` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DevolucionesAlContado" (
    "codigoDevolucion" TEXT NOT NULL PRIMARY KEY,
    "codigoVenta" TEXT NOT NULL,
    "fecha" TEXT NOT NULL,
    "total" DECIMAL NOT NULL,
    CONSTRAINT "DevolucionesAlContado_codigoVenta_fkey" FOREIGN KEY ("codigoVenta") REFERENCES "Ventas" ("codigoVenta") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_DevolucionesAlContado" ("codigoDevolucion", "codigoVenta", "fecha") SELECT "codigoDevolucion", "codigoVenta", "fecha" FROM "DevolucionesAlContado";
DROP TABLE "DevolucionesAlContado";
ALTER TABLE "new_DevolucionesAlContado" RENAME TO "DevolucionesAlContado";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
