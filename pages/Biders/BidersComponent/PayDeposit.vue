<template>
  <div class="Mask">
    <div class="Bond_Popup">
      <div class="TopPopup">
        <div>缴纳保证金</div> <div class="PopupClose"></div>
      </div>

      <div class="mt25">
        <span class="Bond_Popup_title">竞拍低价：</span><span class="ml10">￥10610.00元</span>
      </div>
      <!--竞拍数量-->
      <div class="mt15 dflex"  style="align-items: center;">
        <span class="Bond_Popup_title">竞拍数量：</span>
        <div class="pr ml10">
          <input  class="InputNum" name="" id="" value="60" /><span class="unit">吨</span>
        </div>
      </div>
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
        <input type="text" class="TextCode" placeholder="请输入手机验证码" /> <a class="AcqCode">点击获取验证码</a>
      </div>
      <div class="graybg" style="display: flex; justify-content: center; align-items: center;">
        <a class="submitPrice">缴纳保证金</a>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "PayDeposit"
    }
</script>

<style scoped>

</style>
