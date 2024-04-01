-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DevolucionACredito" (
    "codigoDevolucion" TEXT NOT NULL PRIMARY KEY,
    "codigoDeuda" TEXT NOT NULL,
    "fecha" TEXT NOT NULL,
    "total" DECIMAL NOT NULL,
    CONSTRAINT "DevolucionACredito_codigoDeuda_fkey" FOREIGN KEY ("codigoDeuda") REFERENCES "Deudas" ("codigoDeuda") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_DevolucionACredito" ("codigoDeuda", "codigoDevolucion", "fecha", "total") SELECT "codigoDeuda", "codigoDevolucion", "fecha", "total" FROM "DevolucionACredito";
DROP TABLE "DevolucionACredito";
ALTER TABLE "new_DevolucionACredito" RENAME TO "DevolucionACredito";
CREATE UNIQUE INDEX "DevolucionACredito_codigoDeuda_key" ON "DevolucionACredito"("codigoDeuda");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
