/*
  Warnings:

  - You are about to drop the `UsuariosAdminiistrativos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "UsuariosAdminiistrativos";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "UsuariosAdministrativos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userName" TEXT NOT NULL,
    "password" TEXT NOT NULL
);
