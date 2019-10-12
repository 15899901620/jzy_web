<template>
  <div class="body">
    <Header-small title="交易平台登录">
      <div slot="headerother">
<!--        <div v-if="$store.state.common.sysConfig.SERVICEHOTLINE" data-v-7b07b57b="" class="dflexAlem fs20 gray" style="color: rgb(102, 102, 102);margin-top: 44px;">服务热线 :-->
<!--          {{$store.state.common.sysConfig.SERVICEHOTLINE}}-->
<!--        </div>-->
        <qqservice></qqservice>
      </div>
    </Header-small>
    <div class="container" title="">
      <div class="Loginbg">
        <div class="w1200" style="display: flex; justify-content: flex-end;">

          <div class="LoginInput">
              <div class="LoginCenter">
                <Tabs  v-model="nowIndex" >
                  <TabPane label="会员登录" name="users"  > <login></login></TabPane>
                  <TabPane label="供应/承运商登录" name="supply"> <login-supply></login-supply> </TabPane>
                </Tabs>
             </div>
          </div>
<!--          <div class="LoginInput">-->
<!--            <div class="LoginCenter">-->
<!--              <ul class="dflexAlem loginMethod">-->
<!--                <li v-for="(item,index) in loginList" :class="{'curr':nowIndex === index}"-->
<!--                    @click="tabClick(index,item.registerName)" v-bind:key="index">-->
<!--                  {{item.name}}-->
<!--                </li>-->
<!--              </ul>-->
<!--              <div class="swiper-container swiper_con">-->
<!--                <div class="swiper-wrapper dflex">-->
<!--                  <div class="swiper-slide swiper-no-swiping" ref="viewBox">-->
<!--                    <login></login>-->
<!--                  </div>-->
<!--                  &lt;!&ndash; 第二个swiper &ndash;&gt;-->
<!--                  <div class="swiper-slide swiper-no-swiping">-->
<!--                    <login-supply></login-supply>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->

        </div>
      </div>
    </div>
    <Footer size="small" title="底部" style="margin-top:18px;"></Footer>
  </div>
</template>

<script>
	import Header from '../components/header'
    import qqservice from '../components/header/components/qqservice'

    import Footer from '../components/footer'
	import Swiper from 'swiper';
	import login from '../components/login-form'

	export default {
		name: "tendering",
		data() {
			return {
				loginList: [
					{name: '会员登录', registerName: 'member'},
					{name: '供应/承运商登录', registerName: 'supply'}
				],
				nowIndex: 0,
				registerName: 'member'
			}
		},
		components: {
			Header,
			HeaderSmall: Header.small,
			Footer,
			login,
            qqservice,
			loginSupply: login.supply,
			loginCarrier: login.carrier
		},
		fetch({store, params}) {
			return Promise.all([
				//获取顶部、中部、底部导航信息
				store.dispatch('common/getNavList'),
				//获取系统配置
				store.dispatch('common/getSysConfig'),
			])
		},
		mounted() {
			var that = this
			that.mySwiper = new Swiper('.swiper-container', {
				initialSlide: 0,
				autoplay: false,
				noSwiping: true,
				keyboardControl: true,
				autoHeight: true,
				observer: true,
				observeParents: false,
				onSlideChangeStart: function () {
					that.nowIndex = that.mySwiper.activeIndex
				}
			});
		},
		methods: {
			// 点击切换
			tabClick(index, registerName) {
				this.registerName = registerName
				this.nowIndex = index
				this.mySwiper.slideTo(index, 500, false)
			},
			Register() {
				this.$router.push({path: '/register', query: {name: this.registerName}})
			},
			// 找回密码
			ForgotPassword() {
				this.$router.push({path: './forgotpwdssword/ForgotPassword'})
			},
		}
	}
</script>
<style lang="less" >
  .ivu-tabs .ivu-tabs-bar{
    display: flex;
    justify-content: center;

  }
  .ivu-tabs .ivu-tabs-content{
      width: 99%;
  }
</style>
