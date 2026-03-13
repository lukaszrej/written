import fs from 'fs';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';

import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import icon from 'astro-icon';
import compress from 'astro-compress';
import type { AstroIntegration } from 'astro';

import { SITE } from './src/utils/config';

const customRobotsTxt = (): AstroIntegration => ({
  name: 'custom-robots-txt',
  hooks: {
    'astro:build:done': async ({ dir }) => {
      try {
        const sitemapName = 'sitemap-index.xml';
        const sitemapFile = new URL(sitemapName, dir);
        const robotsTxtFileInOut = new URL('robots.txt', dir);
        if (fs.existsSync(sitemapFile)) {
          const robotsTxt = fs.readFileSync(robotsTxtFileInOut, { encoding: 'utf8', flag: 'a+' });
          const sitemapUrl = new URL(sitemapName, String(new URL(SITE.base || '/', SITE.site)));
          const pattern = /^Sitemap:(.*)$/m;
          if (!pattern.test(robotsTxt)) {
            fs.writeFileSync(robotsTxtFileInOut, `${robotsTxt}${os.EOL}${os.EOL}Sitemap: ${sitemapUrl}`, {
              encoding: 'utf8',
              flag: 'w',
            });
          } else {
            fs.writeFileSync(robotsTxtFileInOut, robotsTxt.replace(pattern, `Sitemap: ${sitemapUrl}`), {
              encoding: 'utf8',
              flag: 'w',
            });
          }
        }
      } catch (e) {
        console.error(e.message);
      }
    },
  },
});

import { readingTimeRemarkPlugin, responsiveTablesRehypePlugin, lazyImagesRehypePlugin } from './src/utils/frontmatter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const hasExternalScripts = false;
const whenExternalScripts = (items: (() => AstroIntegration) | (() => AstroIntegration)[] = []) =>
  hasExternalScripts ? (Array.isArray(items) ? items.map((item) => item()) : [items()]) : [];

export default defineConfig({
  site: SITE.site,
  base: SITE.base,
  trailingSlash: SITE.trailingSlash ? 'always' : 'never',
  output: 'static',

  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
    mdx(),
    icon({
      include: {
        tabler: ['*'],
        'flat-color-icons': [
          'template',
          'gallery',
          'approval',
          'document',
          'advertising',
          'currency-exchange',
          'voice-presentation',
          'business-contact',
          'database',
        ],
      },
    }),

    ...whenExternalScripts(() =>
      partytown({
        config: { forward: ['dataLayer.push'] },
      })
    ),

    compress({
      CSS: true,
      HTML: {
        'html-minifier-terser': {
          removeAttributeQuotes: false,
        },
      },
      Image: false,
      JavaScript: true,
      SVG: false,
      Logger: 1,
    }),

    customRobotsTxt(),
  ],

  image: {
    domains: ['cdn.pixabay.com'],
  },

  markdown: {
    remarkPlugins: [readingTimeRemarkPlugin],
    rehypePlugins: [responsiveTablesRehypePlugin, lazyImagesRehypePlugin],
  },

  vite: {
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
      },
    },
  },
});
