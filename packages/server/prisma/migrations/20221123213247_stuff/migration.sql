/*
  Warnings:

  - Added the required column `title` to the `Content` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `ContentModel` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Content" DROP CONSTRAINT "Content_contentModelId_fkey";

-- DropForeignKey
ALTER TABLE "ContentModel" DROP CONSTRAINT "ContentModel_userId_fkey";

-- AlterTable
ALTER TABLE "Content" ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ContentModel" ADD COLUMN     "title" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ContentModel" ADD CONSTRAINT "ContentModel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_contentModelId_fkey" FOREIGN KEY ("contentModelId") REFERENCES "ContentModel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
