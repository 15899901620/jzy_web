<template>
    <div :class="classes">
        <div class="dflexAlem stepsItem">
            <steps :current="current" >
              <step title="第一步" description="填写注册基础信息" ></step>
              <step title="第二步" description="完善公司信息" ></step>
              <step title="第三步" description="信息提交成功，待审核" ></step>
            </steps>
        </div>
        <div class="formItem">
            <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="130">
                <div v-if="current == 0">
                    <Row :gutter="24" index="0">
                        <Col span="21">
                            <FormItem prop="phone" label="手 机 号：">
                                <Input v-model="formCustom.phone"  class="CarrierIput"   placeholder="请输入手机号"/>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="24"  index="1">
                        <Col span="15">
                            <FormItem prop="Imgcode" label="验 证 码：">
                                <Input class="CarrierImgcode" v-model="formCustom.Imgcode"  placeholder="请输入验证码" />
                            </FormItem>
                        </Col>
                        <Col span="6">
                            <div class="captcha" @click="refreshCode"><captcha :CodeCate="CodeCate" :contentWidth='131'  :contentHeight='31' :identifyCode="identifyCode" ></captcha></div>
                        </Col>
                    </Row>
                    <Row :gutter="24" v-if="isopenSms && phoneValid"  index="2">
                        <Col span="15">
                            <FormItem prop="mobilecode" label="短信验证：">
                                <Input class="CarrierImgcode" v-model="formCustom.mobilecode"  placeholder="请输入验证码" />
                            </FormItem>
                        </Col>
                        <Col span="6">
                            <div class="codeCarrier graybg"  @click="getNoteValue"  disabled>{{this.btnValue}}</div>
                        </Col>
                    </Row>
                    <Row :gutter="24"  index="3">
                        <Col span="21">
                            <FormItem prop="password" label="密  码：">
                                <Input type="password" v-model="formCustom.password"  class="CarrierIput"   placeholder="请输入密码"/>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="24"  index="4">
                        <Col span="21">
                            <FormItem prop="repassword" label="确认密码：">
                                <Input type="password" v-model="formCustom.repassword"  class="CarrierIput"   placeholder="请输入确认密码"/>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="24"  index="5" >
                        <Col span="21" @click="protocolModalToShow">
                            <div @click="protocolModalToShow">
                                <FormItem prop="single" >
                                    <Checkbox v-model="formCustom.single"></Checkbox><span>我已阅读并同意</span><a class="orangeFont">《巨正源用户注册服务协议》</a>
                                </FormItem>
                            </div>
                        </Col>
                    </Row>
                    <Row :gutter="24"  index="6">
                        <Col span="12"> </Col>
                        <Col span="9">
                            <FormItem>
                                <Button type="primary" class="CarrierRegister" @click="handleSubmit('formCustom')">下一步</Button>
                            </FormItem>
                        </Col>
                    </Row>
                </div>
                <div v-else-if="current == 1">
                    <Row :gutter="24" index="0">
                        <Col span="21">
                            <FormItem  prop="companyName" label="公司名称：">
                                <Input type="text" v-model="formCustom.companyName" class="CarrierIput"   placeholder="请输入公司名称" />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="24" index="0">
                        <Col span="21">
                            <FormItem  prop="taxId" label="纳税人识别号：">
                                <Input type="text" class="CarrierIput" v-model="formCustom.taxId"   placeholder="请输入纳税人识别号" />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="24" index="0">
                        <Col span="21">
                            <FormItem  prop="invBankName" label="开户行：">
                                <Input type="text" class="CarrierIput" v-model="formCustom.invBankName"    placeholder="请输入开户行" />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="24" index="0">
                        <Col span="21">
                            <FormItem  prop="invBankAccount" label="银行账号：">
                                <Input type="text" class="CarrierIput" v-model="formCustom.invBankAccount"   placeholder="请输入银行账号" />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="24" index="0">
                        <Col span="21">
                            <FormItem  prop="invAddress" label="开票地址：">
                                <Input type="text" class="CarrierIput" v-model="formCustom.invAddress"   placeholder="请输入详细开票地址" />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="24" index="0">
                        <Col span="21">
                            <FormItem  prop="invTelephone" label="开票电话：">
                                <Input type="text" class="CarrierIput"  v-model="formCustom.invTelephone"    placeholder="请输入开票电话" />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="24" index="0">
                        <Col span="21">
                            <FormItem  prop="contacter" label="联系人：">
                                <Input type="text" v-model="formCustom.contacter" class="CarrierIput"  placeholder="请输入联系人" />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="24" index="0">
                        <Col span="9">
                            <FormItem label="营业执照：" prop="contacterEmail">
                                <Upload
                                    ref="upload"
                                    :action="uploadUrl"
                                    :on-success="imageSuccess"
                                    :max-size="2048"
                                    :format="['jpg','jpeg','png', 'gif']"
                                    :on-exceeded-size="handleMaxSize">
                                    <Button icon="ios-cloud-upload-outline">上  传</Button>
                                </Upload>
                            </FormItem>
                        </Col>
                        <Col span="12">
                           <div class="uploadimg mt5">请点击上传营业执照图片（png、jpeg、jpg和pdf）文件不大于2M</div>
                        </Col>
                    </Row>
                    <Row :gutter="24" index="0" >
                        <Col span="9">
                            <FormItem label="授 权 书：" prop="businessLicense">
                                <Upload
                                    ref="upload"
                                    :action="uploadUrl"
                                    :on-success="handleFileSuccess"
                                    :max-size="2048"
                                    :format="['jpg','jpeg','png', 'gif']"
                                    :on-exceeded-size="handleMaxSize">
                                    <Button icon="ios-cloud-upload-outline">上  传</Button>
                                </Upload>
                            </FormItem>
                        </Col>
                        <Col span="12">
                           <div class="uploadimg mt5">请点击上传授权书图片（png、jpeg、jpg和pdf）文件不大于2M</div>
                        </Col>
                    </Row>
                    <Row :gutter="24" index="0" style="margin-bottom:120px">
                        <Col span="21" style="text-align:center;">
                            <Button class="CarrierRegister" @click="handleUp">上一步</Button>
                            <Button type="primary" class="CarrierRegister" @click="memberReset">提  交</Button>
                        </Col>
                    </Row>
                </div>
                <div v-else-if="current == 2">
                     <!--审核成功-->
                    <div class="dflexAlemJust" style="margin-top: 60px;">
                        <img src="../../static/img/exam_icon.png" />
                    </div>
                    <div class="fs30 fwb greenFont tac mt10" >待审核！</div>
                    <div class="tac mt25 fs16" style=" color: #666;">您的资料已提交，待巨正源工作人员与您确认并核对信息，</div>
                    <div class="tac fs16 mt5" style="margin-bottom: 115px; color: #666;">请保持你的联系方式畅通，或主动联系工作人员：<span class="orangeFont"></span> <router-link to="/">返回首页</router-link></div>
                </div>
            </Form>
        </div>
        <Modal
            title="用户注册协议"
            v-model="protocolModalShow"
            @on-cancel="protocolModalCancel"
            :width='700'
            class-name="vertical-center-modal">
            <div class="" v-html="systeminfo.MEMBER_REGISTRATION_PROTOCOL">
            </div>
            <div slot="footer" style="text-align: center">
                <Button type="primary" style=" padding: 5px 50px 6px; background: #f73500;" @click='protocol()'>同意协议</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
const prefixCls = 'ant-user-register'
import { mapState } from 'vuex'
import {steps,step} from '../steps'
import captcha from '../captcha'
import { userCodeSend, userCodeCheck, userPhoneCheck, userValid, manageReg } from '../../api/users'

const appConfig = require('../../config/app.config')

export default {
    name: 'UserRegister',
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
                this.userCodeCheck(value, callback)
            }
        };
        const validateCompanyName = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入公司名称'));
            } else {
                this.companyChenckValid(value, callback)
            }
        };
        const validateTaxId= (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入税号'));
            } else {
                callback();
            }
        };
        const validateInvBankName=(rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入开户行'));
            } else {
                callback();
            }
        };
        const validateInvBankAccount=(rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入账号'));
            } else {
                callback();
            }
        };
        const validateInvAddress=(rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入开票地址'));
            } else {
                callback();
            }
        };
        const validateInvTelephone=(rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入联系电话'));
            } else {
                callback();
            }
        };
        const validateContacter=(rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入联系人'));
            } else {
                callback();
            }
        };
        return {
            protocolModalShow: false,

            CodeCate:'CodeuserCate',
            identifyCodes: "1234567890",
            identifyImgCode:false,//校验图形验证码
            ImgCodeValid:false,//校验手机验证码是否合格
            identifyCode: "",
            //图片验证通过后开启
            isopenSms: false,
            single: false,
            //用来发判断发送验证码
            isrefreshpic:false,
            //disabled的初始值
            btnBoolen:false,
            btnClassName:"btn",
            btnValue:"获取短信验证码",
            smsTotalTime: 60,
            phoneValid:false,//号码有效
            passwordValid:'',//密码有效
            repasswordValid:'',//号码有效
            current: 0,
            uploadUrl: '',
            companyValid: false,
            formCustom: {
                phone: '',
                password: '',
                mobilecode:'',
                single:'',
                repassword: '',
                Imgcode:'',
                companyName:'',
                taxId:'',
                invBankName:'',
                invBankAccount:'',
                invAddress:'',
                invTelephone:'',
                contacter:'',
                business_license:'',
                authorization_elc:'',
                code:''
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
                    {  validator: validatemobilecode, trigger: 'blur' }
                ],
                companyName: [
                    { required: true, validator: validateCompanyName, trigger: 'blur' }
                ],
                contacterEmail:[
                    {required: true,  trigger: 'blur' }
                ],
                businessLicense:[
                    {required: true,  trigger: 'blur' }
                ],
                taxId: [
                    { required: true, validator: validateTaxId, trigger: 'blur' }
                ],
                invBankName: [
                    { required: true, validator: validateInvBankName, trigger: 'blur' }
                ],
                invBankAccount: [
                    { required: true, validator: validateInvBankAccount, trigger: 'blur' }
                ],
                invAddress: [
                    { required: true, validator: validateInvAddress, trigger: 'blur' }
                ],
                invTelephone: [
                    { required: true, validator: validateInvTelephone, trigger: 'blur' }
                ],
                contacter: [
                    { required: true, validator: validateContacter, trigger: 'blur' }
                ]
            }
        }
    },
    components:{
        steps,
        step,
        captcha
    },
    computed: {
        ...mapState({
            systeminfo: state => state.system.systeminfo,
        }),
        classes() {
            return [
                `${prefixCls}`,
                { [`${prefixCls}-shortcut`]: this.vertical },
            ];
        },
    },
    methods:{
        getUploadURL(){
          this.uploadUrl = process.env.NODE_ENV === 'development' ? appConfig.system.UPLOAD_URL.dev : appConfig.system.UPLOAD_URL.pro
        },
        
        //验证手机是否存在
        async userPhoneCheck(value, callback){
            let params = {
                phone:value
            }
            const res = await userPhoneCheck(this, params)
            if(res.data && res.status === 200){
                this.phoneValid=false
                callback(new Error('手机号码已注册'));
            }else{
                this.phoneValid=true
                callback()
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
                callback();
            }else{
                callback(new Error('手机验证码错误'))
            }
        },
        //获取短信验证码
        async getNoteValue () {
            if(this.btnBoolen){
                return
            }
            var phone = this.formCustom.phone//验证码
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
                    content: '图形验证码不正确',
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
                    phone: phone
                }
                const res = await userCodeSend(this, params)
                if(res.data && res.status === 200 ){
                    this.ImgCodeValid=false

                    this.$Message.info("短信发送成功")
                    this.refreshCode()

                    var sj = Math.ceil(Math.random(10 + 1) * 100000)
                    window.localStorage.setItem("note", sj)
                    var timer = setInterval(()=>{
                        this.smsTotalTime--
                        if(this.smsTotalTime <= 0){
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
            }
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
        //触发第一步的下一步
        handleSubmit (name) {
            var userFormData={}
            // userFormData.phone=this.formCustom.phone
            // userFormData.password=this.formCustom.password
            // userFormData.code=this.formCustom.mobilecode
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
            } else {
                this.current = 1
                this.$emit('currData', true)
            //this.$router.push({name:'userPerInfor', params:{params:userFormData}})
            }
        },
        //触发上一步
        handleUp () {
            this.current = 0
            this.$emit('currData', false)
        },
        //图片成功
        imageSuccess(res){
            this.formCustom.business_license = res.url
        },
        handleFileSuccess(res){
            this.formCustom.authorization_elc = res.url
        },
        handleMaxSize (file) {
            this.$Notice.warning({
                title: '超出文件大小限制',
                desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
            });
        },
        // 校验公司名称
        async companyChenckValid(value, callback){
            let params = {
                name: value,
            }
            const res = await userValid(this, params)
            if(res.status === 200){
                if(res.data.is_registered === "true"){
                    callback(new Error('公司名称已被注册'))
                }else if(res.data.is_exist === "false"){
                    callback(new Error('公司名称不存在'))
                }else if(res.data.is_exist === "true"){
                    this.companyValid = true
                    this.formCustom.taxId = res.data.tax_id
                    this.formCustom.invBankName = res.data.Bank
                    this.formCustom.invBankAccount = res.data.BankAccount
                    this.formCustom.invAddress = res.data.Address
                    this.formCustom.invTelephone = res.data.Tel
                }
            }else{
                callback(new Error('公司名称不存在'))
            }

        },
        //第二部提交
        async memberReset(data){
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
            }else if(!this.formCustom.mobilecode){
                this.$Message.info({
                    content: '验证码有误，请返回重新获取',
                    duration: 5,
                    closable: true
                })
                return
            } else if(!this.formCustom.companyName){
                this.$Message.info({
                    content: '公司名称不能为空',
                    duration: 5,
                    closable: true
                })
                return
            }else if(!this.companyValid){
                this.$Message.info({
                    content: '公司不存在',
                    duration: 5,
                    closable: true
                })
                return
            }else if(!this.formCustom.taxId){
                this.$Message.info({
                    content: '税号不能为空',
                    duration: 5,
                    closable: true
                })
                return
            }else if(!this.formCustom.invBankName){
                this.$Message.info({
                    content: '开户行不能为空',
                    duration: 5,
                    closable: true
                })
                return
            }else if(!this.formCustom.invBankAccount){
                this.$Message.info({
                    content: '银行账号不能为空',
                    duration: 5,
                    closable: true
                })
                return
            }else if(!this.formCustom.invAddress){
                this.$Message.info({
                    content: '开票不能为空',
                    duration: 5,
                    closable: true
                })
                return
            }else if(!this.formCustom.invTelephone){
                this.$Message.info({
                    content: '开票电话不能为空',
                    duration: 5,
                    closable: true
                })
                return
            }else if(!this.formCustom.business_license){
                this.$Message.info({
                    content: '请上传营业执照',
                    duration: 5,
                    closable: true
                })
                return
            }else if(!this.formCustom.authorization_elc){
                this.$Message.info({
                    content: '请上传授权书',
                    duration: 5,
                    closable: true
                })
                return
            }else{
                const res = await manageReg(this, this.formCustom)
                if(res.data === true && res.status === 200){
                    this.current = 2
                    this.$emit('currData', false)
                }else{
                    this.$Message.info({
                        content: res.message,
                        duration: 5,
                        closable: true
                    })
                }
            }
        },
        protocolModalToShow(){
            this.protocolModalShow = true
        },
        protocolOkClick(){
            this.protocolModalShow = false
        },
        protocolModalCancel(){
            this.formCustom.single=false
            this.protocolModalShow = false
        },
        //确认协议
        protocol(){
            this.formCustom.single=true
            this.protocolModalShow = false

        },
    },
    mounted() {
        // 图形验证码
        this.identifyCode = '';
        this.makeCode(this.identifyCodes, 4);
        this.getUploadURL()
    }
}
</script>