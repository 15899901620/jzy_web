<template>
  <div class="body">
      <Header-small title="找回密码">
        <div slot="headerother">
          <div data-v-228ad150="" class="dflexAlem gray fs14" style="color: rgb(102, 102, 102);    margin-top: 50px;"><span data-v-228ad150="" class="bbright pr10 blackFont">已有账号？</span> <a data-v-228ad150="" href="/login" class="blueFont pl10">直接登录</a></div>
        </div>
      </Header-small>
      <div class="container" title="内容区块">
        <div class="dflexAlem stepsItem">
            <steps :current="current" >
              <step title="第一步" description="填写注册基础信息" ></step>
              <step title="第二步" description="完善公司信息" ></step>
              <step title="第三步" description="信息提交成功，待审核" ></step>
            </steps>
        </div>

        
      </div>
      <Footer size="small" title="底部" style="margin-top:18px;"></Footer>
  </div>
</template>

<script>
import Header from '../components/header'
import Footer from '../components/footer'
import { mapState } from 'vuex'
import Swiper from 'swiper';
import {steps,step} from '../components/steps'

export default {
  name: "register",
  components:{
    Header,
    HeaderSmall: Header.small,
    Footer
  },
  fetch({ store, params }) {
    return Promise.all([
      store.dispatch('menu/getMenuList'),
      store.dispatch('system/getSystemCnf'),             
    ])
  },
  computed: {
    ...mapState({
      systeminfo: state => state.system.systeminfo
    })
  },
  data(){
      return{
        RegisterName:'member',
        nowIndex:0,
        index:0,
        current: 0,
      }
  },
  methods:{
    currData (res) {
      this.current = res
    },
    // 点击切换
    tabClick(index,registerName) {
      this.registerName=registerName
      this.nowIndex = index
      this.mySwiper.slideTo(index,500,false)
    },
  },
  mounted(){
    var that=this
    this.RegisterName=this.$router.history.current.query.name
    if(this.$router.history.current.query.params ==="Supplier"){
      this.nowIndex=1
    }
    // 划动--切换
    that.mySwiper = new Swiper('.swiper-container',{
      initialSlide:this.nowIndex,
      autoplay:false,
      noSwiping : true,
      keyboardControl:true,
      autoHeight:true,
      observer:true,
      observeParents:true,
      onSlideChangeStart:function(){
        that.nowIndex=that.mySwiper.activeIndex
      }
    });
  },
  head () {
    return {
      title: '会员注册-巨正源',
      page:10,
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'keywords', content: '化工, 交易, 会员注册'},
        { hid: 'description', name: 'description', content: '会员注册巨正源-化工交易平台，提供丙烷脱氢,石化产品贸易、仓储服务、成品油运输服务' }
      ]
    }
  }
}
</script>
<style scoped>
.swiper-wrapper{width: 3600px; margin: 0 auto;}
.swiper_con{width:100%; margin: 0 auto; position:relative; overflow: hidden; margin-bottom: 30px;}
.swiper-slide { width: 100%; margin: 0PX auto;}
</style>
