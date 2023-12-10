import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // server: {
  //   proxy:{
  //     ""
  //   }
  // },
  resolve: {
    // 配置路径别名
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      "/serverApi": {
        target: "http://6d1c547f.r3.cpolar.top", //目标域名
        changeOrigin: true, //需要代理跨域
        rewrite: (path) => path.replace(/^\/serverApi/, ''), //路径重写，把'/api'替换为''
      },
      "/resourceApi": {
        target: "http://23a603ae.r5.cpolar.top", //目标域名
        changeOrigin: true, //需要代理跨域
        rewrite: (path) => path.replace(/^\/resourceApi/, ''), //路径重写，把'/api'替换为''
      },
    }
  }
})
