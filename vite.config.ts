import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isIOS = mode === "ios";

  return {
    // Use relative paths for iOS, absolute for web
    base: isIOS ? "./" : "/emergency-sharap/",
    server: {
      host: "::",
      port: 8080,
    },
    build: {
      // Output to different directories
      outDir: isIOS ? "dist-ios" : "dist",
      modulePreload: {
        polyfill: false,
      },
      rollupOptions: {
        output: isIOS
          ? {
              // IIFE format for iOS - works with file:// URLs (no CORS issues)
              format: "iife",
              inlineDynamicImports: true,
              entryFileNames: "assets/[name].js",
              chunkFileNames: "assets/[name].js",
              assetFileNames: "assets/[name].[ext]",
            }
          : {
              experimentalMinChunkSize: 0,
            },
      },
    },
    plugins: [
      react(),
      // Only include PWA plugin for web builds
      !isIOS &&
        VitePWA({
          registerType: "autoUpdate",
          includeAssets: ["logo.png"],
          manifest: {
            name: "מוקד שרפ - חיוג מהיר",
            short_name: "מוקד שרפ",
            description: "התקשרות מיידית למוקד שרפ - שירותי רפואה פרטית",
            theme_color: "#ffffff",
            background_color: "#ffffff",
            display: "standalone",
            orientation: "portrait",
            dir: "rtl",
            lang: "he",
            start_url: "/emergency-sharap/",
            scope: "/emergency-sharap/",
            icons: [
              {
                src: "icon-192.png",
                sizes: "192x192",
                type: "image/png",
                purpose: "any maskable",
              },
              {
                src: "icon-512.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "any maskable",
              },
            ],
            screenshots: [
              {
                src: "icon-512.png",
                sizes: "512x512",
                type: "image/png",
                form_factor: "narrow",
                label: "מסך ראשי - כפתור חיוג מהיר",
              },
            ],
            categories: ["medical", "health"],
            iarc_rating_id: "e84b072d-71b3-4d3e-86ae-31a8ce4e53b7",
            prefer_related_applications: false,
          },
          workbox: {
            globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"],
            navigateFallback: "/emergency-sharap/index.html",
            navigateFallbackAllowlist: [/^\/emergency-sharap/],
            runtimeCaching: [
              {
                urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
                handler: "CacheFirst",
                options: {
                  cacheName: "google-fonts-cache",
                  expiration: {
                    maxEntries: 10,
                    maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
                  },
                },
              },
            ],
          },
        }),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
