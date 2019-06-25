<template>

  <div class="Loginbg">
    <div class="w1200" style="display: flex; justify-content: flex-end;">
      <div class="LoginInput">
        <div class="LoginCenter">
            <ul class="dflexAlem loginMethod">
              <li v-for="(item,index) in loginList" :class="{'curr':nowIndex === index}" @click="tabClick(index,item.registerName)">
                {{item.name}}
              </li>
            </ul>
          <div class="swiper-container swiper_con">
            <div class="swiper-wrapper dflex">
              <!-- 第一个swiper -->
              <div class="swiper-slide" ref="viewBox">
                <memberlogin></memberlogin>
              </div>
              <!-- 第二个swiper -->
              <div class="swiper-slide">
                <supplylogin></supplylogin>
              </div>
              <!-- 第二个swiper -->
              <div class="swiper-slide">
                <carrierlogin></carrierlogin>
              </div>

            </div>


          </div>


          <div class="mt40 dflex codeNews" style="justify-content: space-between; color: #666; ">
            <div  class="cp" @click="ForgotPassword()" >忘记密码</div>
            <div  class="cp" @click="Register()" >注册新账号</div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import Swiper from 'swiper';
  import memberlogin from './login/memberlogin';
  import supplylogin from './login/supplylogin';
  import carrierlogin from './login/carrierlogin';
  export default {
    name: 'login',
    layout: 'noHeader',
    components:{
      memberlogin,
      supplylogin,
      carrierlogin
    },
    data(){
        return{
          loginList:[
            {name:'会员登录',registerName:'member'},
            {name:'供应商登录',registerName:'supply'},
            {name:'承运商登录',registerName:'carrier'}
          ],
          nowIndex:0,
          registerName:'member'
        }
    },
  mounted(){
    var that=this

    that.mySwiper = new Swiper('.swiper-container',{
      initialSlide:0,
      autoplay:false,
      keyboardControl:true,
      autoHeight:true,
      observer:true,
      observeParents:true,
      onSlideChangeStart:function(){
        // console.log(that.mySwiper.activeIndex)
        that.nowIndex=that.mySwiper.activeIndex
      }
    });


  },
  methods:{
    // 点击切换
    tabClick(index,registerName){
      console.log('help.vue',index)
      console.log('registerName',registerName)
      this.registerName=registerName
      this.nowIndex = index
      this.mySwiper.slideTo(index,500,false)
    },
    Register(){
      console.log('Register')
      this.$router.push({path:'/register',query:{name:this.registerName}})
    },
    // 找回密码
    ForgotPassword(){
      this.$router.push({path:'./ForgotPassword/ForgotPassword'})
    },
  }

}
</script>

<style scoped>
  .Loginbg{background: url(../assets/img/LoginBg.jpg)no-repeat center;height: 401px;}
  .LoginInput{width: 310px;border-radius: 3px; background-color: #fff;margin-top: 30px;}
  .LoginCenter{display: flex;justify-content: center; flex-direction: column;margin: 35px 30px 50px; font-size: 14px;}
  .loginMethod li{border-right: 1px solid #DEDEDE;color: #333; font-size: 14px; padding-left: 13px;padding-right: 13px;}
  .loginMethod li:hover{color: #007de4; cursor: default;}
  .loginMethod li:first-child{padding-left: 0px;} .loginMethod li:last-child{padding-right: 0px;}
  .loginMethod li.curr{color: #007de4;}
  .loginMethod li:last-child{border: none;}
  .NumInput{ padding-left: 10px; width: 100%;border: 1px solid #dddddd; border-radius: 3px; line-height: 36px;box-sizing: border-box;}
  .logingAccount{ cursor: pointer; background-color: #007de4;border: none;line-height: 36px;color: #fff;border-radius: 3px;margin-top: 35px;}

  .swiper-wrapper{width: 750px;}
  .swiper_con{width:100%; position:relative; overflow: hidden;}

  .cp:hover{color: #007de4;}

</style>
