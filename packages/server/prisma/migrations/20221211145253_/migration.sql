-- CreateEnum
CREATE TYPE "FieldTypeEnum" AS ENUM ('text', 'json', 'number');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContentModel" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "ContentModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Content" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "contentModelId" INTEGER NOT NULL,

    CONSTRAINT "Content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FIeld" (
    "id" SERIAL NOT NULL,
    "contentId" INTEGER,
    "fieldTypeId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "value" ,

    CONSTRAINT "FIeld_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FieldType" (
    "id" SERIAL NOT NULL,
    "contentModelId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "type" "FieldTypeEnum" NOT NULL,

    CONSTRAINT "FieldType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ContentModel" ADD CONSTRAINT "ContentModel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_contentModelId_fkey" FOREIGN KEY ("contentModelId") REFERENCES "ContentModel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FIeld" ADD CONSTRAINT "FIeld_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FIeld" ADD CONSTRAINT "FIeld_fieldTypeId_fkey" FOREIGN KEY ("fieldTypeId") REFERENCES "FieldType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FieldType" ADD CONSTRAINT "FieldType_contentModelId_fkey" FOREIGN KEY ("contentModelId") REFERENCES "ContentModel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
