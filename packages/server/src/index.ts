import logger from "./utils/logger";

export * from "./utils/prisma";
import { init } from "./preinit";
import express from "express";
import cors from "cors";
import { env } from "./env/server";
import initRoutes from "./routes";
import handleError from "./middlewares/errorHandler";
import { Content, ContentModel, FIeld, User } from "@prisma/client";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  init(res, req, next);
});
// init routes
initRoutes(app);
app.use(handleError);

if (env.NODE_ENV !== "test")
  app.listen(env.PORT, () => logger([`Server running on port ${env.PORT}`]));

export default app;

export {};

type UserMe = Omit<User, "password">;

declare global {
  namespace Express {
    export interface Request {
      user: {
        id: number;
      };
      pre: {
        user: UserMe;
        content: Content;
        model: ContentModel;
        field: FIeld;
      };
    }
  }
}
