import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@prisma-client": path.resolve(
        __dirname,
        "./src/lib/prisma/generated/client"
      ),
      "@prisma-instance": path.resolve(__dirname, "./src/lib/prisma"),
      "@": path.resolve(__dirname, "./src")
    }
  },
  test: {
    include: ["tests/**/*.test.ts"],
    setupFiles: ["./tests/util/setup.ts"],
    globalSetup: "./tests/util/globalSetup.ts",
    pool: "forks",
    maxConcurrency: 1,
    fileParallelism: false,
    sequence: { concurrent: false },
    coverage: {
      thresholds: {
        lines: 100,
        functions: 100,
        branches: 100,
        statements: 100
      },
      provider: "istanbul",
      reporter: ["text", "lcov", "cobertura", "html"],
      exclude: [
        "node_modules",
        "dist",
        "bin",
        "prisma",
        "tests",
        "*.config.ts",
        "src/config",
        "src/app.ts",
        "src/index.ts",
        "src/lib"
      ]
    }
  }
});
