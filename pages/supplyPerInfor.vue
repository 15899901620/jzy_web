<template>
  <div class="clearfix graybg ovh">
    <div class="w1200 whitebg ovh" style="margin-top: 20px; margin-bottom: 10px;">
      <!--进度-->
      <div class="dflexAlem" style="justify-content: center; margin-top: 40px; font-size: 14px;">
        <div class="CarrierPro dflexAlem curr" style=" flex-direction: column;  ">
          <div class="CarrierPro_num ">1</div>
          <span>填写注册信息</span>
        </div>
        <div class="lineProgress"></div>
        <div class="CarrierPro dflexAlem curr" style=" flex-direction: column;  ">
          <div class="CarrierPro_num">2</div>
          <span>完善信息</span>
        </div>
        <div class="lineProgress"></div>
        <div class="CarrierPro dflexAlem " style=" flex-direction: column;  ">
          <div class="CarrierPro_num">3</div>
          <span>待审核</span>
        </div>

      </div>

      <div class="carrierInfor_title">基本信息</div>

      <Form ref="formSupplyInfor" :model="formSupplyInfor" :rules="ruleCustom">
        <ul class="dflexAlem Carinput" style=" margin-top: 23px; flex-direction: column;justify-content: center;">
          <li>
            <FormItem  prop="username">
              <span class="CarrierTitle" style="margin-left: -29px;"><i class="orangeFont mr5">*</i>公司名称</span>
              <Input type="text" v-model="formSupplyInfor.username" @on-blur="companyValidCheck"  class="CarrierIput"   placeholder="请输入公司名称" />
            </FormItem>
          </li>
          <li>
            <FormItem  prop="corporation">
              <span class="CarrierTitle" ><i class="orangeFont mr5">*</i>法人</span>
              <Input type="text" v-model="formSupplyInfor.corporation"    class="CarrierIput"   placeholder="请输入法人" />
            </FormItem>
          </li>
          <li>
            <FormItem  prop="taxId">
              <span class="CarrierTitle" style="margin-left: -55px;"><i class="orangeFont mr5">*</i>纳税人识别号</span>
              <Input type="text" class="CarrierIput" v-model="formSupplyInfor.taxId"   placeholder="请输入纳税人识别号" />
            </FormItem>
          </li>
          <li>
            <FormItem  prop="bankName">
              <span class="CarrierTitle" style="margin-left: -14px;"><i class="orangeFont mr5">*</i>开户行</span>
              <Input type="text" class="CarrierIput" v-model="formSupplyInfor.bankName"  placeholder="请输入开户行" />
            </FormItem>
          </li>
          <li>
            <FormItem  prop="bankAccount">
              <span class="CarrierTitle"><i class="orangeFont mr5">*</i>账号</span>
              <Input type="text" class="CarrierIput" v-model="formSupplyInfor.bankAccount" placeholder="请输入银行账号" />
            </FormItem>
          </li>
          <li>
            <FormItem  prop="telephone">
              <span class="CarrierTitle" style="margin-left: -29px;"><i class="orangeFont mr5">*</i>公司电话</span>
              <Input type="text" class="CarrierIput" v-model="formSupplyInfor.telephone"   placeholder="请输入公司电话" />
            </FormItem>
          </li>
          <li>
            <FormItem  prop="address">
              <span class="CarrierTitle" style="margin-left: -29px;"><i class="orangeFont mr5">*</i>公司地址</span>
              <Input type="text" class="CarrierIput" v-model="formSupplyInfor.address"  placeholder="请输入详细地址" />
            </FormItem>
          </li>
        </ul>
         <ul class="dflexAlem Carinput" style=" margin-top: 0px; flex-direction: column;justify-content: center;">
          <li>
            <FormItem  prop="contacter">
              <span class="CarrierTitle" style="margin-left: -14px;"><i class="orangeFont mr5">*</i>联系人</span>
              <Input type="text" v-model="formSupplyInfor.contacter" class="CarrierIput"   placeholder="请输入联系人" />
            </FormItem>
          </li>
          <li>
            <FormItem  prop="contacterMobile">
              <span class="CarrierTitle ml5">电话</span>
              <Input type="text" class="CarrierIput"  v-model="formSupplyInfor.contacterMobile"    placeholder="请输入联系电话" />
            </FormItem>
          </li>
          <li>
            <FormItem  prop="contacterEmail">
              <span class="CarrierTitle ml5">邮箱</span>
              <Input type="text" class="CarrierIput"  v-model="formSupplyInfor.contacterEmail"    placeholder="请输入联系邮箱  " />
            </FormItem>
          </li>
          <li>

            <div style="width: 370px;display: flex; align-items: center">
              <span class="CarrierTitle" style="margin-left: -82px; margin-right: 16px;"><i class="orangeFont mr5">*</i>营业执照</span>
              <FormItem>
                <Upload
                  ref="upload"
                  action="//192.168.40.31:28082/image"
                  :on-success="imageSuccess"
                  :format="['jpg','jpeg','png']"
                  :max-size="2048"
                  :on-format-error="handleFormatError"
                  :on-exceeded-size="handleMaxSize"
                >
                  <Button icon="ios-cloud-upload-outline">上  传</Button>
                </Upload>
              </FormItem>
            </div>
          </li>
          <li>
            <FormItem  prop="registCapi">
              <span class="CarrierTitle" style="margin-left: -26px;"><i class="orangeFont mr5">*</i>注册资金</span>
              <Input type="text" v-model="formSupplyInfor.registCapi" class="CarrierIput"  placeholder="请输入注册资金" />
            </FormItem>
          </li>
          <li>

            <FormItem>
              <span class="CarrierTitle" style="margin-left: -26px; width: 69px;"><i class="orangeFont mr5">*</i>公司性质</span>
               <Select  class="CarrierIput">
                <Option @click.native="getItemValue(items)" v-for="(items, index) in supplierNatureList" value="items.value"  :key="index">{{items.value_name}}</Option>
              </Select>
             </FormItem>

          </li>
          <li>



            <div style="width: 370px; display: flex; align-items: center">
              <span class="CarrierTitle" style="margin-left: -82px;  margin-right: 16px;"><i class="orangeFont mr5">*</i>授权书</span>
              <Row>
                <FormItem>
                  <Col span="12">
                    <Upload
                      ref="upLAload"
                      action="//192.168.40.31:28082/image"
                      :on-success="handleFileSuccess"
                      :format="['jpg','jpeg','png']"
                      :max-size="2048"
                      :on-format-error="handleFormatError"
                      :on-exceeded-size="handleMaxSize"
                     >
                      <Button icon="ios-cloud-upload-outline"  >上  传</Button>
                    </Upload>
                  </Col>
                </FormItem>
              </Row>
            </div>


          </li>
          <li>

            <div style="width: 370px;display: flex; align-items: center">
              <span class="CarrierTitle" style="margin-left: -82px; margin-right: 16px;"><i class="orangeFont mr5">*</i>其它文件</span>
              <FormItem>
                <Upload
                  ref="upload"
                  action="//192.168.40.31:28082/image"
                  :on-success="handleOtherFile"
                  :format="['jpg','jpeg','png']"
                  :max-size="2048"
                  :on-format-error="handleFormatError"
                  :on-exceeded-size="handleMaxSize"
                >
                  <Button icon="ios-cloud-upload-outline">上  传</Button>
                </Upload>
              </FormItem>
            </div>
          </li>
        </ul>
        <div class="dflexAlem mt15" style="justify-content: center;">
          <Button class="CarrierRegister" @click="memberReset('formCustom')">提  交</Button>
        </div>

      </Form>








    </div>
  </div>
</template>

<script>

  import {supplierReg, supplierdataCheck, supplierNature } from '../api/users'

  export default {
        name: "supplyPerInfor",
      data(){
        // 供应商名称
        const validatename = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('供应商名称不能为空'));
          } else {
            callback();
          }
        };
        const validatTaxId= (rule, value, callback)=>{
          if (value === '') {
            callback(new Error('税号不能为空'));
          } else {
            callback();
          }
        };
        //联系人
        const validateContacter = (rule, value, callback) => {
          console.log('value', value)
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
          return{
            supplierNatureList:[],
            usernameValid:false,
            BankNameValid:false,    //开户不能为空
            BankAccountValid:false,  //账号不能为空
            TelephoneValid:false,     //公司电话不能空
            formSupplyInfor: {
              code:'',
              username: '',      //供应商名称
              phone: '',          //注册手机号
              password:'',      //密码
              taxId:'',          //纳税人识别号
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
              username: [
                { validator: validatename, trigger: 'blur' }
              ],
              taxId:[
                { validator: validatTaxId, trigger: 'blur' }
              ],
              contacter: [
                { validator: validateContacter, trigger: 'blur' }
              ],
              bankAccount:[
                { validator: validateBankAccount, trigger: 'blur' }
              ],
              telephone:[
                { validator: validateTelephone, trigger: 'blur' }
              ],
              address:[
                { validator: validateAddress, trigger: 'blur' }
              ],
              bankName:[
                {validator: validateBankName, trigger: 'blur' }
              ],
              registCapi:[
                {validator: validateRegistCapi, trigger: 'blur' }
              ]

            }
          }

      },

      methods:{
        // 公司信息加载
        companyData(res){
          console.log('公司信息res', res)
          this.formSupplyInfor.taxId=res.data.creditCode
          this.formSupplyInfor.corporation=res.data.operName
          this.formSupplyInfor.address=res.data.address
          this.formSupplyInfor.registCapi=res.data.registCapi
        },
        getItemValue(items){
          console.log('items', items)
          this.formSupplyInfor.natureName=items.value,           //供应商性质
          this.formSupplyInfor.natureValue=items.value_name      //供应商性质值
          console.log('formSupplyInfor', this.formSupplyInfor)
        },
         // 营业执照
        imageSuccess(res){

          this.formSupplyInfor.businessLicense=res.url
          console.log('this.formSupplyInfor.businessLicense', this.formSupplyInfor.businessLicense)
         },
        // 授权书
        handleFileSuccess(res){
          this.formSupplyInfor.authorizationElc=res.url
          console.log('this.formSupplyInfor.authorizationElc', this.formSupplyInfor.authorizationElc)
        },
        //其它文件
        handleOtherFile(res){
          this.formSupplyInfor.other_license=res.url
          console.log('this.formSupplyInfor.other_license', this.formSupplyInfor.other_license)
        },
        handleFormatError (file) {
          this.$Notice.warning({
            title: '文件格式不正确',
            desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
          });
        },
        handleMaxSize (file) {
          this.$Notice.warning({
            title: '超出文件大小限制',
            desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
          });
        },
       //验证企业名称
        async companyValidCheck(){
          console.log('企业名称')
          let params = {
            data:this.formSupplyInfor.username,
            type:1,
          }
          console.log('params', params)
          const res = await supplierdataCheck(this, params)
          console.log('res', res)
          if(res.data && res.status === 200){
            console.log('名称res', res)
            this.companyValid=true
            this.companyData(res)   //公司信息加载
          }else{
            this.$Notice.warning({
              title: '公司信息不存在，请在次核对',
              duration: 5
            });
          }
        },
        // 公司性质
        async companyNature(value){

          const res = await supplierNature(this, {})
          console.log('res', res)
          if(res.data && res.status===200){
            this.supplierNatureList=res.data
          }else{

          }
        },
        async memberReset(){
          console.log(' this.formSupplyInfor',  this.formSupplyInfor)
          if(!this.companyValid){
            this.$Notice.warning({
              title: '不能为空',
              duration: 5
            });
            return
          }else if(!this.formSupplyInfor.code){
            this.$Notice.warning({
              title: '验证码不能空',
              duration: 5
            });
            return
          }else if(!this.formSupplyInfor.password){
            this.$Notice.warning({
              title: '密码不能空',
              duration: 5
            });
            return
          }else if(!this.formSupplyInfor.phone){
            this.$Notice.warning({
              title: '手机号不能空',
              duration: 5
            });
            return
          }else if(!this.formSupplyInfor.contacter){
            this.$Notice.warning({
              title: '联系人不能空',
              duration: 5
            });
            return
          }else if(!this.formSupplyInfor.businessLicense){
            this.$Notice.warning({
              title: '营业执照不能空',
              duration: 5
            });
            return
          }else if(!this.formSupplyInfor.authorizationElc){
            this.$Notice.warning({
              title: '授权书不能空',
              duration: 5
            });
            return
          }else if(!this.formSupplyInfor.corporation){
            this.$Notice.warning({
              title: '法人不能空',
              duration: 5
            });
            return
          }else if(!this.formSupplyInfor.taxId){
            this.$Notice.warning({
              title: '税号不能空',
              duration: 5
            });
            return
          }else if(!this.formSupplyInfor.corporation){
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
          }else if(!this.formSupplyInfor.address){
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
          }else if(! this.formSupplyInfor.natureName){
            this.$Notice.warning({
              title: '公司性质不能空',
              duration: 5
            });
            return
          }else{
            console.log('formSupplyInfor', this.formSupplyInfor)
            const res = await supplierReg(this, this.formSupplyInfor)
            console.log(res)
            if(res.data && res.status === 200){
              this.$router.push({name:'RegisterSuccess'})
            }else{
              console.log(res)
              this.$Message.info({
                content: '注册未成功',
                duration: 5,
                closable: true
              })
              return
            }
          }


        }
      },

      mounted() {
        this.companyNature()
        var Params=this.$router.history.current.params.params
        console.log('Params', Params)
        if(Params){
          this.formSupplyInfor.phone=this.$router.history.current.params.params.phone
          this.formSupplyInfor.password=this.$router.history.current.params.params.password
          this.formSupplyInfor.code=this.$router.history.current.params.params.code
          console.log('this.formUserInfor', this.formSupplyInfor)
        }
      }
    }
</script>

<style  >
  /*注册进度*/
  .CarrierPro{position: relative;}
  .CarrierPro.curr .CarrierPro_num{background-color: #007de4; color: #fff;}
  .CarrierPro.curr span{color: #007de4;}
  .CarrierPro span{position: absolute;bottom: -25px;width: 90px;text-align: center; color: #666;}
  .lineProgress{border: 1px dashed #DEDEDE;width: 20%; margin: 0 5px;}
  .CarrierPro_num{ color: #666; width: 41px;height: 41px; line-height: 41px; text-align: center;font-size: 16px;border-radius: 50%;background-color: #f0f2f5;}

  .carrierInfor_title{display: block; line-height: 50px; font-size: 16px;  padding-left: 125px; margin: 0 90px;height: 50px;background-color: #f8f8f8; margin-top: 80px;}
  .Carinput li{display: flex;align-items: center;margin-top: 20px;}
  .Carinput li .CarrierIput{font-size: 14px; margin-left: 5px;  box-sizing: border-box; width: 375px;border-radius: 3px;  height: 42px;line-height: 42px;}
  .Carinput li .codeCarrier{margin-left: 20px;width: 90px; height: 42px; border-radius: 5px; display: flex; align-items: center;}
  .CarrierRegister{margin-top: 30px;margin-bottom: 60px;margin-left: 55px; border-radius:3px;  cursor: pointer;width: 375px;height: 42px;border: none; background-color: #007de4; color: #fff;}
  .CarrierRegister:hover{background-color: #007de4; color: #fff;}
  .CarrierTitle{width: 120px;text-align: right; color: #333; margin-right: 10px; font-size: 14px;}

  .ivu-form-item{ margin-bottom: 0px;  }
  .ivu-form-item .ivu-form-item-content .ivu-select-single .ivu-select-selection{height: 42px;}
  .ivu-form-item .ivu-form-item-content .ivu-select-single .ivu-select-selection .ivu-select-placeholder, .ivu-select-single .ivu-select-selection .ivu-select-selected-value{height: 42px; line-height: 42px;}
  .ivu-form-item .ivu-form-item-content .ivu-upload{display: flex;height: 32px;}
  .ivu-upload-list{margin-top: 0px;display: flex;}
  .ivu-upload-list li{margin-top: 0px; margin-left: 10px;}
  .ivu-form-item .ivu-form-item-content .ivu-upload .ivu-upload-list .ivu-upload-list-file{padding: 0 6px;margin-top: 0;}
  .Carinput li .ivu-form-item .ivu-form-item-content .ivu-form-item-error-tip{left: 54px;}
  .Carinput li .ivu-form-item .ivu-form-item-content .CarrierIput .ivu-input{height: 42px; line-height: 42px;}
  .ivu-form-item .ivu-form-item-content .CarrierIput .ivu-upload{display: flex;height: 42px;}

  .ivu-upload-list-file>span{display: flex; align-items: center;}
</style>
