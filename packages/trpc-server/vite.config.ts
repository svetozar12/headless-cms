import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    exclude: [...configDefaults.exclude, "packages/trpc-server/**/*"],
    include: [...configDefaults.include, "packages/trpc-server/tests/**/*"],
  },
});
