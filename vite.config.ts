import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import copy from 'rollup-plugin-copy';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    copy({
      targets: [
        { src: 'src/main/main.js', dest: 'build/main' }, // ✅ Copies main.js
        { src: 'src/main/preload.js', dest: 'build/main' }, // ✅ Copies preload.js
        { src: 'src/main/modules/**/*', dest: 'build/main/modules' } // ✅ Copies all modules
      ],
      hook: 'buildEnd' // Ensures copying happens after Vite's build completes
    })
  ],
  root: path.join(__dirname, 'src/renderer'),
  base: '',
  build: {
    outDir: path.join(__dirname, 'build/renderer'),
    emptyOutDir: true,
    rollupOptions: {
      input: path.join(__dirname, 'src/renderer/index.html'),
    },
  },
  server: {
    port: 5173,
    headers: {
      "Content-Security-Policy": "default-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self' ws://localhost:5173;"
    }
  },
});
