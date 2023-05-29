-- DropIndex
DROP INDEX "Relation_typeId_groupId_itemNo_idx";

-- CreateIndex
CREATE INDEX "Relation_typeId_groupId_idx" ON "Relation"("typeId", "groupId");

-- CreateIndex
CREATE INDEX "Relation_itemNo_idx" ON "Relation"("itemNo");
