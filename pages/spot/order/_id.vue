<template>
  <div class="body">
    <Header-small title="现货超市">
      <div slot="headerother" style="margin-right: 20px;">
        <ul class="sp_cat_title_list">
          <li class="curr"><i>1</i><p>编辑详细信息</p></li>
          <li><i>2</i><p>生成合约</p></li>
          <li><i>3</i><p>合约转单</p></li>
          <li><i>4</i><p>生成订单</p></li>
          <li><i>5</i><p>支付货款</p></li>
          <li><i>6</i><p>下单完成</p></li>
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
            <li @click="chooseDelieryType(2)" :class="{'curr':2 === currentIndex}" :key="2">
              <div style="background-color: #fff;">待定</div>
            </li>
          </ul>
          <div class="blueFont mr30 cp fs14" v-show="currentIndex == 1" id="newAdd" @click="addNewAddress">新增收货地址</div>
        </div>
        <div class="gray" style="margin-left: 35px;">
          <template v-if="orderinfo.isDelivery == 0">
            （您选择交货方式为自提，自提起订量为<span class="orangeFont">{{Math.max(spotInfo.take_their_min, spotInfo.min_order)}}吨</span>，数量加量幅度为<span
              class="orangeFont">{{spotInfo.take_bid_increment}}吨</span>）
          </template>
          <template v-else-if="orderinfo.isDelivery == 1">
            （您选择交货方式为配送，配送起订量为<span class="orangeFont">{{spotInfo.delivery_min}}吨</span>，数量加量幅度为<span
              class="orangeFont">{{spotInfo.delivery_bid_increment}}吨</span>）
          </template>
          <template v-else-if="orderinfo.isDelivery == -1">
            （您选择交货方式为待定，则提交后只生成合约单，必须在<span class="orangeFont">{{spotInfo.last_ordered_date}}</span>之前确认并转订单，否则会扣除交纳的保证金）
          </template>
        </div>
        <div class="ml35 fs14 mt10 dflexAlem" v-if="orderinfo.isDelivery == 0">
          选择运输方式
          <div class="ml5">
            <Select v-model="orderinfo.transportationModeTake" style="width:200px">
              <i-option v-for="(item, index) in spotInfo.take_their_transportations.split(',')" :value="item" :key="index">{{ item }}</i-option>
            </Select>
          </div>
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
            <span class="title" style="width: 12%;">单价（元/吨）</span>
            <span class="title" style="width: 12%;">运费</span>
            <span class="title" style="width: 12%;">巨融易</span>
            <span class="title" style="width: 12%;">合计单价（元/吨）</span>
            <span class="title" style="width: 14%;">数量（吨）</span>
            <span class="title" style="width: 9%;">小计</span>
          </li>
          <li>
            <div style="width: 13%;">{{spotInfo.sku_name}}</div>
            <div style="width: 12%;">{{spotInfo.warehouse_name}}</div>
            <div style="width: 12%;">{{spotInfo.finalPriceFormat}}</div>
            <div style="width: 12%;">+ {{orderinfo.freightFee}}元/吨</div>
            <div style="width: 12%;">+ {{orderinfo.jryCost}}元/吨</div>
            <div style="width: 12%;"> ￥{{this.totalPriceFormat}}</div>
            <div style="width: 14%;">
              <input-special :min="0" :max="currMax" :step="currsetp" v-model="orderinfo.orderNum"
                             @change="changeNum"></input-special>
            </div>
            <div class="fwb orangeFont" style="width: 9%;">￥{{ this.totalAmountFormat }}</div>
          </li>
        </ul>

        <div class="lineborder"></div>
        <div class="mt30 fs16 ml15 fwb">支付选择</div>
        <ul class="DeliveryMethod ml35">
          <li @click="choosePayType(0)" v-if="orderinfo.isDelivery != -1" :class="{'curr':0 === orderinfo.payIndex}" :key="0">
            支付全款
          </li>
          <li @click="choosePayType(1)" :class="{'curr':1 === orderinfo.payIndex}" :key="1">
            支付保证金
          </li>
          <div class="ml10 fs14">可用余额：<span class="orangeFont">{{$store.state.member.capitalInfo.available_amount_format}}</span></div>
          <a class="licz" href="/users/investCapital" style="cursor: pointer" target="_blank">查看充值方式</a>
        </ul>

        <div class="orderCzTip" v-if="orderinfo.payIndex == 1 && orderinfo.isDelivery != -1">
          <template v-if="$store.state.common.sysConfig.SPOT_PAYMENT_TIME == 1">*
            如仅支付保证金，在提交订单后当天{{$store.state.common.sysConfig.CLOSED_TIME}}前完成付款，逾期将扣除保证金
          </template>
          <template v-if="$store.state.common.sysConfig.SPOT_PAYMENT_TIME == 2">* 如仅支付保证金，在提交订单后30分钟内完成付款，逾期扣除保证金</template>
          <template v-if="$store.state.common.sysConfig.SPOT_PAYMENT_TIME == 3">* 如仅支付保证金，在提交订单后60分钟内完成付款，逾期扣除保证金</template>
        </div>

        <!--优选服务-->
        <div class="mt30 fs16 ml15 fwb" id="test2" v-if="orderinfo.payIndex==1 && orderinfo.isDelivery != -1 && spotInfo.is_jry">优选服务</div>
        <div class="ml35 fs14 mt10 dflexAlem" v-if="orderinfo.payIndex==1 && orderinfo.isDelivery != -1 && spotInfo.is_jry">
          巨融易
          <div class="ml5">
            <Select v-model="orderinfo.jryDays" clearable @on-change="setJry" style="width:200px" placeholder="需要请选择">
              <i-option v-for="(item, index) in spotInfo.jry_days.split(',')" :value="item" :key="index">{{ item }}天</i-option>
            </Select>
          </div>
          <div class="ml20 orangeFont">* 费率=天数*吨数*{{$store.state.common.sysConfig.JRY_COST}}元</div>
        </div>
        <div class="orderCzTip" v-if="orderinfo.payIndex==1 && orderinfo.isDelivery != -1 && spotInfo.is_jry">
          * 选择巨融易产品，提交订单后必须在有效期内支付尾款完成，逾期将扣除保证金。<br/>
          （例：选择使用巨融易 5 天，在2019-05-08 11:00:00提交订单，必须在2019-05-13 {{$store.state.common.sysConfig.CLOSED_TIME}}:00前完成尾款付款）
        </div>
        <div class="lineborder" v-if="orderinfo.payIndex==1"></div>

        <div class="proInfor">
          <div style="display: flex; flex-direction: column; width: 200px; ">
            <div class="mt40 tar mr20 dflex " style="align-items: center;">
              <span class="totalprice fs20 tar">订单数量：</span><span class="fs20 orangeFont tar fwb" style="width: 100px;">{{this.orderinfo.orderNum}}吨</span>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; width: 300px; ">
            <div class="mt20 tar mr20 dflex " style="align-items: center;">
              <span class="totalprice">应付总额：</span><span class="tar" style="width: 150px;">￥{{this.totalAmountFormat}}</span>
            </div>
            <div class="mt20 mb20 tar mr20 dflexAlem">
              <span class="totalprice">待付金额：</span><span class="fs18 orangeFont tar fwb" style="width: 150px;">￥{{this.payAmountFormat}}</span>
            </div>
          </div>
        </div>

        <div class="w1200 whitebg dflexAlem"
             style="font-size: 14px; margin: 30px; justify-content:flex-end; width:96.8%;">
			 <div class="submitOrder" @click='beginCreateOrder' v-if="isCanSale">提交订单</div>
			 <div class="submitOrder" style='background:gray'  v-else>提交订单</div>
        </div>
      </div>
    </div>
    <Footer size="small" title="底部" style="margin-top:18px;"></Footer>
    <address-dialog :isshow="addAddressLoading" @unChange="unaddAddressChange"></address-dialog>
    <spotPay :isshow='payModalShow' :datalist='payData' :isPay="isCanPay" :title="payModalTitle" :ProgressShow="progressShow" @unChange="unPayOrder"
             @payedChange="PayedOrder"></spotPay>
  </div>
</template>

<script>
	import Header from '../../../components/header'
	import Footer from '../../../components/footer'
	import { submitOrder, getFreightList} from '../../../api/spot'
	import InputSpecial from '../../../components/input-special'
	import {addressList} from '../../../api/users'
	import AddressDialog from '../../../components/address-dialog'
	import spotPay from '../../../components/paydeposit/spotPay'
	import { mapState } from 'vuex'
	import { sendCurl ,sendHttp} from '../../../api/common'
	import server from '../../../config/api'

	export default {
		name: "spot-order-id",
		middleware: 'memberAuth',
		components: {
			HeaderSmall: Header.small,
			Footer,
			InputSpecial,
			AddressDialog,
			spotPay
		},
		fetch({store, params}) {
			return Promise.all([
				//获取顶部、中部、底部导航信息
				store.dispatch('common/getNavList'),
				//获取系统配置
				store.dispatch('common/getSysConfig'),
        //获取报价信息
				store.dispatch('spot/getSpotInfo', {id: params.id||0}),
			])
		},
		computed: {
			...mapState({
				spotInfo: state => state.spot.spotInfo,
			}),
			totalPrice: function () {
				return parseFloat(this.spotInfo.final_price) + parseFloat(this.orderinfo.freightFee) + parseFloat(this.orderinfo.jryCost)
			},
			totalPriceFormat: function () {
				return parseFloat(this.totalPrice).toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
			},
			totalAmount: function () {
				return parseFloat(this.totalPrice) * parseInt(this.orderinfo.orderNum)
			},
			totalAmountFormat: function () {
				return parseFloat(this.totalAmount).toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
			},
			payAmount: function () {
				if (this.orderinfo.payIndex == 1) {
					return parseFloat(this.totalAmount) * parseInt(this.spotInfo.margin_ratio) / 100
				} else {
					return this.totalAmount;
				}
			},
			payAmountFormat: function () {
				return parseFloat(this.payAmount).toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
			},
		},

		data() {
			return {
				addAddressLoading: false,
				payModalShow: false,
				payModalTitle: '支付',
        isCanPay: true,
				payData: {},
				orderinfo: {
					spot_id: 0,
					isDelivery: 0,
					addressId: 0,
					carrierId: 0,
					transportationModeTake: '公路运输',
					transportationMode: '',
					payIndex: 0,
					jryDays: 0,
					orderNum: 0,

					freightFee: 0,
					jryCost: '0.00',
				},
				createInfo: false,
				currMin: 0,
				currMax: 0,
				PlanNum:0,
        isCanSale: true,
				currsetp: 1,
				ServiceTimeList: [],
				payList: [
					{value: 1, name: '支付全款'},
					{value: 2, name: '支付保证金'}
				],
				carrierList: [],
				//carrierListDesc: '',
				currentIndex: 0,
				currfreight: -1,
				currfreightdata: {},
				defaultAdd: {},
				logisticsfreight: {},
				curraddress: 0,
				addressList: [],

				RegisterName: 'member',
				nowIndex: 0,
				index: 0,
				spotId: this.$route.params.id || 0,
                progressShow:false     //进度条显示
			}
		},
		methods: {
			//选择提货或者配置
			chooseDelieryType(index) {
				this.currentIndex = index
				if (index == 0) {
					this.orderinfo.isDelivery = 0
					this.currMin = Math.max(this.spotInfo.take_their_min, this.spotInfo.min_order)
					this.currsetp = this.spotInfo.take_bid_increment
          			this.setFreight(-1)
				} else if (index == 1) {
					this.orderinfo.isDelivery = 1
					this.currMin = Math.max(this.spotInfo.delivery_min, this.spotInfo.min_order)
					this.currsetp = this.spotInfo.delivery_bid_increment
				} else if (index == 2) {
					this.orderinfo.isDelivery = -1
					this.currMin = this.spotInfo.min_order
					this.currsetp = 1

					this.orderinfo.transportationMode = ''
					this.orderinfo.freightFee = 0
					this.currfreight = -1
					this.orderinfo.jryDays = 0
					this.setJry()
					this.choosePayType(1)
				}
				if (this.currMin <= this.currMax) {
					this.orderinfo.orderNum = this.currMin
				} else {
					this.showWarning("剩余库存(" + this.currMax + ")不满足当前交货方式的起订量(" + this.currMin + ")要求，请重新下单！", function () {
						window.location.href = '/spot'
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
					sku_id: this.spotInfo.sku_id,
					warehouse_id: this.spotInfo.warehouse_id,
					country_id: this.defaultAdd.countryId,
					state_id: this.defaultAdd.state,
					city_id: this.defaultAdd.city,
					district_id: this.defaultAdd.district,
				}
				const res = await getFreightList(this, data)
				if (res.status == 200 && res.data) {
					this.carrierList = res.data.carriers

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
			choosePayType(index) {
				this.orderinfo.payIndex = index
        if(index == 0){
					this.orderinfo.jryDays = 0
					this.setJry()
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
			beginCreateOrder() {
				let params = {
					spot_id: this.orderinfo.spot_id,
					isDelivery: this.orderinfo.isDelivery,
					addressId: this.orderinfo.addressId,
					carrierId: this.orderinfo.carrierId,
					transportationMode: this.orderinfo.transportationMode,
					payIndex: this.orderinfo.payIndex,
					jryDays: this.orderinfo.jryDays || 0,
					orderNum: this.orderinfo.orderNum
				}
				if (params.isDelivery == 1 && params.addressId == 0) {
					this.showWarning('配送请维护选择收货地址！');
					return
				}
				/*if(params.isDelivery == 1 && params.carrierId == 0){
            this.showWarning('配送承运商不能为空！');
            return ;
        }*/
				if (params.isDelivery == 1 && params.transportationMode == 0) {
					this.showWarning('配送运输方式不能为空！');
					return;
				}
				if (params.orderNum <= 0) {
					this.showWarning('下单数量不能为0！');
					return;
				}
				this.payData = {
					skuNo: this.spotInfo.sku_no,
					skuName: this.spotInfo.sku_name,
					orderNum: params.orderNum,
					totalAmount: this.payAmount,
					totalAmountFormat: parseFloat(this.payAmount).toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')

				}

        		this.payModalTitle = '支付'

				this.showPayment()
			},
			showPayment(row) {
				this.payModalShow = true

			},
			unPayOrder(row) {
				this.payModalShow = row
			},
			PayedOrder(smsCode) {
				this.isCanPay = false
                this.progressShow=true
 				this.createOrder(smsCode)
				this.isCanPay = true
			},
			//提交订单
			async createOrder(smsCode) {
				let params = {
					spot_id: this.orderinfo.spot_id,
					is_delivery: this.orderinfo.isDelivery,
					address_id: this.orderinfo.addressId,
					carrier_id: this.orderinfo.carrierId,
					transportation_mode: this.orderinfo.transportationMode,
					is_pay_deposit: this.orderinfo.payIndex,
					jry_days: this.orderinfo.jryDays,
					order_num: this.orderinfo.orderNum,
					sms_code: smsCode
				}
				if(params.is_delivery == 0){
					params.transportation_mode = this.orderinfo.transportationModeTake
                }
 				 let res = await sendCurl(this, server.api.spot.createOrderByQuote, params)

				if (res.status === 200) {

 					if ((res.data.errorcode || 0) == 0) {
                      //this.progressShow=false
						location.href = '/spot/order/success?plan_no=' + res.data.plan_no + '&last_ordered_date='+ (res.data.last_ordered_date||'') + '&order_no=' + (res.data.order_no||'') + '&order_status=' + (res.data.order_status||'') + '&order_pay_last_time=' + (res.data.order_pay_last_time||'')

 					} else {
						this.$Modal.warning({
							title: '提示',
							content: res.data.message,
                            onOk: () => {
                              this.$router.push({name: "spot-page"})
                            }
						})
				return
					}
				}
			},
			showWarning(msg, okCallback) {
				if (okCallback) {
					this.$Modal.warning({
						title: '提示',
						content: msg,
						onOk: okCallback
					})
				} else {
					this.$Modal.warning({
						title: '提示',
						content: msg,
					})
				}

			},
			async PlanTotalNum(limit_num){
				let params = {
					quoteId: this.spotId,
				}
				let res = await sendHttp(this, true,server.api.spot.getPlanTotalNumByQuoteId, params,1)
				this.PlanNum=res.data
        if(this.PlanNum >= limit_num){
        	this.isCanSale = false
        }
			}
		},
		mounted() {

			if(!this.spotInfo){
				this.showWarning('报价信息不存在，请重新操作！', function(){
					location.href = '/spot'
			});
						return
			}
			//获取资金情况
			this.$store.dispatch('member/getCapitalInfo'),

			this.orderinfo.spot_id = this.spotInfo.id
			if(this.spotInfo.limit_num > 0){
				this.PlanTotalNum(this.spotInfo.limit_num)
				this.currMax = Math.min(this.spotInfo.limit_num-this.PlanNum, this.spotInfo.available_num)
			}else{
				this.currMax = this.spotInfo.available_num
			}
			this.chooseDelieryType(0)
			this.getMyAddress()
		},
		head() {
			return {
				title: '会员下单-巨正源',
				page: 10,
				meta: [{
					name: 'viewport',
					content: 'width=device-width, initial-scale=1'
				},
					{
						name: 'keywords',
						content: '化工, 交易, 会员注册'
					},
					{
						hid: 'description',
						name: 'description',
						content: '会员注册巨正源-化工交易平台，提供丙烷脱氢,石化产品贸易、仓储服务、成品油运输服务'
					}
				]
			}
		},
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
