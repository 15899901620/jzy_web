<template>
  <div class="clearfix graybg">
    <div class="w1200 dflex " style="margin-bottom: 40px">
      <usernav></usernav>
      <div class="memberInfor ml20  whitebg bdccc  mt20">
        <h1 class="fs16 ml25 mt25 bb1 pb10" >账号绑定</h1>
        <ul class="bindingMobile mt20 ml20">
          <li>
            <span class="titleInfor">已绑手机</span><span class="fs14">13333837087</span>
          </li>
          <li>
            <span class="titleInfor">新绑号码</span><input type="text" class="BindInput" name="" id="" value="" />
          </li>
          <li>
            <span class="titleInfor">图文验证</span><input type="text" class="BindInput" style="width: 130px;" name="" id="" value="" />
            <div class="ml10 dflexAlem"><img src="../../assets/img/code_message.png" /></div>
          </li>
          <li>
            <span class="titleInfor">短信验证</span><input type="text" class="BindInput" style="width: 130px;" name="" id="" value="" />
            <div class="Obtain_code">获取验证码</div>
          </li>
        </ul>
        <div class="ConfirmSubmit">提交绑定</div>
      </div>
    </div>
  </div>
</template>

<script>
import userright from './userCompontent/userright'
import Navigation from '../../components/navigation'
export default {
  name: "userAccountBind",
  layout:'membercenter',
  components:{   
    usernav: Navigation.user,
  },
  fetch({ store }) {
    return Promise.all([
      store.dispatch('system/getSystemCnf'),
      store.dispatch('menu/getMenuList')
    ])
  }
}
</script>

<style scoped>
  .memberInfor{width: 83%}

  .bindingMobile .titleInfor{color: #333;}
  .bindingMobile li{display: flex;align-items: center; margin-top: 20px;}
  .BindInput{width: 280px;height: 36px; border: 1px solid #D2D2D2;padding-left: 10px;box-sizing: border-box;}
  .Obtain_code{ margin-left: 10px;  box-sizing: border-box; width: 140px;  height: 36px; line-height:36px; color: #666; background-color: #f2f2f2; text-align: center;border: 1px solid #D2D2D2;}

  .titleInfor{width: 85px;color:#999; margin-right: 25px; text-align: right; font-size: 14px;}

  .ConfirmSubmit{ margin-left: 130px; margin-top: 40px; display: inline-block;padding: 10px 30px; color: #fff; border-radius: 5px; background-color: #007de4;}

</style>
