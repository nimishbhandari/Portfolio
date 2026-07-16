import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// base must match the GitHub Pages project path (nimishbhandari.github.io/Portfolio/).
export default defineConfig({
  base: '/Portfolio/',
  plugins: [react(), tailwindcss()],
});
