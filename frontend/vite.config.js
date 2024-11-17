import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // Import path để sử dụng alias

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.js', // Đường dẫn tệp PostCSS (nếu cần)
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Alias @ trỏ tới thư mục src
    },
  },
});
