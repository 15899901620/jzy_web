<template>
  <div>
    <memheader  :PageTitle="Totile"></memheader>

  <div class="clearfix mb40">
    <div class="w1200 dflex "  >
      <!--会员中心列表-->
      <Rightmenu></Rightmenu>

      <!--右边信息-->
      <div class="memberInfor ml20  whitebg bdccc  mt20">


        <!--账号绑定-->
        <div class="ml25 mr25">
          <h1 class="fs16 bb1  mt25">账号绑定</h1>
          <ul class="code_manange mt30">
            <li>
              <span class="titleInfor">原始密码</span>
              <input type="text" class="inforInput" name="" id="" value="" />
              <i class="ml10 gray">请输入密码</i>

            </li>
            <li>
              <span class="titleInfor">新密码</span>
              <input type="text" class="inforInput" name="" id="" value="" /><i class="ml10 gray">密码长度需要在6-20个字符之间</i>

            </li>
            <li>
              <span class="titleInfor">新密码确认</span><input type="text" class="inforInput" name="" id="" value="" />
            </li>
          </ul>
          <div class="ConfirmSubmit">确认提交</div>
        </div>






      </div>






    </div>










  </div>


  </div>
</template>

<script>
  import memheader from '../../components/user-header/memheader'
  import Rightmenu from './trenderCompontent/Rightmenu'
    export default {
      name: "rightcode",
      components:{
        memheader,
        Rightmenu
      },
      data(){
          return{
            Totile: ''
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

  /*密码管理*/
  .code_manange li{display: flex;margin-top: 20px; align-items: center;}
  .ConfirmSubmit{ cursor: pointer; margin-left: 110px; margin-top: 40px; display: inline-block;padding: 10px 30px; color: #fff; border-radius: 3px; background-color: #007de4;}
  .code_manange li{display: flex;margin-top: 20px; align-items: center;}
  .ConfirmSubmit{ margin-left: 110px; margin-top: 40px; display: inline-block;padding: 10px 30px; color: #fff; border-radius: 5px; background-color: #007de4;}

  .titleInfor{width: 85px;color:#333; margin-right: 25px; text-align: right; font-size: 14px;}
  .inforInput{width: 340px;height: 36px;border-radius: 3px;border: 1px solid #DEDEDE; padding-left: 10px;
    box-sizing: border-box;}

</style>
