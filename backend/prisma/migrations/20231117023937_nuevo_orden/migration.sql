/*
  Warnings:

  - You are about to drop the `Ingresos` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[codigoVenta]` on the table `Facturas` will be added. If there are existing duplicate values, this will fail.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Ingresos";
PRAGMA foreign_keys=on;

-- CreateIndex
CREATE UNIQUE INDEX "Facturas_codigoVenta_key" ON "Facturas"("codigoVenta");
