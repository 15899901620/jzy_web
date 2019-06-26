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

      <div class="carrierInfor_title">开票信息</div>
      <Form ref="formUserInfor" :model="formUserInfor" :rules="ruleCustom">
        <ul class="dflexAlem Carinput" style=" margin-top: 23px; flex-direction: column;justify-content: center;">
          <li>
            <span class="CarrierTitle" ><i class="orangeFont mr5">*</i>公司名称</span>
            <FormItem  prop="companyName">
            <Input type="text" v-model="formUserInfor.companyName" class="CarrierIput"   placeholder="请输入公司名称" />
            </FormItem>
          </li>
          <li>
            <span class="CarrierTitle" ><i class="orangeFont mr5">*</i>纳税人识别号</span>
            <FormItem  prop="taxId">
              <Input type="text" class="CarrierIput" v-model="formUserInfor.taxId"   placeholder="请输入纳税人识别号" />
            </FormItem>
          </li>
          <li>
            <span class="CarrierTitle" ><i class="orangeFont mr5">*</i>开户行</span>
            <FormItem  prop="invBankName">
            <Input type="text" class="CarrierIput" v-model="formUserInfor.invBankName"    placeholder="请输入开户行" />
            </FormItem>
          </li>
          <li>
            <span class="CarrierTitle"><i class="orangeFont mr5">*</i>银行账号</span>
            <FormItem  prop="invBankAccount">
            <Input type="text" class="CarrierIput" v-model="formUserInfor.invBankAccount"   placeholder="请输入银行账号" />
            </FormItem>
          </li>
          <li>
            <span class="CarrierTitle"><i class="orangeFont mr5">*</i>开票地址</span>
            <FormItem  prop="invAddress">
            <Input type="text" class="CarrierIput" v-model="formUserInfor.invAddress"   placeholder="请输入详细开票地址" />
            </FormItem>
          </li>
          <li>
            <span class="CarrierTitle"><i class="orangeFont mr5">*</i>开票电话</span>
            <FormItem  prop="invTelephone">
            <Input type="text" class="CarrierIput"  v-model="formUserInfor.invTelephone"    placeholder="请输入开票电话" />
            </FormItem>
          </li>
        </ul>
        <div class="carrierInfor_title">基本信息</div>
        <ul class="dflexAlem Carinput" style=" margin-top: 23px; flex-direction: column;justify-content: center;">
          <li>
            <span class="CarrierTitle"  ><i class="orangeFont mr5">*</i>联系人</span>
            <FormItem  prop="contacter">
              <Input type="text" v-model="formUserInfor.contacter" class="CarrierIput"  placeholder="请输入联系人" />
            </FormItem>
          </li>
          <li>
            <span class="CarrierTitle" style="margin-left: -50px;"><i class="orangeFont mr5">*</i>营业执照</span>
            <div style="width: 370px; display: flex">
              <FormItem>
                <Upload
                  ref="upload"
                  action="//192.168.40.31:28082/image"
                  :on-success="imageSuccess">
                  <Button icon="ios-cloud-upload-outline">上  传</Button>
                </Upload>
              </FormItem>
              <div class="uploadimg" v-if="UploadImg"><img :src="UploadImg.image"></div>
            </div>
          </li>
          <li>

            <span class="CarrierTitle" style="margin-left: -50px;"><i class="orangeFont mr5">*</i>授权书</span>

              <div style="width: 370px;">
                <Row>
                  <FormItem>
                  <Col span="12">
                    <Upload
                      action="//192.168.40.31:28082/file">
                      <Button icon="ios-cloud-upload-outline">上  传</Button>
                    </Upload>

                  </Col>
                  </FormItem>
                </Row>
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
  import { manageReg } from '../api/users'
    export default {
      name: "userPerInfor",
      layout:'membercenter',
      data(){
        const validateCompanyName = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入公司名称'));
          } else {
            callback();
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
          return{
            UploadImg:{
              image:[]
            },
            formUserInfor: {
              phone:'',
              password:'',
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
              companyName: [
                { validator: validateCompanyName, trigger: 'blur' }
              ],
              taxId: [
                { validator: validateTaxId, trigger: 'blur' }
              ],
              invBankName: [
                { validator: validateInvBankName, trigger: 'blur' }
              ],
              invBankAccount: [
                { validator: validateInvBankAccount, trigger: 'blur' }
              ],
              invAddress: [
                { validator: validateInvAddress, trigger: 'blur' }
              ],
              invTelephone: [
                { validator: validateInvTelephone, trigger: 'blur' }
              ],
              contacter: [
                { validator: validateContacter, trigger: 'blur' }
              ],


            }
          }
      },
      methods:{
        imageSuccess(res){
          this.UploadImg.image.push(res.url)
        },
        // 会员注册提交
        memberReset(data){


          if(!this.formUserInfor.companyName){
            this.$Message.info({
              content: '公司名称不能为空',
              duration: 5,
              closable: true
            })
            return
          }else if(!this.formUserInfor.taxId){
            this.$Message.info({
              content: '税号不能为空',
              duration: 5,
              closable: true
            })
            return
          }else if(!this.formUserInfor.invBankName){
            this.$Message.info({
              content: '开户行不能为空',
              duration: 5,
              closable: true
            })
            return
          }else if(!this.formUserInfor.invBankAccount){
            this.$Message.info({
              content: '银行账号不能为空',
              duration: 5,
              closable: true
            })
            return
          }else if(!this.formUserInfor.invAddress){
            this.$Message.info({
              content: '开票不能为空',
              duration: 5,
              closable: true
            })
            return
          }else if(!this.formUserInfor.invTelephone){
            this.$Message.info({
              content: '开票电话不能为空',
              duration: 5,
              closable: true
            })
            return
          }else if(!this.formUserInfor.business_license){
            this.$Message.info({
              content: '请上传营业执照',
              duration: 5,
              closable: true
            })
            return
          }else if(!this.formUserInfor.authorization_elc){
            this.$Message.info({
              content: '请上传授权书',
              duration: 5,
              closable: true
            })
            return
          }else{
            console.log('this.formUserInfor', this.formUserInfor)
            const res = manageReg(this, this.formUserInfor)
            this.$router.push({path:'./RegisterSuccess'})
          }



        },

      },
      mounted() {

        console.log('this.$router',this.$router)
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

  .CarrierTitle{width: 120px;text-align: right; color: #333; margin-right: 10px; font-size: 14px;}

  .ivu-form-item{width: 100%; margin-bottom: 0px;  }
  .ivu-form-item .ivu-form-item-content .ivu-upload{display: flex;height: 32px;}
  .ivu-upload-list{margin-top: 0px;display: flex;}
  .ivu-upload-list li{margin-top: 0px; margin-left: 10px;}
  .ivu-form-item .ivu-form-item-content .ivu-upload .ivu-upload-list .ivu-upload-list-file{padding: 0 6px;}
  .Carinput li .ivu-form-item .ivu-form-item-content .ivu-form-item-error-tip{left: 10px;}
  .Carinput li .ivu-form-item .ivu-form-item-content .CarrierIput .ivu-input{height: 42px; line-height: 42px;}
  .ivu-form-item .ivu-form-item-content .CarrierIput .ivu-upload{display: flex;height: 42px;}
</style>
