-- CreateTable
CREATE TABLE "Model" (
    "year_end" INTEGER NOT NULL,
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "year_begin" TEXT NOT NULL,
    "marked" BOOLEAN NOT NULL,

    CONSTRAINT "Model_pkey" PRIMARY KEY ("uuid")
);
