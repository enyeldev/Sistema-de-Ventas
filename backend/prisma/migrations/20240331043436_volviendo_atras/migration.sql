/*
  Warnings:

  - A unique constraint covering the columns `[codigoVenta]` on the table `DevolucionesAlContado` will be added. If there are existing duplicate values, this will fail.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DevolucionACredito" (
    "codigoDevolucion" TEXT NOT NULL PRIMARY KEY,
    "codigoDeuda" TEXT NOT NULL,
    "fecha" TEXT NOT NULL,
    "total" DECIMAL NOT NULL
);
INSERT INTO "new_DevolucionACredito" ("codigoDeuda", "codigoDevolucion", "fecha", "total") SELECT "codigoDeuda", "codigoDevolucion", "fecha", "total" FROM "DevolucionACredito";
DROP TABLE "DevolucionACredito";
ALTER TABLE "new_DevolucionACredito" RENAME TO "DevolucionACredito";
CREATE UNIQUE INDEX "DevolucionACredito_codigoDeuda_key" ON "DevolucionACredito"("codigoDeuda");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "DevolucionesAlContado_codigoVenta_key" ON "DevolucionesAlContado"("codigoVenta");
