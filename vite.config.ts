import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt'],
      manifest: {
        name: 'Notebook',
        short_name: 'Notebook',
        description: 'A simple notebook app',
        theme_color: '#000000',
        icons: [
          {
            src: '/pwa-48x48.png',
            sizes: '48x48',
            type: 'image/png'
          },
          {
            src: '/pwa-72x72.png',
            sizes: '72x72',
            type: 'image/png'
          },
          {
            src: '/pwa-96x96.png',
            sizes: '96x96',
            type: 'image/png'
          },
          {
            src: '/pwa-144x144.png',
            sizes: '144x144',
            type: 'image/png'
          },
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ],
      },
      workbox: {
        globPatterns: ['**/*.{css,woff2,png,svg,jpg,jpeg,js}'],
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.mode === 'navigate',
            handler: 'NetworkFirst'
          }
        ]
      }
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
