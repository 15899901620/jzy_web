<template>
    <div>

      <div class="mt25">
        <input type="text" class="NumInput" v-model="loginform.username"  placeholder="手机/用户名" />
      </div>
      <div class="mt15">
        <input type="password" class="NumInput"  v-model="loginform.password" placeholder="密码" />
      </div>

      <div class="logingAccount" @click="LoginForm">登 录</div>
    </div>
</template>

<script>

import { manageLogin, memberValid } from '../../api/users'
import Cookies from 'js-cookie'

export default {
  name: "memberlogin",
  data() {
    return{
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
      var myreg = /^0?(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;
      if(!myreg.test(this.loginform.username)){
        this.$Message.info({
          content: '手机号格式不正确',
          duration: 5,
          closable: true
        })
        return
      }else{
        let params = {
          username:this.loginform.username,
          password:this.loginform.password
        }
        console.log('params', params)
        const res = await manageLogin(this, params)
        console.log('res',res)
        if(res.data && res.status === 200){
          Cookies.set('token',  res.data, { expires: 36000000 || 1 })

          const res = await memberValid(this, {})
          console.log('authres', res)
          let auth= JSON.stringify(res.data)
          if(auth){
            Cookies.set('token', auth, { expires: 36000000 || 1 })
            this.$router.push({name:'users-user'})
          }


        }else{
          this.$Message.info({
            content: res.data.message,
            duration: 5,
            closable: true
          })
          return
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
  .logingAccount{text-align: center; width: 100%; cursor: pointer; background-color: #007de4;border: none;line-height: 36px;color: #fff;border-radius: 3px;margin-top: 35px;}
</style>
