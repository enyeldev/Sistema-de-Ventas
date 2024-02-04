-- CreateTable
CREATE TABLE "Productos" (
    "codigoProducto" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "cantidadStock" INTEGER NOT NULL,
    "minStock" INTEGER NOT NULL,
    "precioCompraUnd" DECIMAL NOT NULL,
    "precioVentaUnd" DECIMAL NOT NULL,
    "ganancia" DECIMAL NOT NULL,
    "agotado" BOOLEAN NOT NULL DEFAULT false,
    "enBaja" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "VentasItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "codigoVenta" TEXT NOT NULL,
    "codigoProducto" TEXT NOT NULL,
    "cantidadProducto" INTEGER NOT NULL,
    CONSTRAINT "VentasItem_codigoProducto_fkey" FOREIGN KEY ("codigoProducto") REFERENCES "Productos" ("codigoProducto") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "VentasItem_codigoVenta_fkey" FOREIGN KEY ("codigoVenta") REFERENCES "Ventas" ("codigoVenta") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Ventas" (
    "codigoVenta" TEXT NOT NULL PRIMARY KEY,
    "constoTotal" DECIMAL NOT NULL,
    "pagoCliente" DECIMAL NOT NULL,
    "devueltaCliente" DECIMAL NOT NULL,
    "fecha" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Deudas" (
    "codigoDeuda" TEXT NOT NULL PRIMARY KEY,
    "nombreCleinte" TEXT NOT NULL,
    "telefonoCliente" TEXT NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "ProductosDeudas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "codigoDeduda" TEXT NOT NULL,
    "codigoProducto" TEXT NOT NULL,
    "codigoVenta" TEXT NOT NULL,
    "cantidadProducto" INTEGER NOT NULL,
    CONSTRAINT "ProductosDeudas_codigoDeduda_fkey" FOREIGN KEY ("codigoDeduda") REFERENCES "Deudas" ("codigoDeuda") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProductosDeudas_codigoProducto_fkey" FOREIGN KEY ("codigoProducto") REFERENCES "Productos" ("codigoProducto") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProductosDeudas_codigoVenta_fkey" FOREIGN KEY ("codigoVenta") REFERENCES "Ventas" ("codigoVenta") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Facturas" (
    "codigoFactura" TEXT NOT NULL PRIMARY KEY,
    "codigoVenta" TEXT NOT NULL,
    CONSTRAINT "Facturas_codigoVenta_fkey" FOREIGN KEY ("codigoVenta") REFERENCES "Ventas" ("codigoVenta") ON DELETE RESTRICT ON UPDATE CASCADE
);
