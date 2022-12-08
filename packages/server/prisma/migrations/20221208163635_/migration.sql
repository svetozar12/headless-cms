/*
  Warnings:

  - You are about to drop the column `json` on the `ContentModel` table. All the data in the column will be lost.
  - You are about to drop the column `number` on the `ContentModel` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `ContentModel` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "FieldType" AS ENUM ('TEXT', 'JSON', 'NUMBER');

-- AlterTable
ALTER TABLE "ContentModel" DROP COLUMN "json",
DROP COLUMN "number",
DROP COLUMN "text";

-- CreateTable
CREATE TABLE "FIeld" (
    "id" SERIAL NOT NULL,
    "contentModelId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "type" "FieldType" NOT NULL,
    "value" TEXT,

    CONSTRAINT "FIeld_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FIeld" ADD CONSTRAINT "FIeld_contentModelId_fkey" FOREIGN KEY ("contentModelId") REFERENCES "ContentModel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
