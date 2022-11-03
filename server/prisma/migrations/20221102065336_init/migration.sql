/*
  Warnings:

  - You are about to drop the column `content` on the `Update` table. All the data in the column will be lost.
  - You are about to drop the column `distribution_link` on the `Update` table. All the data in the column will be lost.
  - You are about to drop the column `latest_version` on the `Update` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Update` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "LastestVersion" (
    "platform" TEXT NOT NULL PRIMARY KEY,
    "hosting_version" TEXT NOT NULL,
    "hot_update_version" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Update" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "platform" TEXT NOT NULL,
    "hosting_version" TEXT NOT NULL,
    "hot_update_version" TEXT NOT NULL
);
INSERT INTO "new_Update" ("hosting_version", "hot_update_version", "id", "platform") SELECT "hosting_version", "hot_update_version", "id", "platform" FROM "Update";
DROP TABLE "Update";
ALTER TABLE "new_Update" RENAME TO "Update";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
