<template>
  <div class="body">
    <Header-small title="会员注册">
      <div slot="headerother">
        <div class="dflexAlem gray fs14" style="color: rgb(102, 102, 102);margin-top: 50px;">
          <span class="bbright pr10 blackFont">已有账号？</span>
          <a data-v-228ad150="" href="/login" class="blueFont pl10">直接登录</a>
        </div>
      </div>
    </Header-small>
    <div class="container" title="">
      <div class="w1200 whitebg ovh" style="margin-top: 20px; margin-bottom: 10px;">

<!--        <ul class="registerTab">-->
<!--          <li v-for="(item, index) in RegisterList" :class="{'curr':nowIndex === index}"-->
<!--              @click="tabClick(index,item.name)" v-bind:key="index">{{item.name}}-->
<!--          </li>-->
<!--        </ul>-->
<!--        <div class="swiper-container swiper_con" :style="{height:(!this.current ? 'auto' : '1180px')}">-->
<!--          <div class="swiper-wrapper dflex">-->
<!--            &lt;!&ndash; 第一个 swiper &ndash;&gt;-->
<!--            <div class="swiper-slide swiper-no-swiping" ref="viewBox">-->
<!--              <user-register @currData="currData"></user-register>-->
<!--            </div>-->
<!--            &lt;!&ndash; 第二个 swiper &ndash;&gt;-->
<!--            <div class="swiper-slide swiper-no-swiping">-->
<!--              <supplier-register @currData="currData"></supplier-register>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
        <Tabs value="name1">
          <TabPane label="会员注册" name="name1">
            <user-register @currData="currData"></user-register>
          </TabPane>
          <TabPane label="供应/承运商注册" name="name2">
            <supplier-register @currData="currData"></supplier-register>
          </TabPane>

        </Tabs>


      </div>
    </div>
    <Footer size="small" title="" style="margin-top:18px;"></Footer>
  </div>
</template>

<script>
	import Header from '../components/header'
	import Footer from '../components/footer'
	import Swiper from 'swiper';
	import UserRegister from '../components/register-form'

	export default {
		name: "register",
		components: {
			Header,
			HeaderSmall: Header.small,
			Footer,
			UserRegister,
			SupplierRegister: UserRegister.supplier
		},
		fetch({store, params}) {
			return Promise.all([
				//获取顶部、中部、底部导航信息
				store.dispatch('common/getNavList'),
				//获取系统配置
				store.dispatch('common/getSysConfig'),
			])
		},
		data() {
			return {
				RegisterName: 'member',
				nowIndex: 0,
				index: 0,
				current: false,
				RegisterList: [
					{
					  name: '会员注册'
				  },
					{
						name: '供应/承运商注册'
					}
				]
			}
		},
		methods: {
			currData(res) {
				this.current = res
			},
			// 点击切换
			tabClick(index, registerName) {
				this.registerName = registerName
				this.nowIndex = index
				this.mySwiper.slideTo(index, 500, false)
			},
		},
		mounted() {
			var that = this
			let type = this.$route.query.type;
			if (type === 'users') {
				this.nowIndex = 0
			} else if (type === 'supply') {
				this.nowIndex = 1
			} else {
				this.nowIndex = 0
			}

			// 划动--切换
			that.mySwiper = new Swiper('.swiper-container', {
				initialSlide: this.nowIndex,
				autoplay: false,
				noSwiping: true,
				keyboardControl: true,
				autoHeight: true,
				observer: true,
				observeParents: true,
				onSlideChangeStart: function () {
					that.nowIndex = that.mySwiper.activeIndex
				}
			});
		},
		head() {
			return {
				title: '会员注册-巨正源',
				page: 10,
				meta: [{
					name: 'viewport',
					content: 'width=device-width, initial-scale=1'
				},
					{
						name: 'keywords',
						content: '化工, 交易, 会员注册'
					},
					{
						hid: 'description',
						name: 'description',
						content: '会员注册巨正源-化工交易平台，提供丙烷脱氢,石化产品贸易、仓储服务、成品油运输服务'
					}
				]
			}
		}
	}
</script>
<style lang="less"  >
  /*.swiper-wrapper {*/
  /*  width: 2400px;*/
  /*  margin: 0 auto;*/
  /*}*/

  /*.swiper_con {*/
  /*  width: 100%;*/
  /*  margin: 0 auto;*/
  /*  position: relative;*/
  /*  overflow: hidden;*/
  /*  margin-bottom: 30px;*/
  /*}*/

  /*.swiper-slide {*/
  /*  width: 100%;*/
  /*  margin: 0PX auto;*/
  /*}*/
  .ivu-tabs .ivu-tabs-bar{
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    margin-top: 26px;
  }
  .ivu-tabs-nav .ivu-tabs-tab{
    padding: 17px 16px;
  }
  .ivu-tabs-nav-container{
    font-size: 16px;
  }

</style>
