<template>
    <div>

      <div class="mt25">
        <input type="text" class="NumInput" v-model="loginform.username"  placeholder="手机/用户名" />
      </div>
      <div class="mt15">
        <input type="password" class="NumInput"  v-model="loginform.password" placeholder="密码" />
      </div>
      <div class="msg-wrap" >
        <div class="msg-error" v-show="NameCheck"><b></b><span>{{NameText}}</span></div>
        <div class="msg-error" v-show="passwordTip"><b></b><span>{{passwordName}}</span></div>
      </div>

      <div class="logingAccount" @click="LoginForm">登 录</div>

      <div class="mt40 dflex codeNews" style="justify-content: space-between; color: #666; ">
        <div  class="cp" @click="ForgotPassword()" >忘记密码</div>
        <div  class="cp" @click="Register()" >注册新账号</div>
      </div>
    </div>
</template>

<script>

import { manageLogin, memberValid } from '../../api/users'
import Cookies from 'js-cookie'

export default {
  name: "memberlogin",
  data() {
    return{
      NameCheck:false,
      passwordTip:false,
      NameText:'',
      passwordName:'',
      loginform:{
        username:'',
        password:''
      }
    };
  },
  methods:{
    async LoginForm(){

      console.log('LoginForm')
      console.log('this.LoginForm', this.loginform)
      if(!this.loginform.username){
        this.NameCheck=true
        this.NameText='手机号和用户名不能为空!'
        return
      }

      var myreg = /^0?(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;
      if(!myreg.test(this.loginform.username)){
        this.$Message.info({
          content: '手机号格式不正确',
          duration: 5,
          closable: true
        })
        return
      }else{
        this.NameCheck=false
        let params = {
          username:this.loginform.username,
          password:this.loginform.password
        }
        const res = await manageLogin(this, params)

        console.log('res',res.data)
        console.log('res.data',res.data)
        if(res.data.data === null && res.status === 200) {
          this.passwordTip=true
          this.passwordName='账号密码错误！'
          return
        }else{
          var authres = res.data

          console.log('authres', res)
        if(authres && res.status === 200){
          Cookies.set('webtoken',  authres, { expires: 36000000 || 1 })

          const res = await memberValid(this, {})
          console.log('authres', res)
          if(res.data  && res.status === 200){
            let auth= JSON.stringify(res.data)
            Cookies.set('userinfor', auth, { expires: 36000000 || 1 })
            this.$router.push({name:'users-user'})
          }else{
            this.passwordTip=true
            this.passwordName='登录失败请与管理员联系！'
            return
          }
        }
        }
      }
    }
  },
  mounted() {

  }
}
</script>

<style scoped>
  .NumInput{ padding-left: 10px; width: 100%;border: 1px solid #dddddd; border-radius: 3px; line-height: 36px;box-sizing: border-box;}
  .logingAccount{text-align: center; width: 100%; cursor: pointer; background-color: #007de4;border: none;line-height: 36px;color: #fff;border-radius: 3px;margin-top: 15px;}

  .msg-wrap {min-height: 26px;height: auto!important;height: 26px;}
  .msg-error {position: relative;background: #fff;color: #fa0a0a;border: 1px solid #fa0a0a;padding: 3px 10px 3px 40px;line-height: 18px;
    min-height: 18px;_height: 18px;}
    .msg-error b{position: absolute;top: 50%;left: 10px;
    display: block;margin-top: -8px;width: 16px;height: 16px;overflow: hidden;background: url('../../assets/img/icon.png') -314px -5px no-repeat;}
</style>
