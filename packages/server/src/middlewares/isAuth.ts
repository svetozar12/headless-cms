import { t } from "..";
import { TRPCError } from "@trpc/server";

const isAuth = t.middleware(({ next, ctx }) => {
  console.log(ctx.user);

  if (!ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      user: ctx.user,
    },
  });
});

export default isAuth;
