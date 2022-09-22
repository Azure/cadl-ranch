import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  build: {
    target: "esnext",
    chunkSizeWarningLimit: 3000,
  },
  esbuild: {
    target: "esnext",
  },
  plugins: [
    (react as any)({
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }),
  ],
});
