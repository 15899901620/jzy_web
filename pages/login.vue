<template>
  <div class="body">
    <Header-small title="交易平台登录">
      <div slot="headerother">
          <div class="TopTel" >
              {{$store.state.common.sysConfig.SERVICEHOTLINE}}
          </div>
<!-- <qqservice></qqservice> -->
      </div>
    </Header-small>
    <div class="container" title="">
      <div class="Loginbg">
        <div class="w1200" style="display: flex; justify-content: flex-end;">

          <div class="LoginInput">
              <div class="LoginCenter">
                <!-- <Tabs  v-model="nowIndex" >
                  <TabPane label="会员登录" name="users"  > <login></login></TabPane>
                  <TabPane label="供应商/承运商登录" name="supply"> <login-supply></login-supply> </TabPane>
                </Tabs>  -->
				<ul class='TabTitle'>
					<li @click="tabClick(0)" class="TabMember " :class="{'TabMemberbg':nowIndex === 0}" >会员登录</li>
				    <li @click="tabClick(1)" class="TabSupply " :class="{'TabSupplybg':nowIndex === 1}">供应商/承运商登录</li>
				</ul>
             </div> 

			 <div class="swiper-container swiper_con">
                <div class="swiper-wrapper dflex">
                  <div class="swiper-slide swiper-no-swiping swipingleft" ref="viewBox" style="width:262px; margin-right:1px">
                    <login></login> 
                  </div> 
                 <!-- 第二个swiper  -->
                  <div class="swiper-slide swiper-no-swiping"  style="width:263px;">
                    <login-supply></login-supply>
                  </div>
                </div>             
			  </div>
        </div>
         

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
			// tabClick(index, registerName) {
			// 	this.registerName = registerName
			// 	this.nowIndex = index
			// 	this.mySwiper.slideTo(index, 500, false)
			// },
			tabClick(index) { 
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
<style lang="less" scope>

  .ivu-tabs .ivu-tabs-bar{
    display: flex;
    justify-content: center;

  }
  .ivu-tabs .ivu-tabs-content{
      width: 99%;
  }
  .TopTel{
      margin-top: 45px;
      height: 30px;
      align-items: center;
      background: url(../static/img/Tel_icon.png) no-repeat 0px 0px;
      padding-left: 37px;
      font-size: 20px;
      font-weight: bold;
      color: #ff7300;
      overflow: hidden;
  }
  .LoginCenter{
	width: 85%;
    margin: 10px auto;
  }
  .TabTitle{
	display: flex;
	border-bottom: 1px solid #57a3f3;
	li{
		color:#2b85e4;
		cursor: default;
	}
	.whiteColor{color: #ffffff;}
	.TabMember{
		width: 60%; 	
		height: 35px;
		line-height: 35px;
		padding-left: 10px;
		position: relative;   
	}
	.TabMemberbg{  
		width: 56%;
		height: 35px;
		color: #ffffff;
		background: url(../static/img/LoginTabbg.png) no-repeat 0px 2px;
		background-size: 100%;
	} 
	.TabSupply{
		width: 57%;  
		height: 35px;
		line-height: 35px;
		text-align: right;
		padding-right: 10px;
		position: relative; 
	}  
	.TabSupplybg{ 
		width: 95%;
		text-align: right;
		color: #ffffff;
		height: 35px;
		background: url(../static/img/LoginTabbg.png) no-repeat 0px -46px;
		background-size: 100%;
	}
  }
 
</style>
