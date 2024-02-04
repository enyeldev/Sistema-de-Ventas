-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Productos" (
    "codigoProducto" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "cantidadStock" INTEGER NOT NULL,
    "minStock" INTEGER NOT NULL,
    "precioCompraUnd" DECIMAL NOT NULL,
    "precioVentaUnd" DECIMAL NOT NULL,
    "ganancia" DECIMAL NOT NULL,
    "agotado" BOOLEAN NOT NULL DEFAULT false,
    "enBaja" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Productos" ("agotado", "cantidadStock", "codigoProducto", "enBaja", "ganancia", "minStock", "nombre", "precioCompraUnd", "precioVentaUnd") SELECT "agotado", "cantidadStock", "codigoProducto", "enBaja", "ganancia", "minStock", "nombre", "precioCompraUnd", "precioVentaUnd" FROM "Productos";
DROP TABLE "Productos";
ALTER TABLE "new_Productos" RENAME TO "Productos";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
