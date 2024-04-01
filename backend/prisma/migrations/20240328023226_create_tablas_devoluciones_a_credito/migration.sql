-- CreateTable
CREATE TABLE "DevolucionACredito" (
    "codigoDevolucion" TEXT NOT NULL PRIMARY KEY,
    "codigoDeuda" TEXT NOT NULL,
    "fecha" TEXT NOT NULL,
    "total" DECIMAL NOT NULL
);

-- CreateTable
CREATE TABLE "ProductosDevueltosACredito" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombreProducto" TEXT NOT NULL,
    "codigoDevolucion" TEXT NOT NULL,
    "codigoProducto" TEXT NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "precioCadaUno" DECIMAL NOT NULL,
    "total" DECIMAL NOT NULL,
    CONSTRAINT "ProductosDevueltosACredito_codigoDevolucion_fkey" FOREIGN KEY ("codigoDevolucion") REFERENCES "DevolucionACredito" ("codigoDevolucion") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProductosDevueltosACredito_codigoProducto_fkey" FOREIGN KEY ("codigoProducto") REFERENCES "Productos" ("codigoProducto") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FacturasDevolucionesACredito" (
    "codigoFactura" TEXT NOT NULL PRIMARY KEY,
    "codigoDevolucion" TEXT NOT NULL,
    CONSTRAINT "FacturasDevolucionesACredito_codigoDevolucion_fkey" FOREIGN KEY ("codigoDevolucion") REFERENCES "DevolucionACredito" ("codigoDevolucion") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "DevolucionACredito_codigoDeuda_key" ON "DevolucionACredito"("codigoDeuda");

-- CreateIndex
CREATE UNIQUE INDEX "FacturasDevolucionesACredito_codigoDevolucion_key" ON "FacturasDevolucionesACredito"("codigoDevolucion");
