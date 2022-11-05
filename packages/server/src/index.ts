export * from "./utils/prisma";
import { init } from "./preinit";
import express from "express";
import cors from "cors";
import { env } from "./env/server";
import initRoutes from "./routes";
import handleError from "./middlewares/errorHandler";

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
  app.listen(env.PORT, () => console.log(`listening on port ${env.PORT}`));

export default app;
