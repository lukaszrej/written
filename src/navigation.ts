import { getPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Blog',
      links: [
        {
          text: 'Category Page',
          href: getPermalink('tutorials', 'category'),
        },
        {
          text: 'Contact',
          href: getPermalink('/contact'),
        },
      ],
    },
  ],
};

export const footerData = {
  socialLinks: [{ ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') }],
  footNote: `
    Made by <a class="text-blue-600 underline dark:text-muted" href="https://github.com/lukaszrej"> Łukasz Rej</a> · All rights reserved.
  `,
};
