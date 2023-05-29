-- DropIndex
DROP INDEX "Item_itemNo_itemNo2_idx";

-- DropIndex
DROP INDEX "ItemReplace_itemNo_itemNo2_itemReplaceNoId_idx";

-- DropIndex
DROP INDEX "ReplaceRelation_itemId_itemReplaceNoId_idx";

-- CreateIndex
CREATE INDEX "Item_itemNo_idx" ON "Item"("itemNo");

-- CreateIndex
CREATE INDEX "Item_itemNo2_idx" ON "Item"("itemNo2");

-- CreateIndex
CREATE INDEX "ItemReplace_itemNo_idx" ON "ItemReplace"("itemNo");

-- CreateIndex
CREATE INDEX "ItemReplace_itemNo2_idx" ON "ItemReplace"("itemNo2");

-- CreateIndex
CREATE INDEX "ItemReplace_itemReplaceNoId_idx" ON "ItemReplace"("itemReplaceNoId");

-- CreateIndex
CREATE INDEX "ReplaceRelation_itemId_idx" ON "ReplaceRelation"("itemId");

-- CreateIndex
CREATE INDEX "ReplaceRelation_itemReplaceNoId_idx" ON "ReplaceRelation"("itemReplaceNoId");
