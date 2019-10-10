<template>
  <div :class="classes">
    <shortcut></shortcut>
    <!--头部-logo/搜索/电话-->
    <div class="searchLogo">
      <!--logo-->
      <Logo></Logo>
      <!--搜索-->
      <Search></Search>
      <!--电话-->
<!--      <div class="TopTel" >-->
<!--        <a rel="nofollow" target="_blank" @v-on::click="OnlineService()" class="telurl" alt="点击这里给我发消息" title="点击这里给我发消息">-->
<!--          <div>-->
<!--            <img src="../../static/img/qq_service.png" style="width: 100%; height: 100%;" />-->
<!--          </div>-->
<!--        </a>-->
<!--      </div>-->
     <qqserivce></qqserivce>

    </div>
    <div class="navigation">
      <!--热门服务分类-->
      <div class="assortment-wrap" @mouseenter="infication" @mouseleave="outfication">
        <div class="fication_menu">查看服务分类</div>
        <coolapse :openCol="openCol"></coolapse>
      </div>
      <Navigation></Navigation>
    </div>
  </div>
</template>
<script>
 	const prefixCls = 'ant-header'
	import shortcut from '../shortcut'
	import Logo from './components/logo'
	import Search from './components/search'
    import qqserivce from './components/qqservice'
	import Navigation from '../navigation'
	import coolapse from '../collapse'


	export default {
		name: 'Header',
		data() {
			return {
				selectService: false,
				openCol: 'none',
			}
		},
		components: {
			shortcut,
			Logo,
			Search,
			Navigation,
			coolapse,
            qqserivce
		},
		computed: {
			classes() {
				return [
					`${prefixCls}`,
					{[`${prefixCls}-header`]: this.vertical},
				];
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

