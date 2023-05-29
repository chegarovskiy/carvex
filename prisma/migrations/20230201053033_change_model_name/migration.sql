/*
  Warnings:

  - You are about to drop the `Model` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Model";

-- CreateTable
CREATE TABLE "ModelCar" (
    "year_end" INTEGER NOT NULL,
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "year_begin" TEXT NOT NULL,
    "marked" BOOLEAN NOT NULL,

    CONSTRAINT "ModelCar_pkey" PRIMARY KEY ("uuid")
);
