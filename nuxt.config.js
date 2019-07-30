const appConfig = require('./config/app.config')

const proxy_url = process.env.NODE_ENV === 'development' ? appConfig.system.BASE_URL.dev : appConfig.system.BASE_URL.pro

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: appConfig.meta.title,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'keywords', name: 'keywords', content: appConfig.meta.keywords },
      { hid: 'description', name: 'description', content: appConfig.meta.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/css/global.css',
    '~/assets/css/app.css',
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/axios',
    '@/plugins/storage',
    '@/plugins/iview.js'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    // 'swiper'
  ],
  axios: {
    proxy: true,
    credentials: true
  },
  proxy: {
    '/api': {
      target: proxy_url, // 代理地址
      changeOrigin: true
    },
  },
  /*
  ** Build configuration
  */
  build: {
    analyze: true,
    transition: {
      name: 'page',
      mode: 'out-in',
      beforeEnter (el) {
        console.log('Before enter...');
      }
    },
    extractCSS: { allChunks: true },
    loaderOptions: { // 向 CSS 相关的 loader 传递选项
      less: {
        javascriptEnabled: true
      }
    },
    optimization: {
      minimize: true,
      minimizer: [
        // terser-webpack-plugin
        // optimize-css-assets-webpack-plugin
      ],
      splitChunks: {
        chunks: "all",
        minSize: 30000,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '~',
        name: true,
        cacheGroups: {
            vendors: {
                test: /[\\/]node_modules[\\/]/,
                name: "vendors",
                chunks: "all",
                priority: -10
            },
            extern:{
                test: /[\\/]extern[\\/]/,
                name: "extern",
                chunks: "all",
                priority: -10
            },
            styles: {
                name: 'styles',
                test: /\.css$/,
                chunks: 'all',
                priority: -10,
                enforce: true
            },
            sass: {
                name: 'sass',
                test: /\.(sa|sc|)ss$/,
                chunks: 'all',
                priority: -10,
                enforce: true
            },

            default: {
                minChunks: 1,
                priority: -20,
                reuseExistingChunk: true
            }
        }
      }
    },
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
