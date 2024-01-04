// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'ThingParkX',
  tagline: 'IoT Flow Platform',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://docs.thingpark.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/thingpark-x/latest/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'actility', // Usually your GitHub org/user name.
  projectName: 'tpx-iot-flow-doc', // Usually your repo name.

  onBrokenLinks: 'log',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  customFields: {
    emojicomCampaign: 'y0GsFwFtqjyNInLokh03',
  },
  plugins: [
    'docusaurus-plugin-sass',
    [require.resolve("@cmfcmf/docusaurus-search-local"),
      {
        indexBlog: false,
      }]
  ],


  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/', // Docs should be at the root of the website
          sidebarPath: './sidebars.js',
          showLastUpdateTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/actility/tpx-iot-flow-doc/',
        },
        theme: {
          customCss: ['./src/css/custom.scss', './src/css/tpx-iot-flow-doc.scss']
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/ThingPark-X_RGB_HD.png',
      navbar: {
        logo: {
          alt: 'My Site Logo',
          src: 'img/ThingPark-X_RGB_HD.png',
        },
        // items: [
        // ],
      },
      footer: {
        style: 'light',
        copyright: `Copyright © ${new Date().getFullYear()} Actility`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
