/*
  Warnings:

  - You are about to drop the column `codigoVenta` on the `ProductosDeudas` table. All the data in the column will be lost.
  - Added the required column `codigoFacturaDedua` to the `Deudas` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "FacturasDeudas" (
    "codigoFacturaDedua" TEXT NOT NULL PRIMARY KEY,
    "codigoDedua" TEXT NOT NULL,
    CONSTRAINT "FacturasDeudas_codigoDedua_fkey" FOREIGN KEY ("codigoDedua") REFERENCES "Deudas" ("codigoDeuda") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProductosDeudas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "codigoDeduda" TEXT NOT NULL,
    "codigoProducto" TEXT NOT NULL,
    "cantidadProducto" INTEGER NOT NULL,
    CONSTRAINT "ProductosDeudas_codigoDeduda_fkey" FOREIGN KEY ("codigoDeduda") REFERENCES "Deudas" ("codigoDeuda") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProductosDeudas_codigoProducto_fkey" FOREIGN KEY ("codigoProducto") REFERENCES "Productos" ("codigoProducto") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ProductosDeudas" ("cantidadProducto", "codigoDeduda", "codigoProducto", "id") SELECT "cantidadProducto", "codigoDeduda", "codigoProducto", "id" FROM "ProductosDeudas";
DROP TABLE "ProductosDeudas";
ALTER TABLE "new_ProductosDeudas" RENAME TO "ProductosDeudas";
CREATE TABLE "new_Deudas" (
    "codigoDeuda" TEXT NOT NULL PRIMARY KEY,
    "codigoFacturaDedua" TEXT NOT NULL,
    "nombreCliente" TEXT NOT NULL,
    "telefonoCliente" TEXT NOT NULL,
    "montoDeuda" DECIMAL NOT NULL,
    "montoActualDeuda" DECIMAL NOT NULL,
    "fecha" TEXT NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_Deudas" ("codigoDeuda", "estado", "fecha", "montoActualDeuda", "montoDeuda", "nombreCliente", "telefonoCliente") SELECT "codigoDeuda", "estado", "fecha", "montoActualDeuda", "montoDeuda", "nombreCliente", "telefonoCliente" FROM "Deudas";
DROP TABLE "Deudas";
ALTER TABLE "new_Deudas" RENAME TO "Deudas";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "FacturasDeudas_codigoDedua_key" ON "FacturasDeudas"("codigoDedua");
