-- CreateTable
CREATE TABLE "Ingresos" (
    "codigoIngreso" TEXT NOT NULL PRIMARY KEY,
    "montoIngreso" DECIMAL NOT NULL,
    "fecha" TEXT NOT NULL,
    "tipoId" INTEGER NOT NULL,
    CONSTRAINT "Ingresos_tipoId_fkey" FOREIGN KEY ("tipoId") REFERENCES "TiposIngresos" ("codigoDeTipoIngreso") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TiposIngresos" (
    "codigoDeTipoIngreso" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tipoIngreso" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Ingresos_tipoId_key" ON "Ingresos"("tipoId");
