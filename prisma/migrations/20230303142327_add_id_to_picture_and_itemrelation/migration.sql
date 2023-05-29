/*
  Warnings:

  - The primary key for the `ItemReplace` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Picture` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "ItemReplace" DROP CONSTRAINT "ItemReplace_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "ItemReplace_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Picture" DROP CONSTRAINT "Picture_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Picture_pkey" PRIMARY KEY ("id");
