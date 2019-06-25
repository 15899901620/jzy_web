<template>
   <div>
     <Form ref="formCustom" :model="formCustom" :rules="ruleCustom">
     <ul class="dflexAlem Carinput" style=" width: 537px; margin-top: 50px; flex-direction: column;justify-content: center;">
       <li>
         <span class="CarrierTitle"><i class="orangeFont mr5">*</i>手机号码</span>
         <FormItem prop="phone">
           <Input   v-model="formCustom.phone"  class="CarrierIput"   placeholder="请输入手机号"></Input>
         </FormItem>
       </li>
       <li>
         <span class="CarrierTitle"><i class="orangeFont mr5">*</i>验证码</span>
         <FormItem>
         <input type="text" class="CarrierImgcode" v-model="formCustom.Imgcode" style="width: 265px;" name="" id="" value="" placeholder="请输入验证码" />
         </FormItem>
         <div class="codeCarrier"><img @click="refreshpic" :src="imgSrc" /></div>
       </li>
       <li>
         <span class="CarrierTitle"><i class="orangeFont mr5">*</i>手机验证码</span>
         <FormItem>
           <input type="text" class="CarrierImgcode" v-model="formCustom.mobilecode" style="width: 265px;" name="" id="" value="" placeholder="请输入验证码" />
         </FormItem>
         <div class="codeCarrier graybg"  @click="getNoteValue"  >{{this.btnValue}}</div>

       </li>

       <li>

           <span class="CarrierTitle"><i class="orangeFont mr5">*</i>登录密码</span>
         <FormItem prop="password">
           <Input  type="password"  v-model="formCustom.password" class="CarrierIput"  placeholder="请输入密码"></Input>

          </FormItem>

       <li>

           <span class="CarrierTitle"><i class="orangeFont mr5">*</i>确认密码</span>
       <FormItem prop="repassword">
         <Input  type="password"  class="CarrierIput"   v-model="formCustom.repassword"   placeholder="请再次输入密码" ></Input>
       </FormItem>


       </li>
     </ul>
     <div class="dflexAlem mt15 fs14" style="justify-content: center; width: 537px;">
       <div style="width: 18px;height: 18px;   margin-right: 10px;margin-top: -4px;">
         <Checkbox v-model="single"  ></Checkbox>
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
  import { userCodeSend } from '../../api/users'
    export default {
        name: "userRegister",
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

                this.phoneValid=true;

              }


            }
            callback()
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
        return {
          imgSrc:'http://vueshop.glbuys.com/api/vcode/chkcode?token=1ec949a15fb709370f&nowtime=1312423435',
          single: false,
          //用来发判断发送验证码
          isrefreshpic:false,
          //disabled的初始值
          btnBoolen:false,
          btnClassName:"btn",
          btnValue:"获取短信验证码",
          phoneValid:'',//号码有效
          passwordValid:'',//密码有效
          repasswordValid:'',//号码有效
          formCustom: {
            phone: '',
            password: '',
            mobilecode:'',
            repassword: ''
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
            ]
          }

        };
      },
      methods:{

        //获取短信验证码
         getNoteValue () {

          var mobilecode = this.formCustom.phone//验证码

          //验证验证码是否为空
          if (mobilecode === "") {
            this.$Message.info("手机号不能为空")
            return
          }else{
              let params = {
                mobilecode
              }
              const res = userCodeSend(this, params)
            if(res){
              this.datalist = res.items

              this.$Message.info("短信发传成功")
              this.isrefreshpic = true
              if (this.isrefreshpic) {
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


              }else{

              }

            }else {
              this.$Message.info("短信发传失败")
            }


          }
        },
        handleSubmit (name) {

          this.$router.push({path:'./userPerInfor'})
          // var formCustom=this.formCustom
          // if(formCustom && this.phoneValid && this.passwordValid && this.repasswordValid){
          //   this.$router.push({path:'./userPerInfor',query:{params:formCustom}})
          // }

          // this.$refs[name].validate((valid) => {
          //   if (valid) {
          //     this.$Message.success('Success!');
          //   } else {
          //     this.$Message.error('Fail!');
          //   }
          // })
        },
        // 图片验证
        refreshpic(){
          var sj = Math.ceil(Math.random() * 100000)
          this.imgSrc = "http://vueshop.glbuys.com/api/vcode/chkcode?token=1ec949a15fb709370f&nowtime=1312423435" + sj
        },

      },
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
  .CarrierRegister{margin-top: 30px;margin-bottom: 60px;margin-left: 38px; border-radius:3px;  cursor: pointer; font-size: 14px;
    width: 375px;height: 42px;border: none; background-color: #007de4; color: #fff;}


  .Carinput li .CarrierImgcode{ height: 42px; padding-left: 10px; font-size: 14px;  box-sizing: border-box; width: 375px;border-radius: 3px; border: 1px solid #DEDEDE}

  .ivu-form-item{margin-bottom: 0}
  .ivu-input{height: 42px;line-height: 42px; padding: 0px 7px; }
  .ivu-checkbox-inner{width: 18px;height: 18px;}
  .ivu-checkbox-inner:after{width: 6px;height: 10px;top: 1px;left: 5px;}
  .ivu-checkbox-checked .ivu-checkbox-inner:after{ width: 6px;height: 10px;top: 1px;left: 5px; }
</style>
