<template>
  <Modal
      v-model="loading"
      @on-cancel="biderscancel"
      :mask-closable='false'
      width="500"
      :closable="closeShow"
      class-name="vertical-center-modal">
    <template v-if="!proShow">
      <p slot="header" style="color:#666; text-align:left; font-size:14px;">
        <Icon type="md-chatboxes" style="font-size:18px;"/>
        <span>预售支付</span>
      </p>

      <div class="Bond_Popup">
        <div style="line-height:32px;">
          <span class="Bond_Popup_title">预售编号：</span>
          <span class="ml10">{{dataList.bill_no}}</span>
        </div>
        <div style="line-height:32px;">
          <span class="Bond_Popup_title">预售商品：</span>
          <span class="ml10">{{dataList.sku_name}}</span>
        </div>		
		<div style="line-height:32px;" >
          <span class="Bond_Popup_title">起订量: </span>
          <span class="ml10">{{$utils.numFormat(dataList.min_num)}}</span>
        </div>
		<div style="line-height:32px;" v-if="dataList.limit_num>0">
          <span class="Bond_Popup_title">限购数量：</span>
          <span class="ml10">{{$utils.numFormat(dataList.limit_num)}}</span>
        </div>
		<div style="line-height:32px;">
          <span class="Bond_Popup_title">已购数量: </span>
          <span class="ml10">{{$utils.numFormat(dataList.planned_total_num)}}</span>
        </div>
			<div style="line-height:32px;">
          <span class="Bond_Popup_title">单价: </span>
          <span class="ml10">{{$utils.amountFormat(dataList.final_price)}}</span>
        </div>
        <div class="mt15 dflex" style="align-items: center;">
          <span class="Bond_Popup_title">需求数量：</span>
          <div class="pr ml10">
            <input-special :min="dataList.min_num" :max="dataList.max_num" v-model="Bonddeposit.bidNum" @change="changeNum"></input-special>
            <span class="ml15">吨</span>
          </div>
		<span class="Bond_Popup_title">可售数量：</span>
		  <div style="pr ml10">
          <span class="ml10">{{$utils.numFormat(dataList.max_num)}}</span>
        </div>
        </div>
        <div style="line-height:32px;">
          <span class="Bond_Popup_title">总金额：</span>
          <span class="ml10">{{$utils.amountFormat(this.totalAmount)}}</span>
        </div>
        <div style="line-height:32px;">
          <span class="Bond_Popup_title">保证金比例：</span>
          <span class="ml10">{{dataList.Bond}}%</span>
        </div>
        <!--需冻结保证金-->
        <div class="PricePopup">
          <div style="line-height: 28px; padding:20px">
            <p>
              <span class="PricePopup_title">需支付金额：</span>
              <span class="orangeFont fwb fs16"> {{$utils.amountFormat(this.payAmount)}}</span>
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
              <a class="PricePopup_btn" target="_blank"
                 style="float: right;line-height: 16px;background-color:#cfcfcf;">钱包转资金</a>
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
    </template>
    <template v-else>
      <p slot="header" style="color:#666; text-align:left; font-size:14px;">
        <Icon type="md-chatboxes" style="font-size:18px;"/>
        <span>{{title}}</span>
      </p>
      <div style="width: 120px; height: 120px; margin: 0 auto">
        <img src="/img/process_icon.gif" style="width: 100%">
      </div>
      <p class="mt20 mb10 tac fs16" style="color: #666">正在支付中，请稍等！！！</p>
      <div slot="footer" style="text-align:center"></div>
    </template>
  </Modal>
</template>

<script>
	import {orderPayCode, orderPayment} from '../../api/users'
	import InputSpecial from '../../components/input-special'
	import server from '../../config/api'

	export default {
		name: 'advancePay',
		components: {
			InputSpecial
		},
		data() {
			return {
				loading: false,
				btnValue: "获取短信验证码",
				btnBoolen: false,
				TipCode: '',
				proShow: false,
				closeShow: true,
				Bonddeposit: {
					advance_id: 0,
					bidNum: 12,
					BondCode: '',
				},
			}
		},
		props: {
			isShow: {
				type: Boolean,
				default: false
			},
			dataList: {
				type: Object
			}
		},
		computed: {
			payAmount: function () {
				return this.Bonddeposit.bidNum * this.dataList.basePrice * this.dataList.Bond / 100
			},
			totalAmount: function () {
				return this.Bonddeposit.bidNum * this.dataList.basePrice
			},
		},
		methods: {
			changeNum(value) {
				this.Bonddeposit.bidNum = value
			},
			biderscancel() {
				this.$emit('unChange', false)
			},
			showInvestCapital() {
				location.href = '/users/investCapital'
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
			wallet() {
				alert('该功能暂未开放，敬请期待！')
			},
			//确认支付
			async sumitOK() {
				if (!this.Bonddeposit.BondCode) {
					this.TipCode = '验证码不能为空'
					return
				}
				this.TipCode = ''

				let params = {
					id: this.Bonddeposit.advance_id,
					num: this.Bonddeposit.bidNum,
					sms_code: this.Bonddeposit.BondCode
				}

				this.proShow = true
				this.closeShow = false

				let res = await this.$utils.sendCurl(this, server.api.advance.planAdd, params)
				this.proShow = false
				this.closeShow = true
				if (res.status === 200) {
					if (res.data && !res.data.errorcode) {
						this.Bonddeposit.BondCode = ''
						this.$Message.info("支付成功")
						this.$emit('unChange', false)
					} else {
						this.$Message.info(res.data.message)
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
			dataList: {
				handler(newValue, oldValue) {
				},
				deep: true
			},
			isShow: function (e) {
				if (e === true) {
					this.$store.dispatch('member/getCapitalInfo')
					this.Bonddeposit.bidNum = this.dataList.min_num
					this.Bonddeposit.advance_id = this.dataList.advance_id
					this.loading = true
				} else {
					this.loading = false
				}
			}
		}
	}
</script>