-- CreateTable
CREATE TABLE "ItemReplace" (
    "brand" TEXT NOT NULL,
    "firstPic" TEXT NOT NULL,
    "criterias" JSONB[],
    "description" TEXT NOT NULL,
    "groupCode" TEXT NOT NULL,
    "subGroupCode" TEXT NOT NULL,
    "itemNo" TEXT NOT NULL,
    "itemNo2" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "retail" DECIMAL(10,2) NOT NULL,
    "searchDescription" TEXT NOT NULL,
    "discontinued" BOOLEAN NOT NULL,
    "inStock" BOOLEAN NOT NULL,
    "vn" TEXT NOT NULL,
    "kvOne" TEXT NOT NULL,
    "kvTwo" TEXT NOT NULL,
    "Kh" TEXT NOT NULL,
    "marked" BOOLEAN NOT NULL,

    CONSTRAINT "ItemReplace_pkey" PRIMARY KEY ("itemNo")
);

-- CreateTable
CREATE TABLE "ReplaceRelation" (
    "itemNo" TEXT NOT NULL,
    "itemReplaceNo" TEXT NOT NULL,

    CONSTRAINT "ReplaceRelation_pkey" PRIMARY KEY ("itemNo","itemReplaceNo")
);

-- CreateIndex
CREATE INDEX "ItemReplace_itemNo_itemNo2_idx" ON "ItemReplace"("itemNo", "itemNo2");

-- CreateIndex
CREATE INDEX "ReplaceRelation_itemNo_itemReplaceNo_idx" ON "ReplaceRelation"("itemNo", "itemReplaceNo");
