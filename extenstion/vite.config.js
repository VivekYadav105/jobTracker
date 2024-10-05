import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import { VitePWA } from 'vite-plugin-pwa';
import manifest from "./manifest.json";
import { crx } from "@crxjs/vite-plugin";


export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    react(),
    // VitePWA({
    //   registerType: 'autoUpdate',
    //   manifest:manifest,
    //   workbox: {
    //     runtimeCaching: [
    //       {
    //         urlPattern: /^https:\/\/api\.example\.com\/.*/, // Example API URL
    //         handler: 'NetworkFirst', // Cache data while also trying the network
    //         options: {
    //           cacheName: 'api-cache',
    //           expiration: {
    //             maxEntries: 50,
    //             maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
    //           },
    //         },
    //       },
    //     ],
    //   },
    // }),
    crx({
      manifest:manifest,
    })
  ],
  build:{
    rollupOptions:{
        input: {
            // Define your main entry point and the background script
            main: 'src/main.jsx',  // or whatever your entry point is
            background: 'public/background.js' // Ensure this is set correctly
        }
    }
  }
});
