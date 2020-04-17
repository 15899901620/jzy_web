<template>
  <div :class="classes">
    <shortcut :topNavProp="topNavProp"></shortcut>
    <!--头部-logo/搜索/电话-->
    <div class="searchLogo">
      <!--logo-->
			<div class="Logo">
				<a href="/">
					<img :src="sysConfig.WEBLOGO" alt="巨正源" style="width: 100%; height: 100%">
				</a>
			</div>
      <!--搜索-->
      <Search></Search>
      <!--电话-->
      <div class="TopTel" >
        {{sysConfig.SERVICEHOTLINE}}
      </div>
    </div>
    <div class="navigation">
      <!--热门服务分类-->
      <div class="assortment-wrap" @mouseenter="infication" @mouseleave="outfication">
        <div class="fication_menu">查看服务分类</div>
        <coolapse :openCol="openCol" :hotCategoryProp="hotCategoryProp" :hotProductProp="hotProductProp" :levelSpecsProp="levelSpecsProp"></coolapse>
      </div>
      <Navigation :middleNavProp="middleNavProp"></Navigation>
    </div>
  </div>
</template>
<script>
 	const prefixCls = 'ant-header'
	import shortcut from '../shortcut'
	import Search from './components/search'
	import Navigation from '../navigation'
	import coolapse from '../collapse'

	export default {
		name: 'Header',
		props: {
			configProp: {
				type: Object
			},
			topNavProp: {
				type: Array
			},
			middleNavProp: {
				type: Array
			},
			hotCategoryProp: {
				type: Array
			},
			hotProductProp: {
				type: Array
			},
			levelSpecsProp: {
				type: Array
      }
		},
		data() {
			return {
				sysConfig: this.configProp || this.$store.state.common.sysConfig,
				selectService: false,
				openCol: 'none',
			}
		},
		components: {
			shortcut,
			Search,
			Navigation,
			coolapse
		},
		/*fetch({store}) {
			return Promise.all([
				//获取系统配置
				store.dispatch('common/getSysConfig'),
			])
		},*/
		computed: {
			classes() {
				return [
					`${prefixCls}`,
					{[`${prefixCls}-header`]: this.vertical},
				]
			}
		},
		methods: {
      infication() {
				this.openCol = 'block'
			},
			outfication() {
				let routeName = this.$router.history.current.name
				if (routeName === 'index') {
					this.openCol = 'block'
				} else {
					this.openCol = 'none'
				}
			},
			showCol() {
				let routeName = this.$router.history.current.name
				if (routeName === 'index') {
					this.openCol = 'block'
				}
			}
		},
		created() {
		},
    mounted() {
			this.showCol()
		}
	}
</script>

