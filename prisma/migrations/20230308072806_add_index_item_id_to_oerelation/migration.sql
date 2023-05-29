-- DropIndex
DROP INDEX "OeRelation_itemNo_search_idx";

-- CreateIndex
CREATE INDEX "OeRelation_itemNo_search_itemId_idx" ON "OeRelation"("itemNo", "search", "itemId");
