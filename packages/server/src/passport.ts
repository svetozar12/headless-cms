import { PassportStatic } from "passport";
import { env } from "./env/server";
const DiscordStrategy = require("passport-discord").Strategy;

const initPassport = (passport: PassportStatic) => {
  passport.use(
    new DiscordStrategy(
      {
        clientID: env.DISCORD_ID,
        clientSecret: env.DISCORD_SECRET,
        callbackURL: env.DISCORD_CALLBACK,
      },
      async function (
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: CallableFunction,
      ) {
        done(null, profile);
      },
    ),
  );

  passport.serializeUser((user, done) => {
    console.log(user);

    done(null, user);
  });

  passport.deserializeUser(async (profile, done) => {
    console.log(profile);

    done(null, profile);
  });
};

export default initPassport;
