import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',   // ✅ Ensure build goes to "dist" (default, but explicit is safer)
  },
  server: {
    port: 3000,       // ✅ Local dev port (Render ignores this in production)
  }
});
