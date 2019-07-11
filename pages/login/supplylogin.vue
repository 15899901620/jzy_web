<template>
  <div>

    <div class="mt25">
      <input type="text" class="NumInput" v-model="loginsupplierform.username"  placeholder="手机/用户名" />
    </div>
    <div class="mt15">
      <input type="password" class="NumInput"  v-model="loginsupplierform.password" placeholder="密码" @keyup.enter='LoginsupplyerForm' />
    </div>
    <div class="msg-wrap" >
      <div class="msg-error" v-show="NameCheck"><b></b><span>{{NameText}}</span></div>
      <div class="msg-error" v-show="passwordTip"><b></b><span>{{passwordName}}</span></div>
    </div>

    <div class="logingAccount" @click="LoginsupplyerForm">登 录</div>
    <div class="mt40 dflex codeNews" style="justify-content: space-between; color: #666; ">
      <div  class="cp" @click="ForgotPassword()" >忘记密码</div>
      <div  class="cp" @click="Register()" >注册新账号</div>
    </div>
  </div>
</template>

<script>

  import { supplierLogin, supplierValid } from '../../api/users'
  import Cookies from 'js-cookie'

  export default {
        name: "supplylogin",
      data(){
          return{
            NameCheck:false,
            passwordTip:false,
            NameText:'',
            passwordName:'',
            loginsupplierform:{
            username:'',
            password:''
        }
      }
      },
      methods:{
        async LoginsupplyerForm(){
          var myreg = /^0?(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;
          if(!myreg.test(this.loginsupplierform.username)){
            this.$Message.info({
              content: '手机号格式不正确',
              duration: 5,
              closable: true
            })
            return
          }else{
            let params = {
              username:this.loginsupplierform.username,
              password:this.loginsupplierform.password
            }
            console.log('params', params)
            const res = await supplierLogin(this, params)
            console.log('Loginres' ,res)
            let authres=res.data
            if(res.data.data===null && res.status === 200){
              this.passwordTip=true
              this.passwordName='账号密码错误！'
              return
            }else{
              console.log('authres' ,authres)
              let expires = new Date((new Date()).getTime() + 5 * 60 * 60000);
              Cookies.set('websuppliertoken',  authres, { expires: expires })
              const res = await supplierValid(this, {})

              if(res.data  && res.status === 200){
                let auth= JSON.stringify(res.data)
                Cookies.set('supplierInfor', auth, { expires: 36000000 || 1 })
                this.$router.push({name:'trender-WineBid'})
              }else{
                this.passwordTip=true
                this.passwordName='登录失败请与管理员联系！'
                return
              }
            }

          }
        },
        //忘记密码
        ForgotPassword(){
          this.$router.push({name:'ForgotPassword-ForgotPassword',query:{params:'Supplier'}})
        },
        Register(){
          this.$router.push({name:'register-supplyRegister',query:{params:'Supplier'}})
        }



      },

    }
</script>

<style scoped>



</style>
