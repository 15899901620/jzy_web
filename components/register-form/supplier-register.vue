<template>
  <div :class="classes">
    <div class="dflexAlem stepsItem">
      <steps :current="current">
        <step title="第一步" description="填写注册基础信息"></step>
        <step title="第二步" description="完善公司信息"></step>
        <step title="第三步" description="信息提交成功，待审核"></step>
      </steps>
    </div>
    <div class="formItem">
      <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="130">
        <div v-show="current == 0">

          <Row :gutter="24" index="1">
            <Col span="21">
              <FormItem prop="Imgcode" label="注册类型：">
                <Select v-model="formCustom.isLogisticsCompany">
                  <Option v-for="item in registType" :value="item.value" :key="item.value" >{{ item.label }}</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="24" index="0">
            <Col span="21">
              <FormItem prop="phone" label="手 机 号：">
                <Input v-model="formCustom.phone" :max="11" class="CarrierIput" placeholder="请输入手机号"/>
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="24" index="1">
            <Col span="21">
<!--              <FormItem prop="Imgcode" label="验 证 码：">-->
<!--                <Input class="CarrierImgcode" v-model="formCustom.Imgcode" placeholder="请输入验证码" autocomplete="off"/>-->
<!--              </FormItem>-->
<!--            </Col>-->
<!--            <Col span="6">-->
<!--              <div class="captcha" @click="refreshCode">-->
<!--                <captcha :CodeCate="CodeCate" :contentWidth='131' :contentHeight='31'-->
<!--                         :identifyCode="identifyCode"></captcha>-->
<!--              </div>-->
              <FormItem prop="slidecode" label="滑动验证：">
                <SlideVerifysupply @onChange="onTimesupply" width="392" ></SlideVerifysupply>
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="24" v-if="isopenSms && phoneValid" index="2">
            <Col span="15">
              <FormItem prop="mobilecode" label="短信验证：">
                <Input class="CarrierImgcode" v-model="formCustom.mobilecode" placeholder="请输入验证码"/>
              </FormItem>
            </Col>
            <Col span="6">
              <div class="codeCarrier graybg" @click="getNoteValue" disabled>{{this.btnValue}}</div>
            </Col>
          </Row>
          <Row :gutter="24" index="3">
            <Col span="21">
              <FormItem prop="password" label="密  码：">
                <Input type="password" v-model="formCustom.password" class="CarrierIput" placeholder="请输入密码"/>
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="24" index="4">
            <Col span="21">
              <FormItem prop="repassword" label="确认密码：">
                <Input type="password" v-model="formCustom.repassword" class="CarrierIput" placeholder="请输入确认密码"/>
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="24" index="5" style="margin: 0">
            <Col span="21">
              <div style="width: 53%; margin: -7px auto 0; cursor: pointer">
                <a class="orangeFont fs18" :href="$store.state.common.sysConfig.AUTHORIZATION_TEMPLATE">授权书模板下载</a>
              </div>
            </Col>
          </Row>
          <Row :gutter="24" index="5">
            <Col span="21" @click="protocolModalToShow">
              <div @click="protocolModalToShow">
                <FormItem prop="single">
                  <Checkbox v-model="formCustom.single"></Checkbox>
                  <span>我已阅读并同意</span><a href="#.html" class="orangeFont">《巨正源供应商服务协议》</a>
                </FormItem>
              </div>
            </Col>
          </Row>
          <Row :gutter="24" index="6">
            <Col span="12"></Col>
            <Col span="25">
              <FormItem>
                <Button type="primary" class="CarrierRegister" @click="handleSubmit('formCustom')">下一步</Button>
              </FormItem>
            </Col>
          </Row>
        </div>
        <div v-show="current == 1">
          <Row :gutter="24" index="0">
            <Col span="21">
              <FormItem prop="companyName" label="公司名称：">
                <Input type="text" v-model="formCustom.companyName" class="CarrierIput" placeholder="请输入公司名称"/>
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="24" index="0">
            <Col span="21">
              <FormItem prop="corporation" label="公司法人：">
                <Input type="text" v-model="formCustom.corporation" class="CarrierIput" placeholder="请输入公司法人"/>
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="24" index="0">
            <Col span="21">
              <FormItem prop="taxId" label="纳税人识别号：">
                <Input type="text" class="CarrierIput" v-model="formCustom.taxId" placeholder="请输入纳税人识别号"/>
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="24" index="0">
            <Col span="21">
              <FormItem prop="bankName" label="开户行：">
                <Input type="text" class="CarrierIput" v-model="formCustom.bankName" placeholder="请输入开户行"/>
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="24" index="0">
            <Col span="21">
              <FormItem prop="bankAccount" label="银行账号：">
                <Input type="text" class="CarrierIput" v-model="formCustom.bankAccount" placeholder="请输入银行账号"/>
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="24" index="0">
            <Col span="21">
              <FormItem prop="address" label="公司地址：">
                <Input type="text" class="CarrierIput" v-model="formCustom.address" placeholder="请输入详细开票地址"/>
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="24" index="0">
            <Col span="21">
              <FormItem prop="telephone" label="公司电话：">
                <Input type="text" class="CarrierIput" v-model="formCustom.telephone" placeholder="请输入开票电话"/>
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="24" index="0">
            <Col span="21">
              <FormItem prop="registCapi" label="注册资金：">
                <Input type="text" class="CarrierIput" v-model="formCustom.registCapi" placeholder="请输入注册资金"/>
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="24" index="0">
            <Col span="21">
              <FormItem prop="contacter" label="联系人：">
                <Input type="text" v-model="formCustom.contacter" class="CarrierIput" placeholder="请输入联系人"/>
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="24" index="0">
            <Col span="21">
              <FormItem prop="contacterEmail" label="邮箱：">
                <Input type="text" v-model="formCustom.contacterEmail" class="CarrierIput" placeholder="请输入邮箱"/>
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="24" index="0">
            <Col span="21">
              <FormItem prop="registCapi" label="公司性质：">
                <Select class="CarrierIput">
                  <Option v-for="(items, index) in supplierNatureList" @click.native="getItemValue(items)"
                          :value="items.value" :key="index">{{items.value_name}}
                  </Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="24" index="0">
            <Col span="9">
              <FormItem label="营业执照："  prop="businessLicense" >
                <Upload
                    ref="upload"
                    :action="uploadUrl"
                    :on-success="imageSuccess"
                    :max-size="10240"
                    :format="['jpg','jpeg','png', 'pdf']"
                    :show-upload-list="false"
                    :on-exceeded-size="handleMaxSize">
                  <Button icon="ios-cloud-upload-outline">上 传</Button>
                </Upload>
              </FormItem>
            </Col>
            <Col span="12">
              <div class="uploadimg mt5">请点击上传营业执照图片（png、jpeg、jpg和pdf）</div>
            </Col>
            <Col span="21">
              <div class="Image" v-if="this.formCustom.businessLicense">
                <template v-if="this.License_filextension === '.pdf'">
                  <img src="../../static/img/pdf.jpg" />
                </template>
                <template v-else>
                  <img :src="this.formCustom.businessLicense" style="width: 100%" />
                </template>
              </div>
            </Col>
          </Row>



          <Row :gutter="24" index="0">
            <Col span="9">
              <FormItem label="授 权 书：" prop="authorizationElc">
                <Upload
                    ref="upload"
                    :action="uploadUrl"
                    :on-success="handleFileSuccess"
                    :max-size="10240"
                    :format="['jpg','jpeg','png', 'pdf']"
                    :show-upload-list="false"
                    :on-exceeded-size="handleMaxSize">
                  <Button icon="ios-cloud-upload-outline">上 传</Button>
                </Upload>
              </FormItem>
            </Col>
            <Col span="12">
              <div class="uploadimg mt5">请点击上传授权书图片（png、jpeg、jpg和pdf）</div>
            </Col>
            <Col span="21">
              <div class="Image" v-if="this.formCustom.authorizationElc">
                 <template v-if="this.Elc_filextension === '.pdf'">
                  <img src="../../static/img/pdf.jpg" />
                </template>
                <template v-else>
                  <img :src="this.formCustom.authorizationElc" style="width: 100%" />
                </template>
              </div>
            </Col>
          </Row>
          <template v-if="formCustom.isLogisticsCompany == 1">
            <Row :gutter="24" index="0">
              <Col span="9">
                <FormItem label="运输许可证：" prop='transportLicense'>
                  <Upload
                      ref="upload"
                      :action="uploadUrl"
                      :on-success="handletransportFile"
                      :max-size="10240"
                      :format="['jpg','jpeg','png','pdf']"
                      :show-upload-list="false"
                      :on-format-error="handleFormatError"
                      :on-exceeded-size="handleMaxSize">
                    <Button icon="ios-cloud-upload-outline">上  传</Button>
                  </Upload>
                </FormItem>
              </Col>
              <Col span="12">
                <div class="uploadimg mt5">请点击上传运输许可证图片（png、jpeg、jpg和pdf）</div>
              </Col>
              <Col span="21">
                <div class="Image" v-if="this.formCustom.transportLicense">
                  <template v-if="this.transport_filextension === '.pdf'">
                    <img src="../../static/img/pdf.jpg" />
                  </template>
                  <template v-else>
                    <img :src="this.formCustom.transportLicense" style="width: 100%" />
                  </template>
                </div>
              </Col>
            </Row>
          </template>
          <Row :gutter="24" index="0">
            <Col span="9">
              <FormItem v-if="formCustom.isLogisticsCompany == 0" label="危化品经营许可证：">
                <Upload
                        ref="upload"
                        :action="uploadUrl"
                        :on-success="HazchemiFile"
                        :max-size="10240"
                        :show-upload-list="false"
                        :format="['jpg','jpeg','png', 'pdf']"
                        :on-format-error="handleFormatError"
                        :on-exceeded-size="handleMaxSize">
                  <Button icon="ios-cloud-upload-outline">上 传</Button>
                </Upload>
              </FormItem>
              <FormItem v-else-if="formCustom.isLogisticsCompany == 1" label="企业资质：">
                <Upload
                    ref="upload"
                    :action="uploadUrl"
                    :on-success="HazchemiFile"
                    :max-size="10240"
                    :show-upload-list="false"
                    :format="['jpg','jpeg','png', 'pdf']"
                    :on-format-error="handleFormatError"
                    :on-exceeded-size="handleMaxSize">
                  <Button icon="ios-cloud-upload-outline">上 传</Button>
                </Upload>
              </FormItem>
            </Col>
            <Col span="12">
              <div class="uploadimg mt5">如有请点击上传文件图片（png、jpeg、jpg和pdf）</div>
            </Col>
            <Col span="21">
              <div class="Image" v-if="this.formCustom.dangerouslicense">
                <template v-if="this.danger_filextension === '.pdf'">
                  <img src="../../static/img/pdf.jpg" />
                </template>
                <template v-else>
                  <img :src="this.formCustom.dangerouslicense" style="width: 100%" />
                </template>
               </div>
            </Col>
          </Row>
          <Row :gutter="24" index="0">
            <Col span="9">
              <FormItem label="其它证件：">
                <Upload
                    ref="upload"
                    :action="uploadUrl"
                    :on-success="handleOtherFile"
                    :max-size="10240"
                    :show-upload-list="false"
                    :format="['jpg','jpeg','png', 'pdf']"
                    :on-format-error="handleFormatError"
                    :on-exceeded-size="handleMaxSize">
                  <Button icon="ios-cloud-upload-outline">上 传</Button>
                </Upload>
              </FormItem>
            </Col>
            <Col span="12">
              <div class="uploadimg mt5">如有请点击其它文件图片（png、jpeg、jpg和pdf）</div>
            </Col>
            <Col span="21">
              <div class="Image" v-if="this.formCustom.otherLicense">
                <template v-if="this.other_filextension === '.pdf'">
                  <img src="../../static/img/pdf.jpg" />
                </template>
                <template v-else>
                  <img :src="this.formCustom.otherLicense" style="width: 100%" />
                </template>
               </div>
            </Col>
          </Row>
          <Row :gutter="24" index="0" style="margin-bottom:120px">
            <Col span="21" style="text-align:center; display: flex; margin-left: 90px;width: 72%; margin-top: 40px">
              <Button class="UserRegister" @click="handleUp">上一步</Button>
              <Button type="primary" class="UserRegister ml10" @click="memberReset">提 交</Button>
            </Col>
          </Row>
        </div>
        <div v-show="current == 2">
          <!--审核成功-->
          <div class="dflexAlemJust" style="margin-top: 60px;">
            <img src="../../static/img/exam_icon.png"/>
          </div>
          <div class="fs30 fwb greenFont tac mt10">待审核！</div>
          <div class="tac mt25 fs16" style=" color: #666;">您的资料已提交，待巨正源工作人员与您确认并核对信息，</div>
          <div class="tac fs16 mt5" style="margin-bottom: 115px; color: #666;">请保持您的联系方式畅通，或主动联系工作人员：<span
              class="orangeFont">
            <router-link to="/">返回首页</router-link></span>
          </div>
        </div>
      </Form>
    </div>
    <Modal
        :title="title"
        v-model="protocolModalShow"
        @on-cancel="protocolModalCancel"
        :width='700'
        class-name="vertical-center-modal">

      <template v-if="formCustom.isLogisticsCompany == 0">
          <div class=""  style="overflow: hidden; overflow-y: auto; height: 360px;" v-html="$store.state.common.sysConfig.SUPPLIER_REGISTRATION_PROTOCOL"></div>
      </template>
      <template v-else>
          <div class=""  style="overflow: hidden; overflow-y: auto; height: 360px;" v-html="$store.state.common.sysConfig.CARRIER_REGISTRATION_PROTOCOL"></div>
      </template>
      <div slot="footer" style="text-align: center">
        <Button type="primary" style=" padding: 5px 50px 6px; background: #f73500; border:none;" @click='protocol()'>同意协议</Button>
      </div>

    </Modal>
    <Modal
        v-model="submitModal"
        title="请认真再次核对开票资料"
        @on-ok="ok"
        @on-cancel="cancel">
      <ul class="ivulist">
        <li><span>公司名称</span>:{{formCustom.companyName}}</li>
        <li><span style="width: 65px; text-align-last: justify">法人</span>: {{formCustom.corporation}}</li>
        <li><span>纳税人识别号</span>: {{formCustom.taxId}}</li>
        <li><span>开户银行</span>: {{formCustom.bankName}}</li>
        <li><span>银行账号</span>: {{formCustom.bankAccount}}</li>
        <li><span>公司地址</span>: {{formCustom.address}}</li>
        <li><span>公司电话</span>: {{formCustom.telephone}}</li>
      </ul>
      <div slot="header" style="font-size: 16px; font-weight: bold;">请认真再次核对开票资料 </div>
     </Modal>
  </div>

</template>

<script>
	const prefixCls = 'ant-user-register'
	import {mapState} from 'vuex'
	import {steps, step} from '../steps'
	import captcha from '../captcha'
	import {supplierCodeCheck, supplierCodeSend, supplierRegCode, carrierRegcode, supplierdataCheck, supplierNature, supplierReg} from '../../api/users'
  import SlideVerifysupply from '../slide-verify/slide-verify-supply'

	const appConfig = require('../../config/app.config')

	export default {
		name: 'SupplierRegister',
		data() {
			const validatePhone = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('手机号不能为空'));
				} else {
					if (this.formCustom.phone.length != 11) {
						callback(new Error('请输入有效的手机号码，需是11位！'));
					} else {
						var myreg = /^0?(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[0-9])[0-9]{8}$/;
						if (!myreg.test(this.formCustom.phone)) {
							callback(new Error('手机号码格式不正确'));
						} else {
							this.userPhoneCheck(value, callback)
						}
					}
				}
			};
			const validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('密码不能为空'));
				}
				var patrn = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/;
				if (!patrn.exec(value)) {
					callback(new Error('密码必须是8-20字母和数字组合'));
				} else {
					this.passwordValid = true
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
					} else {
						this.repasswordValid = true
						callback();
					}
				}
			};
			const validateImgcode = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('验证码不能为空'));
				} else {
					if (value === this.identifyCode) {
						this.identifyImgCode = true
						this.ImgCodeValid = true
						this.isopenSms = true
						callback();
					} else {
						this.isopenSms = false
						callback(new Error('验证码有误'));
					}
				}
			};
			const validatemobilecode = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('手机验证码不能为空'));
				}else{
                  this.mobilecodeChenckValid(value, callback)
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
			//校验公司名称
			const validateCompanyName = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入公司名称'));
				} else {
					this.companyChenckValid(value, callback)
				}
			};
			const validatTaxId = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('税号不能为空'));
				} else {
					callback();
				}
			};
			const valicorporation = (rule, value, callback) => {
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
              console.log("value",value)
				if (value === '') {
					callback(new Error('开户行不能为空'));
				} else {
				//	this.BankNameValid = true
					callback();
				}
			};
			//账号
			const validateBankAccount = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('账号不能为空'));
				} else {
				//	this.BankAccountValid = true
					callback();
				}
			};
			const valicontacterEmail = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('联系人邮箱不能为空'));
				} else {
					//this.BankAccountValid = true
					callback();
				}
			};
			const validateTelephone = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('公司电话不能为空'));
				} else {
					//this.TelephoneValid = true
					callback();
				}
			};
			const validateAddress = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('公司地址不能为空'));
				} else {
					callback();
				}
			};

			//注册资金
			const validateRegistCapi = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('注册资金不能为空'));
				} else {
					callback();
				}
			};
          const validateSlide = (rule, value, callback) => {
            console.log("value",value)
            if (value === 0) {
              console.log("value",value)
              callback(new Error('请滑动完成验证'));
            } else {
              callback();
            }
          };
			return {
				registType:[
                  {'label': '供应商','value':0},
                  {'label': '承运商','value':1},
                ],
                registtype:0,
				title:'供应商注册协议',
				protocolModalShow: false,
				CodeCate: 'Codeuserspplier',
				identifyCodes: "1234567890",
				identifyImgCode: false,//校验图形验证码
				ImgCodeValid: false,//校验手机验证码是否合格
				identifyCode: "",
				//图片验证通过后开启
				isopenSms: false,
				single: false,
				//用来发判断发送验证码
				isrefreshpic: false,
				//disabled的初始值
				btnBoolen: false,
				btnClassName: "btn",
				btnValue: "获取短信验证码",
				phoneValid: false,//号码有效
				passwordValid: '',//密码有效
				repasswordValid: '',//号码有效
                codeValid:false,   //验证码有效
				current: 0,
				uploadUrl: '',
				companyValid: false,
				supplierNatureList: [],
				usernameValid: false,
				BankNameValid: false,    //开户不能为空
				BankAccountValid: false,  //账号不能为空
				TelephoneValid: false,     //公司电话不能空
				companyinfo: {},
                submitModal:false,         //确认提交框
                checkData:false,
                License_filextension:'',    //营业执照
                Elc_filextension:'',         //授权书
                other_filextension:'',        //其它文件
                danger_filextension:'',       //危险品
                transport_filextension:'',    //交通运输
				formCustom: {
					isLogisticsCompany: 0,
					code: '',
					username: '',      //供应商名称
					phone: '',          //注册手机号
					password: '',      //密码
					taxId: '',          //纳税人识别号
					companyName: '',
					corporation: '',    //法人
					contacter: '',       //联系人
					contacterEmail: '',    //联系人邮箱
					businessLicense: '',     //营业执照
					authorizationElc: '',    //授权书
                    otherLicense: '',      //其他证件
					transportLicense: '',
					bankName: '',           //开户银行
					bankAccount: '',      //银行账号
					address: '',           //公司地址
					telephone: '',         //公司电话
					natureName: '',        //供应商性质
					natureValue: '',      //供应商性质值
					registCapi: '',         //注册资金
                    dangerouslicense:'',       //危化品上传许可证
                    slidecode: 0
				},
				ruleCustom: {
					phone: [
						{validator: validatePhone, trigger: 'blur'}
					],
					password: [
						{validator: validatePass, trigger: 'blur'}
					],
					repassword: [
						{validator: validaterePass, trigger: 'blur'}
					],
					Imgcode: [
						{validator: validateImgcode, trigger: 'blur'}
					],
					mobilecode: [
						{validator: validatemobilecode, trigger: 'blur'}
					],
					authorizationElc: [
						{required: true, trigger: 'blur'}
					],
					contacterEmail: [
						{required: true, validator: valicontacterEmail, trigger: 'blur'}
					],
					businessLicense: [
						{required: true, trigger: 'blur'}
					],
					transportLicense:[
						{ required: true, trigger: 'blur' }
					],
					corporation: [
						{required: true, validator: valicorporation, trigger: 'blur'}
					],
					companyName: [
						{required: true, validator: validateCompanyName, trigger: 'blur'}
					],
					username: [
						{required: true, validator: validatename, trigger: 'blur'}
					],
					taxId: [
						{required: true, validator: validatTaxId, trigger: 'blur'}
					],
					contacter: [
						{required: true, validator: validateContacter, trigger: 'blur'}
					],
					bankAccount: [
						{required: true, validator: validateBankAccount, trigger: 'blur'}
					],
					telephone: [
						{required: true, validator: validateTelephone, trigger: 'blur'}
					],
					address: [
						{required: true, validator: validateAddress, trigger: 'blur'}
					],
					bankName: [
						{required: true, validator: validateBankName, trigger: 'blur'}
					],
					registCapi: [
						{required: true, validator: validateRegistCapi, trigger: 'blur'}
					],
          slidecode: [
            {  validator: validateSlide, trigger: 'blur'}
          ]
				}
			}
		},
		components: {
			steps,
			step,
			captcha,
      SlideVerifysupply
		},
		computed: {
			classes() {
				return [
					`${prefixCls}`,
					{[`${prefixCls}-shortcut`]: this.vertical},
				];
			},
      ...mapState([
        'slidecode'
      ])
		},
		methods: {
          // 滑动验证
          onTimesupply(res) {
            console.log("res",res)
            if (res) {
              this.formCustom.slidecode = res
              this.isopenSms = true
            } else {
              this.$Modal.warning({
                title: '提示',
                content: '验证失败！',
                duration: 5,
                styles: 'top:300px'
              });
            }
          },
			getUploadURL() {
        if (process.env.NODE_ENV === 'development') {
          this.uploadUrl = appConfig.system.UPLOAD_URL.dev
        } else if (process.env.NODE_ENV === 'testprod') {
          this.uploadUrl = appConfig.system.UPLOAD_URL.test
        } else {
          this.uploadUrl = appConfig.system.UPLOAD_URL.pro
        }
      },
			getItemValue(items) {
				this.formCustom.natureName = items.value,           //供应商性质
               this.formCustom.natureValue = items.value_name      //供应商性质值
			},
			//验证手机是否存在
			async userPhoneCheck(value, callback) {
				let params = {
					data: value,
					type: 2
				}

				const res = await supplierdataCheck(this, params)
				if (res.data && res.status === 200) {
					if (res.data.is_registered === "true") {
						this.phoneValid = false
						callback(new Error('手机号已被注册'))
					}else{
						this.phoneValid = true;
						callback()
          }
				} else {
					this.phoneValid = false;
					callback(new Error('手机号码已注册'));
				}
			},
          //验证手机验证码codeValid
          async mobilecodeChenckValid(value, callback) {
            let params = {
              phone: this.formCustom.phone,
              code:value
            }
            const res = await supplierCodeCheck(this, params)
            console.log("res",res)
            if (res.data && res.status === 200) {
                this.codeValid=true
                callback()
            } else {
              callback(new Error('验证码错误'));
            }
          },
			//获取短信验证码
			async getNoteValue() {
				var phone = this.formCustom.phone//验证码
				//验证验证码是否为空
                if(!this.isopenSms){
                  this.$Message.info({
                    content: '请滑动验证码',
                    duration: 5,
                    closable: true
                  })
                }
				if (phone === "") {
					this.$Message.info("手机号不能为空")
					return
				} else {
					let params = {
						phone: phone
					}
					if(this.formCustom.isLogisticsCompany === 0){
					 console.log("***supplierRegCode***")
                      var res = await supplierRegCode(this, params)
                    }
                    if(this.formCustom.isLogisticsCompany === 1){
                      console.log("***carrierRegcode***")
                      var res = await carrierRegcode(this, params)
                    }

					if (res.data && res.status === 200) {
						this.ImgCodeValid = false

						this.$Message.info("短信发送成功")

						var sj = Math.ceil(Math.random(10 + 1) * 100000)
						window.localStorage.setItem("note", sj)
						this.auth_time = 60;
						var timer = setInterval(() => {
							this.auth_time--;
							if (this.auth_time <= 0) {
								clearInterval(timer)
								this.btnBoolen = false;
								this.btnClassName = "btns"
								this.btnValue = "获取短信验证码"

							} else {
								this.btnBoolen = true;
								this.btnValue = `重新获取(${this.auth_time})S`
								this.btnClassName = "btn"
							}
						}, 1000)

					} else {
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
			handleSubmit(name) {
				if (!this.phoneValid) {
					this.$Message.info({
						content: '手机号有误',
						duration: 5,
						closable: true
					})
					return
				} else if (!this.isopenSms) {
                    this.$Message.info({
                      content: '滑动验证有误',
                      duration: 5,
                      closable: true
                    })
					return
				} else if (!this.passwordValid) {
					this.$Message.info({
						content: '密码有误',
						duration: 5,
						closable: true
					})
					return
				} else if (!this.repasswordValid) {
					this.$Message.info({
						content: '请再次密码有误',
						duration: 5,
						closable: true
					})
					return
				} else if (!this.formCustom.single) {
					this.$Message.info({
						content: '请阅读巨正源用户协议',
						duration: 5,
						closable: true
					})
					return
				} else {
					this.current = 1
					this.$emit('currData', true)
          this.$emit('supplyTab',true)
					//this.$router.push({name:'userPerInfor', params:{params:userFormData}})
				}
			},
			//触发上一步
			handleUp() {
				this.current = 0
				this.$emit('currData', false)
                this.$emit('supplyTab',false)
			},
			//图片成功
			imageSuccess(res) {
				this.formCustom.businessLicense = res.url
                this.License_filextension = this.formCustom.businessLicense.substring(this.formCustom.businessLicense.lastIndexOf("."), this.formCustom.businessLicense.length);
			},
			handleFileSuccess(res) {
				this.formCustom.authorizationElc = res.url
                this.Elc_filextension = this.formCustom.authorizationElc.substring(this.formCustom.authorizationElc.lastIndexOf("."), this.formCustom.authorizationElc.length);
			},
			handleMaxSize(file) {
				this.$Notice.warning({
					title: '超出文件大小限制',
					desc: '文件 ' + file.name + ' 太大，不能超过 10M。'
				});
			},
			//其它文件
			handleOtherFile(res) {
              this.formCustom.otherLicense = res.url
              this.other_filextension = this.formCustom.otherLicense.substring(this.formCustom.otherLicense.lastIndexOf("."), this.formCustom.otherLicense.length);

			},
            handletransportFile(res){
              this.formCustom.transportLicense=res.url
              this.transport_filextension = this.formCustom.transportLicense.substring(this.formCustom.transportLicense.lastIndexOf("."), this.formCustom.transportLicense.length);

			},
			handleFormatError(file) {
				this.$Notice.warning({
					title: '文件格式不正确',
					desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg,png,pdf,png 格式的文件。'
				});
			},
          //危化品经营许可证
          HazchemiFile(res){
            this.formCustom.dangerouslicense=res.url
            this.danger_filextension = this.formCustom.dangerouslicense.substring(this.formCustom.dangerouslicense.lastIndexOf("."), this.formCustom.dangerouslicense.length);

          },
			// 校验公司名称
			async companyChenckValid(value, callback) {
				let params = {
					data: value,
					type: 1
				}
				const res = await supplierdataCheck(this, params)
              console.log("res",res)
				if (res.status === 200) {
					if (res.data.is_registered === "true") {
						this.companyValid = false
						callback(new Error('公司名称已被注册'))
					} else if (res.data.is_exist === "false") {
						this.companyValid = false
						callback(new Error('公司名称不存在'))
					} else if (res.data.is_exist === "true") {
					  console.log('res',res)
						this.companyValid = true
						this.formCustom.taxId = res.data.tax_id
						this.formCustom.corporation = res.data.operName
						this.formCustom.registCapi = res.data.registCapi
						this.formCustom.bankName = res.data.Bank
						this.formCustom.bankAccount = res.data.BankAccount
						this.formCustom.address = res.data.Address
						this.formCustom.telephone = res.data.Tel
						this.companyValid = true
						callback()
					}
				} else {
					this.companyValid = false
					callback(new Error('公司名称不存在'))
				}
			},
			//第二部提交
          async memberReset(data) {
				this.formCustom.code = this.formCustom.mobilecode
				this.formCustom.username = this.formCustom.companyName
				if (!this.companyValid) {
					this.$Notice.warning({
						title: '公司不能为空',
						duration: 5
					});
					return
				} else if (!this.formCustom.code) {
					this.$Notice.warning({
						title: '验证码不能为空',
						duration: 5
					});
					return
				} else if (!this.formCustom.password) {
					this.$Notice.warning({
						title: '密码不能为空',
						duration: 5
					});
					return
				} else if (!this.formCustom.phone) {
					this.$Notice.warning({
						title: '手机号不能为空',
						duration: 5
					});
					return
				}  else if (!this.formCustom.corporation) {
					this.$Notice.warning({
						title: '公司法人不能空',
						duration: 5
					});
					return
				} else if (!this.formCustom.taxId) {
					this.$Notice.warning({
						title: '税号不能空',
						duration: 5
					});
					return
				}  else if (!this.formCustom.bankName) {
					this.$Notice.warning({
						title: '开户银行不能空',
						duration: 5
					});
					return
				} else if (!this.formCustom.bankAccount) {
					this.$Notice.warning({
						title: '银行账号不能空',
						duration: 5
					});
					return
				} else if (!this.formCustom.address) {
					this.$Notice.warning({
						title: '地址不能空',
						duration: 5
					});
					return
				} else if (!this.formCustom.telephone) {
                  this.$Notice.warning({
                    title: '公司电话不能空',
                    duration: 5
                  });
                  return
                }else if (!this.formCustom.registCapi) {
                  this.$Notice.warning({
                    title: '注册资金不能空',
                    duration: 5
                  });
                  return
                } else if (!this.formCustom.contacter) {
                  this.$Notice.warning({
                    title: '联系人不能为空',
                    duration: 5
                  });
                  return
                }else if (!this.formCustom.contacterEmail) {
                  this.$Notice.warning({
                    title: '邮箱不能为空',
                    duration: 5
                  });
                  return
                } else if (!this.formCustom.natureName) {
                  this.$Notice.warning({
                    title: '公司性质不能空',
                    duration: 5
                  });
                  return
                } else if (!this.formCustom.businessLicense) {
                  this.$Notice.warning({
                    title: '营业执照不能为空',
                    duration: 5
                  });
                  return
                } else if (!this.formCustom.authorizationElc) {
                  this.$Notice.warning({
                    title: '授权书不能为空',
                    duration: 5
                  });
                  return
                }else if (!this.formCustom.transportLicense && this.formCustom.isLogisticsCompany > 0) {
                  this.$Notice.warning({
                    title: '运输许可证不能为空',
                    duration: 5
                  });
                  return
                }  else {
                  this.submitModal=true;
				}
			},
          cancel(){},
          ok(){
            this.supSubmit(this.formCustom)
          },
          async supSubmit(formCustom){
              const res = await supplierReg(this, formCustom)
              if (res.status === 200 && !res.data.errorcode) {
                this.current = 2
                this.$emit('currData', false)
                 //this.$router.push({name:'RegisterSuccess'})
              } else {
                this.$Message.info({
                  content: res.data.message,
                  duration: 5,
                  closable: true
                })
                return
              }
            },
			async companyNature(value) {
				const res = await supplierNature(this, {})
				if (res.data && res.status === 200) {
					this.supplierNatureList = res.data
				} else {

				}
			},
			protocolModalToShow() {
				if(this.formCustom.isLogisticsCompany==1){
					this.title='承运商注册协议'
				}else{
					this.title='供应商注册协议'
				}
				this.protocolModalShow = true
			},
			protocolOkClick() {
				this.protocolModalShow = false
			},
			protocolModalCancel() {
				this.formCustom.single = false
				this.protocolModalShow = false
			},
			//确认协议
			protocol() {

				this.formCustom.single = true
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
<style lang="less">
  .CarrierRegister{width: 83%}
  .UserRegister{width: 44%}
  .Image{
    width: 116px;
    height: 75px;
    overflow: hidden;
    margin-left: 130px;
    margin-bottom: 10px;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .ivulist{
    font-size: 16px;
    li{
      display: flex;
      line-height: 30px;
      .idsa{
        width: 68px; text-align-last:justify;
      }
    }
  }
</style>
