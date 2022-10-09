import { inferAsyncReturnType, initTRPC, TRPCError } from "@trpc/server";
import express from "express";
import cors from "cors";
import { jwtType, verifyToken } from "./routes/auth/utils";
import * as trpcExpress from "@trpc/server/adapters/express";
export const t = initTRPC.context<Context>().create();
// t instance should always be above routes
import healthRouter from "./routes/health";
import authRouter from "./routes/auth";
import userRouter from "./routes/user";

import { env } from "./env/server";

export const appRouter = t.mergeRouters(healthRouter, authRouter, userRouter);

export async function createContext({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) {
  async function getUserFromHeader() {
    if (req.headers.authorization) {
      const user = await verifyToken(
        req.headers.authorization.split(" ")[1],
        jwtType.ACCESS,
      );
      return user;
    }
    return new TRPCError({
      code: "UNAUTHORIZED",
      message: "You need to login",
    });
  }
  const user = await getUserFromHeader();
  return {
    user,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;

// export type definition of API
export type AppRouter = typeof appRouter;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);
app.listen(env.PORT, () => console.log(`listening on port ${env.PORT}`));
