<template>
    <div class="clearfix graybg">
        <div class="w1200 dflex " style="margin-bottom: 40px">
            <usernav></usernav>
            <div class="memberInfor ml20  whitebg bdccc  mt20">
                <h1 class="fs16 ml25 mt25 bb1 pb10" >完善信息</h1>
                <!--基本信息-->
                <ul class="inforList">
                    <div class="inforTitle">基本信息</div>
                    <li><span class="titleInfor">企业名称</span><span class="blackFont fs14">{{userinfor.company_name}}</span></li>
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
             console.log(111);
            const res=await getGainuserInfor(this,{})
            console.log(res);
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
        console.log("!")
        this.UserInfor()
    },
    mounted() {
        
    }
}
</script>