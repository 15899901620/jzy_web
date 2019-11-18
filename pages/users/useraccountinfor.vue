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
                    <li><span class="titleInfor">手机号</span><span class="blackFont fs14">{{userinfor.phone}}</span></li>
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
                <Form ref="formValidate" :model="userinfor" :rules="ruleCustom" :label-width="80" >
                    <ul class="inforList">
                        <div class="inforTitle">开票信息</div>
                        <li>
                            <span class="titleInfor">公司名称</span><span class="blackFont fs14" > {{userinfor.username}}
                            </span>
                        </li>
                        <li>
                            <span class="titleInfor">纳税人识别号</span><Input type="text" v-model="userinfor.taxId" class="inforInput"   />
                        </li>
                        <li >
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
                            <span class="titleInfor">联系人</span><Input type="text" class="inforInput" v-model="userinfor.contacter"  @on-blur="contacter"/>
                        </li>

                        <li>
                            <span class="titleInfor">邮箱</span><Input type="text" class="inforInput" v-model="userinfor.contacter_email"     @on-blur="contacter_email" />
                        </li>
                    </ul>
                     <!--收票信息-->
                    <ul class="inforList mb30">
                        <div class="inforTitle">收票信息</div>
                        <li>
                            <span class="titleInfor">收票人</span><Input type="text" class="inforInput" v-model="userinfor.inv_contact"  />
                        </li>

                        <li>
                            <span class="titleInfor" >收票人联系方式</span><Input type="text" class="inforInput" v-model="userinfor.inv_contact_mobile"    />
                        </li>
                    
                        <li style="display: block;margin-left: 0px;">
                                <FormItem label="收票地址"   :label-width="150" >
                                        <div style="width:500px;">
                                                <address-from
                                                    :country="1"
                                                    :province="userinfor.inv_state"
                                                    :city="userinfor.inv_city"
                                                    :area="userinfor.inv_district"
                                                    :isshow="this.isAddressFormShow"
                                                    @selectAddress="getSelectCountry">
                                            </address-from>
                                        </div>
                                </FormItem>

                        </li>
                         <li>
                            <span class="titleInfor" >收票人详细地址</span><Input type="text" class="inforInput" v-model="userinfor.inv_address"    />
                        </li>
                    </ul>
                    <Button class="saveInfor" @click="handleSubmit">保存</Button>
                </Form>
            </div>
        </div>
    </div>
</template>

<script>
import { getGainuserInfor, manageEdit ,getuserInforId} from  '../../api/users'
import Navigation from '../../components/navigation'
import { getCookies } from '../../config/storage'
import AddressFrom from "../../components/address-from";

export default {
    name: "useraccountinfor",
	middleware: 'memberAuth',
    layout:'membercenter',
    components:{
        usernav: Navigation.user,
        AddressFrom
    },
    
    fetch({ store }) {
        return Promise.all([
					//获取顶部、中部、底部导航信息
					store.dispatch('common/getNavList'),
					//获取系统配置
					store.dispatch('common/getSysConfig'),
        ])
    },
    data() {
        const validateInvAddress = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入开票地址'));
				} else 	if (value.length > 38) {
					callback(new Error('开票地址内容不能超过38个字'));
				} else {
					callback();
				}
        };
        const validateInvTelephone = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入联系电话'));
            }  else 	if (value.length > 12) {
                callback(new Error('联系电话不能超过12位'));
            }else {
                callback();
            }
        };
        return {
            userinfor:{},
            isAddressFormShow: false,
            	ruleCustom: {
					invAddress: [
						{  required:true,  validator: validateInvAddress, trigger: 'blur'}
					],
					invTelephone: [
						{ required:true,    validator: validateInvTelephone, trigger: 'blur'}
					],
				}
			
        };
        
   
    },
    methods:{
        inLogin () {
            let userinfo = !getCookies('userinfor') ? '' : getCookies('userinfor')
            if (!userinfo) {
                this.$router.push('/login')
            }
        },
        getSelectCountry(res){
            this.userinfor.inv_country_id = res.countryId
            this.userinfor.inv_state = res.provinceId
            this.userinfor.inv_city = res.cityId
            this.userinfor.inv_district = res.areaId
        },
        contacter(){
            if(!this.userinfor.contacter){
                this.$Notice.warning({
                    title: '联系人不能为空',
                    duration: 5
                });
                return
            }
        },
        contacter_mobile(){
            if(!this.userinfor.contacter_mobile){
                this.$Notice.warning({
                    title: '联系人不能为空',
                    duration: 5
                });
                return
            }
            const isPhone = /^([0-9]{3,4}-)?[0-9]{7,8}$/; // 0571-86295197
            const isPhone02 = /^\d{3,4}-\d{3,4}-\d{3,4}$/; // 4001-550-520
            const isMob=/^1[0-9]{10}$/;
            const valuePhone = this.userinfor.contacter_mobile.trim();
            if (isMob.test(valuePhone) || isPhone.test(valuePhone) || isPhone02.test(valuePhone)) { // 正则验证

            } else {
                this.$Notice.warning({
                    title: '请输入正确手机号或座机电话',
                    duration: 5
                });
                return
    
            }
        },
         contacter_email(){
            if(!this.userinfor.contacter_email){
                this.$Notice.warning({
                    title: '邮箱不能为空',
                    duration: 5
                });
                return
            }
            const _email = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/; 
            const valueEmail = this.userinfor.contacter_email.trim();
            if (_email.test(valueEmail)) { // 正则验证

            } else {
                this.$Notice.warning({
                    title: '请输入正确的邮箱号',
                    duration: 5
                });
                return
    
            }
            
        },

        //获取用户信息
        async UserInfor(){
            const res=await getGainuserInfor(this,{})
     
            var   params= {
                member_id:res.data.id
            }
            const res1=await getuserInforId(this,params)
            this.userinfor=res1.data
            this.isAddressFormShow = true

           
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
                inv_contact: this.userinfor.inv_contact,
                inv_contact_mobile: this.userinfor.inv_contact_mobile,
                inv_country_id: this.userinfor.inv_country_id,
                inv_district: this.userinfor.inv_district,
                inv_city: this.userinfor.inv_city,
                inv_state: this.userinfor.inv_state,
                inv_address: this.userinfor.inv_address
                    
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

    }
}
</script>
<style scoped>
  .titleInfor{width: 100px;color:#999; margin-right: 15px; text-align: right;  font-size: 14px;}
 
</style>