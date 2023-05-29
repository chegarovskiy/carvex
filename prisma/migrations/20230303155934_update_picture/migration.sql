/*
  Warnings:

  - The primary key for the `Picture` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Picture` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Picture" DROP CONSTRAINT "Picture_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Picture_pkey" PRIMARY KEY ("pathName", "fileName");
