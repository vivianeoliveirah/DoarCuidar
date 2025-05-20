// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/", // Base URL, importante para caminhos absolutos
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg'],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
