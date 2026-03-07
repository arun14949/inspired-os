// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    '@pinia/nuxt',
  ],
  vite: {
    build: {
      cssCodeSplit: false,
    },
  },
  ssr: false,
  app: {
    head: {
      title: 'InspiredMonster OS',
      htmlAttrs: {
        class: 'cursor-wait',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'A Windows 95 themed portfolio by InspiredMonster' },
        { property: 'og:title', content: 'InspiredMonster OS' },
        { property: 'og:description', content: 'A Windows 95 themed interactive portfolio' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
      style: [
        {
          children: `html, * { cursor: url('/cursors/arrow.png') 0 0, auto; }
html.cursor-wait, html.cursor-wait * { cursor: url('/cursors/hourglass.png') 7 0, wait !important; }`,
        },
      ],
    },
  },
})
