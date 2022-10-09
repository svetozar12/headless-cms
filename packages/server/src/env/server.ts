// @ts-check
require("dotenv").config();

import { serverSchema } from "./schema.js";
const _serverEnv = serverSchema.safeParse(process.env);

if (_serverEnv.success === false) {
  console.error("❌ Invalid environment variables:\n");
  throw new Error("Invalid environment variables");
}

export const env = { ..._serverEnv.data };
