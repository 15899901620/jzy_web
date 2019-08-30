<template>
    <Modal
        v-model="bidersloading"
        @on-cancel="biderscancel"
        :mask-closable='false'
        width="480"
        class-name="vertical-center-modal">
        <p slot="header" style="color:#666; text-align:left; font-size:14px;">
            <Icon type="md-chatboxes" style="font-size:18px;" />
            <span>{{title}}</span>
        </p>
      
        <div class="Bond_Popup">
            <div>
                <span class="Bond_Popup_title">竞拍低价：</span>
                <span class="ml10">￥{{datalist.MinePrice}}元</span>
            </div>
            <!--竞拍数量-->
            <div class="mt15 dflex"  style="align-items: center;">
                <span class="Bond_Popup_title">竞拍数量：</span>
                <div class="pr ml10">
                    <input class="InputNum" v-model="datalist.aucteNum" disabled/><span class="unit">吨</span>
                </div>
            </div>
            <!--需冻结保证金-->
            <div class="PricePopup">
            <div style="line-height: 28px; padding:20px">
                <p>
                    <span class="PricePopup_title">需冻结保证金：</span>
                    <span class="orangeFont fwb fs16"> ￥{{datalist.MinePrice*datalist.aucteNum*(datalist.Bond/100)}}</span>
                </p>
                <p>
                    <span class="PricePopup_title">可用余额：</span>
                    <span class="orangeFont fwb fs16">￥{{remain_fund}}</span>
                    <a class="PricePopup_btn" href="/help/9" target="_blank" style="float: right;line-height: 16px;">查看充值方式</a>
                </p>
            </div>
            </div>
            <!--输入验证码-->
            <div class="PopupCode pr">
                <input type="text" class="TextCode" v-model="Bonddeposit.BondCode" placeholder="请输入手机验证码" @blur="userCodeCheck" />
                <button class="AcqCode" @click="getNoteValue" :disabled='btnBoolen'>{{this.btnValue}}</button>
                <i class="redFont fs12" style="position: absolute;bottom: -20px;">{{TipCode}}</i>
            </div>
        </div>
      
        <div slot="footer" style="text-align:center">
            <Button type="primary"  size="large" @click="bidersOK">确认缴纳</Button>
        </div>
    </Modal>
</template>

<script>
import { capitalinfo } from '../../api/capital'
import { BondMessSend, BondMessageCode, AddBondRecord } from '../../api/auction'
import {setCookies, getCookies} from '../../config/storage'

export default {
    name: 'paydeposit',
    data() {
        return {
            bidersloading: false,
            fozen_fund: 0,
            remain_fund: 0,
            btnValue:"获取短信验证码",
            btnBoolen:false,
            TipCode:'',
            Bonddeposit:{
                depositAmount:'',
                bidNum:'',
                BondCode:'',
            },
        }
    },
    props:{
        title: {
            type: String,
            default: '缴纳保证金'
        },
        isshow: {
            type: Boolean,
            default: false
        },
        datalist: {
            type: Object
        }
    },
    methods: {
        async getCapital() {
            const res= await capitalinfo(this,{})
            this.fozen_fund=res.data.fozen_fund
            this.remain_fund=res.data.remain_fund
        },
        biderscancel() {
            this.$emit('unChange', false)
        },
        async getNoteValue () {
            let params = {}
            const res = await BondMessSend(this, params)
            if(res.data && res.status === 200 ){
                this.auth_time = 60;
                var timer = setInterval(()=>{
                    this.auth_time--;
                    if(this.auth_time<=0){
                        clearInterval(timer)
                        this.btnBoolen = false;
                        this.btnValue="获取短信验证码"
                        this.Bonddeposit.BondCode = ''
                    }else {
                        this.btnBoolen = true;
                        this.btnValue=`重新获取(${this.auth_time})S`
                    }
                },1000)
            }else {
                 this.$Modal.success({
                    title: '提示',
                    content:  '短信发送失败!',
                    duration: 5
                });
            }
        },
        async userCodeCheck(){
            let params = {
                code:this.Bonddeposit.BondCode
            }
            if(!this.Bonddeposit.BondCode){
                this.TipCode='验证码不能为空'
                return
            }
            const res = await BondMessageCode(this, params)
            if(res.data && res.status === 200){
                this.codeValid=true
                this.TipCode=''
            }else {
                this.TipCode='验证码有误'
                return
            }
        },
        //提交缴纳保证金
        async bidersOK(){
            this.auth_time=0
            if(!this.Bonddeposit.BondCode){
                this.TipCode='验证码不能为空'
                return
            }
            let paramCodes = {
                code:this.Bonddeposit.BondCode
            }
            const CodeData = await BondMessageCode(this, paramCodes)

            if(CodeData.data && CodeData.status === 200) {
                this.codeValid = true
                this.TipCode = ''
                this.Bonddeposit.depositAmount = this.datalist.MinePrice * this.datalist.aucteNum * (this.datalist.Bond / 100)
                this.Bonddeposit.bidNum = this.datalist.aucteNum
         
                if (!this.Bonddeposit.bidNum) {
                    this.TipCode = '竞拍数量不能为空'
                    return
                }
                let params = {
                    auctionId: this.datalist.auctionId,
                    depositAmount: this.Bonddeposit.depositAmount,
                    bidNum: this.datalist.aucteNum,
                    code: this.Bonddeposit.BondCode
                }
                let res = await AddBondRecord(this, params)

                if (!res.data.errorcode && res.status === 200 && res.data) {
                    this.$emit('HiddenDep')
                    this.Bonddeposit.BondCode = ''
                    this.$Message.info("缴纳保证金成功")
                    this.$emit('unChange', false)
                } else {
                    this.$Modal.confirm({
                        title: '失败提示',
                        content: '<p style="font-size: 16px; margin-top: 10px">缴纳保证金失败，请联系客服</p>',
                        okText: '确定',
                        styles: 'top:30px;',
                        onOk: () => {
                            // this.$router.push({name:'login'});
                        },
                        onCancel: () => {

                        }
                    });
                }
            } else {
                this.TipCode = '验证码有误'
                return
            }
        }
    },
    created() {
        this.getCapital()
    },
    watch:{
        datalist:{
            handler(newValue,oldValue){
            },
            deep:true
        },
        isshow: function (e) {
            if (e === true) {
                this.bidersloading = true
            } else {
                this.bidersloading = false
            }
        }
    }
}
</script>

<style>

</style>
