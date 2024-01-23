-- CreateTable
CREATE TABLE "MyTable" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "color" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "image" BYTEA,

    CONSTRAINT "MyTable_pkey" PRIMARY KEY ("id")
);
