<template>
    <div class="clearfix graybg">
        <div class="w1200 dflex " style="margin-bottom: 40px">
            <usernav></usernav>
            <div class="memberInfor ml20  whitebg bdccc  mt20">
                <h1 class="fs16 ml25 mt25 bb1 pb10" >完善信息</h1>
                <!--基本信息-->
                <ul class="inforList">
                    <div class="inforTitle">基本信息</div>
                    <li>
                        <span class="titleInfor">企业名称</span><span class="blackFont fs14">{{userinfor.username}}</span>
                    </li>
                    <li style="align-items: inherit;">
                        <span class="titleInfor mt10" >营业执照</span>
                        <div class="dflex licenseImg" style="flex-direction: column;">
                            <img :src="userinfor.business_license"/>
                        </div>
                    </li>
                    <li>
                        <span class="titleInfor" >企业授权书</span>
                        <div class="dflex licenseImg" style="flex-direction: column;">
                            <img :src="userinfor.authorization_elc"/>
                        </div>
                    </li>
                </ul>
                <!--开票信息-->
                <ul class="inforList">
                    <div class="inforTitle">开票信息</div>
                    <li>
                    <span class="titleInfor">公司名称</span><span class="blackFont fs14">{{userinfor.username}}</span>
                    </li>
                    <li>
                    <span class="titleInfor">纳税人识别号</span><span class="blackFont fs14">{{userinfor.taxId}}</span>
                    </li>
                    <li>
                    <span class="titleInfor">开户行</span><span class="blackFont fs14">{{userinfor.invBankName}}</span>
                    </li>
                    <li>
                    <span class="titleInfor">账号</span><span class="blackFont fs14">{{userinfor.invBankAccount}}</span>
                    </li>
                    <li>
                    <span class="titleInfor">地址</span><span class="blackFont fs14">{{userinfor.invAddress}}</span>
                    </li>
                    <li>
                    <span class="titleInfor">电话</span><span class="blackFont fs14">{{userinfor.invTelephone}}</span>
                    </li>
                </ul>
                <!--联系人信息-->
                <ul class="inforList mb30">
                    <div class="inforTitle">联系人信息</div>
                    <li>
                    <span class="titleInfor">联系人</span><span class="blackFont fs14">{{userinfor.contacter}}</span>
                    </li>
                    <li>
                    <span class="titleInfor">手机</span><span>{{userinfor.contacter_mobile}}</span>
                    </li>
                    <li>
                    <span class="titleInfor">邮箱</span><span class="blackFont fs14">{{userinfor.contacter_email}}</span>
                    </li>

                </ul>
                <button class="saveInfor fs14" @click="modifInfor" >修改信息</button>
            </div>
        </div>
    </div>
</template>

<script>
import Navigation from '../../components/navigation'
import { getGainuserInfor } from  '../../api/users'
export default {
    name: "usermodifyinfor",
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
    data(){
        return{
            userinfor:{
            authorization_elc: "",
            avatar: null,
            business_license: "",
            channel_type_name: "",
            channel_type_value: "",
            company_name: "",
            contacter: "人",
            contacter_email: null,
            contacter_mobile: null,
            corporation: "",
            created: "",
            id:'',
            industry_name: "",
            industry_value: "",
            inv_address: "",
            inv_bank_account: "",
            inv_bank_name: "",
            inv_telephone: "",
            is_active: 1,
            main_materials_name: "",
            main_materials_value: "",
            member_no: "",
            member_type_name: "",
            member_type_value: "",
            password: "",
            phone: "18750123840",
            property_name: "",
            property_value: "",
            salesman_code: null,
            salesman_name: null,
            tax_id: "",
            username: "",
            }
        }
    },
    methods:{
        //获取用户信息
        async UserInfor(){
            const res=await getGainuserInfor(this,{})
            console.log(res)
            this.userinfor=res.data
        },
        modifInfor(){
            this.$router.push({name:'users-useraccountinfor'})
        }
    },
    create(){

    },
    mounted() {
        this.UserInfor()
    }
}
</script>

<style scoped>
  .memberInfor{width: 83%}

  .inforList{margin-left: 25px; margin-top: 30px;}
  .inforList li{margin-left: 35px;margin-top: 20px; display: flex;align-items: center;}
  .inforTitle{border-left: 2px solid #007de4;padding-left: 5px; font-weight: bold;color: #007de4;}
  .titleInfor{width: 85px;color:#999; margin-right: 25px; text-align: right; font-size: 14px; }
  .inforInput{width: 340px;height: 36px;border-radius: 3px;border: 1px solid #DEDEDE; padding-left: 10px;
    box-sizing: border-box;}
  .fileup{position: absolute;width: 90px;   height: 36px;right: 0;opacity: 0;}
  .upBtn{    width: 90px;   height: 36px; background-color: #007de4; line-height: 36px;
    text-align: center; color: #fff; border-top-right-radius: 3px;border-bottom-right-radius: 3px; }
  .inputUp{    border-bottom-right-radius: 0; border-top-right-radius: 0;box-sizing: border-box; width: 253px; height: 36px;border-radius: 3px;border: 1px solid #DEDEDE;}
  /*营业执照*/
  .inforImg li:first-child{margin-left: 0;}
  .inforImg li{margin-left: 10px; margin-top: 0;}

  .saveInfor{color: #fff;background-color: #007de4;border: none;    padding: 9px 40px;border-radius: 5px;margin-left: 173px;margin-bottom: 40px;}

  .licenseImg{width: 100px;height: 80px;} .licenseImg img{width: 100%; height: 100%;}
</style>
