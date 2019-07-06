<template>

      <div class="memberList whitebg mt20">
        <ul class="mt25">
          <h1>订单管理</h1>
          <li><router-link to="./usertotalorder">全部订单</router-link></li>
        </ul>
        <ul class="mt35">
          <h1>预售管理</h1>
          <li><router-link to="./useradvsale">我的预售</router-link></li>
        </ul>
        <ul class="mt35">
          <h1>求购管理</h1>
          <li><router-link  to="./userseek">求购信息</router-link></li>
        </ul>
        <ul class="mt35">
          <h1>竞拍管理</h1>
          <li><router-link  to="./userauction">我的竞拍</router-link></li>
        </ul>
        <ul class="mt35">
          <h1>专料管理</h1>
          <li><router-link  to="./userSpecmat">我的专料</router-link></li>
        </ul>
        <ul class="mt35">
          <h1>物流管理</h1>
          <li><router-link  to="./userlog">物流管理</router-link></li>
        </ul>
        <ul class="mt35">
          <h1>资金管理</h1>
          <li><router-link to="./usercapitalmanage">资金管理</router-link></li>
        </ul>
        <ul class="mt35 mb40">
          <h1>账号管理</h1>
<!--          <li><router-link  to="./useraccountinfor">完善信息</router-link></li>-->
          <li><router-link  to="./usermodifyinfor">完善信息</router-link></li>
          <li><router-link  to="./userCodeManage">密码管理</router-link></li>
          <li><router-link  to="./userAccountBind">账号绑定</router-link></li>
          <li><router-link  to="./userAddress">收货地址</router-link></li>
        </ul>
      </div>

</template>

<script>
    export default {
        name: "userright"
    }
</script>

<style scoped>
  .memberList{border:1px solid #DEDEDE;border-top: 3px solid #007de4; width: 215px;}
  .memberList ul{margin-left: 45px;}
  .memberList ul li{margin-top: 10px; font-size: 14px; }
  .memberList ul li a{color: #999;}
  .memberList ul li:hover a{color: #007de4;}
  .memberList ul li.curr{color: #007de4;}
  .memberList h1{font-size: 18px;margin-bottom: 10px; padding-bottom: 10px; position: relative;}
</style>
