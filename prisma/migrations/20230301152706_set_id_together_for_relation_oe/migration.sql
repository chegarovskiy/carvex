/*
  Warnings:

  - The primary key for the `OeRelation` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropIndex
DROP INDEX "OeRelation_search_itemNo_idx";

-- AlterTable
ALTER TABLE "OeRelation" DROP CONSTRAINT "OeRelation_pkey",
ADD CONSTRAINT "OeRelation_pkey" PRIMARY KEY ("itemNo", "search");

-- CreateIndex
CREATE INDEX "OeRelation_itemNo_search_idx" ON "OeRelation"("itemNo", "search");
