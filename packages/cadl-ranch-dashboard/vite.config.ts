import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: "esnext",
    chunkSizeWarningLimit: 3000,
  },
  esbuild: {
    target: "esnext",
  },
  plugins: [(react as any)()],
});
