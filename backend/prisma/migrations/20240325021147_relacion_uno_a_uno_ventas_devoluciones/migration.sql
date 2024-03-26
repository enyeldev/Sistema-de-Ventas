/*
  Warnings:

  - A unique constraint covering the columns `[codigoVenta]` on the table `DevolucionesAlContado` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "DevolucionesAlContado_codigoVenta_key" ON "DevolucionesAlContado"("codigoVenta");
