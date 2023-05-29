/*
  Warnings:

  - The primary key for the `Model` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `name` on the `Model` table. All the data in the column will be lost.
  - You are about to drop the column `uuid` on the `Model` table. All the data in the column will be lost.
  - You are about to drop the column `uuid_brand` on the `Model` table. All the data in the column will be lost.
  - You are about to drop the column `year_begin` on the `Model` table. All the data in the column will be lost.
  - You are about to drop the column `year_end` on the `Model` table. All the data in the column will be lost.
  - Added the required column `markId` to the `Model` table without a default value. This is not possible if the table is not empty.
  - Added the required column `model` to the `Model` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modelId` to the `Model` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modelRange` to the `Model` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Model" DROP CONSTRAINT "Model_pkey",
DROP COLUMN "name",
DROP COLUMN "uuid",
DROP COLUMN "uuid_brand",
DROP COLUMN "year_begin",
DROP COLUMN "year_end",
ADD COLUMN     "markId" INTEGER NOT NULL,
ADD COLUMN     "model" TEXT NOT NULL,
ADD COLUMN     "modelId" TEXT NOT NULL,
ADD COLUMN     "modelRange" INTEGER NOT NULL,
ADD CONSTRAINT "Model_pkey" PRIMARY KEY ("markId");
