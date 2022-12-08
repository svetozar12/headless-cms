/*
  Warnings:

  - You are about to drop the column `json` on the `Content` table. All the data in the column will be lost.
  - You are about to drop the column `number` on the `Content` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `Content` table. All the data in the column will be lost.
  - Added the required column `contentId` to the `FIeld` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Content" DROP COLUMN "json",
DROP COLUMN "number",
DROP COLUMN "text";

-- AlterTable
ALTER TABLE "FIeld" ADD COLUMN     "contentId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "FIeld" ADD CONSTRAINT "FIeld_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;
