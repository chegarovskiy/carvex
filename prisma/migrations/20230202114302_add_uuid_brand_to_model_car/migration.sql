/*
  Warnings:

  - Added the required column `uuid_brand` to the `ModelCar` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ModelCar" ADD COLUMN     "uuid_brand" TEXT;
