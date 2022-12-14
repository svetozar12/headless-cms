// @ts-check
import { config } from "dotenv";

config();

import { serverSchema } from "./schema";
import logger from "../utils/logger";
const _serverEnv = serverSchema.safeParse(process.env);

if (!_serverEnv.success) {
  logger(["❌ Invalid environment variables:\n", _serverEnv.error]);
  const {
    error: { issues },
  } = _serverEnv;
  issues.forEach((issue) => {
    throw new Error(`Invalid environment variables ${issue.message}`);
  });
}

const _ = _serverEnv.success;

const temp = { _serverEnv };

export const env = temp._serverEnv.success
  ? temp._serverEnv.data
  : serverSchema.parse({});
