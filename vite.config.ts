import { defineConfig } from "vite";
import webExtension from "vite-plugin-web-extension";
import Manifest from "./src/manifest";

function generateManifest() {
  const manifest = Manifest;
  return {
    ...manifest,
  };
}

export default defineConfig({
  plugins: [
    webExtension({
      manifest: generateManifest,
      watchFilePaths: ["package.json", "manifest.json"],
      additionalInputs: ["popup.html"],
    }),
  ],
});
