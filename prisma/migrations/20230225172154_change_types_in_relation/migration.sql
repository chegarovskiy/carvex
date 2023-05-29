/*
  Warnings:

  - Changed the type of `typeId` on the `Relation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `groupId` on the `Relation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Relation" DROP COLUMN "typeId",
ADD COLUMN     "typeId" INTEGER NOT NULL,
DROP COLUMN "groupId",
ADD COLUMN     "groupId" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "Relation_typeId_groupId_itemNo_idx" ON "Relation"("typeId", "groupId", "itemNo");
