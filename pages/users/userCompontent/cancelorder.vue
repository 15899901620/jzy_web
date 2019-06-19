<template>
  <div class="Mask" style="display: flex;" v-show="Isshowbd">
    <div class="Bond_Popup" style="width: 395px;">

      <div class="TopPopup">
        <div>取消订单</div> <div class="PopupClose" @click="Hidden()" ></div>
      </div>
      <div class="ml30 mt20" style="width: 85%;">
        专料用户当日累计超过<span class="orangeFont">3次</span>取消未支付自动冻结客户交易权限
      </div>
      <div class="ml30 mt20">
        <a href="#.html">是否取消订单？ </a>
      </div>
      <!--输入验证码-->
      <div class="PopupCode">
        <input type="text" class="TextCode" placeholder="请输入手机验证码"> <a class="AcqCode">点击获取验证码</a>
      </div>
      <div class="graybg" style="display: flex; justify-content: center; align-items: center;">
        <a class="submitPrice">发  布</a>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "cancelorder",
      data(){
          return{
            Isshowbd:''
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
  .Bond_Popup{ width: 415px; background-color: #fff; border-radius: 3px; font-size: 14px;}
  .Bond_Popup .TopPopup{display: flex; justify-content: space-between; align-items: center; padding: 10px 30px; color: #666;background-color: #f9f9f9;}
  .Bond_Popup .TopPopup .PopupClose{ width: 13px;height: 13px; background: url(../../../assets/img/icon.png)no-repeat 0px -135px;}
  /*输入验证码*/
  .PopupCode{border: 1px solid #ddd;margin: 20px 30px; display: flex; border-radius: 4px; align-items: center;}
  .PopupCode .TextCode{border: none; border-right:1px solid #DEDEDE ;margin: 8px 0; width: 70%; padding-left: 10px; box-sizing: border-box;}
  .PopupCode .AcqCode{width: 40%;text-align: center;}

  /*缴纳保证金*/
  .submitPrice{background-color: #007de4; padding: 10px 45px; color: #fff; border-radius: 3px;margin: 15px auto;}
</style>
