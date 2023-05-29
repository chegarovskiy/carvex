/*
  Warnings:

  - The primary key for the `Relation` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Relation" DROP CONSTRAINT "Relation_pkey",
ADD COLUMN     "relationId" SERIAL NOT NULL,
ADD CONSTRAINT "Relation_pkey" PRIMARY KEY ("relationId");
