import { Prisma, PrismaClient } from "@prisma/client";
declare const prisma: PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>;
export type ContentModelWithRelations = Prisma.ContentModelGetPayload<{
    include: {
        Content: true;
        FIeld: true;
    };
}>;
export type ContentWithRelations = Prisma.ContentGetPayload<{
    include: {
        FIeld: true;
    };
}>;
export * from "@prisma/client";
export { prisma };
