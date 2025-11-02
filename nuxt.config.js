export default {
  publicRuntimeConfig: {
    is_foreign: process.env.IS_FOREIGN === 'true',
  },
  
  head: {
    title: process.env.IS_FOREIGN === 'true' ? 'The King' : 'Русский Лев',
    htmlAttrs: {
      lang: 'ru',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'theme-color', content: '#000000' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      { rel: 'apple-touch-icon', href: '/favicon.png' },
      { rel: 'preconnect', href: 'https://kraken.rambler.ru' },
      { rel: 'preconnect', href: 'https://st.top100.ru' },
      { rel: 'preconnect', href: 'https://static.rutube.ru' },
      { rel: 'dns-prefetch', href: 'https://mc.yandex.ru' },
      { rel: 'dns-prefetch', href: 'https://www.google-analytics.com' },
      { rel: 'dns-prefetch', href: 'https://www.googletagmanager.com' },
    ],
  },

  css: ['~/assets/scss/main.scss'],

  styleResources: {
    scss: ['~/assets/scss/_mixins.scss'],
  },

  plugins: [
    '~/plugins/api.js',
    '~/plugins/swiper.js',
    '~/plugins/v-select.js',
    '~/plugins/vue-js-modal.js',
    '~/plugins/helpers.js',
    { src: '~/plugins/noty.js', mode: 'client' },
    { src: '~/plugins/fullpage.js', mode: 'client' },
  ],

  components: true,

  buildModules: ['@nuxtjs/svg'],

  modules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/axios',
    'cookie-universal-nuxt',
    'portal-vue/nuxt',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    'fullpage-nuxt-module',
    '@nuxtjs/redirect-module',
    'nuxt-delay-hydration',
    [
      '@nuxtjs/gtm',
      {
        id: process.env.GOOGLE_TAG_MANAGER_ID,
        layer: 'dataLayer',
        pageTrackerEnabled: true,
        scriptDefer: true,
      },
    ],
    [
      '@nuxtjs/yandex-metrika',
      {
        id: process.env.YANDEX_METRIKA_ID,
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: false,
        defer: true,
      },
    ],
  ],

  delayHydration: {
    mode: 'mount',
    debug: true,
    postIdleTimeout: { mobile: 3000, desktop: 4000 }
  },

  sitemap: {
    hostname: 'https://russianlion.ru',
    exclude: ['/training', '/management'],
    gzip: true,
  },

  robots: {
    UserAgent: '*',
    Allow: '/',
    Disallow: ['/admin', '/training', '/management'],
    Sitemap: 'https://russianlion.ru/sitemap.xml',
  },

  redirect: [
    { from: '^/team-member/2$', to: '/team-member/makarov-taras', statusCode: 301 },
    { from: '^/team-member/11$', to: '/team-member/kuschinsky-vsevolod', statusCode: 301 },
    { from: '^/team-member/3$', to: '/team-member/sidorina-natalya', statusCode: 301 },
  ],

  server: {
    host: '0.0.0.0',
    port: 3000,
    compression: {
      threshold: 1024,
      level: 9,
    },
  },

  axios: {
    baseURL: process.env.API_BASE_URL || "https://russianlion.ru/api/v1",
    browserBaseURL: "/api/v1",
    timeout: 3000,
  },

  image: {
    // Options
  },

  gtm: {
    id: process.env.GOOGLE_TAG_MANAGER_ID,
  },

  build: {
    postcss: null,
    extractCSS: true,
    cssSourceMap: false,
    
    optimization: {
      minimize: true,
      nodeEnv: 'production',
      flagIncludedChunks: true,
      usedExports: true,
      sideEffects: false,
      splitChunks: {
        chunks: 'all',
        automaticNameDelimiter: '.',
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        minSize: 20000,
        maxSize: 244000,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: 10,
            reuseExistingChunk: true,
            enforce: true,
          },
          vue: {
            test: /[\\/]node_modules[\\/](vue|nuxt)[\\/]/,
            name: 'vue',
            priority: 20,
            reuseExistingChunk: true,
          },
          common: {
            minChunks: 2,
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      },
    },
    
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 2,
      },
      output: {
        comments: false,
      },
    },

    loaders: {
      vue: {
        prettify: false,
      },
    },

    extractCSS: {
      ignoreOrder: true,
    },
  },

  render: {
    resourceHints: true,
    bundleRenderer: {
      shouldPreload: (file, type) => {
        if (type === 'font') return /\.woff2?$/.test(file)
        if (type === 'script' || type === 'style') return false
        return true
      }
    },
    
    compressor: {
      level: 9,
      threshold: 1024,
      minRatio: 0.8,
    },
  },

  compression: {
    algorithm: 'gzip',
    threshold: 1024,
    level: 9,
  },

  generate: {
    interval: 100,
    fallback: true,
  },
}
