import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import mkcert from "vite-plugin-mkcert";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: { port: 3000 },
  plugins: [
    react(),
    mkcert(),
    TanStackRouterVite({}),
    nodePolyfills({ include: ["buffer", "crypto"] }),
  ],
  resolve: { alias: { "@": path.resolve(__dirname, "src") } },
});
