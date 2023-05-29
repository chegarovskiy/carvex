/*
  Warnings:

  - Changed the type of `modelId` on the `Model` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Model" DROP COLUMN "modelId",
ADD COLUMN     "modelId" INTEGER NOT NULL;
