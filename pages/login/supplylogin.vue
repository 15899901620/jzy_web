<template>
  <div>

    <div class="mt25">
      <input type="text" class="NumInput" v-model="loginsupplierform.username"  placeholder="手机/用户名" />
    </div>
    <div class="mt15">
      <input type="password" class="NumInput"  v-model="loginsupplierform.password" placeholder="密码" />
    </div>

    <div class="logingAccount" @click="LoginsupplyerForm">登 录</div>
  </div>
</template>

<script>

  import { supplierLogin, supplierValid } from '../../api/users'
  import Cookies from 'js-cookie'

  export default {
        name: "supplylogin",
      data(){
          return{
        loginsupplierform:{
          username:'',
          password:''
        }
      }
      },
      methods:{
        async LoginsupplyerForm(){
          console.log('LoginForm')
          console.log('this.LoginForm', this.loginsupplierform)
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
            console.log('res',res)
            console.log('res.data',res.data)
            let authres=res.data
            if(res.data && res.status === 200){

              console.log('authres',authres)

              Cookies.set('websuppliertoken',  authres, { expires: 36000000 || 1 })

              const res = await supplierValid(this, {})

              console.log('authres', res)

              let auth= JSON.stringify(res.data)

              if(auth){
                Cookies.set('supplierinfor', auth, { expires: 36000000 || 1 })
                this.$router.push({name:'trender-WineBid'})
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
      }

    }
</script>

<style scoped>
  .NumInput{ padding-left: 10px; width: 100%;border: 1px solid #dddddd; border-radius: 3px; line-height: 36px;box-sizing: border-box;}
  .logingAccount{text-align: center; width: 100%; cursor: pointer; background-color: #007de4;border: none;line-height: 36px;color: #fff;border-radius: 3px;margin-top: 35px;}


</style>
