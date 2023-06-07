import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import dotenv from "dotenv";
import replace from "@rollup/plugin-replace";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: "esnext",
    rollupOptions: {
      plugins: [
        process.env.NODE_ENV === "production" &&
          replace({
            "process.env": JSON.stringify(
              dotenv.config({ path: ".env.production" }).parsed
            ),
          }),
      ],
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@templates": path.resolve(__dirname, "./src/templates"),
      "@features": path.resolve(__dirname, "./src/features"),
      "@states": path.resolve(__dirname, "./src/states"),
      "@types": path.resolve(__dirname, "./src/types"),
      "@network": path.resolve(__dirname, "./src/network"),
      "@const": path.resolve(__dirname, "src/consts.ts"),
    },
  },
});
