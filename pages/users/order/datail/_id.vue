<template>
  <div class="clearfix graybg">
    <div class="w1200 dflex " style="margin-bottom: 40px">
      <usernav></usernav>
      <div class="memberInfor ml20 mt20">
        <!--个人信息-->
        <div class="whitebg" style="padding:0px 18px 18px;">
          <h3 class="fs16 " style="line-height: 46px; border-bottom: 1px solid #ddd;">订单详情 
            <span v-if="this.datalist.status == 2" style="float:right;color:red; font-size:16px;">最迟付款时间： {{this.datalist.orderPayLastTime}}</span>
          </h3>
          <div style="line-height:32px;">
             <Row index="">
              <Col span="12">合约编号：{{this.datalist.sourceSn}}</Col>
              <Col span="12">订单标号：{{this.datalist.orderNo}}</Col>
            </Row>
            <Row index="">
              <Col span="6">下单时间：{{this.datalist.createTime}}</Col>
              <Col span="6">巨融易天数：{{this.datalist.jryDays}}</Col>
              <Col span="12">有效提货时间：{{this.datalist.deliveryStart}} 至 {{this.datalist.deliveryDeadline}}</Col>
            </Row>
             <Row index="">
              <Col span="12">包装方式： 
              <template v-if="this.datalist.packingModes == 1">标准包装</template>
              <template v-else>非标准包装</template>
              </Col>
              <Col span="12">产品等级：   
                  <template v-if="this.datalist.productGrade == 1">优等品</template>
                  <template v-else-if="this.datalist.productGrade == 2">一等品</template>
                  <template v-else>合格品</template>
              </Col>
            </Row>
            <Row index="">
              <Col span="12">仓库名称：{{this.datalist.warehouseName}}</Col>
              <Col span="12">仓库地址：{{this.datalist.warehouseAddress}}</Col>
            </Row>
          </div>
        </div>
     <div v-if="this.datalist.isDelivery === 1" class="whitebg mt20" style="padding:0px 18px 18px;">
          <h3 class="fs16 " style="line-height: 46px; border-bottom: 1px solid #ddd;">配送信息<span style="margin-left: 100px">提货方式：</span>
          <template v-if="this.datalist.isDelivery == 0">自提
              <template v-if="(datalist.isAddDemand) || 0 == 0">(待发送物流询价)</template>
          </template>
          <template v-else-if="this.datalist.isDelivery == 1">配送</template></h3>
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
        <div v-if="this.datalist.isDelivery === 0" class="whitebg mt20" style="padding:0px 18px 18px;">
          <h3 class="fs16 " style="line-height: 46px; border-bottom: 1px solid #ddd;">配送信息<span style="margin-left: 100px">提货方式：</span>
          <template v-if="this.datalist.isDelivery == 0">自提
              <template v-if="(datalist.isAddDemand) || 0 == 0">(待发送物流询价)</template>
          </template>
          <template v-else-if="this.datalist.isDelivery == 1">配送</template></h3>
          <div style="line-height:32px;">
            <!-- <Row index="">
              <Col span="12">订单号：{{OrderList.orderNo}}</Col>
              <Col span="12">需求编号：{{OrderList.billNo}}</Col>
            </Row> -->
            <Row index="">
              <Col span="12">货物名称：{{OrderList.freightGoods}}</Col>
              <Col span="12">货物数量：{{OrderList.weight}}</Col>
            </Row>
            <Row index="">
              <Col span="12">联系人：{{OrderList.contact}}</Col>
              <Col span="12">联系电话：{{OrderList.phone}}</Col>
            </Row>
            <Row index="">
              <Col span="12">用车开始时间：{{OrderList.demandBeginDate}}</Col>
              <Col span="12">用车结束时间{{OrderList.demandEndDate}}</Col>
            </Row>
            <Row index="">
              <Col span="12">询价有效时间：{{OrderList.inquiryMinute}}小时</Col>
              <Col span="12">是否含税：
                <span v-if='OrderList.isTax==0'>否</span>
                <span v-else>是</span>
              </Col>
            </Row>
             <Row index="">
              <Col span="12">提货仓库：{{OrderList.dispatchFullAddress}}</Col>
              <Col span="12">收货地址：{{OrderList.receiptFullAddress}}</Col>
            </Row>
          </div>
        </div>
        <div class="whitebg mt20" style="padding:0px 18px 18px;">
          <h3 class="fs16 " style="line-height: 46px; border-bottom: 1px solid #ddd;">支付信息

          </h3>
          <div style="line-height:32px;">
             <Row index="">
              <Col span="12">物料：{{this.datalist.skuName}}</Col>
              <Col span="12">数量：{{this.datalist.orderNum}}</Col>
            </Row>
            <Row index="">
              <Col span="12">账户金额：{{this.formSearch.capit.total_amount_format}}</Col>
              <Col span="12">保证金钱包余额:{{this.formSearch.capit.package_amount_format}}</Col>
            </Row>
            <Row index="" v-if="this.datalist.status == 3 || this.datalist.status == 4">
              <Col span="12">已支付：{{this.datalist.totalAmountFormat}}</Col>
              <Col span="12">支付时间：{{this.datalist.orderPayTime}}</Col>
            </Row>
            <Row index="" v-if="this.datalist.status == 2">
              <Col span="12">待付金额：{{this.datalist.totalAmountFormat}}</Col>
              <Col span="12">最迟付款时间：{{this.datalist.orderPayLastTime}}</Col>
            </Row>
             <Row index="">
              <Col span="12">订单总额：{{this.datalist.totalAmountFormat}}
              </Col>
            </Row>
          </div>
        </div>

        <div class="whitebg mt20" style="padding:0px 18px 18px;">
          <h3 class="fs16 " style="line-height: 46px; border-bottom: 1px solid #ddd;">产品及支付信息</h3>
          <div style="line-height:32px; ">
            <Row index="" style="background: #fafafa;line-height: 42px;text-align: center; border-bottom: 1px solid #eee;">
              <Col span="4">数量</Col>
              <Col span="3">商品单价</Col>
              <Col span="2">运费</Col>
              <Col span="2">巨融易</Col>
              <Col span="4">出厂单价（元/吨）</Col>
              <Col span="3">保证金金额</Col>
              <Col span="4">本单总金额</Col>
            </Row>
            <Row index="" style="line-height: 32px;text-align: center;border-bottom: 1px solid #eee;">
              <Col span="4">{{this.datalist.orderNum}}</Col>
              <Col span="3">{{this.amountFormat(this.datalist.finalPrice - this.datalist.shippingFee -
                this.datalist.jryAdd)}}</Col>
              <Col span="2">+ {{this.datalist.shippingFee}}</Col>
              <Col span="2">+ {{this.datalist.jryDays}}</Col>
              <Col span="4">{{this.datalist.finalPriceFormat}}</Col>
              <Col span="3">{{this.formSearch.capit.package_amount_format}}</Col>
              <Col span="4">{{this.datalist.totalAmountFormat}}</Col>
            </Row>
          </div>
          <div>
             <!-- <div style="line-height:42px; text-align:right; font-size:16px;  padding-right: 47px;"><span >物料：{{this.datalist.skuName}}</span> <span class="ml15" style="padding-left: 105px;">数量：{{this.datalist.orderNum}}</span></div>
            <div style="line-height:42px; text-align:right; font-size:16px; padding-right:9px;" v-if="this.datalist.status == 3"> <span >已支付：{{this.datalist.totalAmountFormat}}</span><span class="ml15" style="padding-left: 50px;">支付时间：{{this.datalist.orderPayTime}}</span></div>
            <div style="line-height:42px; text-align:right; font-size:16px; padding-right:10px;" v-if="this.datalist.status == 2"><span>待付金额：{{this.datalist.totalAmountFormat}} </span><span class="ml15" style="padding-left: 50px;">最迟付款时间：{{this.datalist.orderPayLastTime}}</span></div>
            <div style="line-height:42px; text-align:right; font-size:16px; padding-right: 16px;"><span>账户金额：{{this.formSearch.capit.total_amount_format}} </span> <span class="ml15" style="margin-left: 44px;">保证金钱包余额：{{this.formSearch.capit.package_amount_format}}</span></div>
            <div style="line-height:32px; text-align:right; font-size:16px; padding-right:20px;"
               v-if="this.datalist.isJryService">巨融易：{{this.datalist.jryDays}}天
               </div>
            <div style="line-height:42px; text-align:right; font-size:16px; padding-right:20px; font-weight: bold;color: #ff0000b3;">
              订单总额：{{this.datalist.totalAmountFormat}}</div> -->
            <div  style="line-height:42px;color:red; text-align:right; font-size:20px; padding-right:10px;     margin: 40px;">
                  <Button type="success" v-if="this.datalist.status == 2" style="border-radius: 5px;padding: 10px 40px;font-size: 18px;align-items: center;  cursor: pointer;" @click="paymentBut()">去支付</Button> 
                  <Button class="submitback ml10" @click='back'>返回</Button>
            </div>
       
       
            
          </div>
        </div>

      </div>
    </div>
    <OrderPay :isShow='payLoading' :order_id='payOrderID' @unChange="unPayOrder"></OrderPay>
  </div>
</template>

<script>
	import Navigation from '../../../../components/navigation'
	import {orderpage, getorderDetail} from '../../../../api/order'
	import {getCookies} from '../../../../config/storage'
	import config from '../../../../config/config'
  import utils from '../../../../plugins/common'
  import OrderPay from '../../../../components/paydeposit/orderPay'
  import {sendHttp} from "../../../../api/common";
  	import server from "../../../../config/api";

	export default {
		name: "usertotalorder",
		layout: 'membercenter',
		middleware: 'memberAuth',
		components: {
      usernav: Navigation.user,
      OrderPay
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
        payLoading:false,
        datalist: [],
        OrderList:{},
        payOrderID:0,
				formSearch: {
					orderType: '',
					status: '',
					OrderList: '',
					orderNo: '',
          skuName: '',
          capit:'',
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
      unPayOrder(row) {
				this.payLoading = row
				this.sourceDeta()
      },
			amountFormat: function (amount, sign) {
				return utils.amountFormat(amount, sign)
      },
      async capit(){
        const res = await sendHttp(this, true, server.api.capital.myCapital)
        console.log(res)
        this.formSearch.capit=res.data
      },
      paymentBut() {
            //检查是否可以使用合约的保证金
           
            this.payOrderID = this.orderid
            this.payLoading = true
           console.log(this.payOrderID)
        },	
      async orderlist() {
				let params = {
					orderId: this.orderid,
        }
				const res = await sendHttp(this, true, server.api.freight.InfoByOrderId, params, 1)

        this.OrderList = res.data
        console.log(this.OrderList)

			},  
    },

    
		mounted(){
      this.capit();
      this.sourceDeta()
      this.orderlist();
     
    },
		watch: {
			'$route'(to, from) {
				this.$router.go(0);
			}
		}
	}
</script>
<style scoped>
  .submitback{border-radius: 5px;padding: 10px 40px;font-size: 18px;align-items: center;  cursor: pointer;border:1px solid #ff7300; color:#ff7300;}
</style>