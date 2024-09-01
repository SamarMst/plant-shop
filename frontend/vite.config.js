import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
console.log(path.resolve(__dirname, './src'));
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Add this line to map '@' to 'src'
    },
  },
  define: {
    "process.env": {},
  },
});
