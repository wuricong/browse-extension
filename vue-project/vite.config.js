import { fileURLToPath, URL } from "node:url"
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import path from "node:path"
import postcssImport from "postcss-import"
import tailwindcss from "tailwindcss"
import { createSvgIconsPlugin } from "vite-plugin-svg-icons"

const dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  server: {
    port: 51732,
  },
  base: "./",
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
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), "src/svg")],
      symbolId: "icon-[dir]-[name]",
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
})
