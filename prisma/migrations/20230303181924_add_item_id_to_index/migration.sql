-- DropIndex
DROP INDEX "Item_itemNo_itemNo2_idx";

-- CreateIndex
CREATE INDEX "Item_itemNo_itemNo2_itemId_idx" ON "Item"("itemNo", "itemNo2", "itemId");
