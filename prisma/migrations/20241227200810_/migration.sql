-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL,
    "street" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "zipCode" INTEGER NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);
