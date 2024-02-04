/*
  Warnings:

  - A unique constraint covering the columns `[userName]` on the table `UsuarioCajero` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userName]` on the table `UsuariosAdministrativos` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UsuarioCajero_userName_key" ON "UsuarioCajero"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "UsuariosAdministrativos_userName_key" ON "UsuariosAdministrativos"("userName");
