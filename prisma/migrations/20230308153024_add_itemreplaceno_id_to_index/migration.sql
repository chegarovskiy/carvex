-- DropIndex
DROP INDEX "ItemReplace_itemNo_itemNo2_idx";

-- CreateIndex
CREATE INDEX "ItemReplace_itemNo_itemNo2_itemReplaceNoId_idx" ON "ItemReplace"("itemNo", "itemNo2", "itemReplaceNoId");
