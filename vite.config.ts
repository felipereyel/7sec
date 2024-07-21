import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({ 
      includeAssets: ['icon.svg', 'icon-small.svg'],
      manifest: {
        name: '7sec',
        short_name: '7sec',
        description: '7 seconds to clear them all',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'icon-small.svg',
            sizes: '192x192',
            type: 'image/svg'
          },
          {
            src: 'icon.svg',
            sizes: '512x512',
            type: 'image/svg'
          }
        ]
      }
    }),
  ],
  server: {
    host: "0.0.0.0"
  }
})

