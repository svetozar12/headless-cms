import { t } from "../../";
import { z } from "zod";
import { jwtType, signToken } from "./utils";
import User from "../../libs/sql/models/user.model";
import { TRPCError } from "@trpc/server";

const authRouter = t.router({
  getAuth: t.procedure
    .input(z.object({ username: z.string(), password: z.string() }))
    .mutation(async (req) => {
      const { username } = req.input;

      const user = await User.findOne({ where: { username } });
      if (!user)
        throw new TRPCError({ message: "user not found", code: "NOT_FOUND" });

      const accessToken = await signToken(jwtType.ACCESS, user.get(), 360);
      const refreshToken = await signToken(jwtType.REFRESH, user.get(), 720);

      return { accessToken, refreshToken };
    }),
});

export default authRouter;
