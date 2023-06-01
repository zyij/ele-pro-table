import { defineConfig, ConfigEnv, UserConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { resolve } from "path";

// @see: https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  return {
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/var.scss";`,
        },
      },
    },
    plugins: [vue(), vueJsx()],

    build: {
      // 到处文件目录，ele-pro-table 用于存放package.json，避免被覆盖
      // 这里不设置也是默认dist
      outDir: "dist",
      // 兼容
      target: "es2015",
      lib: {
        // Could also be a dictionary or array of multiple entry points
        entry: resolve(__dirname, "src/main.ts"),
        name: "EleProTable",
        // the proper extensions will be added
        // 如果不用format文件后缀可能会乱
        fileName: (format) => `ele-pro-table.${format}.js`,
      },
      // 题外话
      // vite 加载快是因为 es6 加载 js 的速度快
      rollupOptions: {
        // 确保外部化处理那些你不想打包进库的依赖
        external: ["vue", "element-plus"],
        output: {
          // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
          globals: {
            vue: "Vue",
            "element-plus": "ElementPlus",
          },
        },
      },
    },
  };
});
