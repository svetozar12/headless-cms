import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

prisma.$use(async (params, next) => {
  if (params.model == "User" && params.action == "create") {
    const user = params.args.data;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
    params.args.data = user;
  }
  return next(params);
});

export * from "@prisma/client";
export { prisma };
