-- CreateTable
CREATE TABLE "DevolucionAlContado" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "codigoVenta" TEXT NOT NULL,
    "codigoProducto" TEXT NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "precioCadaUno" DECIMAL NOT NULL,
    "total" DECIMAL NOT NULL,
    "fecha" TEXT NOT NULL,
    CONSTRAINT "DevolucionAlContado_codigoVenta_fkey" FOREIGN KEY ("codigoVenta") REFERENCES "Ventas" ("codigoVenta") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DevolucionAlContado_codigoProducto_fkey" FOREIGN KEY ("codigoProducto") REFERENCES "Productos" ("codigoProducto") ON DELETE RESTRICT ON UPDATE CASCADE
);
