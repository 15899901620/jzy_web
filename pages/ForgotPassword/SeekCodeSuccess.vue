<template>
  <div class="clearfix graybg ovh">
    <div class="w1200 whitebg " style="margin-top: 20px; border-radius: 3px; overflow: hidden;">
      <!--进度-->
      <div class="dflexAlem" style="justify-content: center; margin-top: 65px; margin-left: 60px;">
        <div class="CarrierPro dflexAlem curr" style=" flex-direction: column;  ">
          <div class="CarrierPro_num ">1</div>
          <span>填写账户信息</span>
        </div>
        <div class="lineProgress" style="width: 154px;"></div>
        <div class="CarrierPro dflexAlem curr" style=" flex-direction: column;  ">
          <div class="CarrierPro_num">2</div>
          <span>重置密码</span>
        </div>
        <div class="lineProgress" style="width: 154px;"></div>
        <div class="CarrierPro dflexAlem" style=" flex-direction: column;  ">
          <div class="CarrierPro_num">3</div>
          <span>完成</span>
        </div>
      </div>

      <div class="dflexAlem" style="margin-left: 380px; margin-top: 80px; margin-bottom: 80px;">
        <div class="codeSuccess"></div>
        <div class="ml15 fs16" style="color: #666;">
          <p>新密码设置成功</p>
          <p>请牢记您设置的新密码  <nuxt-link class="ml20 blueFont cp" to="/">返回首页</nuxt-link></p>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
    export default {
        name: "SeekCodeSuccess"
    }
</script>

<style scoped>

  .CarrierPro{position: relative;}
  .CarrierPro.curr .CarrierPro_num{background-color: #007de4; color: #fff;}
  .CarrierPro.curr span{color: #007de4;}
  .CarrierPro span{position: absolute;bottom: -25px;width: 90px;text-align: center; color: #666; font-size: 14px;}
  .lineProgress{border: 1px dashed #DEDEDE;width: 20%; margin: 0 5px;}
  .CarrierPro_num{ color: #666; width: 41px;height: 41px; line-height: 41px; text-align: center;font-size: 16px;border-radius: 50%;background-color: #f0f2f5;}

  .codeSuccess{ width: 60px;height: 60px; background: url(../../assets/img/icon.png)no-repeat -113px -524px;}


</style>
