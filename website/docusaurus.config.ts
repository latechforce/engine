import { themes as prismThemes } from 'prism-react-renderer'
import type { Config } from '@docusaurus/types'
import type * as Preset from '@docusaurus/preset-classic'

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'LTF Engine',
  tagline: 'Web app generator',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://engine.latechforce.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'latechforce', // Usually your GitHub org/user name.
  projectName: 'engine', // Usually your repo name.
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
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/android-chrome-512x512.png',
    algolia: {
      appId: 'O9A2Y5CN7H',
      apiKey: '8a0302bcb20acd738753d2d70d17f32b',
      indexName: 'engine-latechforce',
      contextualSearch: true,
      searchParameters: {},
      searchPagePath: 'search',
    },
    navbar: {
      title: 'LTF Engine',
      logo: {
        alt: 'LTF Engine Logo',
        src: 'img/android-chrome-512x512.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        { to: '/schema', label: 'Schema', position: 'left' },
        { to: '/guides', label: 'Guides', position: 'left' },
        { to: '/blog', label: 'Blog', position: 'right' },
        { to: '/test-report', label: 'Test Report', position: 'right' },
        {
          href: 'https://github.com/latechforce/engine',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Resources',
          items: [
            {
              label: 'App Schema',
              to: '/app-schema',
            },
            {
              label: 'Test Report',
              to: '/test-report',
            },
            {
              label: 'Docs',
              to: '/docs/intro',
            },
            {
              label: 'Guides',
              to: '/guides',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/latechforce/engine',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} ESSENTIAL SERVICES.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,

  themes: ['docusaurus-json-schema-plugin'],
}

export default config
