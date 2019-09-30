<template>
    <div class="body">
        <Header-small title="找回密码">
            <div slot="headerother">
                <div class="dflexAlem gray fs14" style="color: rgb(102, 102, 102);margin-top: 50px;">
                    <span data-v-228ad150="" class="bbright pr10 blackFont">已有账号？</span> <a data-v-228ad150="" href="/login" class="blueFont pl10">直接登录</a>
                </div>
            </div>
        </Header-small>
        <div class="container" title="">
            <div class="w1200 whitebg " style="margin-top: 18px; border-radius: 3px; overflow: hidden;">
                <div style="width:800px; margin:80px auto;">
                    <div class="dflexAlem stepsItem">
                        <steps :current="current" >
                            <step title="第一步" description="填写基础信息" ></step>
                            <step title="第二步" description="修改密码信息" ></step>
                            <step title="第三步" description="修改成功" ></step>
                        </steps>
                    </div>
                </div>
                <div class="forgotpwd" style="width:48%; margin:30px auto 100px;">
                    <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="130">
                        <div v-if="current == 0">
                            <Row :gutter="24" index="">
                                <Col span="21">
                                    <FormItem prop="type" label="找回类型：">
                                        <RadioGroup v-model="formCustom.type" >
                                            <Radio label="会员" ></Radio>
                                            <Radio label="供应商&承运商"></Radio>
                                        </RadioGroup>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row :gutter="24" index="0">
                                <Col span="21">
                                    <FormItem prop="phone" label="手 机 号：">
                                        <Input v-model="formCustom.phone"  class="CarrierIput"   placeholder="请输入手机号"/>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row :gutter="24"  index="1">
                                <Col span="15">
<!--                                    <FormItem prop="Imgcode" label="验 证 码：">-->
<!--&lt;!&ndash;                                        <Input class="CarrierImgcode" v-model="formCustom.Imgcode"  placeholder="请输入验证码" />&ndash;&gt;-->
<!--                                    </FormItem>-->
                                    <FormItem prop="slidecode" label="验 证 码：">
                                        <slide-verify @onChange="onTime" :width="370"></slide-verify>
                                    </FormItem>
                                </Col>
<!--                                <Col span="6">-->
<!--                                    <div class="captcha" @click="refreshCode"><captcha :CodeCate="CodeCate" :contentWidth='126'  :contentHeight='36' :identifyCode="identifyCode" ></captcha></div>-->
<!--                                </Col>-->
                            </Row>
                            <Row :gutter="24"  index="6">
                                <Col span="12" />
                                <Col span="9">
                                    <FormItem>
                                        <Button type="primary" class="CarrierRegister" @click="handleSubmit('formCustom')">下一步</Button>
                                    </FormItem>
                                </Col>
                            </Row>
                        </div>
                        <div v-else-if="current == 1">
                             <Row :gutter="24" index="0" v-if="isopenSms && phoneValid" >
                                        <Col span="15">
                                    <FormItem prop="mobilecode" label="短信验证：">
                                        <Input class="CarrierImgcode" v-model="formCustom.mobilecode"  placeholder="请输入验证码" />
                                    </FormItem>
                                </Col>
                                <Col span="6">
                                        <div class="codeCarrier graybg"  @click="getNoteValue"  disabled>{{this.btnValue}}</div>
                                </Col>
                               </Row>
                            <Row :gutter="24" index="0">
                                <Col span="21">
                                    <FormItem prop="password" label="重置密码：">
                                        <Input type="password" v-model="formCustom.password"  class="CarrierIput"   placeholder="请输入重置密码"/>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row :gutter="24" index="0">
                                <Col span="21">
                                    <FormItem prop="repassword" label="确认重置密码：">
                                        <Input type="password" v-model="formCustom.repassword"  class="CarrierIput"   placeholder="请输入确认重置密码"/>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row :gutter="24" index="0" style="margin-bottom:120px">
                                <Col span="21" style="text-align:center;">
                                    <Button class="CarrierRegister" @click="handleUp">上一步</Button>
                                    <Button type="primary" class="CarrierRegister" @click="forgotpwdReset">提  交</Button>
                                </Col>
                            </Row>
                        </div>
                        <div v-else-if="current == 2">
                            <div class="dflexAlemJust" style="margin-top: 60px;">
                                <img src="../static/img/exam_icon.png" />
                            </div>
                            <div class="fs30 fwb greenFont tac mt10" >新密码设置成功!</div>
                            <div class="tac mt25 fs16" style=" color: #666;">请牢记您设置的新密码! 现<nuxt-link class=" blueFont cp" to="/login">[登 录]</nuxt-link> 或 <nuxt-link class=" blueFont cp" to="/">返回首页</nuxt-link></div>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
        <Footer size="small" title="底部" style="margin-top:18px;"></Footer>
    </div>
</template>

<script>
import Header from '../components/header'
import Footer from '../components/footer'
import { mapState } from 'vuex'
import Swiper from 'swiper';
import captcha from '../components/captcha'
import {steps,step} from '../components/steps'
import { userCodeSend, userCodeCheck, userPhoneCheck, userValid, manageReg, userRepassWd, userRECodeSend, supplierdataCheck, supplierRepssWd,supplierReCodeSend, supplierCodeCheck } from '../api/users'
import SlideVerify from '../components/slide-verify'

export default {
    name: "register",
    components:{
        Header,
        HeaderSmall: Header.small,
        Footer,
        steps,
        step,
        captcha,
        SlideVerify
    },
    fetch({ store, params }) {
        return Promise.all([
            store.dispatch('menu/getMenuList'),
            store.dispatch('system/getSystemCnf'),
        ])
    },
    computed: {

        ...mapState({
            systeminfo: state => state.system.systeminfo
        })
    },
    data(){
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
                        this.getuserPhoneCheck(value, callback)
                    }
                }
            }
        };
        const validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('密码不能为空'));
            }
            var patrn=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/;
            if (!patrn.exec(value)) {
                   callback(new Error('密码必须是8-20字母和数字组合'));
            }else{
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
                    this.identifyImgCode = true
                    this.ImgCodeValid = true
                    this.isopenSms = true
                    callback();
                }else{
                    this.isopenSms=false
                    callback(new Error('验证码有误'));
                }
            }
        };
        const validatemobilecode=(rule, value, callback)=>{
            if(value === ''){
                callback(new Error('手机验证码不能为空'));
            }else{
                // this.getuserCodeCheck(value, callback)
                  callback();
            }
        };
        return{
            CodeCate:'CodeuserCatty',
            identifyCodes: "1234567890",
            identifyCode: "",
            RegisterName:'member',
            nowIndex:0,
            index:0,
            current: 0,
            isopenSms: false,
            ImgCodeValid: false,
            identifyImgCode: false,
            slidecode:0,
            btnBoolen:false,
            btnClassName:"btn",
            btnValue:"获取短信验证码",
            smsTotalTime: 60,
            phoneValid:false,//号码有效
            passwordValid:'',//密码有效
            repasswordValid:'',//号码有效
            formCustom: {
                phone: '',
                password: '',
                repassword: '',
                Imgcode: '',
                code: '',
                type: '会员',
                password: '',
                repassword: '',
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
                ],
                password: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                repassword: [
                    { validator: validaterePass, trigger: 'blur' }
                ],
            }
        }
    },
    methods:{
        onTime(res) {
            console.log("res",res)
            if (res) {
                this.slidecode = res
                this.isopenSms=true
            } else {
                this.$Modal.warning({
                    title: '提示',
                    content: '验证失败！',
                    duration: 5,
                    styles: 'top:300px'
                });
            }
        },
        // 验证手机验证码
        async getuserCodeCheck(value, callback){
            let params = {
                phone:this.formCustom.phone,
                code:value
            }
            if (this.formCustom.type === '会员') {
                let res = await userCodeCheck(this, params)
                if(res.data && res.status === 200){
                    this.isrefreshpic=true
                    callback();
                }else{
                    callback(new Error('手机验证码错误'));
                }
            }else{
                let res = await supplierCodeCheck(this, params)
                if(res.data && res.status === 200){
                    this.isrefreshpic=true
                    callback();
                }else{
                    callback(new Error('手机验证码错误'));
                }
            }
        },
        //验证手机是否存在
        async getuserPhoneCheck(value, callback){
            let params = {
                phone:value
            }
            const res = await userPhoneCheck(this, params)
            if(res.data && res.status === 200){
                this.phoneValid=true;
                callback()
            }else{
                this.phoneValid=false;
                callback(new Error('该手机号码未注册'));
            }
        },
        currData (res) {
            this.current = res
        },
        // 点击切换
        tabClick(index,registerName) {
            this.registerName=registerName
            this.nowIndex = index
            this.mySwiper.slideTo(index,500,false)
        },
        //生成随机数
        randomNum(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        },
        //点击触发验证码
        refreshCode() {
            this.identifyCode = "";
            this.makeCode(this.identifyCodes, 4);
        },
        //拼装验证码
        makeCode(o, l) {
            for (let i = 0; i < l; i++) {
                this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)];
            }
            window.localStorage.setItem("captchaCode", this.identifyCode)
        },
          //获取短信验证码
        async getNoteValue () {
            if(this.btnBoolen){
                return
            }
            var phone = this.formCustom.phone//验证码
            //验证验证码是否为空
            // if(this.Imgcode === ''){
            //     this.$Message.info({
            //         content: '图形证码不能为空',
            //         duration: 5,
            //         closable: true
            //     })
            //     return
            // }
            // if(!this.ImgCodeValid){
            //     this.$Message.info({
            //         content: '图形验证码不正确',
            //         duration: 5,
            //         closable: true
            //     })
            //     return
            // }
            if (phone === "") {
                this.$Message.info("手机号不能为空")
                return
            }else{
                let params = {
                    phone: phone
                }
                if(this.formCustom.type === '会员'){
                    let res = await userCodeSend(this, params)
                    if(res.data && res.status === 200 ){
                        this.ImgCodeValid=false

                        this.$Message.info("短信发送成功")

                        var sj = Math.ceil(Math.random(10 + 1) * 100000)
                        window.localStorage.setItem("note", sj)
                        var timer = setInterval(()=>{
                            this.smsTotalTime--
                            if(this.smsTotalTime<=0){
                                clearInterval(timer)
                                this.btnBoolen = false;
                                this.btnClassName="btns"
                                this.btnValue="获取短信验证码"

                            }else {
                                this.btnBoolen = true;
                                this.btnValue=`${this.smsTotalTime}s后重新获取`
                                this.btnClassName="btn"
                            }
                        },1000)

                    }else {
                        this.$Message.info("短信发送失败")
                    }
                } else {
                    let res = await supplierReCodeSend(this, params)
                    if(res.data && res.status === 200 ){
                        this.ImgCodeValid=false
                        this.$Message.info("短信发送成功")
                        var sj = Math.ceil(Math.random(10 + 1) * 100000)
                        window.localStorage.setItem("note", sj)
                        this.auth_time = 60;
                        var timer = setInterval(()=>{
                            this.auth_time;
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
            }
        },
        //触发第一步的下一步
        handleSubmit (name) {
            var userFormData={}
            if(!this.phoneValid){
                this.$Message.info({
                    content: '手机号有误',
                    duration: 5,
                    closable: true
                })
                return
            }else if(!this.slidecode){
                this.$Message.info({
                    content: '滑动验有误',
                    duration: 5,
                    closable: true
                })
                return
            } else {
                this.current = 1
            }
        },
        //第二部提交
        async forgotpwdReset(data){
            this.formCustom.code = this.formCustom.mobilecode
            if(!this.formCustom.phone){
                this.$Message.info({
                    content: '手机号不能为空，请返回重新填写',
                    duration: 5,
                    closable: true
                })
                return
            }else if(!this.formCustom.password){
                this.$Message.info({
                    content: '密码不能为空，请返回重新填写',
                    duration: 5,
                    closable: true
                })
                return
            }else {
                let params={
                    phone: this.formCustom.phone,
                    password:this.formCustom.password,
                    code: this.formCustom.code
                }
                if(this.formCustom.type === '会员'){
                    let res =await userRepassWd(this,params)
                    if(res.data === true && res.status === 200){
                        this.current = 2
                    }else{
                        this.$Message.info({
                            content: res.message,
                            duration: 5,
                            closable: true
                        })
                    }
                }else{
                    let res =await supplierRepssWd(this,params)
                    if(res.data === true && res.status === 200){
                        this.current = 2
                    }else{
                        this.$Message.info({
                            content: res.message,
                            duration: 5,
                            closable: true
                        })
                    }
                }
            }
        },
        //触发上一步
        handleUp () {
            this.current = 0
        }
    },
    mounted(){
        if(this.$route.query.type!='users'){
                this.formCustom.type='供应商&承运商'
        }

        this.identifyCode = '';
        this.makeCode(this.identifyCodes, 4);
    },
    head () {
        return {
            title: '会员注册-巨正源',
            page:10,
            meta: [
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { name: 'keywords', content: '化工, 交易, 会员注册'},
                { hid: 'description', name: 'description', content: '会员注册巨正源-化工交易平台，提供丙烷脱氢,石化产品贸易、仓储服务、成品油运输服务' }
            ]
        }
    }
}
</script>
<style lang="less" scoped>
.swiper-wrapper{width: 3600px; margin: 0 auto;}
.swiper_con{width:100%; margin: 0 auto; position:relative; overflow: hidden; margin-bottom: 30px;}
.swiper-slide { width: 100%; margin: 0PX auto;}
.ivu-form-item .ivu-form-item-content {line-height: 24px;}
.codeCarrier {
    padding: 5px 10px;
    border: 1px solid #ddd;
    border-radius: 3px;
    text-align: center;
    cursor: default;
}
</style>
