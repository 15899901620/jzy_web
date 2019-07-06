<template>
  <div class="clearfix  graybg">
    <div class="w1200 dflex " style="margin-bottom: 40px;"  >
      <!--会员中心列表-->
      <Rightmenu></Rightmenu>

      <!--右边信息-->
      <div class="memberInfor ml20  whitebg bdccc  mt20">
        <!--修改信息-->
        <div class="ml25 mr25">
          <h1 class="fs16 bb1  mt25 pb10">修改信息</h1>
          <!-- 基本信息-->

          <ul class="BaseInfor mt30">
            <h3 class="perfectTitle">基本信息</h3>
            <li style="margin-top: 10px"><span class="perfectInput" style="margin-top: 0px">公司名称</span><span>{{suppplier.username}}</span></li>
            <li style="margin-top: 20px"><span class="perfectInput">营业执照</span>
                <div class="LicenseImg">
                  <template v-if="suppplier.businessLicense">
                    <img :src="suppplier.businessLicense">
                  </template>

                </div>
            </li>
            <li style="margin-top: 20px"><span class="perfectInput" >其他资质</span>
              <div class="LicenseImg">
                <template v-if="suppplier.otherLicense">
                <img :src="suppplier.otherLicense">
                </template>
              </div>
            </li>
            <li style="margin-top: 20px"><span class="perfectInput">企业授权书</span>
              <div class="LicenseImg">
                <img :src="suppplier.authorizationElc">
              </div>
            </li>
          </ul>
          <Form :model="suppplier">


          <ul class="BaseInfor mt20">
             <li><span class="perfectInput">纳税人识别号</span>
               <div class="textPerfect">
                 <Input type="text" v-model="suppplier.taxId"  />
                 <i class="redFont fs12" v-show="taxIdError">{{taxIdTip}}</i>
               </div>
             </li>
            <li><span class="perfectInput">开户行</span>
              <div class="textPerfect">
                <Input type="text" v-model="suppplier.bankName"  />
                <i class="redFont fs12" v-show="bankNameError">{{bankNameTip}}</i>
              </div>
            </li>
            <li><span class="perfectInput">账号</span>
              <div class="textPerfect">
                <Input type="text" v-model="suppplier.bankAccount"  />
                <i class="redFont fs12" v-show="AccountError">{{bankAccountTip}}</i>
              </div></li>
            <li><span class="perfectInput">地址</span>
              <div class="textPerfect">
                <Input type="text" v-model="suppplier.address"  />
                <i class="redFont fs12" v-show="addressError">{{addressTip}}</i>
              </div></li>
            <li><span class="perfectInput">注册资金</span>
              <div class="textPerfect">
                <Input type="text" v-model="suppplier.registCapi"  />
                <i class="redFont fs12" v-show="registCapiError">{{registCapiTip}}</i>
              </div>
            </li>
           </ul>
          <ul class="BaseInfor mt40">
            <h3 class="perfectTitle">联系人信息</h3>
            <li><span class="perfectInput">联系人</span>
              <div class="textPerfect">
                <Input type="text" v-model="suppplier.contacter"  />
                <i class="redFont fs12" v-show="contacterError">{{contacterTip}}</i>
              </div>
            </li>
            <li><span class="perfectInput">电话</span>
              <div class="textPerfect">
                <Input type="text" v-model="suppplier.contacterMobile"  />
                <i class="redFont fs12" v-show="MobileError">{{MobileTip}}</i>
              </div>
            </li>
            <li><span class="perfectInput">邮箱</span>
              <div class="textPerfect ">
                <Input type="text" v-model="suppplier.contacterEmail"  />

               </div>
            </li>
          </ul>
          <Button  class="ConfirmSubmit mb40" style="margin-left: 165px;" @click="submitInfor" >修改信息</Button >

          </Form>
        </div>





      </div>


    </div>

  </div>


</template>

<script>
  import memheader from '../../components/user-header/memheader'
  import Rightmenu from './trenderCompontent/Rightmenu'
  import { supplierInfor, supplierEdit } from '../../api/users'
    export default {
        name: "Perinfor",
      layout:'membercenter',
      components:{
        memheader,
        Rightmenu
      },
      data(){
        return{
          Totile:'',
          taxIdTip:'',
          bankNameTip:'',
          bankAccountTip:'',
          addressTip:'',
          registCapiTip:'',
          contacterTip:'',
          MobileTip:'',
          EmailTip:'',
          taxIdError:false,
          bankNameError:false,
          AccountError:false,
          addressError:false,
          registCapiError:false,
          contacterError:false,
          MobileError:false,

          suppplier:{},
        }
      },
      methods:{
          async supplierInfor(){
          let res= await supplierInfor(this,{})
            console.log('res', res)
            if(res.data && res.status ===200){
              let GainData={}
              GainData=res.data
              delete GainData.created;
              GainData.password='123456';
             // GainData.label='1';
                console.log('GainData:', GainData)
              this.suppplier=GainData
             }
          },
        async submitInfor(){
          if(!this.suppplier.taxId){
            this.taxIdError=true
            this.taxIdTip='纳税人识别号不能为空'
            return
          }else if(!this.suppplier.bankName){
            this.bankNameError=true
            this.bankNameTip='开户行不能为空'
            return
          }else if(!this.suppplier.bankAccount){
            this.AccountError=true
            this.bankAccountTip='账号不能为空'
            return
          }else if(!this.suppplier.address){
            this.addressError=true
            this.addressTip='地址不能为空'
            return
          }else if(!this.suppplier.registCapi){
            this.registCapiError=true
            this.registCapiTip='注册资金不能为空'
            return
          }else if(!this.suppplier.contacter){
            this.contacterError=true
            this.contacterTip='联系人不能为空'
            return
          }else if(!this.suppplier.contacterMobile){
            this.MobileError=true
            this.MobileTip='联系电话不能为空'
            return
          }else{
          let res= await supplierEdit(this,this.suppplier)
          if(res.data.data ===null && res.status === 200){
            this.$Notice.warning({
              title: res.data.message,
              duration: 5
            });
            return
          }
          if(res.data&& res.status === 200){
            this.$Message.info({
              content: '供应商信息修改成功',
              duration: 3,
              closable: true
            })
           this.supplierInfor()
          }

          }

        }
      },
      mounted(){
        this.supplierInfor()
        this.Totile=this.$router.history.current.query.category
      },

    }
</script>

<style >
  /*右侧内容*/
  .memberInfor{width: 970px;}

  .BaseInfor{display: flex; flex-direction: column; font-size: 14px;}
  .BaseInfor li{display: flex; margin-top: 3px;align-items: center;}
  .perfectTitle{border-left: 2px solid #007de4; color: #007de4; font-weight: bold;padding-left: 5px;}
  .perfectInput{    margin-top: -21px;text-align: right;width: 17%; color: #999;padding-right: 15px;}
  .textPerfect{width: 50%; height: 63px;  border-radius: 3px;  color: #666;box-sizing: border-box;}
  .perfectInput:before{content: '*'; font-size: 14px;color: #ff6700; padding-right: 5px;}

  .ConfirmSubmit{ margin-bottom: 40px; cursor: pointer; margin-left: 110px; margin-top: 40px; display: inline-block;padding: 10px 30px; color: #fff; border-radius: 3px; background-color: #007de4;}
  .ConfirmSubmit:hover{background-color: #007de4;    color: #fff;}
  .LicenseImg{width: 120px;height: 80px;} .LicenseImg img{width: 100%;    height: 100%;}

  .textPerfect .ivu-input{height: 42px;}
</style>
