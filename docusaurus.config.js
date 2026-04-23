const baseDocPaths = require('./baseDocPaths');
const K = require('./constants');
require('dotenv').config()

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Robotics @APEX',
  tagline: 'Founded in 2010, Robotics @APEX is the Robotics Club of the School of Science and Technology, Singapore. Robotics is our passion! 🔥',
  url: 'https://roboapex.github.io',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.png',
  organizationName: 'roboapex',
  projectName: 'roboapex.github.io',
  trailingSlash: true,
  themeConfig: {
    docs: {
    sidebar: {
      hideable: true,
      },
    },
    navbar: {
      title: 'Robotics @APEX',
      logo: {
        alt: '🤖',
        src: 'img/logo.svg',
      },
      items: [
        // {
        //   position: 'left',
        //   label: 'Join Us',
        //   to: `/join`,
        //   items: [
        //     { to: '/join', label: "Sign Up for Trials" },
        //     { to: '/join/faq'c, label: "FAQ" }
        //   ]
        // },
        { to: '/achievements', label: 'Achievements', position: 'left' },
        { to: '/projects', label: 'Projects', position: 'left' },
        {to: 'https://attend.roboapex.site/', label: 'Attendance', position: 'left'},
        {
          position: 'left',
          label: 'Docs',
          to: '/docs',
          items: baseDocPaths.map((e) => ({ to: `/${e.path}`, label: e.name }))
        },
      ],
    },
    footer: {
      links: [
        {
          title: 'Applications',
          items: [
            { label: 'Sign Up for Trials', to: '/join' },
            { label: 'FAQ', to: '/join/faq' },
          ]
        },
        {
          title: 'Work',
          items: [
            { label: 'Achievements', to: '/achievements' },
            { label: 'Projects', to: '/projects' },
          ]
        },
        {
          title: 'Docs',
          items: [
            { label: 'All', to: `/docs` },
            ...baseDocPaths.map((e) => ({ label: e.name, to: `/${e.path}` }))
          ]
        },
        {
          title: 'Robotics @APEX',
          items: [
            ...K.socials.map((e) => ({ label: e.platform, href: e.url }))
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'SST',
              href: 'https://www.sst.edu.sg/cca/robotics-apex',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Robotics @APEX, School of Science and Technology, Singapore.`,
    },
    prism: {
      theme: require('prism-react-renderer/themes/github'),
      darkTheme: require('prism-react-renderer/themes/dracula'),
    },
  },
  plugins: [require.resolve('docusaurus-plugin-sass')],
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: "docs",
          routeBasePath: "/",
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/roboapex/roboapex.github.io/edit/main/',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        theme: {
          customCss: [require.resolve('./src/styles/custom.scss')],
        },
      },
    ],
  ],
};
