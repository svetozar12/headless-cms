/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTsConfigPaths from "vite-tsconfig-paths";
import dts from "vite-plugin-dts";
import { join } from "path";

export default defineConfig({
  plugins: [
    dts({
      tsConfigFilePath: join(__dirname, "tsconfig.json"),
      skipDiagnostics: true,
    }),
    react(),
    viteTsConfigPaths({
      root: "./",
    }),
  ],

  build: {
    outDir: "dist",
    lib: {
      entry: "src/index.ts",
      name: "ui",
      fileName: "index",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
    },
  },
});
