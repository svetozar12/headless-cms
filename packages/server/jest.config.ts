import type { Config } from "jest";

const config: Config = {
  testTimeout: 10000,
  verbose: true,
  setupFilesAfterEnv: ["<rootDir>/tests/jest.setup.ts"],
};

export default config;
