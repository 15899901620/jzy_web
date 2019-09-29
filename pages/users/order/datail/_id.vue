<template>
  <div class="clearfix graybg">
    <div class="w1200 dflex " style="margin-bottom: 40px">
      <usernav></usernav>
      <div class="memberInfor ml20 mt20">
        <!--个人信息-->
        <div class="whitebg" style="padding:0px 18px 18px;">
          <h3 class="fs16 " style="line-height: 46px; border-bottom: 1px solid #ddd;">订单详情 <span
              v-if="this.datalist.status == 2" style="float:right;color:red; font-size:16px;">最迟付款时间： {{this.datalist.orderPayLastTime}}</span>
          </h3>
          <div style="line-height:32px;">
            <Row index="">
              <Col span="6">下单时间：{{this.datalist.createTime}}</Col>
              <Col span="6">巨融易天数：{{this.datalist.jryDays}}</Col>
              <Col span="12">有效提货时间：{{this.datalist.deliveryStart}} 至 {{this.datalist.deliveryDeadline}}</Col>
            </Row>
            <Row index="">
              <Col span="12">提货方式：{{this.datalist.orderNo}}</Col>
              <Col span="12">状态：{{this.datalist.orderNo}}</Col>
            </Row>
            <Row index="">
              <Col span="12">仓库名称：{{this.datalist.warehouseName}}</Col>
              <Col span="12">仓库地址：{{this.datalist.warehouseAddress}}</Col>
            </Row>
          </div>
        </div>
        <div v-if="this.datalist.isDelivery === 1" class="whitebg mt20" style="padding:0px 18px 18px;">
          <h3 class="fs16 " style="line-height: 46px; border-bottom: 1px solid #ddd;">配送信息</h3>
          <div style="line-height:32px;">
            <Row index="">
              <Col span="12">联系人：{{this.datalist.memberContacter}}</Col>
              <Col span="12">联系电话：{{this.datalist.memberPhone}}</Col>
            </Row>
            <Row index="">
              <Col span="6">收货人姓名：{{this.datalist.receiverName}}</Col>
              <Col span="6">收货人电话：{{this.datalist.receiverPhone}}</Col>
              <Col span="12">收货人身份证：{{this.datalist.receiverIdNumber}}</Col>
            </Row>
            <Row index="">
              <Col span="12">收货地址：{{this.datalist.receiverFullAddress}}</Col>
              <Col span="12">详细地址：{{this.datalist.receiverAddress}}</Col>
            </Row>
            <Row index="">
              <Col span="">运输方式：{{this.datalist.transportationMode}}</Col>
            </Row>
            <Row index="">
              <Col span="">承运商：<span v-if="this.datalist.carrierName">{{this.datalist.carrierName}}</span><span v-else>待供方指定</span>
              </Col>
            </Row>
          </div>
        </div>

        <div class="whitebg mt20" style="padding:0px 18px 18px;">
          <h3 class="fs16 " style="line-height: 46px; border-bottom: 1px solid #ddd;">价格与支付信息</h3>
          <div style="line-height:32px; ">
            <Row index=""
                 style="background: #fafafa;line-height: 42px;text-align: center; border-bottom: 1px solid #eee;">
              <Col span="4">数量</Col>
              <Col span="3">商品单价</Col>
              <Col span="2">运费</Col>
              <Col span="2">巨融易</Col>
              <Col span="4">合计单价（元/吨）</Col>
              <Col span="3">保证金金额</Col>
              <Col span="4">本单总金额</Col>
            </Row>
            <Row index="" style="line-height: 32px;text-align: center;border-bottom: 1px solid #eee;">
              <Col span="4">{{this.datalist.orderNum}}</Col>
              <Col span="3">{{this.amountFormat(this.datalist.finalPrice - this.datalist.shippingFee -
                this.datalist.jryAdd)}}</Col>
              <Col span="2">+ {{this.datalist.shippingFee}}</Col>
              <Col span="2">+ {{this.datalist.jryAdd}}</Col>
              <Col span="4">{{this.datalist.finalPriceFormat}}</Col>
              <Col span="3">{{this.datalist.orderNum}}</Col>
              <Col span="4">{{this.datalist.totalAmountFormat}}</Col>
            </Row>
          </div>
          <div>
             <p style="line-height:42px; text-align:left; font-size:15px; padding-right:10px;"><span >物料：{{this.datalist.skuName}}</span> <span class="ml15">数量：{{this.datalist.orderNum}}天</span></p>
            <p style="line-height:42px; text-align:right; font-size:15px; padding-right:10px;"> <span>已支付：{{this.datalist.total_amount-this.datalist.deposit_amount}} </span><span class="ml15">支付时间：{{this.datalist.orderPayTime}}</span></p>
            <p style="line-height:42px; text-align:right; font-size:15px; padding-right:10px;" v-if="this.datalist.status == 2"><span>待付金额:{{this.datalist.skuName}} </span><span class="ml15">最迟付款时间:{{this.datalist.orderPayLastTime}}</span></p>
            <p style="line-height:42px; text-align:right; font-size:15px; padding-right:10px;"><span>账户金额:{{this.datalist.skuName}} </span> <span class="ml15">保证金钱包余额:{{this.datalist.skuName}}</span></p>
            <p style="line-height:32px; text-align:right; font-size:15px; padding-right:10px;"
               v-if="this.datalist.isJryService">巨融易：{{this.datalist.jryDays}}天</p>
            <p style="line-height:42px; text-align:right; font-size:16px; padding-right:10px;">
              订单总额：{{this.datalist.totalAmountFormat}}</p>
            <p v-if="this.datalist.status == 2"
               style="line-height:42px;color:red; text-align:right; font-size:17px; padding-right:10px;">
              待付金额：{{this.amountFormat(this.datalist.totalAmount - this.datalist.depositAmount)}}</p>
            <p  style="line-height:42px;color:red; text-align:right; font-size:20px; padding-right:10px;">
            确定 <a @click='back'>返回</a></p>
            </p>
            
          </div>
        </div>

      </div>
    </div>
    
  </div>
</template>

<script>
	import Navigation from '../../../../components/navigation'
	import {orderpage, getorderDetail} from '../../../../api/order'
	import {getCookies} from '../../../../config/storage'
	import config from '../../../../config/config'
	import utils from '../../../../plugins/common'

	export default {
		name: "usertotalorder",
		layout: 'membercenter',
		middleware: 'memberAuth',
		components: {
			usernav: Navigation.user,
		},
		fetch({store}) {
			return Promise.all([
				//获取顶部、中部、底部导航信息
				store.dispatch('common/getNavList'),
				//获取系统配置
				store.dispatch('common/getSysConfig'),
			])
		},
		data() {
			return {
				payloading: false,
				datalist: [],
				formSearch: {
					orderType: '',
					status: '',
					OrderList: '',
					orderNo: '',
					skuName: ''
				},
				orderid: !this.$route.params.id ? 0 : this.$route.params.id,
				userinfo: {}
			}
		},
		methods: {
			//订单类型
			getOrderType(typeId) {
				if (!typeId) return
				return config.orderType[typeId]
      },
      back(){
           this.$router.go(-1);//返回上一层
      },
			//订单状态
			getOrderState(typeId) {
				if (!typeId) return
				return config.orderState[typeId]
			},
			async sourceDeta() {
				let params = {
					id: this.orderid
				}
				let res = await getorderDetail(this, params)
				this.datalist = res.data
			},
			amountFormat: function (amount, sign) {
				return utils.amountFormat(amount, sign)
			},
		},
		mounted(){
			this.sourceDeta()
    },
		watch: {
			'$route'(to, from) {
				this.$router.go(0);
			}
		}
	}
</script>