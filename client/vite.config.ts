import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-plugin-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
});
