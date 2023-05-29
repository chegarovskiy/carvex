-- CreateTable
CREATE TABLE "Brand" (
    "uuid" TEXT NOT NULL,
    "models_url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "marked" BOOLEAN NOT NULL,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("uuid")
);
