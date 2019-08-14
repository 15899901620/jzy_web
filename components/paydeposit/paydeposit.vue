<template>
    <div :class="classes">
        <div class="Mask">
            <div class="Bond_Popup">
            <div class="TopPopup">
                <div>缴纳保证金</div> <div class="PopupClose" @click="HiddenDeposit"></div>
            </div>
            <div class="mt25">
                <span class="Bond_Popup_title">竞拍低价：</span><span class="ml10">￥{{DepositeData.MinePrice}}元</span>
            </div>
            <!--竞拍数量-->
            <div class="mt15 dflex"  style="align-items: center;">
                <span class="Bond_Popup_title">竞拍数量：</span>
                <div class="pr ml10">
                <input  class="InputNum" v-model="DepositeData.aucteNum" /><span class="unit">吨</span>
                </div>
            </div>
            <!--需冻结保证金-->
            <div class="PricePopup">
            <div v-if="LoginShow">
                <div class="mt20 ml20 dflex">
                <span class="PricePopup_title">需冻结保证金：</span><span><span class="orangeFont fwb fs16">{{DepositeData.MinePrice*DepositeData.aucteNum*(DepositeData.Bond/100)}}</span>元</span>
                </div>
                <div class="dflex ml20 mt15 mb10" style="align-items: center;">
                <span class="PricePopup_title">可用余额：</span><span><span class="orangeFont fwb fs16">{{remain_fund}}</span>元</span>
                <a class="PricePopup_btn">余额充值</a>
                </div>
            </div>
            <div class="mt3 mb5 ml10" v-else>
            <span class="pt10">{{NotLogin}}</span> <nuxt-link to="/login" class="pl20">去登录</nuxt-link>
            </div>
            </div>
            <!--输入验证码-->
            <div class="PopupCode pr">
                <input type="text" class="TextCode" v-model="Bonddeposit.BondCode" placeholder="请输入手机验证码"  @blur="userCodeCheck" />
                <button class="AcqCode" @click="getNoteValue" :disabled='btnBoolen'  >{{this.btnValue}}</button>
                <i class="redFont fs12" style="position: absolute;bottom: -20px;">{{TipCode}}</i>
            </div>
            <div class="graybg" style="display: flex; justify-content: center; align-items: center; margin-top: 25px">
                <div class="submitPrice cp" @click="PayDeposite">缴纳保证金</div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
const prefixCls = 'ant-paydeposit'
import { capitalinfo } from '../../../api/capital'
import { BondMessSend, BondMessageCode, AddBondRecord } from '../../../api/auction'
export default {
    name: 'paydeposit',
    computed: {
        classes() {
            return [
                `${prefixCls}`,
                { [`${prefixCls}-pack`]: this.vertical },
            ];
        }
    }
}
</script>

<style>

</style>
