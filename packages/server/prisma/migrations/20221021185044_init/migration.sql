-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContentModel" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "json" JSONB NOT NULL,
    "number" INTEGER NOT NULL,

    CONSTRAINT "ContentModel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ContentModel" ADD CONSTRAINT "ContentModel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
