/*
  Warnings:

  - Made the column `uuid_brand` on table `ModelCar` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ModelCar" ALTER COLUMN "uuid_brand" SET NOT NULL;
