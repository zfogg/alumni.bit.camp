import { defineConfig } from "vite-plus";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5173,
    allowedHosts: [
      "witty-ears-lick.loca.lt",
      "manjaro-twopal.egret-sunfish.ts.net",
      "localhost",
      "127.0.0.1",
    ],
  },
  staged: {
    "src/**": "vp check --fix",
  },
  lint: { options: { typeAware: true, typeCheck: false } },
});
