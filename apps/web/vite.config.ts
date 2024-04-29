import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({ plugins: [["@swc/plugin-styled-components", {}]] }),
    tsconfigPaths(),
  ],
  build: {
    sourcemap: !!process.env.BUILD_SOURCE_MAPS,
  },
  preview: {
    port: 3172
  }
});
