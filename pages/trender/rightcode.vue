<template>


  <div class="clearfix  graybg">
    <div class="w1200 dflex "  style="margin-bottom: 40px" >
      <!--会员中心列表-->
      <Rightmenu></Rightmenu>

      <!--右边信息-->
      <div class="memberInfor ml20  whitebg bdccc  mt20">

        <!--账号绑定-->
        <div class="ml25 mr25">
          <h1 class="fs16 bb1  mt25">账号绑定</h1>
          <ul class="code_manange mt30 ml20">
            <li>
              <span class="titleInfor">手机号</span>
              <Input type="text" class="inforInput blackFont"  v-model="phone" disabled/>
            </li>
            <li>
              <span class="titleInfor">验证码</span>
              <Input type="text" class="inforInput" v-model="code"  @on-blur="passwordCodeCheck"  placeholder="请输入验证码"  />
              <button class="codeCarrier graybg" :disabled="btnBoolen"  @click="getsupplyNoteValue" >{{this.btnValue}}</button>
            </li>
            <li>
              <span class="titleInfor">新密码</span>
              <Input type="password" class="inforInput" v-model="newspassword"  />
            </li>
            <li>
              <span class="titleInfor">新密码确认</span>
              <Input type="password" class="inforInput"  v-model="repassword"   @on-blur="repasswordCheck"  />
              <i class="ml10 gray redFont" v-show="showpassword" >两次密码输入不一致</i>
            </li>
          </ul>
          <div class="ConfirmSubmit" @click="passwordmodif">确认提交</div>
        </div>






      </div>






    </div>










  </div>



</template>

<script>
  import memheader from '../../components/user-header/memheader'
  import Rightmenu from './trenderCompontent/Rightmenu'
  import { supplierRepssWd,supplierReCodeSend, supplierCodeCheck } from '../../api/users'
  import Cookies from 'js-cookie'

  export default {
      name: "rightcode",
      layout:'membercenter',
      components:{
        memheader,
        Rightmenu
      },
      data(){
          return{
            Totile: '',
            phone:'',
            showpassword:false,
            isCodeValid:false,
            btnBoolen:false,
            btnClassName:"btn",
            btnValue:"获取短信验证码",
            code:'',
            newspassword:'',
            repassword:'',
            password:'',
          }
      },
      methods:{
        //获取短信验证码
        async getsupplyNoteValue () {

          var phone = this.phone//验证码
          console.log('phone', phone)
          //验证验证码是否为空
          if (phone === "") {
            this.$Message.info("手机号不能为空")
            return
          }else{
            let params = {
              phone
            }
            const res = await supplierReCodeSend(this, params)
            console.log('res',res)
            console.log('res',res.data)
            if(res.data && res.status === 200 ){
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
        async passwordCodeCheck(){
          let params = {
            phone:this.phone,
            code:this.code
          }
          const res = await supplierCodeCheck(this, params)
          if(res.data && res.status === 200){
            this.isCodeValid=true
          }else{
            this.$Notice.warning({
              title: '验证有误',
              duration: 5
            });
          }
        },

        repasswordCheck(){
          if(!this.newspassword){
            this.$Notice.warning({
              title: '新密码不能空',
              duration: 5
            });
            return
          }
          if(this.newspassword === this.repassword){
            this.password = this.newspassword
          }else{
            this.showpassword=true
          }
        },
        async passwordmodif(){

          let params = {
            phone:this.phone,
            password:this.password,
            code:this.code
          }
          console.log('params', params)
          const res = await supplierRepssWd(this, params)
          console.log('res', res)
          if(res.data && res.status ===200){
            this.$Message.info({content: '修改密码成功'})
             this.$router.push({name:'trender-WinBidmember'})
          }else{
            console.log('修改密码失败')
            this.$Notice.warning({
              title: '修改密码失败',
              duration: 5
            });
          }
        },

      },
      mounted(){
        console.log('Cookies', Cookies.get('supplierInfor'))
        this.phone=JSON.parse(Cookies.get('supplierInfor')).realname
         this.Totile=this.$router.history.current.query.category

      },
    }
</script>

<style  >
  /*右侧内容*/
  .memberInfor{width: 970px;}

  /*密码管理*/
  .code_manange li{display: flex;margin-top: 20px; align-items: center;}
  .ConfirmSubmit{ cursor: pointer; margin-left: 110px; margin-top: 40px; display: inline-block;padding: 10px 30px; color: #fff; border-radius: 3px; background-color: #007de4;}
  .code_manange li{display: flex;margin-top: 20px; align-items: center;}
  .ConfirmSubmit{ margin-left: 110px; margin-top: 40px; display: inline-block;padding: 10px 30px; color: #fff; border-radius: 5px; background-color: #007de4;}

  .titleInfor{width: 85px;color:#333; margin-right: 10px; text-align: right; font-size: 14px;}

  .inforInput{width: 340px;height: 40px;border-radius: 3px;  padding-left: 10px;
    box-sizing: border-box;}
  .ivu-input{height: 42px;}


  .codeCarrier{ cursor: pointer; width:102px;margin-left: 8px;  height: 42px; border-radius: 5px; display: flex; align-items: center; justify-content: center}
</style>
