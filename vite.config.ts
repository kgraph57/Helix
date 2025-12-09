import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "path";
import { defineConfig, Plugin } from "vite";
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime";
import { VitePWA } from "vite-plugin-pwa";
import { visualizer } from 'rollup-plugin-visualizer';
import viteCompression from 'vite-plugin-compression';


// Escape HTML attribute values to prevent XSS
function escapeHtmlAttribute(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Plugin to conditionally include analytics script
const analyticsPlugin = (): Plugin => {
  return {
    name: "analytics-plugin",
    transformIndexHtml(html) {
      const analyticsEndpoint = process.env.VITE_ANALYTICS_ENDPOINT;
      const analyticsWebsiteId = process.env.VITE_ANALYTICS_WEBSITE_ID;
      
      if (analyticsEndpoint && analyticsWebsiteId) {
        // Escape values to prevent XSS
        const escapedEndpoint = escapeHtmlAttribute(analyticsEndpoint);
        const escapedWebsiteId = escapeHtmlAttribute(analyticsWebsiteId);
        
        return html.replace(
          "%VITE_ANALYTICS_SCRIPT%",
          `<script defer src="${escapedEndpoint}/umami" data-website-id="${escapedWebsiteId}"></script>`
        );
      }
      return html.replace("%VITE_ANALYTICS_SCRIPT%", "");
    },
  };
};

const plugins = [
  react(),
  tailwindcss(),
  jsxLocPlugin(),
  // Only enable Manus runtime in development
  ...(process.env.NODE_ENV !== 'production' ? [vitePluginManusRuntime()] : []),
  analyticsPlugin(),

  // Gzip compression (production only)
  ...(process.env.NODE_ENV === 'production' ? [
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 10240, // Only compress files larger than 10KB
      deleteOriginFile: false,
    }),
    // Brotli compression (production only)
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 10240,
      deleteOriginFile: false,
    }),
  ] : []),

  // Bundle visualizer (development only)
  ...(process.env.NODE_ENV !== 'production' ? [
    visualizer({
      open: false,
      gzipSize: true,
      brotliSize: true,
      filename: 'stats.html',
    }),
  ] : []),

  // Temporarily disable PWA to fix caching issues
  ...(process.env.NODE_ENV !== 'production' ? [VitePWA({
    registerType: "autoUpdate",
    base: process.env.VITE_BASE_PATH || "/",
    scope: process.env.VITE_BASE_PATH || "/",
    includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"],
    manifest: {
      name: "Medical Prompt Hub",
      short_name: "MedPrompt",
      description: "AI Prompt Library for Healthcare Professionals",
      theme_color: "#ffffff",
      start_url: (process.env.VITE_BASE_PATH || "/") + "index.html",
      icons: [
        {
          src: "pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable",
        },
      ],
    },
  })] : []),
];

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/medicalprompthub/' : '/medicalprompthub/',
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./client/src/test/setup.ts"],
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'wouter'],
    exclude: ["@sentry/react"],
  },
  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
    // Source maps disabled in production for performance
    sourcemap: false,
    // Minify with terser for better compression
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
      },
    },
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name]-[hash]-v13.js`,
        chunkFileNames: `assets/[name]-[hash]-v13.js`,
        assetFileNames: `assets/[name]-[hash]-v13.[ext]`,
        manualChunks: {
          // React core
          'react-vendor': ['react', 'react-dom'],
          // Router
          'router-vendor': ['wouter'],
          // UI libraries
          'ui-vendor': ['framer-motion', 'lucide-react'],
          // Charts
          'charts-vendor': ['recharts'],
          // Markdown
          'markdown-vendor': ['react-markdown', 'remark-gfm'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  server: {
    port: 3000,
    strictPort: false,
    host: true,
    allowedHosts: [
      ".manuspre.computer",
      ".manus.computer",
      ".manus-asia.computer",
      ".manuscomputer.ai",
      ".manusvm.computer",
      "localhost",
      "127.0.0.1",
    ],
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
