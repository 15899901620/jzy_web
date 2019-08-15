<template>
    <div class="clearfix graybg">
        <div class="w1200 dflex " style="margin-bottom: 40px">
            <usernav></usernav>
            <div class="memberInfor ml20  whitebg bdccc  mt20">
                <h1 class="fs16 ml25 mt25 bb1 pb10" >完善信息</h1>
                <!--基本信息-->
                <ul class="inforList">
                    <div class="inforTitle">基本信息</div>
                    <li><span class="titleInfor">企业名称</span><span class="blackFont fs14">{{userinfor.username}}</span></li>
                    <li style="align-items: inherit;">
                        <span class="titleInfor mt10" >营业执照</span>
                        <div class="dflex" style="flex-direction: column;">
                            <div class="dflex licenseImg" style="flex-direction: column;">
                                <img :src="userinfor.business_license"/>
                            </div>
                        </div>
                    </li>
                    <li>
                        <span class="titleInfor" >企业授权书</span>
                        <div class="dflex" style="flex-direction: column;">
                            <div class="dflex licenseImg" style="flex-direction: column;">
                                <img :src="userinfor.authorization_elc"/>
                            </div>
                        </div>
                    </li>
                </ul>
                <!--开票信息-->
                <Form ref="formValidate" :model="userinfor" :label-width="80">
                    <ul class="inforList">
                        <div class="inforTitle">开票信息</div>
                        <li>
                            <span class="titleInfor">公司名称</span><span class="blackFont fs14">{{userinfor.username}}</span>
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
import { getCookies } from '../../config/storage'

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
        inLogin () {
            let userinfo = !getCookies('userinfor') ? '' : getCookies('userinfor')
            if (!userinfo) {
                this.$router.push('/login')
            }
        },
        //获取用户信息
        async UserInfor(){
             console.log(111);
            const res=await getGainuserInfor(this,{})
            console.log(res);
            this.userinfor=res.data
        },
        async handleSubmit(){
            let data = {
                phone: this.userinfor.phone,
                companyName: this.userinfor.username,
                business_license:  this.userinfor.business_license,
                authorization_elc:  this.userinfor.authorization_elc,
                taxId: this.userinfor.taxId,
                invBankName: this.userinfor.invBankName,
                invBankAccount: this.userinfor.invBankAccount,
                invAddress: this.userinfor.invAddress,
                invTelephone: this.userinfor.invTelephone,
                contacter: this.userinfor.contacter,
                contacter_mobile: this.userinfor.contacter_mobile,
                contacter_email: this.userinfor.contacter_email,
            }
            const res=await manageEdit(this, data)
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
        this.inLogin()
    },
    mounted() {
         this.UserInfor()
        console.log("UserInfor")
    }
}
</script>