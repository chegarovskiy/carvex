/*
  Warnings:

  - A unique constraint covering the columns `[itemNo]` on the table `Item` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Item_itemNo_key" ON "Item"("itemNo");
