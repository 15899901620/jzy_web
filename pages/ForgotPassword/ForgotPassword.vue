<template>
<div class="clearfix graybg ovh">
  <div class="w1200 whitebg " style="margin-top: 20px; border-radius: 3px; overflow: hidden;">
    <!--进度-->
    <div class="dflexAlem" style="justify-content: center; margin-top: 65px; margin-left: 60px;">
      <div class="CarrierPro dflexAlem curr" style=" flex-direction: column;  ">
        <div class="CarrierPro_num ">1</div>
        <span>填写账户信息</span>
      </div>
      <div class="lineProgress" style="width: 154px;"></div>
      <div class="CarrierPro dflexAlem" style=" flex-direction: column;  ">
        <div class="CarrierPro_num">2</div>
        <span>重置密码</span>
      </div>
      <div class="lineProgress" style="width: 154px;"></div>
      <div class="CarrierPro dflexAlem" style=" flex-direction: column;  ">
        <div class="CarrierPro_num">3</div>
        <span>完成</span>
      </div>
    </div>
    <Form   :model="formCustom"  >

    <ul class="dflexAlem Carinput" style=" margin-top: 50px; flex-direction: column;justify-content: center;">
      <li>
        <span class="CarrierTitle"><i class="orangeFont mr5">*</i>手机号码</span>
        <div class="pr">
          <Input type="text" class="CarrierIput"  v-model="formCustom.phone" placeholder="请输入手机号"  @on-blur="userPhoneCheck" />
          <i class="promble" v-show="phoneShow">{{phoneTip}}</i>
        </div>

      </li>
      <li>
        <span class="CarrierTitle"><i class="orangeFont mr5">*</i>验证码</span>

        <FormItem prop="Imgcode">
          <div class="pr">
          <Input   class="CarrierImgcode" v-model="formCustom.Imgcode" style="width: 265px; border: none; height: 42px;" @on-blur="ImgCheck"  placeholder="请输入验证码" :disabled="phoneValid"/>
          <i class="promble" style="bottom: -26px;" v-show="ImgError">{{ImgTip}}</i>
          </div>
        </FormItem>
        <div class="codeCarrier" @click="refreshCode">
          <identify  :CodeCate="CodeCate"  :identifyCode="identifyCode" ></identify>
        </div>
      </li>
      <li v-show="ImgVaild"><span class="CarrierTitle"><i class="orangeFont mr5">*</i>验证码</span>
        <div class="pr">
        <Input type="text" class="CarrierIput" style="width: 265px;"  v-model="formCustom.code" placeholder="请输入验证码"  @on-blur="userCodeCheck"  />
          <i class="promble" v-show="IsCodeError" >{{CodeTip}}</i>
        </div>
        <div class="verification_code"  @click="getNoteValue" >{{this.btnValue}}</div>
      </li>
    </ul>

    <div class="dflexAlem mt15" style="justify-content: center;">
      <Button class="CarrierRegisterForget" @click="mobileCode()">下 一 步</Button>
    </div>
    </Form>

  </div>
</div>
</template>

<script>
  import { userPhoneCheck, userRepassWd, userRECodeSend, userCodeCheck, supplierdataCheck, supplierReCodeSend, supplierCodeCheck } from '../../api/users'
   import identify from '../register/identify'
    export default {
      name: "ForgotPassword",
      layout: 'noHeader',
      components:{
        identify
      },
      data(){
        return{

          phoneValid:true,      //判断手机号是否存在
          phoneShow:false,       //判断手机号是否存在

          phoneTip:'',//手机号错误提示
          ImgVaild:false,
          ImgError:false,
          IsCodeError:false,//验证验证码是否正确
          IsCodeTrue:false,
           CodeTip:'',
          ImgTip:'',   //图形错误提示
          // 图形验证码
          CodeCate:'supplierCodeCate',
          identifyCode:'',
          identifyCodes: "1234567890",
          identifyImgCode:false,//校验图形验证码
          // 短信验证码

          //disabled的初始值
          btnBoolen:false,
          btnClassName:"btn",
          btnValue:"获取短信验证码",


          Source:'',
          formCustom:{
            phone:'',
            code:''
          }
        }
      },
      methods:{

        //验证手机是否存在
        async userPhoneCheck(){
          if(this.formCustom.phone){

          if(this.Source === 'Supplier'){
            let params = {
              data:this.formCustom.phone,
              type:2
            }
            let res = await supplierdataCheck(this, params)
            console.log('Supplier_prams')
            if(res.data && res.status === 200){
              this.phoneShow=true
              this.phoneTip='手机号不存在'
            }else{
              this.phoneShow=false;
              this.phoneValid=false;
            }
          }
          if(this.Source === 'Member'){
            console.log('params', params)
            let params = {
              phone:this.formCustom.phone,
            }
            let res = await userPhoneCheck(this, params)
            console.log('Member_prams')
            console.log('res', res)
            if(res.data.data===null && res.status === 405){
              this.phoneShow=true
              this.phoneTip='手机号不存在'
            }else{
              this.phoneShow=false;
              this.phoneValid=false;
            }
          }

          }else{
            this.phoneTip='手机号不能为空'
          }
        },

        //获取短信验证码
        async getNoteValue () {
          console.log('resphone',this.formCustom.phone)
          var phone = this.formCustom.phone   //验证码
          console.log('resphone',phone)
          if (phone === "") {
            this.$Message.info("手机号不能为空")
            return
          }else{
            let params = {
              phone
            }
            if(this.Source=== 'Supplier'){
              var res = await supplierReCodeSend(this, params)
            }
            if(this.Source=== 'Member'){
              var res = await userRECodeSend(this, params)
            }

           console.log('res',res)
            if(res.data && res.status === 200 ){

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
              this.IsCodeError=true
              this.CodeTip='短信发送失败'
             }


          }
        },
        // 验证手机验证码
        async userCodeCheck(){
          let params = {
            phone:this.formCustom.phone,
            code:this.formCustom.code
          }

          if(this.Source=== 'Supplier'){
            console.log('Supplierparams',params)
            const res = await supplierCodeCheck(this, params).catch((e) => {
              let errorInfo = e.response
              console.log('supplierCodeSendErr', errorInfo)
            })
            if(res.data && res.status === 200){
              console.log(res)
              this.IsCodeTrue=true
              this.$Message.info("验证码验证成功")
            }else{
              console.log('***验证码验证失败***')
              this.IsCodeError=true
              this.CodeTip='验证码验证失败，请核对'
            }
          }

          if(this.Source=== 'Member'){

            const res = await userCodeCheck(this, params)
            if(res.data && res.status === 200){
              console.log(res)
              this.IsCodeTrue=true
              this.$Message.info("验证码验证成功")
            }else{
              console.log('***验证码验证失败***')
              this.IsCodeError=true
              this.CodeTip='验证码验证失败，请核对'
            }
          }

        },



      // 验证图形验证码
        ImgCheck(){
          if(this.formCustom.Imgcode){
          if(this.formCustom.Imgcode === this.identifyCode){
            this.ImgVaild=true
            this.ImgError=false
          }else {
            this.ImgError=true
            this.ImgVaild=false
            this.ImgTip='图形验证码错误'
          }
          }else {
            this.ImgError=true
            this.ImgVaild=false
            this.ImgTip='图形验证码不能为空'
          }
        },




        // 下一步
        mobileCode(){
          setTimeout(() =>{
          if(!this.formCustom.phone){
            this.$Notice.warning({
              title: '手机号不能为空',
              duration: 5
            });
            return
          }else if(this.IsCodeError){
            this.$Notice.warning({
              title: '验证码错误',
              duration: 5
            });
            return
          }else if(!this.formCustom.Imgcode){
            this.$Notice.warning({
              title: '图形验证不能为空',
              duration: 5
            });
            return
          }else if(!this.formCustom.code){
            this.$Notice.warning({
              title: '验证不能为空',
              duration: 5
            });
            return
          }else{
            this.$router.push({name:'ForgotPassword-mobilecodePassword',params:{formCustom:this.formCustom,name:this.Source}})
          }
          },500);


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

        }
      },
      mounted(){
        console.log('***this.$router***',this.$router)
        this.Source=this.$router.history.current.query.params

        // 图形验证码
        this.identifyCode = "";
        this.makeCode(this.identifyCodes, 4);
      }
    }
</script>

<style  >
  /*注册进度*/
  .CarrierPro{position: relative;}
  .CarrierPro.curr .CarrierPro_num{background-color: #007de4; color: #fff;}
  .CarrierPro.curr span{color: #007de4;}
  .CarrierPro span{position: absolute;bottom: -25px;width: 90px;text-align: center; color: #666; font-size: 14px;}
  .lineProgress{border: 1px dashed #DEDEDE;width: 20%; margin: 0 5px;}
  .CarrierPro_num{ color: #666; width: 41px;height: 41px; line-height: 41px; text-align: center;font-size: 16px;border-radius: 50%;background-color: #f0f2f5;}

  .CarrierTitle{width: 100px;text-align: right; color: #333; margin-right: 10px; font-size: 14px;}
  .Carinput li{display: flex;align-items: center;margin-top: 25px;}
  .Carinput li .CarrierIput{ font-size: 14px;  box-sizing: border-box; width: 375px;border-radius: 3px;  height: 42px;line-height: 42px;}
   .CarrierRegisterForget{margin-top: 30px;margin-bottom: 60px;margin-left: 103px; border-radius:3px;  cursor: pointer;width: 375px;height: 42px;border: none; background-color: #007de4; color: #fff;}

  .Carinput li .codeCarrier{ cursor: pointer; width:102px;margin-left: 8px;  height: 42px; border-radius: 5px; display: flex; align-items: center; justify-content: center}
  .Carinput li .codeCarrier img{width: 100%;height: 100%;}

  .Carinput li  .ivu-input{height: 42px;}
  .verification_code{width: 102px;  background-color: #f4f4f4; padding: 10px 0;box-sizing: border-box; text-align: center; border-radius: 3px;  color: #666; margin-left: 7px; cursor: pointer;}
  .Carinput li .ivu-form-item{margin-bottom: 0}

  .promble{position: absolute;bottom: -20px; color: #ed1e2d}
  .CarrierRegisterForget:hover{background-color: #007de4; color: #fff;}
</style>
