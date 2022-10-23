import { zParse } from "../zParse";
import { commonUserSchema } from "../../common/schema";
import { prisma } from "../prisma";
import { Request, Response, NextFunction } from "express";

const userMe = async (req: Request, res: Response, next: NextFunction) => {
  const {
    user: { id },
  } = await zParse(commonUserSchema, req);

  const user = await prisma.user.findFirst({ where: { id } });
  if (!user) return res.status(404).json({ message: "User doesn't exist" });
};

export default userMe;
