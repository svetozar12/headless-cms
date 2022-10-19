import express from "express";
import cors from "cors";
import { env } from "./env/server";
import initRoutes from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// init routes
initRoutes(app);
if (env.NODE_ENV !== "test")
  app.listen(env.PORT, () => console.log(`listening on port ${env.PORT}`));

export default app;
