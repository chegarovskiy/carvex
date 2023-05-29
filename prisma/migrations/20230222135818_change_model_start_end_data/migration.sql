/*
  Warnings:

  - You are about to drop the column `modelRange` on the `Model` table. All the data in the column will be lost.
  - Added the required column `year_begin` to the `Model` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year_end` to the `Model` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Model" DROP COLUMN "modelRange",
ADD COLUMN     "year_begin" INTEGER NOT NULL,
ADD COLUMN     "year_end" INTEGER NOT NULL;
