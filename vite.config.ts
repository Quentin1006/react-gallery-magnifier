/// <reference types="vitest" />
import { UserConfig, defineConfig, mergeConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import dts from 'vite-plugin-dts';
import { glob } from 'glob';
import { fileURLToPath } from 'node:url';
import { extname, relative } from 'node:path';
import pkg from './package.json';

// Should ignore dev.tsx, .spec.tsx, .test.tsx, tests/, .d.ts
const filesToIgnore = /(\.spec\.|\.test\.|tests?\/|dev\.|\.d\.ts$)/;

const input = Object.fromEntries(
  glob
    .sync('src/**/*.{ts,tsx}')
    .map(l => {
      console.log(l);
      return l;
    })
    .filter(file => !file.match(filesToIgnore))
    .map(file => [
      // The name of the entry point
      // src/nested/foo.ts becomes nested/foo
      relative('src', file.slice(0, file.length - extname(file).length)),
      // The absolute path to the entry file
      // lib/nested/foo.ts becomes /project/lib/nested/foo.ts
      fileURLToPath(new URL(file, import.meta.url)),
    ])
);

export default defineConfig(({ command }) => {
  const commonConfig: UserConfig = {
    plugins: [react(), dts(), libInjectCss()],
    build: {
      sourcemap: true,
      outDir: 'lib',
    },
    define: {
      'process.env.__LIB_VERSION__': `"${process.env.VERSION ?? pkg.version}"`,
      'process.env._URL': 'http://localhost:6000',
    },
    test: {
      environment: 'jsdom',
      setupFiles: './src/tests/setup.ts',
    },
  };
  if (command === 'serve') {
    const serveConfig: UserConfig = {
      build: {
        copyPublicDir: false,
      },
    };
    return mergeConfig(commonConfig, serveConfig);
  } else {
    // command === 'build'
    const buildConfig: UserConfig = {
      build: {
        copyPublicDir: false,
        rollupOptions: {
          external: ['react', 'react-dom', 'react/jsx-runtime'],
          input,
          output: {
            assetFileNames: 'assets/[name][extname]',
            entryFileNames: '[name].js',
            inlineDynamicImports: false,
          },
        },
        lib: {
          entry: 'src/lib.tsx',
          name: 'ReactImageMagnfier',
          formats: ['es'],
          fileName: 'index',
        },
      },
    };
    return mergeConfig(commonConfig, buildConfig);
  }
});
