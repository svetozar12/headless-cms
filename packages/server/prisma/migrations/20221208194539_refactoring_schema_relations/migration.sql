/*
  Warnings:

  - You are about to drop the column `contentModelId` on the `FIeld` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `FIeld` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `FIeld` table. All the data in the column will be lost.
  - Added the required column `fieldTypeId` to the `FIeld` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "FieldTypeEnum" AS ENUM ('text', 'json', 'number');

-- DropForeignKey
ALTER TABLE "FIeld" DROP CONSTRAINT "FIeld_contentModelId_fkey";

-- AlterTable
ALTER TABLE "FIeld" DROP COLUMN "contentModelId",
DROP COLUMN "title",
DROP COLUMN "type",
ADD COLUMN     "fieldTypeId" INTEGER NOT NULL,
ALTER COLUMN "contentId" DROP NOT NULL;

-- DropEnum
DROP TYPE "FieldType";

-- CreateTable
CREATE TABLE "FieldType" (
    "id" SERIAL NOT NULL,
    "contentModelId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "type" "FieldTypeEnum" NOT NULL,

    CONSTRAINT "FieldType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FIeld" ADD CONSTRAINT "FIeld_fieldTypeId_fkey" FOREIGN KEY ("fieldTypeId") REFERENCES "FieldType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FieldType" ADD CONSTRAINT "FieldType_contentModelId_fkey" FOREIGN KEY ("contentModelId") REFERENCES "ContentModel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
