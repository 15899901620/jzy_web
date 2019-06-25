<template>
  <div>


  <!--头部-->
  <div class="clearfix">
    <!--头部-文字-->
    <div class="IndexTop">
      <div class="w1200 TopPos">
        <div class="">您好，欢迎来到巨正源化工交易网！</div>
        <ul class="UserList">
          <li>巨正源首页</li><li>登录</li><li>注册</li><li>会员中心</li><li>关于我们</li><li>帮助中心</li>
        </ul>
      </div>
    </div>
  </div>
  <!--头部-logo/搜索/电话/菜单-->
  <div class="bgwhite">
    <!--头部-logo/搜索/电话-->
    <div class="w1200" >
      <div class="dflexAlem" style="justify-content: space-between;">
        <!--logo-->
        <div class="TopLogo mb50" @click="Index()">
          <img src="../assets/img/logo.png" />
        </div>
        <ul class="sp_cat_title_list">
          <li class="curr"><i>1</i><p>编辑详细信息</p></li>
          <li><i>2</i><p>提交订单</p></li>
          <li><i>3</i><p>支付货款</p></li>
          <li><i>4</i><p>支付完成</p></li>

        </ul>

      </div>
    </div>
  </div>



  <nuxt />
  <VFooter></VFooter>
  </div>
</template>

<script>
  import VFooter from '~/components/footer'

  export default {
        name: "SumbitOrderHeader",
    components:{
      VFooter
    },
    data(){
          return{}
    },
    methods:{
      Index(){
        let toindex='user.vue'
        this.$emit('Toindex',toindex)
        this.$router.push({name:'help.vue'})
      },
    },
    mounted(){
      console.log('Sumbit_$router',this.$router)
    }
    }
</script>

<style scoped>
  /*头部*/
  .IndexTop{background-color: #f8f8f8;border-bottom: 1px solid #f0f0f0;}
  .TopPos{color: #333; display: flex; justify-content: space-between; align-items: center; height: 30px;}

  /*个人信息*/
  .UserList{display: flex; flex-direction: row;}
  .UserList li:first-child{border-left:0;}.UserList li:last-child{border-right:0;}
  .UserList li{  border-right:1px solid #ddd8dd;border-left:1px solid #fff;padding: 0 20px;}
  .UserList li:last-child{padding-right: 0;}

  .TopLogo{margin-top: 40px;}
  /*编辑详细信息-进度条*/
  .sp_cat_title_list{background: #cccccc; border-radius: 15px; margin-bottom: 60px;margin-top: 40px;}
  .sp_cat_title_list li.curr {background: #007de4;border-radius: 15px;}
  .sp_cat_title_list li {height: 5px; position: relative;  float: left;  width: 150px;}
  .sp_cat_title_list li i {font-weight: bold; line-height: 22px;  background: #cccccc;   color: #fff;   border-radius: 50%;   left: 66px;
    top: -8px;  position: absolute; width: 22px; height: 22px;  text-align: center;}
  .sp_cat_title_list li.curr i { background: #007de4;}
  .sp_cat_title_list li.curr p {  color: #007de4;}
  .sp_cat_title_list li p {  text-align: center;position: absolute; top: 20px; width: 100%; font-size: 14px;}
</style>
