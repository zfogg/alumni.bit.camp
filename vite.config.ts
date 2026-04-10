import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    host: "0.0.0.0",
    port: 5173,
    allowedHosts: [
      "witty-ears-lick.loca.lt",
      "manjaro-twopal.egret-sunfish.ts.net",
      "localhost",
      "127.0.0.1",
      "192.168.0.3",
    ],
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
  staged: {
    "src/**": "vp check --fix",
  },
  lint: { options: { typeAware: true, typeCheck: false } },
});
