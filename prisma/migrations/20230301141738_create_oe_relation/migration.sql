-- CreateTable
CREATE TABLE "OeRelation" (
    "itemNo" TEXT NOT NULL,
    "search" TEXT NOT NULL,
    "brand" TEXT NOT NULL,

    CONSTRAINT "OeRelation_pkey" PRIMARY KEY ("itemNo")
);

-- CreateIndex
CREATE INDEX "OeRelation_search_itemNo_idx" ON "OeRelation"("search", "itemNo");
