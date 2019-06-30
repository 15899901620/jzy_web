import VuetifyLoaderPlugin from 'vuetify-loader/lib/plugin'
import pkg from './package'

export default {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
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
    '~/assets/style/app.styl'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/vuetify',
    '@/plugins/iview',
    '@/plugins/axios',
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  axios: {
    // proxy: true,
    // prefix: '/api', // baseURL
    baseURL:'http://127.0.0.1:10010',
    // credentials: true,
  },
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:10010/', // 代理地址
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/', //将 /api 替换掉
      },
    },
  },

  /*
  ** Build configuration
  */
  build: {
    transpile: ['vuetify/lib'],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ['~assets/style/variables.styl']
      },
      test:/\.(png|jpe?g|gif|svg)$/, 
      loader:"url-loader", 
      query:{ 
          limit:10000, 
          name:'img/[name].[hash].[ext]' 
      }
    },
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }

  }
}
