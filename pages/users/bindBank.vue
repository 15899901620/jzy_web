<template>
    <div class="clearfix graybg">
        <div class="w1200 dflex " style="margin-bottom: 40px">
            <usernav></usernav>
            <div class="memberInfor ml20  whitebg bdccc  mt20">
                <h1 class="fs16 ml25 mt25 bb1 pb10" >绑定银行卡</h1>
                <button class='addbank' @click="addBindBank">添加银行卡</button>
                <div style="margin-top: 100px; padding:0 100px"> 
                        <ul class="banklist">
                            <!-- v-for="(items, index) in alreadyBindList" :key="index" -->
                            <li v-for="(items, index) in alreadyBindList" :key="index">
                                <div class="bank-data" >
                                     <p><span class='mr10' style='width: 90px; text-align: justify;  text-align-last: justify;'>银行名称</span>:<span class='ml10'>{{items.AcctOpenBranchName}}</span></p>
                                     <p><span class='mr10' style='width: 90px; text-align: justify;  text-align-last: justify;'>银行卡号</span>:<span class='ml10'>{{items.MemberAcctNo}}</span></p>
                                     <p><span class='mr10' style='width: 90px; text-align: justify;  text-align-last: justify;'>联行号</span>:<span class='ml10'>{{items.CnapsBranchId}}</span></p>
                                     <p><span class='mr10'>超级网银行号</span>:<span class='ml10'>{{items.EiconBankBranchId}}</span></p>
                                </div>
                               <div class='right-text' @click="unsetBind(items.MemberAcctNo)"></div>
                            </li>
                            
                           
                        </ul>
                    
                </div>
            </div>
        </div>
        <!--绑定银行卡-->
        <Modal
            v-model="addIsBool"
            :mask-closable="false"
            title="添加银行卡"
            :loading='loading'
            @on-cancel="cancel">
            <Form ref="addForm" :model="addForm" :label-width="100"  :rules="ruleValidate">
                <Row index="0">
                    <Col span="22">
                        <FormItem label="会员证件类型" prop="MemberGlobalType">
                            <!-- <Input v-model="addForm.MemberGlobalType"   placeholder="请输入会员证件类型"></Input> -->
                            <Select v-model="addForm.MemberGlobalType" style="width:200px" placeholder="请选择证件类型">
                                <Option v-for="item in credentialsTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row index="1">
                    <Col span="22">
                        <FormItem label="会员证件号码" prop="MemberGlobalId">
                            <Input v-model="addForm.MemberGlobalId"   placeholder="请输入会员证件号码"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row index="4">
                    <Col span="22">
                        <FormItem label="银行名称" prop="AcctOpenBranchName">
                            <Input v-model="addForm.AcctOpenBranchName"   placeholder="银行名称"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row index="2">
                    <Col span="22">
                        <FormItem label="银行卡号" prop="MemberAcctNo">
                            <Input v-model="addForm.MemberAcctNo"   placeholder="请输入待绑定的银行卡号"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row index="3">
                    <Col span="22">
                        <FormItem label="本他行类型" prop="BankType">
                            <Select v-model="addForm.BankType" style="width:200px" placeholder="请选择银行类型">
                                <Option v-for="item in BankTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row index="5">
                    <Col span="22">
                        <FormItem label="联行号" prop="CnapsBranchId" style="display: inline-block">
                            <Input style="width:230px" v-model="addForm.CnapsBranchId"   placeholder="请输入联行号"></Input><Button style="margin-left:25px" type="primary" @click="selectBankCode">选择联行号</Button>
                        </FormItem>
                    </Col>
                </Row>
                <!-- <Row index="6">
                    <Col span="22">
                        <FormItem label="超级网银行号" prop="EiconBankBranchId">
                            <Input v-model="addForm.EiconBankBranchId"   placeholder="请输入超级网银行号"></Input>
                        </FormItem>
                    </Col>
                </Row> -->
            </Form>
            <div slot="footer" style="text-align:center">
                <Button type="primary" @click="save">确定</Button>
            </div>
        </Modal>
        <!--回填验证码-->
        <Modal
            v-model="codeIsBool"
            :mask-closable="false"
            title="回填验证码"
            :loading='loading'
            @on-cancel="cancel">
            <Form ref="codeForm" :model="codeForm" :label-width="100"  :rules="ruleValidate">
                <Row index="0">
                    <Col span="22">
                        <FormItem label="验证码" prop="MessageCheckCode">
                            <Input v-model="codeForm.MessageCheckCode"   placeholder="请输入验证码"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row index="1">
                    <Col span="22">
                        <FormItem label="绑定银行卡号" prop="MemberAcctNo">
                            <Input v-model="codeForm.MemberAcctNo" disabled placeholder="请输入绑定银行卡号"></Input>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div slot="footer" style="text-align:center">
                <Button type="primary" @click="saveCode">确定</Button>
            </div>
        </Modal>
        <!--查找联行号-->
        <Modal
            v-model="bankCodeIsBool"
            :mask-closable="false"
            title="查找联行号"
            :loading='loading'>

            <i-table border :content="self" :columns="columnsBankCode" :data="dataBankCode"></i-table>
            <div slot="footer" style="text-align:center">
                <!-- <Button type="primary" @click="saveCode">确定</Button> -->
            </div>
        </Modal>
    </div>
    
</template>

<script>
import Navigation from '../../components/navigation'
import { alreadyBindList, addBindBank, unsetBindBank, codeBindBank } from '../../api/users'
import { getCookies } from '../../config/storage'
import { mapState } from 'vuex'

export default {
    name: "bin",
	middleware: 'memberAuth',
    layout:'membercenter',
    components:{
    usernav: Navigation.user
    },
    fetch({ store, params }) {
        return Promise.all([
                //获取顶部、中部、底部导航信息
                store.dispatch('common/getNavList'),
                //获取系统配置
                store.dispatch('common/getSysConfig'),
                store.dispatch('helper/gethelpDetail',{id:9}),
        ])
    },
    computed:{
    },
    data() {
        return{
            self: this,
            loading:false,
            addIsBool:false,
            codeIsBool:false,
            bankCodeIsBool: false,
            alreadyBindList:[],
            addForm:{
                MemberGlobalType: '73',
                MemberGlobalId: '',
                AcctOpenBranchName: '',
                MemberAcctNo: '',
                BankType: 0,
                CnapsBranchId: '',
                EiconBankBranchId: ''
            },
            codeForm:{
                MessageCheckCode: '',
                MemberAcctNo: ''
            },
            ruleValidate:{
                MemberGlobalType:[
                    { required: true, message: '会员证件类型不能为空', trigger: 'blur' }
                ],
                MemberGlobalId: [
                    { message: '会员证件号码不能为空', trigger: 'blur' ,required: true}
                ],
                AcctOpenBranchName:[
                    { message: '银行名称不能为空', trigger: 'blur',required: true}
                ],
                MemberAcctNo:[
                    { message: '银行卡号不能为空', trigger: 'blur',required: true }
                ],
                BankType:[
                    { message: '本他行类型不能为空', trigger: 'change' ,required: true}
                ],
                CnapsBranchId:[
                    { message: '联行号不能为空', trigger: 'blur' ,required: true}
                ],
                EiconBankBranchId:[
                    { message: '超级网银行号不能为空', trigger: 'blur' ,required: true}
                ],
            },
            BankTypeList:[
                {
                    value: '1',
                    label: '本行（平安银行）'
                },
                {
                    value: '2',
                    label: '他行'
                }
            ],
            credentialsTypeList:[
                { value: '51', label: '法人代码证' },
                { value: '52', label: '组织机构代码证' },
                { value: '53', label: '政府机构/公共机构批文' },
                { value: '54', label: '外交部外事办批文（使）' },
                { value: '55', label: '外交部外事办批文（领）' },
                { value: '56', label: '外交部外事办批文（办）' },
                { value: '60', label: '香港商业登记证' },
                { value: '65', label: '事业单位登记证' },
                { value: '66', label: '社会团体登记证' },
                { value: '67', label: '商业登记证（离岸）' },
                { value: '68', label: '营业执照' },
                { value: '69', label: '对公临时证件' },
                { value: '70', label: '其他证明文件(公司) ' },
                { value: '71', label: '公司户重复有效证件' },
                { value: '73', label: '统一社会信用代码' },
                { value: '80', label: '金融机构' },
            ],
            columnsBankCode:[
                {
                    title: '银行名称',
                    key: 'bankname'
                },
                {
                    title: '联行号',
                    key: 'bankno'
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 150,
                    align: 'center',
                    render (row, column, index) {
                        return `<i-button type="primary" size="small" @click="show(${index})">查看</i-button> <i-button type="error" size="small" @click="remove(${index})">删除</i-button>`;
                    }
                }
            ],
            dataBankCode:[
                {
                    bankname: '中国银行',
                    bankno: '123456789'
                },
                {
                    name: '建设银行',
                    bankno: '98765432'
                }
            ]
        }
    },
    methods:{
        async getAlreadyBindList(){
            const res=await alreadyBindList(this, {
                "QueryFlag":2,
                "PageNum":1
            })
            console.log(res)
            if(res.status == 200){
                this.alreadyBindList=res.data.filter(item =>{
                    console.log(item)
                    item.AcctOpenBranchName = item.acct_open_branch_name
                    item.MemberAcctNo = item.member_acct_no
                    item.CnapsBranchId = item.cnaps_branch_id
                    item.EiconBankBranchId = item.eicon_bank_branch_id
                    return item
                })
                console.log(this.alreadyBindList)
            }else{
                this.$Notice.warning({
                    title: '获取绑定银行卡列表失败',
                    duration: 5,
                    closable: true
                });
            }
        },
        addBindBank(){
            this.addForm = {
                MemberGlobalType: '73',
                MemberGlobalId: '9144898823XG',
                AcctOpenBranchName: '广发银行股份有限公司',
                MemberAcctNo: '62146218665951005',
                BankType: "2",
                CnapsBranchId: '306581000003',
                EiconBankBranchId: '306581000003'
            }
            // this.addForm = {
            //     MemberGlobalType: '',
            //     MemberGlobalId: '',
            //     AcctOpenBranchName: '',
            //     MemberAcctNo: '',
            //     BankType: '',
            //     CnapsBranchId: '',
            //     EiconBankBranchId: ''
            // }
            this.addIsBool = true
        },
        async save () {
            if(!this.addForm.MemberGlobalType){
                this.$Notice.warning({
                    title: '证件类型不能为空',
                    duration: 5,
                    closable: true
                });
                return
            }else if(!this.addForm.MemberGlobalId){
                this.$Notice.warning({
                    title: '证件号码不能为空',
                    duration: 5,
                    closable: true
                });
                return
            }else if(!this.addForm.AcctOpenBranchName){
                this.$Notice.warning({
                    title: '银行名称不能为空',
                    duration: 5,
                    closable: true
                });
                return
            }else if(!this.addForm.MemberAcctNo){
                this.$Notice.warning({
                    title: '银行卡号不能为空',
                    duration: 5,
                    closable: true
                });
                return
            }else if(!this.addForm.BankType){
                this.$Notice.warning({
                    title: '本他行类型不能为空',
                    duration: 5,
                    closable: true
                });
                return
            }else if(!this.addForm.CnapsBranchId){
                this.$Notice.warning({
                    title: '联行号不能为空',
                    duration: 5,
                    closable: true
                });
                return
            }
            this.addForm.EiconBankBranchId = this.addForm.CnapsBranchId
            // else if(!this.addForm.EiconBankBranchId){
            //     this.$Notice.warning({
            //         title: '超级网银行号不能为空',
            //         duration: 5,
            //         closable: true
            //     });
            //     return
            // }
            const res=await addBindBank(this, this.addForm)
            if(res.status == 200){
                if(res.data.errorcode == 400){
                    this.$Notice.warning({
                        title: res.data.message,
                        duration: 5,
                        closable: true
                    });
                    if(res.data.message == '短信动态码验证中'){
                        this.codeForm.MemberAcctNo = this.addForm.MemberAcctNo
                        this.codeIsBool = true
                    }
                }
                if(res.data.TxnReturnCode == "000000"){
                    this.$Notice.success({
                        title: '请回填验证码，完成绑卡操作',
                        duration: 5,
                        closable: true
                    });
                    // this.addIsBool = false
                    this.codeForm.MemberAcctNo = this.addForm.MemberAcctNo
                    this.codeIsBool = true
                }else{
                    this.$Notice.warning({
                        title: res.data.TxnReturnMsg,
                        duration: 5,
                        closable: true
                    });
                }
            }else{
                this.$Notice.warning({
                    title: 'error',
                    duration: 5,
                    closable: true
                });
            }
        },
        async saveCode () {
            if(!this.codeForm.MessageCheckCode){
                this.$Notice.warning({
                    title: '验证码不能为空',
                    duration: 5,
                    closable: true
                });
                return
            }else if(!this.codeForm.MemberAcctNo){
                this.$Notice.warning({
                    title: '银行卡号不能为空',
                    duration: 5,
                    closable: true
                });
                return
            }
            const res=await codeBindBank(this, this.codeForm)
            if(res.status == 200){
                if(res.data.errorcode == 400){
                    this.$Notice.warning({
                        title: res.data.message,
                        duration: 5,
                        closable: true
                    });
                }
                if(res.data.TxnReturnCode == "000000"){
                    this.$Notice.success({
                        title: '绑定成功',
                        duration: 5,
                        closable: true
                    });
                    this.addIsBool = false
                    this.codeIsBool = false
                    this.getAlreadyBindList()
                }else{
                    this.$Notice.warning({
                        title: res.data.TxnReturnMsg,
                        duration: 5,
                        closable: true
                    });
                }
            }else{
                this.$Notice.warning({
                    title: '获取绑定银行卡列表失败',
                    duration: 5,
                    closable: true
                });
            }
        },
        cancel () {
            this.$Message.info('Clicked cancel');
        },
        selectBankCode(){
            this.bankCodeIsBool = true
        },
        onSelect(res){
            console.log(res)
        },
        async unsetBind (MemberAcctNo) {
            const res=await unsetBindBank(this, {
                "MemberAcctNo": MemberAcctNo
            })
            if(res.status == 200){
                if(res.data.errorcode == 400){
                    this.$Notice.warning({
                        title: res.data.message,
                        duration: 5,
                        closable: true
                    });
                }
                if(res.data.TxnReturnCode == "000000"){
                    this.$Notice.success({
                        title: '解绑成功',
                        duration: 5,
                        closable: true
                    });
                    this.getAlreadyBindList()
                }else{
                    this.$Notice.warning({
                        title: res.data.TxnReturnMsg,
                        duration: 5,
                        closable: true
                    });
                }
            }else{
                this.$Notice.warning({
                    title: '解绑失败',
                    duration: 5,
                    closable: true
                });
            }
        }
    },
    created(){
        this.getAlreadyBindList()
    },

}
</script>

<style  >
  .memberInfor{width: 83%}

  .code_manange li{display: flex;margin-top: 20px; align-items: center;}
  .ConfirmSubmit{margin-left: 131px;margin-top: 19px;display: inline-block;padding: 11px 0px;color: #fff;width: 420px;text-align: center;
    border-radius: 5px;background-color: #007de4;cursor: pointer;font-size: 14px;box-sizing: border-box;}
  .titleInfor{width: 85px;color:#999; margin-right: 25px; text-align: right;  font-size: 14px;}
  .inforInput{width: 340px;height: 40px;border-radius: 3px;  padding-left: 10px;
    box-sizing: border-box;}
  .ivu-input{height: 42px;}


  .codeCarrier{ border: none; cursor: pointer; width:145px;margin-left: 8px;  height: 42px; border-radius: 5px; display: flex; align-items: center; justify-content: center}

  .addbank{ cursor: pointer; float: right;border: none;background-color: #007de4;color: #fff;font-size: 16px;border-radius: 5px;padding: 10px 35px;margin-top: 30px;display: flex;    margin-right: 30px; }

  .banklist{display: flex; flex-wrap: wrap; justify-content: space-between;}
  .banklist li{position: relative; margin-bottom: 35px;}
  .banklist li .right-text{z-index: 0; cursor: pointer; transition: 1s all; position: absolute; top: 37px; right: 1px; width: 34px; height: 124px; background: url('../../assets/images/bank-right.png')no-repeat center;  background-size: 100% 100%;}
  .banklist li .bank-data{padding-left: 25px;position: relative; padding:10px 10px;  width: 343px; height: 202px; background: url('../../assets/images/bank.png')no-repeat center; background-size: 100% 100%; z-index: 99; display: flex;
    flex-direction: column; justify-content: center;}
  .banklist li .bank-data p{margin-bottom: 10px; font-size: 15px; text-align: left; padding-left: 15px; display: flex;}
  .banklist li:hover .right-text{right: -33px; z-index: 0;transition: 1s all;}
 </style>
