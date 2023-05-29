/*
  Warnings:

  - You are about to drop the `Criteria` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Criteria";

-- CreateTable
CREATE TABLE "Relation" (
    "id" SERIAL NOT NULL,
    "typeId" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "itemNo" TEXT NOT NULL,

    CONSTRAINT "Relation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Relation_typeId_groupId_itemNo_idx" ON "Relation"("typeId", "groupId", "itemNo");
