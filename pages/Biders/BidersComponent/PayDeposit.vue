<template>
  <div class="Mask">
    <div class="Bond_Popup">
      <div class="TopPopup">
        <div>缴纳保证金</div> <div class="PopupClose" @click="HiddenDeposit"></div>
      </div>
      <div class="mt25">
        <span class="Bond_Popup_title">竞拍低价：</span><span class="ml10">￥{{DepositeData.MinePrice}}元</span>
      </div>
      <!--竞拍数量-->
      <div class="mt15 dflex"  style="align-items: center;">
        <span class="Bond_Popup_title">竞拍数量：</span>
        <div class="pr ml10">
          <input  class="InputNum" v-model="DepositeData.aucteNum" /><span class="unit">吨</span>
        </div>
      </div>
      <!--需冻结保证金-->
      <div class="PricePopup">
      <div v-if="LoginShow">
        <div class="mt20 ml20 dflex">
          <span class="PricePopup_title">需冻结保证金：</span><span><span class="orangeFont fwb fs16">{{DepositeData.MinePrice*DepositeData.aucteNum*(DepositeData.Bond/100)}}</span>元</span>
        </div>
        <div class="dflex ml20 mt15 mb10" style="align-items: center;">
          <span class="PricePopup_title">可用余额：</span><span><span class="orangeFont fwb fs16">{{remain_fund}}</span>元</span>
          <a class="PricePopup_btn">余额充值</a>
        </div>
      </div>
      <div class="mt3 mb5 ml10" v-else>
       <span class="pt10">{{NotLogin}}</span> <nuxt-link to="/login" class="pl20">去登录</nuxt-link>
      </div>
      </div>
      <!--输入验证码-->
      <div class="PopupCode">
        <input type="text" class="TextCode" placeholder="请输入手机验证码" /> <a class="AcqCode">点击获取验证码</a>
      </div>
      <div class="graybg" style="display: flex; justify-content: center; align-items: center;">
        <a class="submitPrice" @click="PayDeposite">缴纳保证金</a>
      </div>
    </div>
  </div>
</template>

<script>
  import { capitalinfo,AddBondRecord } from '../../../api/capital'
  import Cookies from 'js-cookie'
    export default {
      name: "PayDeposit",
      props:{
        DepositeData:{type:Object},
      },
      data(){
          return{
            NotLogin:'',
            LoginShow:false,
            fozen_fund:'',
            remain_fund:''
          }
      },
      methods:{
        async capital(){
          if(Cookies.get('webtoken')){
            this.LoginShow=true
            const res= await capitalinfo(this,{})
            this.fozen_fund=res.data.fozen_fund
            this.remain_fund=res.data.remain_fund
          }else{
            this.NotLogin='暂未登录，请登录'
          }
        },
        HiddenDeposit(){
          this.$emit('HiddenDep')
        },
        //缴纳保证金
        PayDeposite(){
          console.log('DepositeData:', this.DepositeData)

        },
      },
      created(){
        this.capital()
      },
      watch:{
        DepositeData:{
          handler(newValue,oldValue){
            console.log('newValue', newValue)
          },
          deep:true
        }

      }
    }
</script>

<style scoped>

</style>
