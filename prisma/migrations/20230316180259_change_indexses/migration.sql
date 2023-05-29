-- DropIndex
DROP INDEX "Item_itemNo_itemNo2_itemId_idx";

-- DropIndex
DROP INDEX "OeRelation_itemNo_search_itemId_idx";

-- DropIndex
DROP INDEX "Picture_itemNo_itemId_idx";

-- CreateIndex
CREATE INDEX "Item_itemNo_itemNo2_idx" ON "Item"("itemNo", "itemNo2");

-- CreateIndex
CREATE INDEX "Item_itemId_idx" ON "Item"("itemId");

-- CreateIndex
CREATE INDEX "OeRelation_itemNo_idx" ON "OeRelation"("itemNo");

-- CreateIndex
CREATE INDEX "OeRelation_search_idx" ON "OeRelation"("search");

-- CreateIndex
CREATE INDEX "OeRelation_itemId_idx" ON "OeRelation"("itemId");

-- CreateIndex
CREATE INDEX "Picture_itemNo_idx" ON "Picture"("itemNo");

-- CreateIndex
CREATE INDEX "Picture_itemId_idx" ON "Picture"("itemId");
