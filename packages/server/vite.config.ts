import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    testTimeout: 10000,
    exclude: [...configDefaults.exclude, "packages/server/**/*"],
    include: [...configDefaults.include, "packages/server/tests/**/*"],
  },
});
