import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'
import postcssImport from "postcss-import"
import tailwindcss from "tailwindcss"

const dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  base:'./',
  css: {
    postcss: {
      plugins: [
        // 先运行postcss-import插件，确保能正确解析@import语句
        postcssImport(),
        // 然后应用TailwindCSS
        tailwindcss("./tailwind.config.js"),
      ],
    },
  },
  plugins: [
    vue(),
  ],
  build:{
    outDir:path.resolve(dirname,'../dist')
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
