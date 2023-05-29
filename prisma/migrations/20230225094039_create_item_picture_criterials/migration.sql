-- CreateTable
CREATE TABLE "Item" (
    "brand" TEXT NOT NULL,
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

    CONSTRAINT "Item_pkey" PRIMARY KEY ("itemNo")
);

-- CreateTable
CREATE TABLE "Picture" (
    "itemNo" TEXT NOT NULL,
    "pathName" TEXT NOT NULL,
    "myUrl" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,

    CONSTRAINT "Picture_pkey" PRIMARY KEY ("itemNo")
);

-- CreateTable
CREATE TABLE "Criteria" (
    "id" SERIAL NOT NULL,
    "criteria" TEXT NOT NULL,
    "itemNo" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "Criteria_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Item_itemNo_itemNo2_idx" ON "Item"("itemNo", "itemNo2");

-- CreateIndex
CREATE INDEX "Picture_itemNo_idx" ON "Picture"("itemNo");

-- CreateIndex
CREATE INDEX "Criteria_itemNo_idx" ON "Criteria"("itemNo");
