<template>
  <div>
  <div class="clearfix">
    <!--头部-文字-->
    <div class="IndexTop">
      <div class="w1200 TopPos">
        <div class="">您好，欢迎来到巨正源化科技电商平台！</div>
        <ul class="UserList">
          <li>首页</li>
        </ul>

      </div>
    </div>

  </div>
  <!--头部-logo/进度-->
  <div class="bgwhite">
    <!--头部-logo/搜索/电话-->
    <div class="w1200"  style="display: flex; justify-content: space-between;">

      <div class="dflexAlem"  >
        <!--logo-->
        <div class="mt20 mb20" style="border-right: 1px solid #D2D2D2; padding-right: 30px;">
          <img src="../../../static/img/logo.png"/>
        </div>
        <div class="fs20 pl25 gray">电商平台登录</div>
      </div>
      <!--电话-->
      <div class="dflexAlem fs20 gray" style="color: #666;" >服务热线 : 4009-000-000</div>
    </div>
  </div>

  </div>
</template>

<script>
     export default {
        name: "top",

    }
</script>

<style scoped>
  /*头部*/
  .IndexTop{background-color: #f8f8f8;border-bottom: 1px solid #f0f0f0;}
  .TopPos{color: #333; display: flex; justify-content: space-between; align-items: center; height: 30px; font-size: 14px;}
  /*个人信息*/
  .UserList{display: flex; flex-direction: row;}
  .UserList li:first-child{border-left:0;}.UserList li:last-child{border-right:0;}
  .UserList li{  border-right:1px solid #ddd8dd;border-left:1px solid #fff;padding: 0 20px;}
  .UserList li:last-child{padding-right: 0;}
</style>
