<template>
  <Modal
      v-model="loading"
      @on-cancel="biderscancel"
      :mask-closable='false'
      width="500"
      class-name="vertical-center-modal">
    <p slot="header" style="color:#666; text-align:left; font-size:14px;">
      <Icon type="md-chatboxes" style="font-size:18px;"/>
      <span>订单支付</span>
    </p>

    <div class="Bond_Popup">
      <div style="line-height:32px;" v-if="dataList.orderNo">
        <span class="Bond_Popup_title">订单编号：</span>
        <span class="ml10">{{dataList.orderNo}}</span>
      </div>
      <div style="line-height:32px;">
        <span class="Bond_Popup_title">订单商品：</span>
        <span class="ml10">{{dataList.skuNo}} {{dataList.skuName}}</span>
      </div>
      <div style="line-height:32px;">
        <span class="Bond_Popup_title">订单数量：</span>
        <span class="ml10">{{dataList.orderNum}}</span>
      </div>
      <div style="line-height:32px;">
        <span class="Bond_Popup_title">订单总金额：</span>
        <span class="ml10">￥{{amountFormat(dataList.totalAmount)}}</span>
      </div>
      <!--需冻结保证金-->
      <div class="PricePopup">
        <div style="line-height: 28px; padding:20px">
          <p v-if="dataList.deductAmount > 0">
            <span class="PricePopup_title">使用已冻结保证金额：</span>
            <span class="orangeFont fwb fs16"> ￥{{amountFormat(dataList.deductAmount)}}</span>
          </p>
          <p>
            <span class="PricePopup_title">需支付金额：</span>
            <span class="orangeFont fwb fs16"> ￥{{amountFormat(dataList.payAmount)}}</span>
          </p>
          <p>
            <Checkbox :disabled="true" :value="true"></Checkbox>
            <span class="PricePopup_title">资金余额：</span>
            <span class="orangeFont fwb fs16">{{$store.state.member.capitalInfo.available_amount_format }}</span>
          </p>
          <p>
            <Checkbox :disabled="true"></Checkbox>
            <span class="PricePopup_title">保证金钱包余额：</span>
            <span class="orangeFont fwb fs16">{{$store.state.member.capitalInfo.package_amount_format }}</span>
            <a class="PricePopup_btn" href="/help/9" target="_blank" style="float: right;line-height: 16px;">钱包转资金</a>
          </p>
        </div>
      </div>
      <!--输入验证码-->
      <div class="PopupCode pr">
        <input type="text" class="TextCode" v-model="Bonddeposit.BondCode" placeholder="请输入手机验证码"/>
        <button class="AcqCode" @click="getNoteValue" :disabled='btnBoolen'>{{this.btnValue}}</button>
        <i class="redFont fs12" style="position: absolute;bottom: -20px;">{{TipCode}}</i>
      </div>
    </div>

    <div slot="footer" style="text-align:center">
      <Button type="warning" size="large" @click="showInvestCapital">查看充值方式</Button>
      <Button type="primary" size="large" @click="sumitOK">确认支付</Button>
    </div>
  </Modal>
</template>

<script>
	import {orderPayCode, orderPayment} from '../../api/users'
	import { mapState } from 'vuex'

	export default {
		name: 'orderPay',
		computed:{
			...mapState({
				dataList: state => state.member.orderPayInfo,
			})
		},
		data() {
			return {
				loading: false,
				btnValue: "获取短信验证码",
				btnBoolen: false,
				TipCode: '',
				Bonddeposit: {
					depositAmount: '',
					bidNum: '',
					BondCode: '',
				},
			}
		},
		props: {
			isShow: {
				type: Boolean,
				default: false
			},
			order_id: {
				type: Number
			}
		},
		methods: {
			biderscancel() {
				this.$emit('unChange', false)
			},
			showInvestCapital(){
				location.href = '/users/investCapital'
      },
			amountFormat(amount) {
				return parseFloat(amount).toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
			},
			async getNoteValue() {
				let params = {}
				const res = await orderPayCode(this, params)
				if (res.data && res.status === 200) {
					this.auth_time = 60;
					let timer = setInterval(() => {
						this.auth_time--;
						if (this.auth_time <= 0) {
							clearInterval(timer)
							this.btnBoolen = false;
							this.btnValue = "获取短信验证码"
							this.Bonddeposit.BondCode = ''
						} else {
							this.btnBoolen = true;
							this.btnValue = `重新获取(${this.auth_time})S`
						}
					}, 1000)
				} else {
					this.$Modal.success({
						title: '提示',
						content: '短信发送失败!',
						duration: 5
					});
				}
			},
			//确认支付
			async sumitOK() {
				if (!this.Bonddeposit.BondCode) {
					this.TipCode = '验证码不能为空'
					return
				}
				this.TipCode = ''

				let params = {
					id: this.order_id,
					code: this.Bonddeposit.BondCode
				}
				let res = await orderPayment(this, params)

				if (res.status === 200) {
					if(res.data && !res.data.errorcode){
						this.Bonddeposit.BondCode = ''
						this.$Message.info("支付成功")
						this.$emit('unChange', false)
          }else{
						this.$Modal.alert(res.data.message)
          }
				} else {
					this.$Modal.confirm({
						title: '失败提示',
						content: '<p style="font-size: 16px; margin-top: 10px">支付失败，请联系客服</p>',
						okText: '确定',
						styles: 'top:30px;',
						onOk: () => {
							// this.$router.push({name:'login'});
						},
						onCancel: () => {

						}
					})
				}

			}
		},
		watch: {
			isShow: function (e) {
				if (e === true) {
					this.$store.dispatch('member/getOrderPayInfo', {order_id: this.order_id})
					this.$store.dispatch('member/getCapitalInfo')
					this.loading = true
				} else {
					this.loading = false
				}
			}
		}
	}
</script>

<style>

</style>
