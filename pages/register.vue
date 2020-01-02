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
        <Tabs v-model="nowIndex" >
          <TabPane label="会员注册" name="users" :disabled="userdisable">
            <UserRegister @currData="currData" @userTab="userTab"></UserRegister>
          </TabPane>
          <TabPane label="供应/承运商注册" name="supply" :disabled="supplydisable">
            <supplierRegister @currData="currData" @supplyTab="supplyTab"></supplierRegister>
          </TabPane>
        </Tabs>
      </div>
    </div>
	<Modal
      v-model="isusershow"
      @on-cancel="cancelModal"
      title="选择注册页面">
	    <div style="font-size:18px">选择会员注册或者承运商注册</div>
		<div slot="footer" style="display:flex;justify-content: center; padding:10px 0; ">
			<Button  title="提交"  style="font-size:18px"  type="primary" size="default"  @click="tabClicks('users')" >会员注册</Button>
				<Button  type="primary" style="font-size:18px;margin-left: 30px"  size="default"   @click="tabClicks('supply')" >供应/承运商注册</Button>
		</div>
    </Modal>
    <Footer size="small" title="" style="margin-top:18px;"></Footer>
  </div>
</template>

<script>
	import Header from '../components/header'
	import Footer from '../components/footer'
	import UserRegister from '../components/register-form'
	import supplierRegister from '../components/register-form/supplier-register'

	export default {
		name: "register",
		components: {
			Header,
			HeaderSmall: Header.small,
			Footer,
			UserRegister,
			supplierRegister,
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
			    supplydisable:false,
                userdisable:false,
				RegisterName: 'member',
				nowIndex: 0,
				index: 0,
				isusershow:true,
				current: false,

			}
		},
		
		methods: {
			currData(res) {
				this.current = res
			},
			applyData(row){

			},
      userTab(res){
        this.supplydisable=res
      },
      supplyTab(res){
          this.userdisable=res
      },
			// 点击切换
			tabClick(index, registerName) {
				this.registerName = registerName
				this.nowIndex = index
				this.mySwiper.slideTo(index, 500, false)
			},
			tabClicks(type){
				this.nowIndex = type
				this.isusershow = false
			},
			cancelModal(){
				this.isusershow=false
			},
		},
		mounted() {
			var that = this
			let type = this.$route.query.type;
			if (type === 'users') {
				this.nowIndex = "users"
			} else if (type === 'supply') {
				this.nowIndex = 'supply'
			} else {
				this.nowIndex = 'users'
			}


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
.ivu-btn>span{}
</style>
