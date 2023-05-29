/*
  Warnings:

  - You are about to drop the `Brand` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ModelCar` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Brand";

-- DropTable
DROP TABLE "ModelCar";

-- CreateTable
CREATE TABLE "Mark" (
    "markId" INTEGER NOT NULL,
    "mark" TEXT NOT NULL,
    "marked" BOOLEAN NOT NULL,

    CONSTRAINT "Mark_pkey" PRIMARY KEY ("markId")
);

-- CreateTable
CREATE TABLE "Model" (
    "uuid" TEXT NOT NULL,
    "uuid_brand" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "year_begin" INTEGER NOT NULL,
    "year_end" INTEGER NOT NULL,
    "marked" BOOLEAN NOT NULL,

    CONSTRAINT "Model_pkey" PRIMARY KEY ("uuid")
);
