import "./libs/sql";
import { Application } from "express";
import passport from "passport";
import { env } from "./env/server";

const preInit = (app: Application) => {
  app.use(
    require("express-session")({
      secret: env.SESSION_SECRET,
      resave: true,
      saveUninitialized: true,
      rolling: true, // forces resetting of max age
      cookie: {
        maxAge: 360000,
        secure: false, // this should be true only when you don't want to show it for security reason
        domain: env.CLIENT_URL,
      },
    }),
  );
  // passport midleware
  app.use(passport.initialize());
  app.use(passport.session());
};

export default preInit;
