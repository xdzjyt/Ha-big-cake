import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports:['vue'],
      resolvers:[
        ElementPlusResolver(),
        IconsResolver(),
      ],
    }),
    Components({
      resolvers:[
        ElementPlusResolver(),
        IconsResolver({
          enabledCollections: ['ep'],
        }),
      ],
    }),
    Icons({
      autoInstall:true,
    }),
  ],
  server:{
    open:true,
  },
  resolve:{
    alias:{
      "@":path.resolve(__dirname,"./src"),
    },
  },
})
