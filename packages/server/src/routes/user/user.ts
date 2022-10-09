import { t } from "../../";
import { z } from "zod";
import User from "../../libs/sql/models/user.model";
import { TRPCError } from "@trpc/server";
import isAuth from "../../middlewares/isAuth";

const userRouter = t.router({
  getUser: t.procedure.use(isAuth).query((req) => {
    const { user } = req.ctx;
    return user;
  }),
  createUser: t.procedure
    .input(z.object({ username: z.string(), password: z.string() }))
    .mutation(async (req) => {
      const { input } = req;
      const user = await User.findOrCreate({ where: input });
      if (user[1])
        return new TRPCError({
          code: "CONFLICT",
          message: "User already exists",
        });
      console.log(user);

      return user[0];
    }),
});

export default userRouter;
