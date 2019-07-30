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
      <div  class="cp"><nuxt-link to="/forgotpwd" >忘记密码</nuxt-link></div>
      <div  class="cp"><nuxt-link to="/register" >注册新账号</nuxt-link></div>
    </div>
  </div>
</template>

<script>
import { manageLogin, memberValid } from '../../api/users'
import Cookies from 'js-cookie'
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
import { parse, stringify } from 'qs'


export default {
  name: "login",
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
    ...mapMutations('login',[
      'updateUserInfof'
    ]),
    
    async LoginForm(){
      if(!this.loginform.username){
        this.NameCheck=true
        this.NameText='手机号和用户名不能为空!'
        return
      }
      var myreg = /^0?(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;
      if(!myreg.test(this.loginform.username)){
        this.NameCheck=true
        this.NameText='手机号和用户名不能为空!'
        return
      }else{
        this.NameCheck=false
        let params = {
          username:this.loginform.username.replace(/^\s+|\s+$/g,""),
          password:this.loginform.password.replace(/^\s+|\s+$/g,"")
        }
      
        const res = await manageLogin(this, params)
        if(res.data.data === null && res.status === 200) {
          this.passwordTip=true
          this.passwordName='账号密码错误！'
          return
        }else{
          var authres = res.data
          if(authres && res.status === 200){
            let expires = new Date((new Date()).getTime() + 5 * 60 * 60000);
            Cookies.set('webtoken',  authres, { expires: expires })
            const res = await memberValid(this, {})
            if(res.data  && res.status === 200){
              let auth= stringify(res.data)
              Cookies.set('userinfor', auth, { expires: 36000000 || 1 })
               this.updateUserInfof(res.data)
              this.$router.push({name:'index'})
            }else{
              this.passwordTip=true
              this.passwordName='登录失败请与管理员联系！'
              return
            }
          }
        }
      }
    },
    //忘记密码
    ForgotPassword(){
      this.$router.push({name:'ForgotPassword-ForgotPassword',query:{params:'Member'}})
    },

    //跳转注册页面
    Register(){
      this.$router.push({name:'register-supplyRegister'})
    },
  },
  mounted() {
      
    // this.updateUserInfof('11111')
  }
}
</script>

<style scoped>

</style>
