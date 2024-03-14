// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Cross Finance',
  tagline: 'The Future of Payments Today',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://QavurDagli.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'QavurDagli', // Usually your GitHub org/user name.
  projectName: 'crossfi-qavurdagli', // Usually your repo name.
  deploymentBranch: "gh-pages",
  trailingSlash: false,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/QavurDagli/crossfi-qavurdagli/tree/master/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Cross Finance',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Tutorial',
          },
          {
            href: 'https://github.com/QavurDagli',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Cross Finance Docs',
            items: [
              {
                label: 'CrossFi Chain',
                to: 'https://docs.crossfi.org/crossfi-chain',
              },
              {
                label: 'CrossFi App',
                to: 'https://docs.crossfi.org/crossfi-app',
              },
              {
              label: 'CrossFi xApp',
              href: 'https://docs.crossfi.org/crossfi-xapp',
              },
              {
                label: 'CrossFi Business',
                href: 'https://docs.crossfi.org/crossfi-business',
              },              
              {
                label: 'CrossFi Foundation',
                href: 'https://docs.crossfi.org/crossfi-foundation',
              },     
            ],
          },
          {
            title: 'Tools',
            items: [
              {
                label: 'CrossFi Foundation',
                href: 'https://xfi.foundation/',
              },
              {
                label: 'XFI Scan',
                href: 'https://xfiscan.com/',
              },
              {
                label: 'XFI Console',
                href: 'https://xficonsole.com/',
              },
            ],
          },
          {
            title: 'CrossFi Community',
            items: [
              {
                label: 'Twitter',
                href: 'https://x.com/crossfichain',
              },
              {
                label: 'Discord',
                href: 'https://discord.gg/crossfi',
              },
              {
                label: 'Facebook',
                href: 'https://m.facebook.com/crossfiofficial',
              },
              {
                label: 'Telegram',
                href: 'https://t.me/crossfichain',
              },
              {
                label: 'YouTube',
                href: 'https://www.youtube.com/channel/UCjRmS5kRmkH-qBTrAR73uLA',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} QavurDagli 🐆`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
