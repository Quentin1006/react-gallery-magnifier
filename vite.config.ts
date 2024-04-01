import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import dts from 'vite-plugin-dts';
import { glob } from 'glob';
import { fileURLToPath } from 'node:url';
import { extname, relative, resolve } from 'path';

const input = Object.fromEntries(
  glob.sync('src/**/*.{ts,tsx}').map(file => [
    // The name of the entry point
    // src/nested/foo.ts becomes nested/foo
    relative('src', file.slice(0, file.length - extname(file).length)),
    // The absolute path to the entry file
    // lib/nested/foo.ts becomes /project/lib/nested/foo.ts
    fileURLToPath(new URL(file, import.meta.url)),
  ])
);

console.log({ input });
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts(), libInjectCss()],
  build: {
    copyPublicDir: false,
    lib: {
      entry: 'src/index.tsx', // Assuming your entrypoint file is src/index.js
      name: 'ReactImageMagnfier',
      formats: ['es'],
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
});
