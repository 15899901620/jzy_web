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
                                <Input v-model="formCustom.phone" :max="11"  class="CarrierIput"   placeholder="请输入手机号"/>
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
                    <Row :gutter="24"  index="5">
                        <Col span="21" @click="protocolModalToShow">
                            <div @click="protocolModalToShow">
                                <FormItem prop="single">
                                    <Checkbox v-model="formCustom.single"></Checkbox><span>我已阅读并同意</span><a href="#.html" class="orangeFont">《巨正源供应商服务协议》</a>
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
                            <FormItem  prop="corporation" label="公司法人：">
                                <Input type="text" v-model="formCustom.corporation"    class="CarrierIput"   placeholder="请输入公司法人" />
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
                            <FormItem  prop="bankName" label="开户行：">
                                <Input type="text" class="CarrierIput" v-model="formCustom.bankName"    placeholder="请输入开户行" />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="24" index="0">
                        <Col span="21">
                            <FormItem  prop="bankAccount" label="银行账号：">
                                <Input type="text" class="CarrierIput" v-model="formCustom.bankAccount"   placeholder="请输入银行账号" />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="24" index="0">
                        <Col span="21">
                            <FormItem  prop="address" label="公司地址：">
                                <Input type="text" class="CarrierIput" v-model="formCustom.address"   placeholder="请输入详细开票地址" />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="24" index="0">
                        <Col span="21">
                            <FormItem  prop="telephone" label="公司电话：">
                                <Input type="text" class="CarrierIput"  v-model="formCustom.telephone"    placeholder="请输入开票电话" />
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
                        <Col span="21">
                            <FormItem  prop="contacterMobile" label="联系电话：">
                                <Input type="text" v-model="formCustom.contacterMobile" class="CarrierIput"  placeholder="请输入联系人" />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="24" index="0">
                        <Col span="21">
                            <FormItem  prop="contacterEmail" label="邮箱：">
                                <Input type="text" v-model="formCustom.contacterEmail" class="CarrierIput"  placeholder="请输入邮箱" />
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
                           <div class="uploadimg mt5">请点击上传营业执照图片（png、jpeg、jpg和pdf）</div>
                        </Col>
                    </Row>
                    <Row :gutter="24" index="0">
                        <Col span="21">
                            <FormItem  prop="registCapi" label="注册资金：">
                                <Input type="text" v-model="formCustom.registCapi" class="CarrierIput"  placeholder="请输入注册资金" />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="24" index="0">
                        <Col span="21">
                            <FormItem  prop="registCapi" label="公司性质：">
                                <Select  class="CarrierIput">
                                    <Option v-for="(items, index) in supplierNatureList"  @click.native="getItemValue(items)" :value="items.value"  :key="index">{{items.value_name}}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="24" index="0" >
                        <Col span="9">
                            <FormItem label="授 权 书："  prop="businessLicense">
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
                           <div class="uploadimg mt5">请点击上传授权书图片（png、jpeg、jpg和pdf）</div>
                        </Col>
                    </Row>
                    <Row :gutter="24" index="0" >
                        <Col span="9">
                            <FormItem label="其它文件："  prop="other_license">>
                                <Upload
                                    ref="upload"
                                    :action="uploadUrl"
                                    :on-success="handleOtherFile"
                                    :max-size="2048"
                                    :format="['jpg','jpeg','png', 'gif']"
                                    :on-format-error="handleFormatError"
                                    :on-exceeded-size="handleMaxSize">
                                    <Button icon="ios-cloud-upload-outline">上  传</Button>
                                </Upload>
                            </FormItem>
                        </Col>
                        <Col span="12">
                           <div class="uploadimg mt5">请点击上传授权书图片（png、jpeg、jpg和pdf）</div>
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
            title="注册协议"
            v-model="protocolModalShow"
            @on-cancel="protocolModalCancel"
            :width='700'
            class-name="vertical-center-modal">
            <div class="" style="text-align: center;">
                {{systeminfo.SUPPLIER_REGISTRATION_PROTOCOL}}    
                <Button  type="primary" style=" padding: 5px 50px 6px; background: #f73500;" @click='protocol()'>同意协议</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
const prefixCls = 'ant-user-register'
import { mapState } from 'vuex'
import {steps,step} from '../steps'
import captcha from '../captcha'
import {  supplierCodeCheck, supplierCodeSend, supplierdataCheck, supplierNature, supplierReg } from '../../api/users'

const appConfig = require('../../config/app.config')

export default {
    name: 'SupplierRegister',
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
            var patrn=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/; 
            if (!patrn.exec(value)) {
                   callback(new Error('密码必须是6-20字母和数字组合'));   
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
         // 供应商名称
        const validatename = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('供应商名称不能为空'));
          } else {
            callback();
          }
        };
        const validateCompanyName = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入公司名称'));
            } else {
                this.companyChenckValid(value, callback)
            }
        };
        const validatTaxId= (rule, value, callback)=>{
          if (value === '') {
            callback(new Error('税号不能为空'));
          } else {
            callback();
          }
        };
        const corporation = (rule, value, callback)=>{
            if (value === '') {
            callback(new Error('公司法人不能为空'));
          } else {
            callback();
          }
        };
        //联系人
        const validateContacter = (rule, value, callback) => {
         
          if (value === '') {
            callback(new Error('联系人名称不能为空'));
          } else {

            callback();
          }
        };

        //开户银行
        const validateBankName = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('开户行不能为空'));
          } else {
            this.BankNameValid=true
            callback();
          }
        };
        //账号
        const validateBankAccount= (rule, value, callback) => {
          if (value === '') {
            callback(new Error('账号不能为空'));
          } else {
            this.BankAccountValid=true
            callback();
          }
        };
        const validateTelephone=(rule, value, callback) => {
          if (value === '') {
            callback(new Error('公司电话不能为空'));
          } else {
            this.TelephoneValid=true
            callback();
          }
        };
        const validateAddress=(rule, value, callback) => {
          if (value === '') {
            callback(new Error('公司地址不能为空'));
          } else {
            callback();
          }
        };

        //注册资金
        const validateRegistCapi=(rule, value, callback) => {
          if (value === '') {
            callback(new Error('注册资金不能为空'));
          } else {
            callback();
          }
        };
        return {
              protocolModalShow: false,
            CodeCate:'Codeuserspplier',
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
            phoneValid:false,//号码有效
            passwordValid:'',//密码有效
            repasswordValid:'',//号码有效
            current: 0,
            uploadUrl: '',
            companyValid: false,
            supplierNatureList:[],
            usernameValid:false,
            BankNameValid:false,    //开户不能为空
            BankAccountValid:false,  //账号不能为空
            TelephoneValid:false,     //公司电话不能空
            companyinfo: {},
            formCustom: {
                code:'',
                username: '',      //供应商名称
                phone: '',          //注册手机号
                password:'',      //密码
                taxId:'',          //纳税人识别号
                companyName:'',
                corporation:'',    //法人
                contacter:'',       //联系人
                contacterMobile:'',  //联系人电话
                contacterEmail:'',    //联系人邮箱
                businessLicense:'',     //营业执照
                authorizationElc:'',    //授权书
                other_license:'',      //其他证件
                bankName:'',           //开户银行
                bankAccount:'',      //银行账号
                address:'',           //公司地址
                telephone:'',         //公司电话
                natureName:'',        //供应商性质
                natureValue:'',      //供应商性质值
                registCapi: ''         //注册资金
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
                contacterMobile:[
                    {required: true,  trigger: 'blur' }
                ],
                authorizationElc:[
                    {required: true,  trigger: 'blur' }
                ],
                other_license:[
                    {required: true,  trigger: 'blur' }
                ],
                contacterEmail:[
                    {required: true,  trigger: 'blur' }
                ],
                businessLicense:[
                    {required: true,  trigger: 'blur' }
                ],
              
                corporation:[
                     { required: true, validator: corporation, trigger: 'blur' }
                ],
                companyName: [
                    { required: true, validator: validateCompanyName, trigger: 'blur' }
                ],
                username: [
                    { required: true, validator: validatename, trigger: 'blur' }
                ],
                taxId: [
                    { required: true, validator: validatTaxId, trigger: 'blur' }
                ],
                contacter: [
                    { required: true, validator: validateContacter, trigger: 'blur' }
                ],
                bankAccount:[
                    { required: true, validator: validateBankAccount, trigger: 'blur' }
                ],
                telephone:[
                    { required: true, validator: validateTelephone, trigger: 'blur' }
                ],
                address:[
                    { required: true, validator: validateAddress, trigger: 'blur' }
                ],
                bankName:[
                    {required: true, validator: validateBankName, trigger: 'blur' }
                ],
                registCapi:[
                    {required: true, validator: validateRegistCapi, trigger: 'blur' }
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
        getItemValue(items){
          this.formCustom.natureName=items.value,           //供应商性质
          this.formCustom.natureValue=items.value_name      //供应商性质值
        },
        //验证手机是否存在
        async userPhoneCheck(value, callback){
            let params = {
                data:value,
                type:2
            }
            const res = await supplierdataCheck(this, params)
            if(res.data && res.status === 200){
                this.phoneValid=true;
                callback()
            }else{
                this.phoneValid=false;
                callback(new Error('手机号码已注册'));
            }
        },
        // 验证手机验证码
        async userCodeCheck(value, callback){
            let params = {
                phone:this.formCustom.phone,
                code:value
            }
            const res = await supplierCodeCheck(this, params)
            if(res.data && res.status === 200){
                this.isrefreshpic=true
                callback();
            }else{
                callback(new Error('手机验证码错误'));
            }
        },
        //获取短信验证码
        async getNoteValue () {
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
                    phone: phone
                }
                const res = await supplierCodeSend(this, params)
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
                 this.current = 1
                this.$emit('currData', true)
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
            this.formCustom.businessLicense = res.url
        },
        handleFileSuccess(res){
            this.formCustom.authorizationElc = res.url
        },
        handleMaxSize (file) {
            this.$Notice.warning({
                title: '超出文件大小限制',
                desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
            });
        },
         //其它文件
        handleOtherFile(res){
          this.formCustom.other_license=res.url
        
        },
        handleFormatError (file) {
          this.$Notice.warning({
            title: '文件格式不正确',
            desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
          });
        },
        // 校验公司名称
        async companyChenckValid(value, callback){
            let params = {
                data: value,
                type:1
            }
            const res = await supplierdataCheck(this, params)
            if(res.data && res.status === 200){
                this.companyValid=true;
                this.companyinfo = res.data

                this.formCustom.taxId = res.data.creditCode
                this.formCustom.corporation = res.data.operName
                this.formCustom.registCapi = res.data.registCapi
     
                callback()
            }else{
                this.companyValid=false;
                callback(new Error('公司已经被注册&不存在'));
            }
        },
        //第二部提交
        async memberReset(data){
            this.formCustom.code = this.formCustom.mobilecode
            this.formCustom.username = this.formCustom.companyName
            if(!this.companyValid){
                this.$Notice.warning({
                    title: '不能为空',
                    duration: 5
                });
                return
            }else if(!this.formCustom.code){
                this.$Notice.warning({
                    title: '验证码不能空',
                    duration: 5
                });
                return
            }else if(!this.formCustom.password){
                this.$Notice.warning({
                    title: '密码不能空',
                    duration: 5
                });
                return
            }else if(!this.formCustom.phone){
                this.$Notice.warning({
                    title: '手机号不能空',
                    duration: 5
                });
                return
            }else if(!this.formCustom.contacter){
                this.$Notice.warning({
                    title: '联系人不能空',
                    duration: 5
                });
                return
            }else if(!this.formCustom.businessLicense){
                this.$Notice.warning({
                    title: '营业执照不能空',
                    duration: 5
                });
                return
            }else if(!this.formCustom.authorizationElc){
                this.$Notice.warning({
                    title: '授权书不能空',
                    duration: 5
                });
                return
            }else if(!this.formCustom.corporation){
                this.$Notice.warning({
                    title: '法人不能空',
                    duration: 5
                });
                return
            }else if(!this.formCustom.taxId){
                this.$Notice.warning({
                    title: '税号不能空',
                    duration: 5
                });
                return
            }else if(!this.formCustom.corporation){
                this.$Notice.warning({
                    title: '注册资金不能空',
                    duration: 5
                });
                return
            }else if(!this.BankNameValid){
                this.$Notice.warning({
                    title: '开户银行不能空',
                    duration: 5
                });
                return
            }else if(!this.BankAccountValid){
                this.$Notice.warning({
                    title: '银行账号不能空',
                    duration: 5
                });
                return
            }else if(!this.formCustom.address){
                this.$Notice.warning({
                    title: '地址不能空',
                    duration: 5
                });
                return
            }else if(!this.TelephoneValid){
                this.$Notice.warning({
                    title: '公司电话不能空',
                    duration: 5
                });
                return
            }else if(! this.formCustom.natureName){
                this.$Notice.warning({
                    title: '公司性质不能空',
                    duration: 5
                });
                return
            }else{
                const res = await supplierReg(this, this.formCustom)
                if(res.data && res.status === 200){
                    this.current = 2
                    this.$emit('currData', false)
                    // this.$router.push({name:'RegisterSuccess'})
                }else{
                    this.$Message.info({
                        content: '注册未成功',
                        duration: 5,
                        closable: true
                    })
                    return
                }
            }
        },

        async companyNature(value){
          const res = await supplierNature(this, {})
          if(res.data && res.status===200){
            this.supplierNatureList=res.data
          }else{

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
        this.getUploadURL()
        this.companyNature()
        // 图形验证码
        this.identifyCode = '';
        this.makeCode(this.identifyCodes, 4);
    }
}
</script>