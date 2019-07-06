<template>
    <div class="clearfix graybg ovh">
      <div class="w1200 whitebg ovh" style="margin-top: 20px; margin-bottom: 10px;">
        <ul class="registerTab">
          <li v-for="(item, index) in Registerlist" :class="{'curr':nowIndex === index}"  @click="tabClick(index,item.name)">{{item.name}}</li>
        </ul>
<!--进度-->
        <div class="dflexAlem" style="justify-content: center; margin-top: 40px; font-size: 14px;">
          <div class="CarrierPro dflexAlem curr" style=" flex-direction: column;  ">
            <div class="CarrierPro_num ">1</div>
            <span>填写注册信息</span>
          </div>
          <div class="lineProgress"></div>
          <div class="CarrierPro dflexAlem" style=" flex-direction: column;  ">
            <div class="CarrierPro_num">2</div>
            <span>完善信息</span>
          </div>
          <div class="lineProgress"></div>
          <div class="CarrierPro dflexAlem" style=" flex-direction: column;  ">
            <div class="CarrierPro_num">3</div>
            <span>待审核</span>
          </div>

        </div>
<!--注册框-->
        <div class="swiper-container swiper_con">
          <div class="swiper-wrapper dflex" style="height: auto">
            <!-- 第一个 swiper -->
            <div class="swiper-slide swiper-no-swiping" ref="viewBox">
              <user-register></user-register>
            </div>
            <!-- 第二个 swiper -->
            <div class="swiper-slide swiper-no-swiping">
              <supply-register ></supply-register>
            </div>
            <!-- 第三个 swiper -->
            <div class="swiper-slide swiper-no-swiping">
              <carrier-register></carrier-register>
            </div>

          </div>


        </div>

      </div>

    </div>
</template>

<script>
  import Swiper from 'swiper';
  import userRegister from './register/userRegister'
  import supplyRegister from './register/supplyRegister'
  import carrierRegister from './register/carrierRegister'

    export default {
        name: "register",
      layout:'membercenter',
      components:{
        userRegister,
        supplyRegister,
        carrierRegister
      },
      data(){
          return{
            RegisterName:'member',
            nowIndex:0,
            index:0,
            Registerlist:[
              {name:'会员注册'},
              {name:'供应商注册'},
              {name:'承运商注册'}
            ]
          }
      },
      methods:{
        // 点击切换
        tabClick(index,registerName){

          this.registerName=registerName
          this.nowIndex = index
          this.mySwiper.slideTo(index,500,false)
        },
      },
      mounted(){
        var that=this
        this.RegisterName=this.$router.history.current.query.name
        console.log('this.$router',this.$router.history.current)
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
    }
</script>

<style scoped>

      .registerTab{display: flex;width: 50%;margin: 50px auto 20px;}
      .registerTab li{font-size: 18px; border-right: 1px solid #DEDEDE; padding: 0 55px}
      .registerTab li:last-child{border-right:none;}
      .registerTab li:hover{color: #007de4; cursor: default;}

      .registerTab li.curr{color: #007de4;}


      .swiper-wrapper{width: 1800px; margin: 0 auto;}
      .swiper_con{width:50%; margin: 0 auto; position:relative; overflow: hidden; margin-bottom: 30px;}

      /*注册进度*/
      .CarrierPro{position: relative;}
      .CarrierPro.curr .CarrierPro_num{background-color: #007de4; color: #fff;}
      .CarrierPro.curr span{color: #007de4;}
      .CarrierPro span{position: absolute;bottom: -25px;width: 90px;text-align: center; color: #666;}
      .lineProgress{border: 1px dashed #DEDEDE;width: 20%; margin: 0 5px;}
      .CarrierPro_num{ color: #666; width: 41px;height: 41px; line-height: 41px; text-align: center;font-size: 16px;border-radius: 50%;background-color: #f0f2f5;}


</style>
