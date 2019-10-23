<template>
  <Modal
      v-model="loading"
      @on-cancel="biderscancel"
      :mask-closable='false'
      width="500"
      class-name="vertical-center-modal">
    <p slot="header" style="color:#666; text-align:left; font-size:14px;">
      <Icon type="md-chatboxes" style="font-size:18px;"/>
      <span>{{title}}</span>
    </p>

    <div class="Bond_Popup">
      <div>
        <span class="Bond_Popup_title">竞拍低价：</span>
        <span class="ml10">{{$utils.amountFormat(datalist.basePrice)}}</span>
      </div>
      <!--竞拍数量-->
      <div class="mt15 dflex" style="align-items: center;">
        <span class="Bond_Popup_title">交纳数量：</span>
        <div class="pr ml10">
			<input-special :min="0" :max="datalist.totalNum-datalist.depositNum"  v-model="Bonddeposit.bidNum"
						@change="changeNum"></input-special>
          <!-- <input class="InputNum" v-model="Bonddeposit.bidNum" style="background: white;"/><span class="unit">吨</span> -->
        </div>
        <span class="ml10">已交纳<span class="orangeFont">{{datalist.depositNum}}</span>吨</span>
      </div>
      <!--需冻结保证金-->
      <div class="PricePopup">
        <div style="line-height: 28px; padding:20px">
          <p>
            <span class="PricePopup_title">需支付金额：</span>
            <span class="orangeFont fwb fs16"> {{this.payAmount}}</span>
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
            <a class="PricePopup_btn" @click="wallet()" target="_blank" style="float: right;line-height: 16px;">钱包转资金</a>
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
      <Button type="primary" size="large" @click="bidersOK">确认支付</Button>
    </div>
  </Modal>
</template>

<script>
	import { BondMessSend, AddBondRecord } from '../../api/auction'
  	import InputSpecial from '../../components/input-special'
	export default {
		name: 'paydeposit',
		 components: {
			InputSpecial
		},
		data() {
			
			return {
				loading: false,
				btnValue: "获取短信验证码",
				btnBoolen: false,
				TipCode: '',
				Bonddeposit: {
					auctionId: 0,
					bidNum: 0,
					BondCode: '',
				},
				currsetp:0,
			}
		},
		props: {
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
		computed: {
			payAmount: function () {
				return this.$utils.amountFormat(this.Bonddeposit.bidNum * this.datalist.basePrice * this.datalist.Bond / 100)
			}
		},
		methods: {
			async getCapital() {
				this.$store.dispatch('member/getCapitalInfo')
			},
			biderscancel() {
				this.$emit('unChange', false)
			},
			showInvestCapital(){
				location.href = '/users/investCapital'
			},
			async getNoteValue() {
				let params = {}
				const res = await BondMessSend(this, params)
				if (res.data && res.status === 200) {
					this.auth_time = 60;
					var timer = setInterval(() => {
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
			wallet(){
				alert('该功能正在维护')
			},
			changeNum(value) {
				this.Bonddeposit.bidNum = value
			},
			//提交缴纳保证金
			async bidersOK() {
				if (!this.Bonddeposit.BondCode) {
					this.TipCode = '验证码不能为空'
					return
				}
				if (!this.Bonddeposit.bidNum) {
					this.TipCode = '竞拍数量不能为空'
					return
				}

				this.TipCode = ''

				let params = {
					auction_id: this.Bonddeposit.auctionId,
					bid_num: this.Bonddeposit.bidNum,
					code: this.Bonddeposit.BondCode
				}
				let res = await AddBondRecord(this, params)

				if (!res.data.errorcode && res.status === 200 && res.data) {
					this.Bonddeposit.BondCode = ''
					this.$Message.info("支付成功")
					this.$emit('unChange', false)
				} else {
					this.$Modal.confirm({
						title: '失败提示',
						content: '<p style="font-size: 16px; margin-top: 10px">缴纳保证金失败，'+res.data.message+'</p>',
						okText: '确定',
						styles: 'top:30px;',
						onOk: () => {
							// this.$router.push({name:'login'});
						},
						onCancel: () => {

						}
					});
				}
			}
		},
		watch: {
			datalist: {
				handler(newValue, oldValue) {
				},
				deep: true
			},
			isshow: function (e) {
				if (e === true) {
					this.loading = true
					this.Bonddeposit.bidNum = this.datalist.addNum
					this.Bonddeposit.auctionId = this.datalist.auctionId
					this.getCapital()
				} else {
					this.loading = false
				}
			}
		}
	}
</script>

<style>

</style>

