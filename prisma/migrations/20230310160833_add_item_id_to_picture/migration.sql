/*
  Warnings:

  - Added the required column `itemId` to the `Picture` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Picture_itemNo_idx";

-- AlterTable
ALTER TABLE "Picture" ADD COLUMN     "itemId" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "Picture_itemNo_itemId_idx" ON "Picture"("itemNo", "itemId");
