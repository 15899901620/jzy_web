<template>
  <div class="body">
    <Header-small title="预售转单">
      <div slot="headerother">
        <ul class="sp_cat_title_list">
          <li class="curr"><i>1</i><p>编辑详细信息</p></li>
          <li><i>2</i><p>生成订单</p></li>
          <li><i>3</i><p>支付货款</p></li>
          <li><i>4</i><p>下单完成</p></li>
        </ul>
      </div>
    </Header-small>
    <div class="container" title="">
      <div class="w1200 whitebg bdccc" style="margin-top: 20px; margin-bottom: 40px;">
        <!--公司信息-->
        <div class="mt30 fs16 ml15 fwb">公司信息</div>
        <div class="ml35 mt20 mb20 fs18">{{$store.state.memberInfo.username}}</div>
        <div class="lineborder"></div>

        <!--交货方式-->
        <div class="mt30 fs16 ml15 fwb">交货方式</div>
        <div class="" style="display: flex; justify-content: space-between;align-items: center; margin-left: 35px;">
          <ul class="DeliveryMethod mb20">
            <li @click="chooseDelieryType(0)" :class="{'curr':0 === currentIndex}" :key="0">
              <div style="background-color: #fff;">自提</div>
            </li>
            <li @click="chooseDelieryType(1)" v-if="$store.state.common.sysConfig.IS_CAN_DELIVERY == 1" :class="{'curr':1 === currentIndex}" :key="1">
              <div style="background-color: #fff;">配送</div>
            </li>
          </ul>
          <div class="blueFont mr30 cp fs14" v-show="currentIndex == 1" id="newAdd" @click="addNewAddress">新增收货地址</div>
        </div>
        <div class="gray" style="margin-left: 35px;">
          <template v-if="orderinfo.isDelivery == 0">
            （您选择交货方式为自提，自提起订量为<span class="orangeFont">{{planInfo.feedingInfo.take_their_min}}吨</span>，数量加量幅度为<span
              class="orangeFont">{{planInfo.feedingInfo.take_bid_increment}}吨</span>）
          </template>
          <template v-else-if="orderinfo.isDelivery == 1">
            （您选择交货方式为配送，配送起订量为<span class="orangeFont">{{planInfo.feedingInfo.delivery_min}}吨</span>，数量加量幅度为<span
              class="orangeFont">{{planInfo.feedingInfo.delivery_bid_increment}}吨</span>）
          </template>
        </div>
        <div class="AddList" v-if="orderinfo.isDelivery == 1">
          <template v-if="addressList.length > 0">
            <ul class="addListSelect ovh">
              <li v-for="(item,i) in addressList" :key="i" :class="item.id === orderinfo.addressId ? 'curr' : ''"
                  @click="setAddress(i,item)">
                <div class='deliver_icon' v-if="item.id === orderinfo.addressId">
                  <i class='deliver_icon'></i>
                  配送至
                </div>
                <div v-else class="deliver_icon"><span style="margin-left:79px;">&nbsp;</span></div>
                <RadioGroup v-model="orderinfo.addressId">
                  <Radio :label="item.id">
                    <span style="margin-left: 15px">{{item.name}}</span>
                    <span style="margin-left: 15px">{{item.phone}}</span>
                    <span style="margin-left: 15px">身份证：{{item.idNumber}}</span>
                    <span style="margin-left: 15px">{{item.stateName}} {{item.cityName}}{{item.districtName}} {{item.address}}</span>
                  </Radio>
                </RadioGroup>
              </li>
            </ul>
          </template>
          <template v-else><p>暂无任何收货地址，请您添加！</p></template>
        </div>
        <div class="mt30 fs16 ml15 fwb" v-if="orderinfo.isDelivery == 1">运费</div>
        <div class="ml35 fs14 mt10 dflexAlem" v-if="orderinfo.isDelivery == 1">
          选择运输方式
          <ul class="DeliveryMethod ml35 mb20">
            <template v-if="logisticsfreight.length > 0">
              <li v-for="(item, index) in logisticsfreight" @click="setFreight(index,item)"
                  :class="{'curr':index === currfreight}" :key="index">
                {{item.transportation}}({{item.freight_fee}}元/吨)
              </li>
            </template>
            <template v-else>
              <p>此线路暂无任何运输方式数据，请变更配送地址 或 货物选择自提！</p>
            </template>
          </ul>
        </div>

        <!-- 商品信息 -->
        <div class="mt30 fs16 ml15" id="test1">
          <span class="fwb">商品信息</span>
        </div>
        <ul class="orderPorList">
          <li>
            <span class="title" style="width: 13%;">货物信息</span>
            <span class="title" style="width: 12%;">交货仓</span>
            <span class="title" style="width: 10%;">单价（元/吨）</span>
            <span class="title" style="width: 10%;">运费</span>
            <span class="title" style="width: 10%;">巨融易</span>
            <span class="title" style="width: 12%;">合计单价（元/吨）</span>
            <span class="title" style="width: 12%;">最大可转数量（吨）</span>
            <span class="title" style="width: 12%;">数量（吨）</span>
            <span class="title" style="width: 9%;">小计</span>
          </li>
          <li>
            <div style="width: 13%;">{{planInfo.sku_name}}</div>
            <div style="width: 12%;">{{planInfo.warehouse_name}}</div>
            <div style="width: 10%;">{{$utils.amountFormat(planInfo.final_price)}}</div>
            <div style="width: 10%;">+ {{orderinfo.freightFee}}元/吨</div>
            <div style="width: 10%;">+ {{orderinfo.jryCost}}元/吨</div>
            <div style="width: 12%;"> {{$utils.amountFormat(this.totalPrice)}}</div>
			
            <div style="width: 12%;" v-if="planInfo.feedingInfo.is_limit==0"> {{Math.min(planInfo.available_num,planInfo.feedingInfo.available_num)}}</div>
			<div style="width: 12%;" v-else> {{planInfo.limitNum}}</div>
            <div style="width: 12%;" v-if="planInfo.feedingInfo.is_limit==1  && this.planInfo.member_ids=='' ">
				  <input-special :min="currMin" :max="currMax" :step="currsetp" v-model="orderinfo.orderNum"
                             @change="changeNum"></input-special>
             
            </div>
			<div style="width: 12%;" v-else>
				 <input-special :min="currMin" :max="currMax" :step="currsetp" v-model="orderinfo.orderNum"
                             @change="changeNum"></input-special>
            </div>
            <div class="fwb orangeFont" style="width: 9%;">{{$utils.amountFormat(this.totalAmount)}}</div>
          </li>
        </ul>

        <!--优选服务-->
        <!-- <div class="mt30 fs16 ml15 fwb" v-if="planInfo.feedingInfo.is_jry">优选服务</div>
        <div class="ml35 fs14 mt10 dflexAlem" v-if="planInfo.feedingInfo.is_jry">
          巨融易
          <div class="ml5">
            <Select v-model="orderinfo.jryDays" clearable @on-change="setJry" style="width:200px" placeholder="需要请选择">
              <i-option v-for="(item, index) in planInfo.feedingInfo.jry_days.split(',')" :value="item" :key="index">{{ item }}天</i-option>
            </Select>
          </div>
          <div class="ml20 orangeFont">* 费率=天数*吨数*{{$store.state.common.sysConfig.JRY_COST}}元</div>
        </div>
        <div class="orderCzTip" v-if="orderinfo.isDelivery != -1 && planInfo.isJry">
          * 选择巨融易服务，提交订单后必须在有效期内支付尾款完成，逾期将自动取消订单，可能会导致因合约转单超期而扣除保证金。<br/>
          （例：选择使用巨融易 5 天，在2019-05-08 11:00:00提交订单，必须在2019-05-13 {{$store.state.common.sysConfig.CLOSED_TIME}}:00前完成货款支付）
        </div> -->
		<div class="lineborder"></div>
		<div class="mt30 fs16 ml15 fwb">支付选择</div>
			<ul class="DeliveryMethod ml35">
				<li @click="choosePayType(0)" :class="'curr'" :key="0">
					支付全款
				</li>
				<div class="ml10 fs14">可用余额：<span class="orangeFont">{{$store.state.member.capitalInfo.available_amount_format}}</span></div>
				<a class="licz" href="/users/investCapital" style="cursor: pointer" target="_blank">查看充值方式</a>
			</ul>

        <div class="proInfor">
          <div style="display: flex; flex-direction: column; width: 200px; ">
            <div class="mt40 tar mr20 dflex " style="align-items: center;">
              <span class="totalprice fs20 tar">订单数量：</span><span class="fs20 orangeFont tar fwb" style="width: 100px;">{{this.orderinfo.orderNum}}吨</span>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; width: 300px; ">
            <div class="mt20 tar mr20 dflex " style="align-items: center;">
              <span class="totalprice">应付总额：</span><span class="tar"
                                                         style="width: 150px;">{{$utils.amountFormat(this.totalAmount)}}</span>
            </div>
            <div class="mt20 mb20 tar mr20 dflexAlem">
              <span class="totalprice">待付金额：</span><span class="fs18 orangeFont tar fwb" style="width: 150px;">{{$utils.amountFormat(this.payAmount)}}</span>
            </div>
          </div>
        </div>

        <div class="w1200 whitebg dflexAlem"
             style="font-size: 14px; margin: 30px; justify-content:flex-end; width:96.8%;">
          <div class="submitOrder" @click='beginCreateOrder(planInfo)'>提交订单</div>
        </div>
      </div>
    </div>
	<advancePay :isshow='payModalShow'  @payedChange="PayedOrder" :isPay="isCanPay" :title="payModalTitle" :ProgressShow="progressShow" :datalist='payData'   @unChange="unPayOrder" ></advancePay>
    <Footer size="small" title="" style="margin-top:18px;"></Footer>
    <address-dialog :isshow="addAddressLoading" @unChange="unaddAddressChange"></address-dialog>
  </div>
</template>

<script>
	import Header from '../../../components/header'
	import Footer from '../../../components/footer'
	import { getFreightList} from '../../../api/spot'
	import InputSpecial from '../../../components/input-special'
	import {addressList} from '../../../api/users'
	import advancePay from '../../../components/paydeposit/Payadvance'
	import AddressDialog from '../../../components/address-dialog'
	import { mapState } from 'vuex'
	import server from '../../../config/api'

	export default {
		name: "advance-change",
		middleware: 'memberAuth',
		components: {
			advancePay,
			HeaderSmall: Header.small,
			Footer,
			InputSpecial,
			AddressDialog
		},
		fetch({store, params, query}) {
			return Promise.all([
				//获取顶部、中部、底部导航信息
				store.dispatch('common/getNavList'),
				//获取系统配置
				store.dispatch('common/getSysConfig'),
                //获取资金情况
				store.dispatch('member/getCapitalInfo'),
				//获取放料信息
				store.dispatch('advance/getPlanDetail', {feeding_id: query.id, planned_id: query.planned_id}),
			])
		},
		computed: {
			...mapState({
				planInfo: state => state.advance.planDetail,
			}),
			totalPrice: function () {
				return parseFloat(this.planInfo.final_price) + parseFloat(this.orderinfo.freightFee) + parseFloat(this.orderinfo.jryCost)
			},
			totalAmount: function () {
				return parseFloat(this.totalPrice) * parseInt(this.orderinfo.orderNum)
			},
			payAmount: function () {
        return this.totalAmount;
			},
		},

		data() {
			return {
				addAddressLoading: false,
				isCanPay:true,
				payModalTitle: '支付',
				orderinfo: {
					plan_id: 0,
					feeding_id: 0,
					isDelivery: 0,
					addressId: 0,
					transportationMode: '',
					jryDays: 0,
					orderNum: 0,

					freightFee: 0,
					jryCost: '0.00',
				},
				payData:{},
				payModalShow:false,
				createInfo: false,
				currMin: 0,
				currMax: 0,
				currsetp: 1,
				currentIndex: 0,
				currfreight: -1,
				currfreightdata: {},
				defaultAdd: {},
				logisticsfreight: {},
				curraddress: 0,
				progressShow:false ,
				addressList: [],
			}
		},
		methods: {
			//选择提货或者配置
			chooseDelieryType(index) {
				this.currentIndex = index
				if (index == 0) {
					this.orderinfo.isDelivery = 0
					this.currMin = this.planInfo.feedingInfo.take_bid_increment
					this.currsetp = this.planInfo.feedingInfo.take_bid_increment
                    this.setFreight(-1)
				} else if (index == 1) {
					this.orderinfo.isDelivery = 1
					this.currMin = this.planInfo.feedingInfo.delivery_min
					this.currsetp = this.planInfo.feedingInfo.delivery_bid_increment
				}
				if (this.currMin <= this.currMax) {
					//this.orderinfo.orderNum = this.currMin
				} else {
					this.$utils.showWarning(this, "剩余转单量(" + this.currMax + ")不满足当前交货方式的起订量(" + this.currMin + ")要求，请重新选择！", function () {
						history.back()
					})
				}
			},
			//获取地址
			async getMyAddress() {
				const res = await addressList(this, {})
				if (res) {
					this.addressList = res.data
					this.addressList.forEach(element => {
						if (element.defaultAddress === 1) {
							this.orderinfo.addressId = element.id
							this.defaultAdd = element
							this.setAddress(0, element)
						}
					});
				}
			},
			unPayOrder(row){
				this.payModalShow = row
			},
			choosePayType(){

			},
			PayedOrder(smsCode) {
				this.isCanPay = false
                this.progressShow=true
 				this.createOrder(smsCode)
				this.isCanPay = true
			},
			async createOrder(smsCode){
				let params = {
					plan_id: this.orderinfo.plan_id,
					feeding_id: this.orderinfo.feeding_id,
					is_delivery: this.orderinfo.isDelivery,
					address_id: this.orderinfo.addressId,
					transportation_mode: this.orderinfo.transportationMode,
					jry_days: this.orderinfo.jryDays || 0,
					order_num: this.orderinfo.orderNum,
					is_pay_deposit:1,
					sms_code: smsCode
				}
 				 let res = await this.$utils.sendCurl(this, server.api.advance.createOrder, params)
				console.log(res)
				if (res.status === 200) {
					if ((res.data.errorcode || 0) == 0) {
						location.href = '/advance/change/success?&order_no=' + (res.data.order_no||'') + '&order_status=' + (res.data.order_status||'') + '&order_pay_last_time=' + (res.data.order_pay_last_time||'')
					} else {
              		  alert(res.data.message)
					}
				}
			},
			//添加新的地址
			addNewAddress() {
				this.addAddressLoading = true
			},
			unaddAddressChange(res) {
				this.addAddressLoading = res
				this.getMyAddress()
			},
			//单选
			setAddress(i, row) {
				this.orderinfo.addressId = row.id
				this.defaultAdd = row
				this.getFreight();
			},
			//获取物流费用
			async getFreight() {
				let data = {
					sku_no: this.planInfo.sku_no,
					warehouse_id: this.planInfo.warehouse_id,
					country_id: this.defaultAdd.countryId,
					state_id: this.defaultAdd.state,
					city_id: this.defaultAdd.city,
					district_id: this.defaultAdd.district,
				}
				const res = await getFreightList(this, data)
				if (res.status == 200 && res.data) {
					this.logisticsfreight = res.data.freightList
					this.orderinfo.transportationMode = 0
					this.orderinfo.freightFee = 0
				}
			},
			//选择运费
			setFreight(i, row) {
				if(i == -1){
					this.orderinfo.transportationMode = ''
					this.orderinfo.freightFee = 0
					this.currfreight = -1
                }else{
					this.orderinfo.transportationMode = row.transportation
					this.orderinfo.freightFee = row.freight_fee
					this.currfreight = i
                }
			},
			//选择巨融易
			setJry() {
				if (this.orderinfo.jryDays > 0) {
					this.orderinfo.jryCost = this.$store.state.common.sysConfig.JRY_COST * this.orderinfo.jryDays
				} else {
					this.orderinfo.jryCost = 0
				}
			},
			//选择订单数量
			changeNum(value) {
				this.orderinfo.orderNum = value
			},
			//开始订单
			beginCreateOrder(data) {
		
				let self = this
				let params = {
					plan_id: this.orderinfo.plan_id,
					feeding_id: this.orderinfo.feeding_id,
					is_delivery: this.orderinfo.isDelivery,
					address_id: this.orderinfo.addressId,
					transportation_mode: this.orderinfo.transportationMode,
					jry_days: this.orderinfo.jryDays || 0,
					order_num: this.orderinfo.orderNum
				}
				if (params.is_delivery == 1 && params.address_id == 0) {
					this.$utils.showWarning(this, '配送请维护选择收货地址！');
					return
				}
				if (params.is_delivery == 1 && params.transportation_mode == 0) {
					this.$utils.showWarning(this, '配送运输方式不能为空！');
					return
				}
				if (params.order_num <= 0) {
					this.$utils.showWarning(this, '下单数量不能为0！');
					return
				}
			
				this.payData = {
					skuNo: this.planInfo.sku_no,
					plan_id: this.orderinfo.plan_id,
					skuName: this.planInfo.sku_name,
					orderNum: this.orderinfo.orderNum,
					totalAmount: this.payAmount,
					totalAmountFormat: parseFloat(this.payAmount).toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')

				}
				this.payModalShow=true
				// this.$Modal.confirm({
				// 	title: '提交订单',
				// 	content: '<p style="font-size:14px;">您确认提交当前转单信息？</p>',
				// 	onOk:async () => {
				// 		let rs = await this.$utils.sendCurl(this, server.api.advance.createOrder, params)
				// 		if (rs.status === 200) {
				// 			if ((rs.data.errorcode || 0) == 0) {
				// 				location.href = '/advance/change/success?&order_no=' + (rs.data.order_no||'') + '&order_status=' + (rs.data.order_status||'') + '&order_pay_last_time=' + (rs.data.order_pay_last_time||'')
				// 			} else {
                // alert(rs.data.message)
				// 			}
				// 		}
				// 	},
				// 	onCancel: () => {

				// 	}
				// })
			},
		},
		mounted() {
			if(!this.planInfo){
				this.$utils.showWarning(this, '合约信息不存在，请重新操作！', function(){
					history.back()
				})
				return
            }

			this.orderinfo.plan_id = this.planInfo.id
			this.orderinfo.feeding_id = this.planInfo.feedingInfo.id
			if(this.planInfo.feedingInfo.is_limit==1 && this.planInfo.member_ids==''){
				 this.currMax =Math.min(this.planInfo.available_num, this.planInfo.feedingInfo.available_num) 		
			}else{
				 this.currMax = Math.min(this.planInfo.available_num, this.planInfo.feedingInfo.available_num)
			}
           
			this.chooseDelieryType(0)
			this.getMyAddress()
		},
		head() {
			return {
				title: '预售转单-巨正源',
				page: 10,
				meta: [{
					name: 'viewport',
					content: 'width=device-width, initial-scale=1'
				},
					{
						name: 'keywords',
						content: '化工, 交易'
					},
					{
						hid: 'description',
						name: 'description',
						content: '巨正源-化工交易平台，提供丙烷脱氢,石化产品贸易、仓储服务、成品油运输服务'
					}
				]
			}
		}
	}
</script>
<style lang="css" scoped>
  .ivu-checkbox-checked .ivu-checkbox-inner:after {
    font-size: 6px;
  }

  .ivu-checkbox-wrapper {
    line-height: 17px;
  }

  .ivu-radio-group-vertical .ivu-radio-wrapper {
    height: 32px;
  }

  .ivu-radio {
    margin-bottom: 2px;
  }
</style>
