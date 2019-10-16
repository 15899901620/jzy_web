<template>
    <div class="clearfix graybg">
        <div class="w1200 dflex " style="margin-bottom: 40px">
            <usernav></usernav>
            <div class="memberInfor ml20  whitebg bdccc  mt20">
                <h1 class="fs16 ml25 mt25 bb1 pb10" >充值方式</h1>
                <div></div>
            </div>
        </div>
    </div>
</template>

<script>
import Navigation from '../../components/navigation'
import { userSeekPassword, userRepassWd, userCodeCheck } from '../../api/users'
import { getCookies } from '../../config/storage'
import { mapState } from 'vuex'

export default {
    name: "userCodeManage",
	middleware: 'memberAuth',
    layout:'membercenter',
    components:{
    usernav: Navigation.user
    },
    fetch({ store, params }) {
        return Promise.all([
                //获取顶部、中部、底部导航信息
                store.dispatch('common/getNavList'),
                //获取系统配置
                store.dispatch('common/getSysConfig'),
                store.dispatch('helper/gethelpDetail',{id:params.id}),
        ])
    },
    mounted(){
        console.log('helpDetail',this.helpDetail)
     },
    computed:{
        ...mapState({
             helpDetail: state => state.helper.helpDetail,
        })
    },
    data() {
    return{
        showpassword:false,
        isCodeValid:false,
        //disabled的初始值
        btnBoolen:false,
        btnClassName:"btn",
        userinfo:{
        },
        btnValue:"获取短信验证码",
        phone: '',
        code:'',
        newspassword:'',
        repassword:'',
        password:'',
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
            const res = await userSeekPassword(this, params)
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
                this.$Message.info("短信发送失败")
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
            var patrn=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/;
            if (!patrn.exec(this.newspassword)) {
                  this.$Notice.warning({
                        title: '密码必须是8-20字母和数字组合',
                        duration: 5
                    });
                    return
            }
            if(this.newspassword === this.repassword){
                this.password = this.newspassword
                this.showpassword=false
            }else{
                this.showpassword=true
            }
        },
        // 验证手机验证码
        async passwordCodeCheck(){
            let params = {
                phone: this.userinfo.phone, //验证码
                code: this.code
            }
            const res = await userCodeCheck(this, params)
            if(res.data && res.status === 200){
            this.isCodeValid=true
            }else{
            this.$Notice.warning({
                title: '验证有误',
                duration: 5
            });
            }
        },

        async passwordmodif(){

            let params = {
            phone: this.userinfo.phone,
            password:this.password,
            code:this.code
            }

            const res = await userRepassWd(this, params)

            if(res.data && res.status ===200){
                this.$Message.info({content: '修改密码成功'})
                this.$router.push('/users/user')
            }else{
            this.$Notice.warning({
                title: '修改密码失败',
                duration: 5
            });
            }
        }
    },
    created(){

        this.inLogin()
    },

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
