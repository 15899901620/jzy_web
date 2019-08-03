<template>
  <div class="clearfix graybg">
    <div class="w1200 dflex " style="margin-bottom: 40px">
      <usernav></usernav>
      <div class="memberInfor ml20  whitebg bdccc  mt20">
        <h1 class="fs16 ml25 mt25 bb1 pb10" >完善信息</h1>
        <!--基本信息-->
        <ul class="inforList">
          <div class="inforTitle">基本信息</div>
          <li><span class="titleInfor">企业名称</span><span class="blackFont fs14">{{userinfor.company_name}}</span> </li>
          <li style="align-items: inherit;">
            <span class="titleInfor mt10" >营业执照</span>
            <div class="dflex" style="flex-direction: column;">
              <div class="dflex licenseImg" style="flex-direction: column;">
                <img :src="userinfor.business_license"/>
              </div>
            </div>
          </li>
          <li>
            <span class="titleInfor" >企业授权书</span><div class="dflex" style="flex-direction: column;">
            <div class="dflex licenseImg" style="flex-direction: column;">
              <img :src="userinfor.authorization_elc"/>
            </div>
          </div>
          </li>
        </ul>
        <!--开票信息-->
        <Form ref="formValidate" :model="userinfor"   :label-width="80">
        <ul class="inforList">
          <div class="inforTitle">开票信息</div>
          <li>
            <span class="titleInfor">公司名称</span><span class="blackFont fs14">{{userinfor.companyName}}</span>
          </li>
          <li>
            <span class="titleInfor">纳税人识别号</span><Input type="text" v-model="userinfor.taxId" class="inforInput"   />
          </li>
          <li>
            <span class="titleInfor">开户行</span><Input type="text" class="inforInput" v-model="userinfor.invBankName" />
          </li>
          <li>
            <span class="titleInfor">账号</span><Input type="text" class="inforInput" v-model="userinfor.invBankAccount" />
          </li>
          <li>
            <span class="titleInfor">地址</span><Input type="text" class="inforInput" v-model="userinfor.invAddress" />
          </li>
          <li>
            <span class="titleInfor">电话</span><Input type="text" class="inforInput" v-model="userinfor.invTelephone" />
          </li>
        </ul>
        <!--联系人信息-->
        <ul class="inforList mb30">
          <div class="inforTitle">联系人信息</div>
          <li>
            <span class="titleInfor">联系人</span><Input type="text" class="inforInput" v-model="userinfor.contacter" />
          </li>
          <li>
            <span class="titleInfor">电话</span><Input type="text" class="inforInput" v-model="userinfor.contacter_mobile" />
          </li>
          <li>
            <span class="titleInfor">邮箱</span><Input type="text" class="inforInput" v-model="userinfor.contacter_email" />
          </li>

        </ul>
        <Button class="saveInfor" @click="handleSubmit">保存</Button>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import { getGainuserInfor, manageEdit } from  '../../api/users'
import Navigation from '../../components/navigation'

export default {
  name: "useraccountinfor",
  layout:'membercenter',
  components:{
    usernav: Navigation.user
  },
  fetch({ store }) {
    return Promise.all([
      store.dispatch('system/getSystemCnf'),
      store.dispatch('menu/getMenuList')
    ])
  },
  data() {
    return {
      userinfor:{},
    };
  },
  methods:{
    //获取用户信息
    async UserInfor(){
      const res=await getGainuserInfor(this,{})
      this.userinfor=res.data
    },
    async handleSubmit(){
      const res=await manageEdit(this, this.userinfor)
      if(res.data===true && res.status ===200){
        this.$Message.info({
          content: '修改成功',
          duration: 5,
          closable: true
        })
        this.$router.push({name:'users-usermodifyinfor'})
        return
      }
    }
  },
  create(){

  },
  mounted() {
    this.UserInfor()
  }
}
</script>

<style >
  .memberInfor{width: 83%}

  .inforList{margin-left: 25px; margin-top: 30px;}
  .inforList li{margin-left: 35px;margin-top: 20px; display: flex;align-items: center;}
  .inforTitle{border-left: 2px solid #007de4;padding-left: 5px; font-weight: bold;color: #007de4;font-size: 14px;}
  .titleInfor{width: 85px;color:#999; margin-right: 20px; text-align: right; font-size: 14px; }
  .inforInput{width: 340px;height: 40px;border-radius: 3px;   box-sizing: border-box;}
  .fileup{position: absolute;width: 90px;   height: 36px;right: 0;opacity: 0;}
  .upBtn{    width: 90px;   height: 36px; background-color: #007de4; line-height: 36px;
    text-align: center; color: #fff; border-top-right-radius: 3px;border-bottom-right-radius: 3px; }
  .inputUp{    border-bottom-right-radius: 0; border-top-right-radius: 0;box-sizing: border-box; width: 253px; height: 36px;border-radius: 3px;border: 1px solid #DEDEDE;}
  /*营业执照*/
  .inforImg li:first-child{margin-left: 0;}
  .inforImg li{margin-left: 10px; margin-top: 0;}

  .saveInfor{color: #fff;background-color: #007de4;border: none;    padding: 9px 40px;border-radius: 5px;margin-left: 173px;margin-bottom: 40px;}
  .saveInfor:hover{background-color: #007de4;color: #fff;}
  .licenseImg{width: 100px;height: 80px;} .licenseImg img{width: 100%; height: 100%;}
  .inforInput .ivu-input{height: 40px;}
</style>
