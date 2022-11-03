-- CreateTable
CREATE TABLE "Update" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "platform" TEXT NOT NULL,
    "distribution_link" TEXT,
    "hosting_version" TEXT NOT NULL,
    "latest_version" TEXT NOT NULL,
    "hot_update_version" TEXT NOT NULL,
    "updated_at" DATETIME NOT NULL,
    "content" TEXT
);
