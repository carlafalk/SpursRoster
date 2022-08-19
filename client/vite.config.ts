import { defineConfig } from "vite";

export default defineConfig({
  server: {
    proxy: {
      "/": "http://localhost:3000/",
    },
  },
});
