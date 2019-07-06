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
        <div class="CarrierPro dflexAlem curr" style=" flex-direction: column;  ">
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
        <li><span class="CarrierTitle"><i class="orangeFont mr5">*</i>密码</span>
          <div class="pr">
          <Input type="password" class="CarrierIput"   v-model="formCustom.password"  placeholder="请输入密码"  @on-blur="passwordCheck" />
            <i class="promble"   v-show="passwordError" :style="{color:passwordColor}">{{passwordTip}}</i>
          </div>
        </li>
        <li><span class="CarrierTitle"><i class="orangeFont mr5">*</i>确认密码</span>
          <div class="pr">
          <Input type="password" class="CarrierIput" v-model="formCustom.repassword" placeholder="请再次输入密码"   @on-blur="repasswordCheck"/>
            <i class="promble"   v-show="respasswordError" >{{respasswordTipTip}}</i>
          </div>
        </li>
      </ul>

      <div class="dflexAlem mt15" style="justify-content: center;">
        <Button class="CarrierRegister" @click="Back()" v-if="BackText">上 一 步</Button>
        <Button class="CarrierRegister" @click="mobileSubmit()" v-else>下 一 步</Button>
      </div>
      </Form>
    </div>
  </div>
</template>

<script>

  import {  supplierRepssWd,userRepassWd } from '../../api/users'
    export default {
        name: "mobilecodePassword",
      layout: 'noHeader',
      data(){
          return{
            SourceTitle:'',
            ValueCode:'获取验证码',
            BackText:false,
            passwordError:false,
            respasswordError:false,
            passwordTip:'',
            respasswordTipTip:'',
            passwordTrue:false,
            passwordColor:'',
            formCustom:{
              phone:'',
              code:'',
              password:'',
              repassword:''
            }
          }
      },
      methods:{
      //再次校验密码
        passwordCheck(){
          this.passwordError=true;
          if(this.formCustom.password.length>=6 && this.formCustom.password.length<=25){
            this.passwordTip='密码设置合格'
            this.passwordColor='#007de4'
          }else{
            this.passwordTip='密码必须大于6位小于25位的数字或字母组成'
          }
        },
      //再次校验密码
        repasswordCheck(){
          this.respasswordError=true;
          if(this.formCustom.password === this.formCustom.repassword){
            this.passwordTrue=true
          }else{
            this.respasswordTipTip='两次密码不一致'
          }
        },

        mobileSubmit(){
          setTimeout(async() =>{
          if(!this.formCustom.phone){
            this.$Notice.warning({
              title: '手机号不能为空',
              duration: 5
            });
            return
          }else if(!this.formCustom.code){
            this.$Notice.warning({
              title: '验证码不能为空',
              duration: 5
            });
            return
          }else if(!this.passwordTrue){
            this.$Notice.warning({
              title: '两次密码不一致',
              duration: 5
            });
            return
          }else{
            let params={
              phone: this.formCustom.phone,
              password:this.formCustom.password,
              code: this.formCustom.code
            }
            if(this.SourceTitle === 'Supplier'){
              console.log('SourceTitle', this.SourceTitle)
              var res =await supplierRepssWd(this,params)
            }
            if(this.SourceTitle === 'Member'){
              console.log('SourceTitle', this.SourceTitle)
              var res =await userRepassWd(this,params)
            }
            console.log('res',res)
            if(res.data===true && res.status === 200){
              this.$router.push({name:'ForgotPassword-SeekCodeSuccess'})
            }else {
              this.BackText=true
              this.$Notice.warning({
                title: '修改失败，请返回上一步重新注册',
                duration: 5
              });
              return
            }

          }
          },500)

        },


        Back(){
          this.$router.push({name:'ForgotPassword-ForgotPassword',query:{params:this.SourceTitle}})
        }


      },
      mounted(){
        if(!this.$router.history.current.params.formCustom){
          this.BackText=true
          this.$Notice.warning({
            title: '手机号不存在，请返回上一步重新校验',
            duration: 5
          });
          return
        }else if(!this.$router.history.current.params.formCustom){
          this.BackText=true
          this.$Notice.warning({
            title: '验证码不存在，请返回上一步重新校验',
            duration: 5
          });
          return
        }
        else{
          this.SourceTitle=this.$router.history.current.params.name
          this.formCustom.phone=this.$router.history.current.params.formCustom.phone
          this.formCustom.code=this.$router.history.current.params.formCustom.code
        }




      },
    }
</script>

<style >
  /*注册进度*/
  .CarrierPro{position: relative;}
  .CarrierPro.curr .CarrierPro_num{background-color: #007de4; color: #fff;}
  .CarrierPro.curr span{color: #007de4;}
  .CarrierPro span{position: absolute;bottom: -25px;width: 90px;text-align: center; color: #666; font-size: 14px;}
  .lineProgress{border: 1px dashed #DEDEDE;width: 20%; margin: 0 5px;}
  .CarrierPro_num{ color: #666; width: 41px;height: 41px; line-height: 41px; text-align: center;font-size: 16px;border-radius: 50%;background-color: #f0f2f5;}

  .CarrierTitle{width: 100px;text-align: right; color: #333; margin-right: 10px; font-size: 14px;}
  .Carinput li{display: flex;align-items: center;margin-top: 30px;}
  .Carinput li .CarrierIput{ font-size: 14px; box-sizing: border-box; width: 396px;border-radius: 3px;  height: 42px;line-height: 42px;}
  .Carinput li .codeCarrier{margin-left: 20px;width: 90px; height: 42px; border-radius: 5px; display: flex; align-items: center;}
  .CarrierRegister{margin-top: 30px;margin-bottom: 60px;margin-left: 112px; border-radius:3px;  cursor: pointer;width: 396px;height: 42px;border: none; background-color: #007de4; color: #fff;}

  .promble{position: absolute;bottom: -20px; color: #ed1e2d}
  .CarrierRegister:hover{background-color: #007de4; color: #fff;}
  .Carinput li  .ivu-input{height: 42px;}
  .Carinput li .ivu-form-item{margin-bottom: 0}

</style>
