/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import dts from 'vite-plugin-dts';
import { glob } from 'glob';
import { fileURLToPath } from 'node:url';
import { extname, relative } from 'path';

const testFile = /(\.spec|tests?\/)/;
const input = Object.fromEntries(
  glob
    .sync('src/**/*.{ts,tsx}')
    .filter(file => !file.match(testFile))
    .map(file => [
      // The name of the entry point
      // src/nested/foo.ts becomes nested/foo
      relative('src', file.slice(0, file.length - extname(file).length)),
      // The absolute path to the entry file
      // lib/nested/foo.ts becomes /project/lib/nested/foo.ts
      fileURLToPath(new URL(file, import.meta.url)),
    ])
);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts(), libInjectCss()],
  build: {
    copyPublicDir: false,
    lib: {
      entry: 'src/index.tsx', // Assuming your entrypoint file is src/index.js
      name: 'ReactImageMagnfier',
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      input,
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        assetFileNames: 'assets/[name][extname]',
        entryFileNames: '[name].js',
        inlineDynamicImports: false,
      },
    },
    sourcemap: true,
    outDir: 'lib',
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/tests/setup.ts',
  },
});
