-- CreateTable
CREATE TABLE "FacturasDevolucionesAlContado" (
    "codigoFactura" TEXT NOT NULL PRIMARY KEY,
    "codigoDevolucion" TEXT NOT NULL,
    CONSTRAINT "FacturasDevolucionesAlContado_codigoDevolucion_fkey" FOREIGN KEY ("codigoDevolucion") REFERENCES "DevolucionesAlContado" ("codigoDevolucion") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "FacturasDevolucionesAlContado_codigoDevolucion_key" ON "FacturasDevolucionesAlContado"("codigoDevolucion");
