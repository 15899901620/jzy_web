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
      <div class="CarrierPro dflexAlem" style=" flex-direction: column;  ">
        <div class="CarrierPro_num">2</div>
        <span>重置密码</span>
      </div>
      <div class="lineProgress" style="width: 154px;"></div>
      <div class="CarrierPro dflexAlem" style=" flex-direction: column;  ">
        <div class="CarrierPro_num">3</div>
        <span>完成</span>
      </div>
    </div>

    <ul class="dflexAlem Carinput" style=" margin-top: 50px; flex-direction: column;justify-content: center;">
      <li><span class="CarrierTitle"><i class="orangeFont mr5">*</i>手机号码</span> <input type="text" class="CarrierIput" name="" id="" value="" placeholder="请输入手机号" /> </li>
      <li><span class="CarrierTitle"><i class="orangeFont mr5">*</i>验证码</span>
        <input type="text" class="CarrierIput" style="width: 265px;" name="" id="" value="" placeholder="请输入验证码" />
        <div class="codeCarrier"><img src="../../assets/img/carrierCode.png"/></div>
      </li>
    </ul>

    <div class="dflexAlem mt15" style="justify-content: center;">
      <Button class="CarrierRegister" @click="mobileCode()">下 一 步</Button>
    </div>

  </div>
</div>
</template>

<script>
    export default {
      name: "ForgotPassword",
      layout: 'noHeader',
      data(){
        return{}
      },
      methods:{
        mobileCode(){
          this.$router.push({path:'./mobilecodePassword'})
        }
      }
    }
</script>

<style scoped>
  /*注册进度*/
  .CarrierPro{position: relative;}
  .CarrierPro.curr .CarrierPro_num{background-color: #007de4; color: #fff;}
  .CarrierPro.curr span{color: #007de4;}
  .CarrierPro span{position: absolute;bottom: -25px;width: 90px;text-align: center; color: #666; font-size: 14px;}
  .lineProgress{border: 1px dashed #DEDEDE;width: 20%; margin: 0 5px;}
  .CarrierPro_num{ color: #666; width: 41px;height: 41px; line-height: 41px; text-align: center;font-size: 16px;border-radius: 50%;background-color: #f0f2f5;}

  .CarrierTitle{width: 100px;text-align: right; color: #333; margin-right: 10px; font-size: 14px;}
  .Carinput li{display: flex;align-items: center;margin-top: 20px;}
  .Carinput li .CarrierIput{ font-size: 14px; padding-left: 10px;box-sizing: border-box; width: 375px;border-radius: 3px;border: 1px solid #dddddd; height: 42px;line-height: 42px;}
  .Carinput li .codeCarrier{margin-left: 20px;width: 90px; height: 42px; border-radius: 5px; display: flex; align-items: center;}
  .CarrierRegister{margin-top: 30px;margin-bottom: 60px;margin-left: 103px; border-radius:3px;  cursor: pointer;width: 375px;height: 42px;border: none; background-color: #007de4; color: #fff;}

</style>
