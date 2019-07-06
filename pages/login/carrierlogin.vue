<template>
  <div>

    <div class="mt25">
      <input type="text" class="NumInput" v-model="loginform.username"  placeholder="手机/用户名" />
    </div>
    <div class="mt15">
      <input type="password" class="NumInput"  v-model="loginform.password" placeholder="密码" @keyup.enter='LoginForm' />
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
    export default {
        name: "carrierlogin",
      data(){
          return{
            NameCheck:false,
            passwordTip:false,
            NameText:'',
            passwordName:'',
            loginform:{
              username:'',
              password:''
            }
          }
      },
      methods:{
        LoginForm(){},
      }
    }
</script>

<style scoped>

</style>
