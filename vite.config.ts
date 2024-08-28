import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';


export default defineConfig({
  plugins: [
    vue(),
    {
      name: 'exclude-svg-imports',
      enforce: 'pre',
      resolveId(source) {
        if (source.endsWith('.svg')) {
          return source;
        }
      },
      load(id) {
        if (id.endsWith('.svg')) {
          throw new Error(`SVG files are not allowed: ${id}`);
        }
      },
    },
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/plugins/walkthrough.ts'), // Adjust the path to your entry file
      name: 'VueWalkthrough', // The global variable name
      formats: ['es', 'cjs', 'umd'], // Generate ES module, CommonJS, and UMD
      fileName: (format) => {
        if (format === 'es') {
          return 'index.js'
        }
        return `index.${format}.js`
      },
    },
    rollupOptions: {
      // Ensure to externalize dependencies that you do not want to bundle into your library
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build for externalized deps
        globals: {
          vue: 'Vue',
        },
      },
      plugins: [
        {
          name: 'exclude-assets',
          resolveId(source) {
            if (/\.(png|jpe?g|gif|svg)$/.test(source)) {
              return { id: source, external: true };
            }
            return null;
          },
        },
      ],
    },
  },
});
