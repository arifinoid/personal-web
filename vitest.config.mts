import { fileURLToPath } from "node:url";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL(".", import.meta.url)),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    include: ["{app,components,lib,scripts,tests}/**/*.test.{ts,tsx}"],
    exclude: ["node_modules", ".next", ".direnv", "out"],
    restoreMocks: true,
  },
});
