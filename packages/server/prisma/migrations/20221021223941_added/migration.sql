-- AlterTable
ALTER TABLE "ContentModel" ALTER COLUMN "text" DROP NOT NULL,
ALTER COLUMN "json" DROP NOT NULL,
ALTER COLUMN "number" DROP NOT NULL;
