/*
  Warnings:

  - The primary key for the `Model` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Model" DROP CONSTRAINT "Model_pkey",
ADD CONSTRAINT "Model_pkey" PRIMARY KEY ("modelId");
