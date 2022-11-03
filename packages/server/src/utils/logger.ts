const logger = (args: Parameters<typeof console.log>) => {
  // if (env.NODE_ENV === "development" || env.NODE_ENV === "test") return;
  console.log(...args);
};

export default logger;
