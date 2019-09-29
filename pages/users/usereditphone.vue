<template>
        <div class="clearfix graybg">
            <div class="w1200 dflex " style="margin-bottom: 40px">
                  <usernav></usernav>
                   <div class="memberInfor ml00  whitebg bdccc  mt20">
                        <div class="TableList code_manange mt30 ml00">
                            <h1 class="fs16  mt25 bb1 pb10">换绑手机号</h1>
                             <div class="formItem code_manange mt30 ml00" >
                                <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="130">
                                    <Row :gutter="24" index="0">
                                        <Col span="15">
                                        <FormItem  label="手机号：">
                                            <Input v-model="userinfo.phone" class="CarrierIput" disabled id="phone" placeholder="请输入手机号"/>
                                        </FormItem>
                                        </Col>
                                    </Row>
                                    <Row :gutter="24" index="2">
                                        <Col span="15">
                                        <FormItem prop="mobilecode" label="短信验证：">
                                            <Input class="CarrierImgcode" v-model="formCustom.code"   placeholder="请输入验证码"/>
                                        </FormItem>
                                        </Col>
                                        <Col span="6">
                                            <button class="codeCarrier graybg" :disabled="btnBoolen" type="button"  @click="getsupplyNoteValue" >{{this.btnValue}}</button>
                                        </Col>
                                    </Row>
                                    <Row :gutter="24" index="3">
                                        <Col span="15">
                                        <FormItem prop="newphone" label="新手机号：">
                                            <Input  v-model="formCustom.newphone" class="CarrierIput"  placeholder="请输入新手机号"/>
                                        </FormItem>
                                        </Col>
                                    </Row>
                                    <Row :gutter="24" index="4">
                                        <Col span="15">
                                        <FormItem prop="mobilecode" label="短信验证：">
                                            <Input class="CarrierImgcode" v-model="formCustom.newcode"   placeholder="请输入验证码"/>
                                        </FormItem>
                                        </Col>
                                        <Col span="6">
                                            <button class="codeCarrier graybg" :disabled="btn2Boolen" type="button"  @click="getuserNoteValue" >{{this.btn2Value}}</button>
                                        </Col>
                                    </Row>
                                </Form>

                            <div class="ConfirmSubmit" @click='butmodif' >确认提交</div>
                              </div>
                        </div>

                   </div>

            </div>
        </div>
</template>
<script>
import Cookies from 'js-cookie'
import Navigation from '../../components/navigation'
import { userEditPhoneSend, userRepassWd, userCodeCheck,userPhoneCheck,userRephone } from '../../api/users'
import { getCookies } from '../../config/storage'

export default {
    name: "usereditphone",
    middleware: 'memberAuth',
    layout:'membercenter',
    components: {
        usernav: Navigation.user,
    },
    fetch({ store }) {
        return Promise.all([
                //获取顶部、中部、底部导航信息
                store.dispatch('common/getNavList'),
                //获取系统配置
                store.dispatch('common/getSysConfig'),
        ])
    },
      data() {
          const validatePhone = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('手机号不能为空'));
				} else {
					if (this.formCustom.newphone.length != 11) {
						callback(new Error('请输入有效的手机号码，需是11位！'));
					} else {
						var myreg = /^0?(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;
						if (!myreg.test(this.formCustom.newphone)) {
							callback(new Error('手机号码格式不正确'));
						} else {
							this.userPhoneCheck(value, callback)
						}
					}
				}
			};
            return{
                btnBoolen:false,
                btn2Boolen:true,
                phone: '',
                code:'',
                verify:false,
                btnClassName:"btn",
                newcode:'',
                userinfo:{},
                btnValue:"获取短信验证码",
                btn2Value:'请输入新手机号',
                newphone:'',
                formCustom:{
                      newphone:'',
                      code:'',
                      newcode:'',
                },
                ruleCustom: {
					newphone: [
						{  validator: validatePhone, trigger: 'blur'}
					],

				}
            }
    },
    methods:{
         inLogin () {
            let userinfo = !getCookies('userinfor') ? '' : getCookies('userinfor')
            if (!userinfo) {
                this.$router.push('/login')
            }
            this.userinfo = userinfo

        },
         //获取短信验证码
        async getsupplyNoteValue () {
            var phone = this.userinfo.phone//验证码
            //验证验证码是否为空
            if (phone === "") {
                this.$Message.info("手机号不能为空")
                return
            }
            let params = {
                phone: phone
            }
            const res = await userEditPhoneSend(this, params)

            if(res.data && res.status === 200 ){
                this.$Message.info("短信发送成功")
                var sj = Math.ceil(Math.random(10 + 1) * 100000)
               // window.localStorage.setItem("note", sj)
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

        },
       async getuserNoteValue(){
        var phone = this.formCustom.newphone//验证码

            //验证验证码是否为空
            if (phone === "") {
                this.$Message.info("手机号不能为空")
                return
            }
            let params = {
                phone: phone
            }
            const res = await userEditPhoneSend(this, params)
            if(res.data && res.status === 200 ){
                this.$Message.info("短信发送成功")
                var sj = Math.ceil(Math.random(10 + 1) * 100000)
                //window.localStorage.setItem("note", sj)
                this.auth_time = 60;
                var timer = setInterval(()=>{
                this.auth_time--;
                if(this.auth_time<=0){
                    clearInterval(timer)
                    this.btnBoolen = false;
                    this.btn2ClassName="btns"
                    this.btn2Value="获取短信验证码"

                }else {
                    this.btn2Boolen = true;
                    this.btn2Value=`重新获取(${this.auth_time})S`
                    this.btnClassName="btn"
                }
                },1000)

            }else {
                this.$Message.info("短信发送失败")
            }
       },
        async butmodif(){

            if(this.formCustom.code==''){
                this.$Message.info("请输入原手机号验证码")
                return ;
            }
            if(this.formCustom.newcode==''){
                this.$Message.info("请输入新手机号验证码")
                return ;
            }
            if(this.formCustom.newphone==''){
                this.$Message.info("请输入新手机号")
                return ;
            }
            let params = {
                phone: this.userinfo.phone,
                newPhone:this.formCustom.newphone,
                code:this.formCustom.code,
                newCode:this.formCustom.newcode
            }

            const res = await userRephone(this, params)

            if(res.data && res.status ===200){
                this.$Message.info({content: '换绑手机号成功'})
                // this.$router.push('/users/user')
            }else{
            this.$Notice.warning({
                title: '换绑手机号失败',
                duration: 5
            });
            }
       },
       async userPhoneCheck(value, callback) {
				let params = {
					phone: value
				}
				const res = await userPhoneCheck(this, params)
				if (res.data && res.status === 200) {
					this.phoneValid = false
					callback(new Error('手机号码已注册'));
				} else {
					 this.btn2Value="获取短信验证码"
                     this.btn2Boolen = false;
                    callback()
				}
        },

    },
    created(){
            this.inLogin()
    },
    mounted(){

    }

}
</script>
<style  >
  .memberInfor{width: 83%}

  .code_manange li{display: flex;margin-top: 20px; align-items: center;}
  .ConfirmSubmit{margin-left: 140px;margin-top: 40px;display: inline-block;padding: 11px 0px;color: #fff;width: 330px;text-align: center;
    border-radius: 5px;background-color: #007de4;cursor: pointer;font-size: 14px;box-sizing: border-box;}
  .titleInfor{width: 85px;color:#999; margin-right: 25px; text-align: right;  font-size: 14px;}
  .inforInput{width: 340px;height: 40px;border-radius: 3px;  padding-left: 10px;
    box-sizing: border-box;}
  .ivu-input{height: 42px;}


  .codeCarrier{ border: none; cursor: pointer; width:102px;margin-left: 8px;  height: 42px; border-radius: 5px; display: flex; align-items: center; justify-content: center}
 </style>
