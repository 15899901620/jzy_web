<template>
    <div>
      <ul class="dflexAlem Carinput" style=" width: 537px; margin-top: 50px; flex-direction: column;justify-content: center;">
        <li><span class="CarrierTitle"><i class="orangeFont mr5">*</i>手机号码</span> <input type="text" class="CarrierIput" name="" id="" value="" placeholder="请输入手机号" /> </li>
        <li><span class="CarrierTitle"><i class="orangeFont mr5">*</i>验证码</span>
          <input type="text" class="CarrierIput" style="width: 265px;" name="" id="" value="" placeholder="请输入验证码" />
          <div class="codeCarrier"><img src="../../assets/img/carrierCode.png"/></div>
        </li>
        <li><span class="CarrierTitle"><i class="orangeFont mr5">*</i>登录密码</span> <input type="text" class="CarrierIput"  name="" id="" value="" placeholder="请输入密码" /> </li>
        <li><span class="CarrierTitle"><i class="orangeFont mr5">*</i>确认密码</span> <input type="text" class="CarrierIput" name="" id="" value=""  placeholder="请再次输入密码" /> </li>
      </ul>
      <div class="dflexAlem mt15 fs14" style="justify-content: center; width: 537px;">
        <div style="width: 18px;height: 18px;   margin-right: 10px;margin-top: -4px;">
          <Checkbox v-model="single"  ></Checkbox>
        </div>
        <span>我已阅读并同意</span><a href="#.html" class="orangeFont">《巨正源用户服务协议》</a>
      </div>
      <div class="dflexAlem mt15" style="justify-content: center;">
        <button class="CarrierRegister">完成注册</button>
      </div>
    </div>
</template>

<script>
    export default {
        name: "carrierRegister",
      data() {
        return {
          single: false
        };
      }
    }
</script>

<style scoped>
  /*注册进度*/
  .CarrierTitle{width: 90px;text-align: right; color: #333; margin-right: 10px;}
  .Carinput li{display: flex;align-items: center;margin-top: 20px; font-size: 14px;}
  .Carinput li .CarrierIput{box-sizing: border-box; width: 375px;border-radius: 3px;}
  .Carinput li .codeCarrier{margin-left: 20px;width: 90px; height: 42px; border-radius: 5px; display: flex; align-items: center;}
  .CarrierRegister{margin-top: 30px;margin-bottom: 60px;margin-left: 38px; border-radius:3px;  cursor: pointer; font-size: 14px;
    width: 375px;height: 42px;border: none; background-color: #007de4; color: #fff;}

  .ivu-checkbox-inner{width: 18px;height: 18px;}
  .ivu-checkbox-inner:after{width: 6px;height: 10px;top: 1px;left: 5px;}
  .ivu-checkbox-checked .ivu-checkbox-inner:after{ width: 6px;height: 10px;top: 1px;left: 5px; }
  .ivu-input{height: 42px;line-height: 42px;}
</style>
