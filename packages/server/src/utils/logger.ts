import { env } from "../env/server";

const logger = (args: Parameters<typeof console.log>) => {
  if (env.NODE_ENV === "production") return;
  console.log(...args);
};

export default logger;
