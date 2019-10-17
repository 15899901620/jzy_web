<template>
  <div class="clearfix mb40">
    <div class="w1200 dflex ">
      <!--会员中心列表-->
      <div class="memberList whitebg mt20 fs14" style="height: 600px;">
        <ul class="mt25">
          <h1 class="curr">招标管理 <div class="bodbottom"></div></h1>
          <li>招标管理</li>
        </ul>
        <ul class="mt35">
          <h1 >账户管理 </h1>
          <li class="curr"><a  href="#.html">完善信息</a></li>
          <li><a  href="#.html">密码管理</a></li>
        </ul>
      </div>



    </div>
  </div>
</template>

<script>
    export default {
        name: "TenderModifyInfor"
    }
</script>

<style scoped>
  /*左侧菜单*/
  .memberList{border:1px solid #DEDEDE;border-top: 3px solid #007de4; width: 215px;}
  .memberList ul{margin-left: 45px;}
  .memberList ul li{color: #999;margin-top: 10px;}
  .memberList ul li.curr{color: #007de4;}
  .memberList h1{font-size: 16px;margin-bottom: 0px; padding-bottom: 0px; position: relative;}

</style>
