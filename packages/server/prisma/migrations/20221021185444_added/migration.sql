/*
  Warnings:

  - Changed the type of `text` on the `ContentModel` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `json` on the `ContentModel` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `number` on the `ContentModel` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "ContentModel" DROP COLUMN "text",
ADD COLUMN     "text" BOOLEAN NOT NULL,
DROP COLUMN "json",
ADD COLUMN     "json" BOOLEAN NOT NULL,
DROP COLUMN "number",
ADD COLUMN     "number" BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE "Content" (
    "id" SERIAL NOT NULL,
    "contentModelId" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "json" JSONB NOT NULL,
    "number" INTEGER NOT NULL,

    CONSTRAINT "Content_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_contentModelId_fkey" FOREIGN KEY ("contentModelId") REFERENCES "ContentModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
