import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  root: fileURLToPath(new URL('./app', import.meta.url)),
  publicDir: fileURLToPath(new URL('./app/img/icons/favicons', import.meta.url)),
  build: {
    outDir: fileURLToPath(new URL('./dist', import.meta.url)),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        home: fileURLToPath(new URL('./app/index.html', import.meta.url)),
        menu: fileURLToPath(new URL('./app/menu.html', import.meta.url)),
        news: fileURLToPath(new URL('./app/news.html', import.meta.url)),
        pushkinskaya: fileURLToPath(new URL('./app/pushkinskaya.html', import.meta.url)),
        reviews: fileURLToPath(new URL('./app/reviews.html', import.meta.url)),
        soborny: fileURLToPath(new URL('./app/soborny.html', import.meta.url)),
      },
    },
  },
});
