import { Prisma, PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

prisma.$use(async (params, next) => {
  if (params.model === "User" && params.action === "create") {
    const user = params.args.data;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
    params.args.data = user;
  }
  return next(params);
});

export type ContentModelWithRelations = Prisma.ContentModelGetPayload<{
  include: { Content: true; FIeld: true };
}>;
export type ContentWithRelations = Prisma.ContentGetPayload<{
  include: { FIeld: true };
}>;
export * from "@prisma/client";
export { prisma };
