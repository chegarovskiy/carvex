/*
  Warnings:

  - The primary key for the `Item` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Item` table. All the data in the column will be lost.
  - The primary key for the `ItemReplace` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ItemReplace` table. All the data in the column will be lost.
  - Added the required column `itemId` to the `OeRelation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itemId` to the `Relation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itemId` to the `ReplaceRelation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itemReplaceNoId` to the `ReplaceRelation` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "ReplaceRelation_itemNo_itemReplaceNo_idx";

-- AlterTable
ALTER TABLE "Item" DROP CONSTRAINT "Item_pkey",
DROP COLUMN "id",
ADD COLUMN     "itemId" SERIAL NOT NULL,
ADD CONSTRAINT "Item_pkey" PRIMARY KEY ("itemId");

-- AlterTable
ALTER TABLE "ItemReplace" DROP CONSTRAINT "ItemReplace_pkey",
DROP COLUMN "id",
ADD COLUMN     "itemReplaceNoId" SERIAL NOT NULL,
ADD CONSTRAINT "ItemReplace_pkey" PRIMARY KEY ("itemReplaceNoId");

-- AlterTable
ALTER TABLE "OeRelation" ADD COLUMN     "itemId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Relation" ADD COLUMN     "itemId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ReplaceRelation" ADD COLUMN     "itemId" INTEGER NOT NULL,
ADD COLUMN     "itemReplaceNoId" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "ReplaceRelation_itemId_itemReplaceNoId_idx" ON "ReplaceRelation"("itemId", "itemReplaceNoId");
