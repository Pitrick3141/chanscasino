import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
// @ts-ignore
export default defineConfig({
  plugins: [
      vue({
          template:{
              compilerOptions:{
                  // @ts-ignore
                  isCustomElement: (tag) => tag.startsWith("amplify-"),
              }
          }
      }),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      }),
  ],
    resolve: {
        alias: [
            {
                find: './runtimeConfig',
                replacement: './runtimeConfig.browser',
            },
        ]
    },
  server:{
    host: "0.0.0.0",
    port: 3001,
    open: true
  },
    base: "./"
})
