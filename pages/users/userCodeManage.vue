<template>
  <div class="clearfix graybg">
    <div class="w1200 dflex " style="margin-bottom: 40px">
      <userright></userright>

      <div class="memberInfor ml20  whitebg bdccc  mt20">
        <h1 class="fs16 ml25 mt25 bb1 pb10" >密码管理</h1>
        <ul class="code_manange mt30 ml20">
          <li>
            <span class="titleInfor">原始密码</span>
            <input type="text" class="inforInput" name=""  value="" />
            <i class="ml10 gray">请输入密码</i>

          </li>
          <li>
            <span class="titleInfor">新密码</span>
            <input type="text" class="inforInput" name=""  value="" /><i class="ml10 gray">密码长度需要在6-20个字符之间</i>

          </li>
          <li>
            <span class="titleInfor">新密码确认</span><input type="text" class="inforInput" name=""  value="" />
          </li>
        </ul>
        <div class="ConfirmSubmit">确认提交</div>

      </div>


</div>
  </div>
</template>

<script>
  import userright from './userCompontent/userright'
    export default {
        name: "userCodeManage",
      layout:'membercenter',
      components:{
        userright
      }
    }
</script>

<style scoped>
  .memberInfor{width: 83%}

  .code_manange li{display: flex;margin-top: 20px; align-items: center;}
  .ConfirmSubmit{ margin-left: 110px; margin-top: 40px; display: inline-block;padding: 10px 30px; color: #fff; border-radius: 5px; background-color: #007de4;}
  .titleInfor{width: 85px;color:#999; margin-right: 25px; text-align: right;  font-size: 14px;}
  .inforInput{width: 340px;height: 36px;border-radius: 3px;border: 1px solid #DEDEDE; padding-left: 10px;
    box-sizing: border-box;}
</style>
