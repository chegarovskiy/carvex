-- CreateTable
CREATE TABLE "Catalog" (
    "typeId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,
    "groupCode" TEXT NOT NULL,
    "subGroupCode" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "marked" BOOLEAN NOT NULL,

    CONSTRAINT "Catalog_pkey" PRIMARY KEY ("typeId","groupId")
);

-- CreateIndex
CREATE INDEX "Catalog_typeId_groupId_idx" ON "Catalog"("typeId", "groupId");
