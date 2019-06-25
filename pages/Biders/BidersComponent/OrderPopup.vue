<template>
  <!--订单确认--弹窗-->
  <div class="Mask" style="display: flex;"  >
    <div class="Bond_Popup">
      <div class="TopPopup">
        <div>订单确认</div> <div class="PopupClose" @click="Hidden()"></div>
      </div>

      <ul class="ordercon">
        <li><span >名称：</span><span >巨正源 Ts</span></li>
        <li><span >交货方式：</span><span >配送</span></li>
        <li><span >单价：</span><span >￥10610.00元</span></li>
        <li><span >数量：</span><span >60元</span></li>
      </ul>

      <!--需冻结保证金-->
      <div class="PricePopup">
        <div class="mt20 ml20 dflex">
          <span class="PricePopup_title">需冻结保证金：</span><span><span class="orangeFont fwb fs16">15,332.00</span>元</span>
        </div>
        <div class="dflex ml20 mt15 mb10" style="align-items: center;">
          <span class="PricePopup_title">可用余额：</span><span><span class="orangeFont fwb fs16">15,332.00</span>元</span>
          <a class="PricePopup_btn">余额充值</a>
        </div>
      </div>
      <!--输入验证码-->
      <div class="PopupCode">
        <input type="text" class="TextCode"  placeholder="请输入手机验证码" /> <a class="AcqCode">点击获取验证码</a>
      </div>
      <div class="graybg" style="display: flex; justify-content: center; align-items: center;">
        <a class="submitPrice">确认提交</a>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "OrderPopup",
      data(){
        return{

        }
      },
      methods:{
        Hidden(){
          this.$emit('hidden')
        }
      }
    }
</script>

<style scoped>
  .Mask{display: flex; justify-content: center; align-items: center; position: fixed;z-index: 10; top: 0; width: 100%; height: 100%;background: rgba(0,0,0,0.5);}
  .Bond_Popup{ width: 415px; background-color: #fff; border-radius: 3px;}
  .Bond_Popup .TopPopup{ font-size: 14px; display: flex; justify-content: space-between; align-items: center; padding: 10px 30px; color: #666;background-color: #f9f9f9;}
  .Bond_Popup .TopPopup .PopupClose{ width: 13px;height: 13px; background: url(../../../assets/img/icon.png)no-repeat 0px -135px;}
  .LowPrice{ margin-top: 25px;}
  .Bond_Popup_title{margin-left: 80px;color: #333;}
  .unit{position: absolute;right: 10px; line-height: 30px; color: #999; }
  .InputNum{padding-left: 10px;box-sizing: border-box;background-color: #f4f4f4;border: 1px solid #dddddd; line-height: 30px;border-radius: 3px;}
  .Bond_Popup .PricePopup{border-radius: 3px; border: 1px solid #ff7300;margin: 0 30px; background-color: #fffdee; margin-top: 20px;}
  .Bond_Popup .PricePopup .PricePopup_title{width: 120px;text-align: right; font-size: 14px;}
  .Bond_Popup .PricePopup .PricePopup_btn{ text-decoration: none; padding: 6px 15px;background-color: #ff7300; color: #fff; margin-left: 20px; border-radius: 3px;}


  .qg_text:first-child{margin-top: 10px;}
  .qg_text{width: 85%;margin: 10px auto; display: flex;align-items: center;}
  .addrTitle{width: 25%;text-align: right; font-size: 14px;}
  .inputText{ line-height: 32px;padding-left: 10px;box-sizing: border-box; width: 90%; border: 1px solid #dddddd;  border-radius: 3px;}

  .submitPrice{background-color: #007de4; padding: 10px 45px; color: #fff; border-radius: 3px;margin: 15px auto;}

  /*订单确认*/
  .ordercon{display: flex;flex-wrap: wrap; align-items: center; margin: 0 auto;width: 85%;}
  .ordercon li{width: 48%; margin-top:15px; font-size: 14px}

  /*输入验证码*/
  .PopupCode{border: 1px solid #ddd;margin: 20px 30px; display: flex; border-radius: 4px; align-items: center;}
  .PopupCode .TextCode{border: none; border-right:1px solid #DEDEDE ;margin: 8px 0; width: 70%; padding-left: 10px; box-sizing: border-box;}
  .PopupCode .AcqCode{width: 40%;text-align: center;}
</style>
