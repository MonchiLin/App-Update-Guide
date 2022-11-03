/*
  Warnings:

  - You are about to drop the `Update` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Update";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "HotUpdate" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "platform" TEXT NOT NULL,
    "hosting_version" TEXT NOT NULL,
    "hot_update_version" TEXT NOT NULL
);
