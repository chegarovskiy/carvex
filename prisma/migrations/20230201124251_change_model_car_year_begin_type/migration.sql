/*
  Warnings:

  - Changed the type of `year_begin` on the `ModelCar` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "ModelCar" DROP COLUMN "year_begin",
ADD COLUMN     "year_begin" INTEGER NOT NULL;
