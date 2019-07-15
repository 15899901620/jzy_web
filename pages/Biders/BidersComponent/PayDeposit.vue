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
      <div class="PopupCode pr">
        <input type="text" class="TextCode" v-model="Bonddeposit.BondCode" placeholder="请输入手机验证码"  @blur="userCodeCheck" />
        <button class="AcqCode" @click="getNoteValue" :disabled='btnBoolen'  >{{this.btnValue}}</button>
        <i class="redFont fs12" style="position: absolute;bottom: -20px;">{{TipCode}}</i>
      </div>
      <div class="graybg" style="display: flex; justify-content: center; align-items: center; margin-top: 25px">
        <div class="submitPrice cp" @click="PayDeposite">缴纳保证金</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { capitalinfo } from '../../../api/capital'

  import { BondMessSend, BondMessageCode, AddBondRecord } from '../../../api/auction'

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
            remain_fund:'',

            Bonddeposit:{
              depositAmount:'',
              bidNum:'',
              BondCode:'',
            },
            TipCode:'',
            //disabled的初始值
            btnBoolen:false,
            btnClassName:"btn",
            btnValue:"获取短信验证码",
            codeValid:false,//验证码无效
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
          this.Bonddeposit.BondCode=''

        },


        //获取短信验证码
        async getNoteValue () {

          if (!Cookies.get('webtoken') && !Cookies.get('userinfor')) {
            this.$Modal.confirm({
              title: '登录超时',
              content: '<p style="font-size: 16px; margin-top: 10px">您尚未登录，或者登录超时，请登录</p>',
              okText:'去登录',
              styles:'top:30px;',
              onOk: () => {
                this.$router.push({name:'login'});
              },
              onCancel: () => {

              }
            });
            return
          }else{
            let params = {
              Authorization:Cookies.get('webtoken')
            }
            const res = await BondMessSend(this, params)

            if(res.data && res.status === 200 ){

              this.$Message.info("短信发送成功")

              var sj = Math.ceil(Math.random(10 + 1) * 100000)
              window.localStorage.setItem("note", sj)
              this.auth_time = 60;
              var timer = setInterval(()=>{
                this.auth_time--;
                if(this.auth_time<=0){
                  clearInterval(timer)
                  this.btnBoolen = false;
                  this.btnClassName="btns"
                  this.btnValue="获取短信验证码"
                 this.Bonddeposit.BondCode=''
                }else {
                  this.btnBoolen = true;
                  this.btnValue=`重新获取(${this.auth_time})S`
                  this.btnClassName="btn"
                }
              },1000)

            }else {
              this.$Message.info("短信发送失败")
            }


          }
        },
        // 验证手机验证码
        async userCodeCheck(){
          let params = {
            Authorization:Cookies.get('webtoken'),
            code:this.Bonddeposit.BondCode
          }
          if(!this.Bonddeposit.BondCode){
            this.TipCode='验证码不能为空'
            return
          }
          const res = await BondMessageCode(this, params)
          console.log('验证手机验证码',res)
          if(res.data && res.status === 200){
            this.codeValid=true
            this.TipCode=''
          }else {
            this.TipCode='验证码有误'
            return
          }
        },

        //缴纳保证金
       async PayDeposite(){
         this.auth_time=0
         if(!this.Bonddeposit.BondCode){
             this.TipCode='验证码不能为空'
             return
           }
         let paramCodes = {
               Authorization:Cookies.get('webtoken'),
               code:this.Bonddeposit.BondCode
             }
         console.log('paramCodes', paramCodes)
         const CodeData = await BondMessageCode(this, paramCodes)

         if(CodeData.data && CodeData.status === 200) {
           this.codeValid = true
           this.TipCode = ''
           this.Bonddeposit.depositAmount = this.DepositeData.MinePrice * this.DepositeData.aucteNum * (this.DepositeData.Bond / 100)
           this.Bonddeposit.bidNum = this.DepositeData.aucteNum
           console.log('竞拍保证金', this.Bonddeposit.depositAmount)
           console.log('竞拍数量', this.Bonddeposit.bidNum)
           if (!this.Bonddeposit.bidNum) {
             this.TipCode = '竞拍数量不能为空'
             return
           }
         console.log('BondCode',this.Bonddeposit.BondCode)
           let params = {
             auctionId: this.DepositeData.auctionId,
             depositAmount: this.Bonddeposit.depositAmount,
             bidNum: this.DepositeData.aucteNum,
             code: this.Bonddeposit.BondCode
           }
           console.log('params', params)
           let res = await AddBondRecord(this, params)

           console.log('res:', res)
           if (!res.data.errorcode && res.status === 200 && res.data) {
             this.$emit('HiddenDep')
             this.Bonddeposit.BondCode = ''
             this.$Message.info("缴纳保证金成功")
           } else {
             this.$Modal.confirm({
               title: '失败提示',
               content: '<p style="font-size: 16px; margin-top: 10px">缴纳保证金失败，请联系客服</p>',
               okText: '确定',
               styles: 'top:30px;',
               onOk: () => {
                 // this.$router.push({name:'login'});
               },
               onCancel: () => {

               }
             });
           }
         }else{
             this.TipCode = '验证码有误'
             return
           }


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
.AcqCode{border: none; background-color: #fff}
.AcqCode:hover{background-color: #ffffff;border: none;}
.AcqCode:active{background-color: #ffffff;border: none;}
 </style>
