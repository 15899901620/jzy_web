const appConfig = require('./config/app.config')

const proxy_url = process.env.NODE_ENV === 'development' ? appConfig.system.BASE_URL.dev : appConfig.system.BASE_URL.pro

export default {
	mode: 'universal',
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
		analyze: true,
		transition: {
			name: 'page',
			mode: 'out-in',
			beforeEnter(el) {
				console.log('Before enter...');
			}
		},
		extractCSS: {
			allChunks: true
		},
		publicPath: '/sample/assets/', //sample/essays 打包的默认路径为 '_nuxt’ 或者可以指定cdn 域名
		filenames: { // css 和 js img 打包时指定文件夹
			/*app: ({isDev}) => isDev ? '[name].js' : '[chunkhash].js',
			chunk: ({isDev}) => isDev ? '[name].js' : '[chunkhash].js',
			css: ({isDev}) => isDev ? '[name].js' : '[contenthash].css',
			img: ({isDev}) => isDev ? '[path][name].[ext]' : '[hash:7].[ext]'*/
			app: '[chunkhash].js',
			chunk: '[chunkhash].js',
			js: '[chunkhash].js',
			css: '[contenthash].css',
			img: '[hash:7].[ext]'
		},
		/*loaderOptions: { // 向 CSS 相关的 loader 传递选项
			less: {
				javascriptEnabled: true
			}
		},*/
		/*loaders: [
			{
				test: /\.(png|jpe?g|gif|svg)$/,
				loader: "url-loader",
				query: {
					limit: 10000,
					name: 'img/[name].[hash].[ext]'
				}
			}
		],*/
		/*optimization:
			{
				minimize: true,
				minimizer:
					[
						// terser-webpack-plugin
						// optimize-css-assets-webpack-plugin
					],
				splitChunks:
					{
						chunks: "all",
						minSize:
							30000,
						minChunks:
							1,
						maxAsyncRequests:
							5,
						maxInitialRequests:
							3,
						automaticNameDelimiter:
							'~',
						name:
							true,
						cacheGroups:
							{
								vendors: {
									test: /[\\/]node_modules[\\/]/,
									name:
										"vendors",
									chunks:
										"all",
									priority:
										-10
								}
								,
								extern: {
									test: /[\\/]extern[\\/]/,
									name:
										"extern",
									chunks:
										"all",
									priority:
										-10
								}
								,
								styles: {
									name: 'styles',
									test:
										/\.css$/,
									chunks:
										'all',
									priority:
										-10,
									enforce:
										true
								}
								,
								sass: {
									name: 'sass',
									test:
										/\.(sa|sc|)ss$/,
									chunks:
										'all',
									priority:
										-10,
									enforce:
										true
								}
								,

								default:
									{
										minChunks: 1,
										priority:
											-20,
										reuseExistingChunk:
											true
									}
							}
					}
			}
		,*/
		/*
		 ** You can extend webpack config here
		 */
		extend(config, ctx) {

		}
	}
}
