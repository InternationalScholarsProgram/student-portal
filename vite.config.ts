import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true
    },
    proxy: {
      "^/api/": {
        target: "https://internationalscholars.qhtestingserver.com/",
        changeOrigin: true,
        secure: false,
      },
      "^/mpesa_test/": {
        target: "https://internationalscholars.qhtestingserver.com/",
        changeOrigin: true,
        secure: false,
      },
      "^/payments/": {
        target: "https://internationalscholars.qhtestingserver.com/",
        changeOrigin: true,
        secure: false,
      },
      "^/login/": {
        target: "https://finkapinternational.qhtestingserver.com/",
        changeOrigin: true,
        secure: false,
      },
      "^/logo/": {
        target: "https://finkapinternational.qhtestingserver.com/",
        changeOrigin: true,
        secure: false,
      },
    },
  }
})
