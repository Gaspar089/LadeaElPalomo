import { defineConfig } from 'astro/config';

export default defineConfig({
  compressHTML: true,
  build: { inlineStylesheets: 'auto' },
  // Oculta la barra de Astro en dev para enseñar la demo limpia
  devToolbar: { enabled: false },
});
