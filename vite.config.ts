import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Unocss from 'unocss/vite'
import { viteMockServe } from 'vite-plugin-mock'
import { svgsprites } from './vite_plugins/svgsprites'

// https://vitejs.dev/config/

export default defineConfig(({ command }) => ({
  base: '/',
  //手动配置codeSplitting 优化首页的渲染速度 === 懒加载
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: any) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
          if (id.includes('echarts')) {
            return 'echarts';
          }
        }
      }
    }
  },
  server: {
    proxy: {
      '/api/': {
        target: 'http://121.196.236.94:8080/',
        changeOrigin: true
        //rewrite: (path) => path.replace(/^\/api/, ''),
      },
    }
  },
  define: {
    isDev: command === 'serve'
  },
  plugins: [
    Unocss(),
    react(),
    viteMockServe(),
    svgsprites({ noOptimizedList: ['chart', 'date', 'category', 'export', 'notice', 'logo'] })
  ]
}))
