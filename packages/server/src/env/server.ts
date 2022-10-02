// @ts-check
require("dotenv").config();
/**
 * This file is included in `/next.config.mjs` which ensures the app isn't built with invalid env vars.
 * It has to be a `.mjs`-file to be imported there.
 */
import { serverSchema } from "./schema.js";
const _serverEnv = serverSchema.safeParse(process.env);

if (_serverEnv.success === false) {
  console.error("❌ Invalid environment variables:\n");
  throw new Error("Invalid environment variables");
}

export const env = { ..._serverEnv.data };
