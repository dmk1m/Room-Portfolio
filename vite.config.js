import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    // three.js core alone is ~570 kB minified (~145 kB gzipped); that's expected
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Split large libraries into their own cacheable chunks
        manualChunks(id) {
          if (id.includes('node_modules/three')) return 'three';
          if (id.includes('node_modules/gsap') || id.includes('node_modules/lenis')) return 'animation';
        },
      },
    },
  },
});
