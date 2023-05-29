/*
  Warnings:

  - A unique constraint covering the columns `[itemNo]` on the table `ItemReplace` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ItemReplace_itemNo_key" ON "ItemReplace"("itemNo");
