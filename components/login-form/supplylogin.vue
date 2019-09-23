<template>
  <div class="supplierlogin">
    <Form ref="loginsupplierform" :model="loginsupplierform" :rules="ruleCustom">
      <Row :gutter="24" index="">
        <Col span="24">
          <FormItem prop="username">
            <Input v-model="loginsupplierform.username"  max="11" placeholder="手机号"/>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="24" index="">
        <Col span="24">
          <FormItem prop="slidecode">
            <slide-verify-supply @onChange="onTime"></slide-verify-supply>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="24" index="">
        <Col span="24">
          <FormItem prop="mobilecode">
            <Input v-model="loginsupplierform.mobilecode"  placeholder="短信验证码"/>
          </FormItem>
          <Button type="text" class="butGetCode" :disabled='this.btnBoolen' v-on:click="getNoteValue">{{this.btnValue}}</Button>
        </Col>
      </Row>
      <Row :gutter="24" index="">
        <Col span="24">
          <FormItem prop="password">
            <Input v-model="loginsupplierform.password" type="password" placeholder="登录密码"/>
          </FormItem>
        </Col>
      </Row>
      <Button type="primary" long v-on:click="LoginsupplyerForm">登录</Button>
      <Row :gutter="24" index="">
        <Col span="12" style="text-align:left; margin:10px auto;">
          <a href="/forgotpwd?type=supply">忘记密码</a>
        </Col>
        <Col span="12" style="text-align:right; margin:10px auto;">
          <a href="/register?type=supply" >注册新账号</a>
        </Col>
      </Row>
    </Form>
  </div>
</template>

<script>
import { supplierLogin, supplierValid, supplierCodeCheck,supplierCodeSend, supplierdataCheck } from '../../api/users'
import Cookies from 'js-cookie'
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
import { parse, stringify } from 'qs'
import SlideVerify from '../slide-verify'

export default {
  name: "supplylogin",
  components: {
    SlideVerifySupply: SlideVerify.supply
  },
  data(){
     const validatePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('手机号不能为空'));
      } else {
        if(this.loginsupplierform.username.length != 11){
            callback(new Error('请正确填写手机号，需是11位！'));
        }else {
          var myreg = /^0?(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;
          if(!myreg.test(this.loginsupplierform.username)){
            callback(new Error('请正确填写手机号'));
          }else{
            callback();
          }
        }
      }
    };
    const validateSlide = (rule, value, callback) => {
      if(value === 0){
        callback(new Error('请滑动完成验证'));
      }else{
        callback();
      }
    };
    return {
      NameCheck:false,
      passwordTip:false,
      cphones: false,
      btnValue: "发送验证码",
      btnBoolen: false,
      loginsupplierform:{
        username: '',
        mobilecode: '',
        password: '',
        slidecode: 0
      },
      ruleCustom: {
        username: [
          { validator: validatePhone, trigger: 'blur' }
        ],
        slidecode: [
          { validator: validateSlide, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      slidecode: state => state.system.slidecode,
      chackPhone: state => state.login.chackPhone,
    })
  },
  methods:{
    ...mapMutations({
      updateChackPhone: 'login/updateChackPhone'
    }),
    onTime(res){
      console.log(!res)
      if(res){
        this.loginsupplierform.slidecode = res
      }else{
        this.$Modal.warning({
          title: '提示',
          content:  '验证失败！',
          duration: 5,
          styles:'top:300px'
        });
      }
    },
    async LoginsupplyerForm(){

      if (!this.loginsupplierform.username) {
        this.$Modal.info({
          title: '提示',
          content: '手机号不能为空!'
        });
        return false
      }
      if (!this.loginsupplierform.slidecode) {
        this.$Modal.info({
          title: '提示',
          content: '滑块验证未完成!'
        });
        return false
      }
      if (!this.loginsupplierform.mobilecode) {
        this.$Modal.info({
          title: '提示',
          content: '验证码不能为空!'
        });
        return false
      }
      if (!this.loginsupplierform.password) {
        this.$Modal.info({
          title: '提示',
          content: '密码不能为空!'
        });
        return false
      }
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
        const res = await supplierLogin(this, params)
        let authres=res.data
        if(res.data.data===null && res.status === 200){
          this.$Modal.info({
            title: '提示',
            content: '账号密码及验证码错误!'
          });
          return false
        }else{
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
        this.$router.push({name: 'ForgotPassword-ForgotPassword', query: {params: 'Member'}})
    },
    //跳转注册页面
    Register(){
        this.$router.push({name: 'register-supplyRegister'})
    },
    //获取短信验证码
    async getNoteValue () {
      const that = this
      this.$refs.loginsupplierform.validate((valid) => {
        if (valid) {
          //正常情况下，检查是否已经是注册用户，如何不是中断不发送
          let params = {
            data: that.loginsupplierform.username,
            type: 2
          }
          let isPhone = true
          supplierdataCheck(that, params).then(function (res) {
            if(res.data === false) {
              that.updateChackPhone(true)
              that.$Modal.info({
                title: '提示',
                content: '该账号尚未注册，请您先注册!'
              });
              return false
            }else{
                //发送
                  let data = {
                      phone: that.loginsupplierform.username
                  }
               supplierCodeSend(that, data).then(function (res) {
                  if (res.data && res.status === 200) {
                    let countdown = 120
                    var timer = setInterval(() => {
                        countdown = countdown-1
                        if (countdown <= 0) {
                            clearInterval(timer)
                            that.btnBoolen = false;
                            that.btnValue = "发送验证码"
                        } else {
                            that.btnBoolen = true;
                            that.btnValue = `已发送(${countdown})S`
                        }
                    }, 1000)
                  } else {
                      that.$Modal.info({
                      title: '提示',
                      content: '短信发送失败'
                    });
                  }
                })
            }
          })
    
          if(this.chackPhone === true) {
            return false
          }
          
          let data = {
              phone: that.loginsupplierform.username
          }
        
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.supplierlogin {
  margin-top: 15px;
  .butGetCode {
    position: absolute;
    right: 15px;
    z-index: 1111;
    line-height: 14px;
    margin-top: 2px;
    top: 1px;
    border-left: 1px solid #ddd;
  }
  .ivu-form-item {
    margin-bottom: 20px;
  }
  .ivu-form-item-error-tip {
    padding-top:4px;
  }
}
</style>