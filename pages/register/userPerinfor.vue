<template>
    <div>
      <div class="carrierInfor_title">开票信息</div>
      <ul class="dflexAlem Carinput" style=" margin-top: 23px; flex-direction: column;justify-content: center;">
        <li><span class="CarrierTitle"><i class="orange mr5">*</i>公司名称</span> <input type="text" class="CarrierIput" name="" id="" value="" placeholder="请输入公司名称" /> </li>
        <li><span class="CarrierTitle"><i class="orange mr5">*</i>纳税人识别号</span> <input type="text" class="CarrierIput"  name="" id="" value="" placeholder="请输入纳税人识别号" /> </li>
        <li><span class="CarrierTitle"><i class="orange mr5">*</i>开户行</span> <input type="text" class="CarrierIput" name="" id="" value=""  placeholder="请输入开户行" /> </li>
        <li><span class="CarrierTitle"><i class="orange mr5">*</i>账号</span> <input type="text" class="CarrierIput" name="" id="" value="" placeholder="请输入账号" /> </li>
        <li><span class="CarrierTitle"><i class="orange mr5">*</i>地址</span> <input type="text" class="CarrierIput"  name="" id="" value="" placeholder="请输入详细地址" /> </li>
        <li><span class="CarrierTitle"><i class="orange mr5">*</i>电话</span> <input type="text" class="CarrierIput" name="" id="" value=""  placeholder="请输入联系电话" /> </li>
      </ul>
      <div class="carrierInfor_title">基本信息</div>
      <ul class="dflexAlem Carinput" style=" margin-top: 23px; flex-direction: column;justify-content: center;">
        <li><span class="CarrierTitle"><i class="orange mr5">*</i>联系人</span> <input type="text" class="CarrierIput" name="" id="" value="" placeholder="请输入公司名称" /> </li>
        <li><span class="CarrierTitle"><i class="orange mr5">*</i>营业执照</span>
          <div style="width: 370px;"></div>
        </li>
        <li><span class="CarrierTitle"><i class="orange mr5">*</i>授权书</span><div style="width: 370px;"></div> </li>
      </ul>
      <div class="dflexAlem mt15" style="justify-content: center;">
        <button class="CarrierRegister">提  交</button>
      </div>
    </div>
</template>

<script>
    export default {
        name: "userPerinfor"
    }
</script>

<style scoped>
  .carrierInfor_title{display: block; line-height: 50px; font-size: 16px;  padding-left: 125px; margin: 0 90px;height: 50px;background-color: #f8f8f8; margin-top: 80px;}
  .Carinput li{display: flex;align-items: center;margin-top: 20px;}
  .Carinput li .CarrierIput{padding-left: 10px;box-sizing: border-box; width: 375px;border-radius: 3px;border: 1px solid #dddddd; height: 42px;line-height: 42px;}
  .Carinput li .codeCarrier{margin-left: 20px;width: 90px; height: 42px; border-radius: 5px; display: flex; align-items: center;}
  .CarrierRegister{margin-top: 30px;margin-bottom: 60px;margin-left: 103px; border-radius:3px;  cursor: pointer;width: 375px;height: 42px;border: none; background-color: #007de4; color: #fff;}

  .CarrierTitle{width: 100px;text-align: right; color: #333; margin-right: 10px;}

</style>
