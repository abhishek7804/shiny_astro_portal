import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import image from '@astrojs/image';
import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import compress from 'astro-compress';
import { readingTimeRemarkPlugin } from './src/utils/frontmatter.mjs';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const whenExternalScripts = (items = []) => false ? Array.isArray(items) ? items.map(item => item()) : [items()] : [];

// https://astro.build/config
export default defineConfig({
  outDir: '../shiny_astro_portal/www',
  output: 'static',
  markdown: {
    remarkPlugins: [readingTimeRemarkPlugin]
  },
  integrations: [tailwind({
    config: {
      applyBaseStyles: false
    }
  }), sitemap(), image({
    serviceEntryPoint: '@astrojs/image/sharp'
  }), mdx(), ...whenExternalScripts(() => partytown({
    config: {
      forward: ['dataLayer.push']
    }
  })), compress({
    css: true,
    html: {
      removeAttributeQuotes: false
    },
    img: false,
    js: true,
    svg: false,
    logger: 1
  })],
  react:['@astrojs/renderer-react'],
  vite: {
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src')
      }
    }
  },
  build: {
    format: "file"
  },
});