<template>
  <Modal
      v-model="loading"
      @on-cancel="biderscancel"
      :mask-closable='false'
      width="480"
      :closable="closable"
      class-name="vertical-center-modal">
    <template v-if="ProgressShow ===false ">
      <p slot="header" style="color:#666; text-align:left; font-size:14px;">
        <Icon type="md-chatboxes" style="font-size:18px;"/>
        <span>{{title}}</span>
      </p>
      <div class="Bond_Popup">
        <div style="line-height:32px;">
          <span class="Bond_Popup_title">订单商品：</span>
          <span class="ml10">{{datalist.skuName}}</span>
        </div>
        <div style="line-height:32px;">
          <span class="Bond_Popup_title">订单数量：</span>
          <span class="ml10">{{datalist.orderNum}}吨</span>
        </div>
        <!--需冻结保证金-->
        <div class="PricePopup">
          <div style="line-height: 28px; padding:20px">
            <p v-if="IsReleaseData.deductAmount > 0">
              <span class="PricePopup_title">使用已冻结保证金额：</span>
              <span class="orangeFont fwb fs16"> {{$utils.amountFormat(IsReleaseData.deductAmount)}}</span>
            </p>
            <p>
              <span class="PricePopup_title">需支付金额：</span>
              <span class="orangeFont fwb fs16"> {{this.$utils.amountFormat(IsReleaseData.payAmount)}}</span>
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
              <a class="PricePopup_btn"
                 style="float: right;line-height: 16px;background-color:#cfcfcf">钱包转资金</a>
            </p>
          </div>
        </div>
        <!--输入验证码-->
        <div class="PopupCode pr" v-if="$store.state.member.capitalInfo.available_amount >= IsReleaseData.payAmount">
          <input type="text" class="TextCode" v-model="Bonddeposit.BondCode" placeholder="请输入手机验证码"/>
          <button class="AcqCode" @click="getNoteValue" :disabled='btnBoolen'>{{this.btnValue}}</button>
          <i class="redFont fs12" style="position: absolute;bottom: -20px;">{{TipCode}}</i>
        </div>
        <div style="line-height:32px;" v-else>
          <span class="Bond_Popup_title">资金不足，不能进行支付操作！</span>
        </div>
      </div>

      <div slot="footer" style="text-align:center">
        <Button type="primary" size="large"
                v-show="$store.state.member.capitalInfo.available_amount >= IsReleaseData.payAmount && isCanPay"
                @click="bidersOK">确认支付
        </Button>
        <Button type="default" size="large"
                v-show="$store.state.member.capitalInfo.available_amount >= IsReleaseData.payAmount && !isCanPay">正在提交
        </Button>
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
	import { orderPayCode ,checkIsRelease} from '../../api/users'

	export default {
		name: 'spotPay',
		data() {
			return {
				loading: false,
				btnValue: "获取短信验证码",
				btnBoolen: false,
				TipCode: '',
				isCanPay: true,
				closable: true,
				IsReleaseData:{},
				Bonddeposit: {
					depositAmount: '',
					bidNum: '',
					BondCode: '',
				},
			}
		},
		props: {
			title: {
				type: String,
				default: '支付货款'
			},
			isshow: {
				type: Boolean,
				default: false
			},
			datalist: {
				type: Object
			},
			isPay: {
				type: Boolean,
				default: true
			},
			ProgressShow: {
				type: Boolean,
				default: false
			},
		},
		methods: {
			async getCapital() {
				this.$store.dispatch('member/getCapitalInfo')
			},
			biderscancel() {
				this.$emit('unChange', false)
			},
			showInvestCapital() {
				location.href = '/users/investCapital'
			},
			async checkIsRelease() {
				let params = {
					plan_id:this.datalist.plan_id,
					num:this.datalist.orderNum
				}
				const res = await checkIsRelease(this, params)
				if (res.data && res.status === 200) {
					this.IsReleaseData=res.data
					
				} 
			},
			async getNoteValue() {
				let params = {}
				const res = await orderPayCode(this, params)
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
			//提交缴纳保证金
			async bidersOK() {
				if (!this.Bonddeposit.BondCode) {
					this.TipCode = '验证码不能为空'
					return
				} else {
					this.closable = false
					this.$emit('payedChange', this.Bonddeposit.BondCode)
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
					this.checkIsRelease()
					this.getCapital()
				} else {
					this.loading = false
				}
			},
			ProgressShow: function (e) {
				console.log("ProgressShow", e)
			},
			isPay: function (e) {
				this.isCanPay = e
			}
		}
	}
</script>
