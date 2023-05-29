-- CreateTable
CREATE TABLE "Vehicl" (
    "typeId" INTEGER NOT NULL,
    "markId" INTEGER NOT NULL,
    "modelId" INTEGER NOT NULL,
    "typeName" TEXT NOT NULL,
    "typeRange" TEXT NOT NULL,
    "engines" TEXT NOT NULL,
    "kw" TEXT NOT NULL,
    "hp" TEXT NOT NULL,
    "ccmTech" INTEGER NOT NULL,
    "capacity" INTEGER NOT NULL,
    "cylinders" INTEGER NOT NULL,
    "valve" INTEGER NOT NULL,
    "fuel" TEXT NOT NULL,
    "engineType" TEXT NOT NULL,
    "fuelPreparation" TEXT NOT NULL,
    "bodyType" TEXT NOT NULL,
    "driveType" TEXT NOT NULL,
    "mark" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "marked" BOOLEAN NOT NULL,

    CONSTRAINT "Vehicl_pkey" PRIMARY KEY ("typeId")
);
