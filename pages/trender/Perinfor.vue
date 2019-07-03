<template>
  <div class="clearfix mb40">
    <div class="w1200 dflex "  >
      <!--会员中心列表-->
      <Rightmenu></Rightmenu>

      <!--右边信息-->
      <div class="memberInfor ml20  whitebg bdccc  mt20">
        <!--修改信息-->
        <div class="ml25 mr25">
          <h1 class="fs16 bb1  mt25 pb10">修改信息</h1>
          <!-- 基本信息-->

          <ul class="BaseInfor mt30">
            <h3 class="perfectTitle">基本信息</h3>
            <li><span class="perfectInput">公司名称</span><input type="text" class="textPerfect bdccc" name="" id="" value="" /></li>
            <li><span class="perfectInput">营业执照</span><div class="textPerfect bdccc"></div></li>
            <li><span class="perfectInput">道路运输经营许可证</span><div class="textPerfect bdccc"></div></li>
            <li><span class="perfectInput">其他资质</span><div class="textPerfect bdccc"></div></li>
            <li><span class="perfectInput">企业授权书</span><div class="textPerfect bdccc"></div></li>
          </ul>

          <ul class="BaseInfor mt40">
            <h3 class="perfectTitle">开票信息</h3>
            <li><span class="perfectInput">公司名称</span><input type="text" class="textPerfect bdccc" name="" id="" value="" /></li>
            <li><span class="perfectInput">纳税人识别号</span><div class="textPerfect bdccc"></div></li>
            <li><span class="perfectInput">开户行</span><div class="textPerfect bdccc"></div></li>
            <li><span class="perfectInput">账号</span><div class="textPerfect bdccc"></div></li>
            <li><span class="perfectInput">地址</span><div class="textPerfect bdccc"></div></li>
            <li><span class="perfectInput">电话</span><div class="textPerfect bdccc"></div></li>
          </ul>
          <ul class="BaseInfor mt40">
            <h3 class="perfectTitle">联系人信息</h3>
            <li><span class="perfectInput">昵称</span><input type="text" class="textPerfect bdccc" name="" id="" value="" /></li>
            <li><span class="perfectInput">联系人</span><div class="textPerfect bdccc"></div></li>
            <li><span class="perfectInput">电话</span><div class="textPerfect bdccc"></div></li>
            <li><span class="perfectInput">座机</span><div class="textPerfect bdccc"></div></li>
            <li><span class="perfectInput">邮箱</span><div class="textPerfect bdccc"></div></li>
          </ul>
          <div class="ConfirmSubmit mb40" style="margin-left: 165px;">确认提交</div>

        </div>





      </div>


    </div>













  </div>


</template>

<script>
  import memheader from '../../components/user-header/memheader'
  import Rightmenu from './trenderCompontent/Rightmenu'

    export default {
        name: "Perinfor",
      layout:'membercenter',
      components:{
        memheader,
        Rightmenu
      },
      data(){
        return{
          Totile:'',
        }
      },
      methods:{},
      mounted(){
        this.Totile=this.$router.history.current.query.category
      },

    }
</script>

<style scoped>
  /*右侧内容*/
  .memberInfor{width: 970px;}

  .BaseInfor{display: flex; flex-direction: column; font-size: 14px;}
  .BaseInfor li{display: flex; margin-top: 20px;align-items: center;}
  .perfectTitle{border-left: 2px solid #007de4; color: #007de4; font-weight: bold;padding-left: 5px;}
  .perfectInput{text-align: right;width: 17%; color: #999;padding-right: 15px;}
  .textPerfect{width: 35%;  height: 35px;line-height: 35px;border-radius: 3px; padding-left: 10px;color: #666;box-sizing: border-box;}
  .perfectInput:before{content: '*'; font-size: 14px;color: #ff6700; padding-right: 5px;}

  .ConfirmSubmit{ cursor: pointer; margin-left: 110px; margin-top: 40px; display: inline-block;padding: 10px 30px; color: #fff; border-radius: 3px; background-color: #007de4;}

</style>
