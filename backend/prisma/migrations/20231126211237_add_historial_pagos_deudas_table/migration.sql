-- CreateTable
CREATE TABLE "HistorialPagosDeudas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "codigoDedua" TEXT NOT NULL,
    "motoPago" DECIMAL NOT NULL,
    "fecha" TEXT NOT NULL,
    CONSTRAINT "HistorialPagosDeudas_codigoDedua_fkey" FOREIGN KEY ("codigoDedua") REFERENCES "Deudas" ("codigoDeuda") ON DELETE RESTRICT ON UPDATE CASCADE
);
