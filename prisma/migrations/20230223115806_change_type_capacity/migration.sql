/*
  Warnings:

  - You are about to alter the column `capacity` on the `Vehicl` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(2,1)`.

*/
-- AlterTable
ALTER TABLE "Vehicl" ALTER COLUMN "capacity" SET DATA TYPE DECIMAL(2,1);
