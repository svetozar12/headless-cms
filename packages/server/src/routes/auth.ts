import { Router } from "express";
import passport from "passport";
import { env } from "../env/server";

const auth = Router();

auth.get("/login/success", (req, res, next) => {
  console.log("auth");
  console.log(req.user);

  if (req.user) {
    req.login(req.user, (error) => {
      if (error) return next(error);
      console.log(req.user);

      return req.user;
    });

    return res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
    });
  }
  return res.send("hi");
});

auth.get("/login/failed", (req, res) => {
  return res.status(401).json({
    success: false,
    message: "failure",
  });
});

auth.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    return res.redirect(env.CLIENT_URL);
  });
});

auth.get(
  "/discord",
  passport.authenticate("discord", {
    scope: ["identify", "email", "guilds", "guilds.join"],
  }),
);

auth.get(
  "/callback/discord",
  passport.authenticate("discord", {
    successRedirect: env.CLIENT_URL,
    failureRedirect: `${env.CLIENT_URL}/login`,
  }),
);

export default auth;
