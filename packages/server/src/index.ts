import express from "express";
import cors from "cors";
import initRoutes from "./routes";
import initPassport from "./passport";
import passport from "passport";
import { env } from "./env/server";
import preInit from "./preinit";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
preInit(app);
initRoutes(app);
initPassport(passport);

app.listen(env.PORT, () => {
  console.log("listening on port", env.PORT);
});
