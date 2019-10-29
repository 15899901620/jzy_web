const TerserPlugin = require('terser-webpack-plugin')
const appConfig = require('./config/app.config')

//是否生产环境appConfig.system.BASE_URL.pro
const proxy_url = process.env.NODE_ENV === 'development'? appConfig.system.BASE_URL.dev : appConfig.system.BASE_URL.pro

let Version = new Date().getTime()
export default {
  mode: 'universal',
  env: {
    NODE_ENV: process.env.NODE_ENV
  },
	/*
	 ** Headers of the page
	 */
	head: {
		title: appConfig.meta.title,
		meta: [{
			charset: 'utf-8'
		},
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1'
			},
			{
				'http-equiv': 'pragram',
				content: 'no-cache'
			},
			{
				'http-equiv': 'cache-control',
				content: 'no-cache, no-store, must-revalidate'
			},
			{
				'http-equiv': 'expires',
				content: '0'
			},
			{
				hid: 'keywords',
				name: 'keywords',
				content: appConfig.meta.keywords
			},
			{
				hid: 'description',
				name: 'description',
				content: appConfig.meta.description
			}
		],
		link: [{
			rel: 'icon',
			type: 'image/x-icon',
			href: '/favicon.ico'
		}]
	},
	/*
	 ** Customize the progress-bar color
	 */
	loading: {
		color: '#fff'
	},
	/*
	 ** Global CSS
	 */
	css: [
		'~/assets/css/global.css',
		'~/assets/css/app.css',
		{src: "swiper/dist/css/swiper.css"}
	],
	/*
	 ** Plugins to load before mounting the App
	 */
	plugins: [
		'@/plugins/axios',
		'~/plugins/components',
		'@/plugins/storage',
		{src: "~/plugins/swiper.js", ssr: false},
		{src: '~/plugins/iview.js', ssr: true},
		{src: '~/plugins/polyfill.js', ssr: true}
	],
	/*
	 ** Nuxt.js modules
	 */
	modules: [
		'@nuxtjs/axios',
		'@nuxtjs/proxy',
		'cookie-universal-nuxt',
		['cookie-universal-nuxt', {alias: 'cookiz'}],
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
    analyze: false,
    extractCSS: {
			allChunks: true
		},
    //是否允许 vue-devtools 调试
    devtools: false,
    // transpile: [/^iview/],
		transition: {
			name: 'page',
			mode: 'out-in',
			beforeEnter(el) {
				console.log('Before enter...');
			}
    },
    // SourceMap: false,
    // cssSourceMap: false,
		// publicPath: './', //sample/essays 打包的默认路径为 '_nuxt’ 或者可以指定cdn 域名
		/*filenames: { // css 和 js img 打包时指定文件夹
			app: ({isDev}) => isDev ? '[name].js' :'[name].[contenthash].'+Version+'.js',
			chunk:({isDev}) => isDev ? '[name].js' : '[name].[contenthash].'+Version+'.js',
			js: ({isDev}) => isDev ? '[name].js' : '[name].[contenthash].'+Version+'.js',
			css: ({isDev}) => isDev ? '[name].css' : '[name].[contenthash].'+Version+'.css',
			img: ({isDev}) => isDev ? '[path][name].[ext]' :  '[hash:7].[ext]'
		},*/
    /**
     * 配置代码压缩规则，提升速度
     */
    optimization: {
      minimize: true,
      minimizer: [
        // terser-webpack-plugin
        new TerserPlugin({
          terserOptions: {
            warnings: false,
            compress: {
              drop_console: true,
              pure_funcs: ['console.log']
            },
            output: {
              //是否保留注释，编译后无需保留
              comments: false
            },
            cache: false,
            parallel: true,
            // sourceMap: true
          }
        })
      ],
      //代码打包分割规则
      // splitChunks: {
      //   chunks: 'all',
      //   cacheGroups: {
      //     libs: {
      //       name: 'chunk-libs',
      //       test: /[\\/]node_modules[\\/]/,
      //       priority: 10,
      //       chunks: 'initial' // only package third parties that are initially dependent
      //     },
      //     iview: {
      //       name: 'chunk-ui',
      //       priority: 20,
      //       test: /[\\/]node_modules[\\/]_?iview(.*)/
      //     }
      //   }
      // }
    },
		/*
		 ** You can extend webpack config here
		 */
		extend(config, ctx) {
      // Run ESLint on save
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }
		}
	}
}
