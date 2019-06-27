<template>
   <div>
     <Form ref="formCustom" :model="formCustom" :rules="ruleCustom">
     <ul class="dflexAlem Carinput" style=" width: 537px; margin-top: 50px; flex-direction: column;justify-content: center;">
       <li>
         <span class="CarrierTitle"><i class="orangeFont mr5">*</i>手机号码</span>
         <FormItem prop="phone">
           <Input   v-model="formCustom.phone"  class="CarrierIput"   placeholder="请输入手机号"/>
         </FormItem>
       </li>
       <li>
         <span class="CarrierTitle"><i class="orangeFont mr5">*</i>验证码</span>
         <FormItem prop="Imgcode">
         <Input   class="CarrierImgcode" v-model="formCustom.Imgcode" style="width: 265px; border: none"   placeholder="请输入验证码" />
         </FormItem>
         <div class="codeCarrier" @click="refreshCode"><identify  :identifyCode="identifyCode"></identify> </div>
       </li>
       <li v-show="phoneValid">
         <span class="CarrierTitle"><i class="orangeFont mr5">*</i>手机验证码</span>
         <FormItem prop="mobilecode">
           <Input  class="CarrierImgcode" v-model="formCustom.mobilecode" style="width: 265px; border: none"  placeholder="请输入验证码" />
         </FormItem>
         <div class="codeCarrier graybg"  @click="getNoteValue"  disabled>{{this.btnValue}}</div>

       </li>

       <li>
         <span class="CarrierTitle"><i class="orangeFont mr5">*</i>登录密码</span>
         <FormItem prop="password">
           <Input  type="password"  v-model="formCustom.password" class="CarrierIput"  placeholder="请输入密码"/>
         </FormItem>
       <li>
         <span class="CarrierTitle"><i class="orangeFont mr5">*</i>确认密码</span>
        <FormItem prop="repassword">
         <Input  type="password"  class="CarrierIput"   v-model="formCustom.repassword"   placeholder="请再次输入密码" />
        </FormItem>
       </li>
     </ul>
     <div class="dflexAlem mt15 fs14" style="justify-content: center; width: 537px;">
       <div style="width: 18px;height: 18px;   margin-right: 10px;margin-top: -16px;">
         <FormItem prop="single">
         <Checkbox v-model="formCustom.single"></Checkbox>
         </FormItem>
       </div>
       <span>我已阅读并同意</span><a href="#.html" class="orangeFont">《巨正源用户服务协议》</a>
     </div>
     <div class="dflexAlem mt15" style="justify-content: center;">
       <FormItem >
       <Button type="primary" class="CarrierRegister" @click="handleSubmit('formCustom')">会员下一步</Button>
         </FormItem>
     </div>
     </Form>
   </div>
</template>

<script>
  import { userCodeSend, userCodeCheck, userPhoneCheck } from '../../api/users'
  import identify from './identify'
    export default {
        name: "userRegister",
      components:{
        identify
      },
      data() {
        const validatePhone=(rule, value, callback) => {
          if (value === '') {
            callback(new Error('手机号不能为空'));
          } else {

            if(this.formCustom.phone.length != 11){
              callback(new Error('请输入有效的手机号码，需是11位！'));
            }else {
              var myreg = /^0?(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;
              if(!myreg.test(this.formCustom.phone)){
                callback(new Error('手机号码格式不正确'));
              }else{
                  this.userPhoneCheck(value, callback)
              }


            }

          }
        };
        const validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('密码不能为空'));
          } else {
              this.passwordValid=true
            callback();
          }
        };
        const validaterePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('密码不能为空'));
          } else {
            if (this.formCustom.repassword !== this.formCustom.password) {
              // 对第二个密码框单独验证
              callback(new Error('密码两次不相同'));
            }else{
              this.repasswordValid=true
              callback();
            }

          }
        };
        const validateImgcode=(rule, value, callback)=>{
           if(value === ''){
             callback(new Error('验证码不能为空'));
           }else{
             if(value === this.identifyCode){
               this.identifyImgCode=true
               this.ImgCodeValid=true
               callback();
             }else{
               callback(new Error('验证码有误'));
             }
           }
        };
        const validatemobilecode=(rule, value, callback)=>{
            if(value === ''){
              callback(new Error('手机验证码不能为空'));
            }else{
              this.userCodeCheck(value, callback)

            }
        }
        return {
          // 图形验证码
          identifyCodes: "1234567890",
          identifyImgCode:false,//校验图形验证码
          ImgCodeValid:false,//校验手机验证码是否合格
          identifyCode: "",
          imgSrc:'http://vueshop.glbuys.com/api/vcode/chkcode?token=1ec949a15fb709370f&nowtime=1312423435',
          single: false,
          //用来发判断发送验证码
          isrefreshpic:false,
          //disabled的初始值
          btnBoolen:false,
          btnClassName:"btn",
          btnValue:"获取短信验证码",
          phoneValid:false,//号码有效
          passwordValid:'',//密码有效
          repasswordValid:'',//号码有效
          formCustom: {
            phone: '',
            password: '',
            mobilecode:'',
            single:'',
            repassword: '',
            Imgcode:'',

          },
          ruleCustom: {
            phone: [
              { validator: validatePhone, trigger: 'blur' }
            ],
            password: [
              { validator: validatePass, trigger: 'blur' }
            ],
            repassword: [
              { validator: validaterePass, trigger: 'blur' }
            ],
            Imgcode:[
              { validator: validateImgcode, trigger: 'blur' }
            ],
            mobilecode:[
              { validator: validatemobilecode, trigger: 'blur' }
            ]
          }

        };
      },
      methods:{
          //验证手机是否存在
        async userPhoneCheck(value, callback){
          let params = {
            phone:value
          }
          const res = await userPhoneCheck(this, params)
          if(res.data && res.status === 200){
            callback(new Error('手机号码已注册'));
          }else{
            this.phoneValid=true;
            callback()
          }

        },
        //获取短信验证码
         async getNoteValue () {

          var phone = this.formCustom.phone//验证码
            console.log('phone', phone)
          //验证验证码是否为空
           if(this.Imgcode === ''){
             this.$Message.info({
               content: '图形证码不能为空',
               duration: 5,
               closable: true
             })
             return
           }
           if(!this.ImgCodeValid){
             this.$Message.info({
               content: '请重新输入图形证码',
               duration: 5,
               closable: true
             })
              return
           }
          if (phone === "") {
            this.$Message.info("手机号不能为空")
            return
          }else{
              let params = {
                phone
              }
            const res = await userCodeSend(this, params)
            console.log('res',res)
            console.log('res',res.data)
            if(res.data && res.status === 200 ){
              this.ImgCodeValid=false
              console.log('res', res)
              this.$Message.info("短信发送成功")

                var sj = Math.ceil(Math.random(10 + 1) * 100000)
                window.localStorage.setItem("note", sj)
                this.auth_time = 60;
                var timer = setInterval(()=>{
                  this.auth_time--;
                  if(this.auth_time<=0){
                    clearInterval(timer)
                    this.btnBoolen = false;
                    this.btnClassName="btns"
                    this.btnValue="获取短信验证码"

                  }else {
                    this.btnBoolen = true;
                    this.btnValue=`重新获取(${this.auth_time})S`
                    this.btnClassName="btn"
                  }
                },1000)

            }else {
              this.$Message.info("短信发送失败")
            }


          }
        },
        // 验证手机验证码
        async userCodeCheck(value, callback){
          let params = {
            phone:this.formCustom.phone,
            code:value
          }
          const res = await userCodeCheck(this, params)
          if(res.data && res.status === 200){
            this.isrefreshpic=true

            console.log('isrefreshpic', this.isrefreshpic)
            callback();
          }else{
            callback(new Error('手机验证码错误'));
          }
        },
        // 下一步验证
        handleSubmit (name) {
          var userFormData={}
          console.log('formCustom', this.formCustom)
          userFormData.phone=this.formCustom.phone
          userFormData.password=this.formCustom.password
          userFormData.code=this.formCustom.mobilecode
          if(!this.phoneValid){
            this.$Message.info({
              content: '手机号有误',
              duration: 5,
              closable: true
            })
            return
          } else if(!this.isrefreshpic){
            this.$Message.info({
              content: '手机验证码有误',
              duration: 5,
              closable: true
            })
            return
          }else if(!this.identifyImgCode){
            this.$Message.info({
              content: '图形验证码有误',
              duration: 5,
              closable: true
            })
            return
          } else if(!this.passwordValid){
            this.$Message.info({
              content: '密码有误',
              duration: 5,
              closable: true
            })
            return
          }else if(!this.repasswordValid){
            this.$Message.info({
              content: '请再次密码有误',
              duration: 5,
              closable: true
            })
            return
          }else if(!this.formCustom.single){
            this.$Message.info({
              content: '请阅读巨正源用户协议',
              duration: 5,
              closable: true
            })
            return
          }else{
            this.$router.push({name:'userPerInfor', params:{params:userFormData}})
          }


        },

// 图形验证码
        randomNum(min, max) {
          return Math.floor(Math.random() * (max - min) + min);
        },
        refreshCode() {
          this.identifyCode = "";
          this.makeCode(this.identifyCodes, 4);
        },
        makeCode(o, l) {
          for (let i = 0; i < l; i++) {
            this.identifyCode += this.identifyCodes[
              this.randomNum(0, this.identifyCodes.length)
              ];
          }
          console.log(this.identifyCode);
        }

      },
      mounted() {
          // 图形验证码
        this.identifyCode = "";
        this.makeCode(this.identifyCodes, 4);
      }
    }
</script>

<style  >
  /*注册进度*/
  .CarrierTitle{width: 90px;text-align: right; color: #333; margin-right: 10px; font-size: 14px;}
  .Carinput li{display: flex;align-items: center;margin-top: 20px;}
  .Carinput li .CarrierIput{ font-size: 14px;  box-sizing: border-box; width: 375px;border-radius: 3px; }
  .Carinput li .codeCarrier{ cursor: pointer; width:102px;margin-left: 8px;  height: 42px; border-radius: 5px; display: flex; align-items: center; justify-content: center}
  .Carinput li .codeCarrier img{width: 100%;height: 100%;}
  .Carinput li .codeCarrier button{width: 100%;height: 100%;}
  .CarrierRegister{margin-top: 30px;margin-bottom: 60px;margin-left: 0px; border-radius:3px;  cursor: pointer; font-size: 14px;
    width: 375px;height: 42px;border: none; background-color: #007de4; color: #fff;}


  .Carinput li .CarrierImgcode{ height: 42px;   font-size: 14px;  box-sizing: border-box; width: 375px;border-radius: 3px; border: 1px solid #DEDEDE}

  .ivu-form-item{ margin-bottom: 0}
  .ivu-input{height: 42px;line-height: 42px; padding: 0px 7px; }
  .ivu-checkbox-inner{width: 18px;height: 18px;}
  .ivu-checkbox-inner:after{width: 6px;height: 10px;top: 1px;left: 5px;}
  .ivu-checkbox-checked .ivu-checkbox-inner:after{ width: 6px;height: 10px;top: 1px;left: 5px; }
</style>
