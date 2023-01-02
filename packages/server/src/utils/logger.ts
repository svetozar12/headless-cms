/* eslint-disable no-console */
const logger = (args: Parameters<typeof console.log>) => {
  // if (env.NODE_ENV === "development" || env.NODE_ENV === "test") return;
  // eslint-disable-next-line no-console
  console.log(...args);
};

export default logger;
