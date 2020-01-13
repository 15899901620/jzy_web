<template>
  <div class="clearfix graybg">
    <div class="w1200 dflex " style="margin-bottom: 40px">
      <usernav></usernav>
      <div class="memberInfor ml20 mt20">
        <!--个人信息-->
        <div class="whitebg" style="padding:0px 18px 18px;">
          <h3 class="fs16 " style="line-height: 46px; border-bottom: 1px solid #ddd;">订单详情
            <span v-if="this.datalist.status == 2" style="float:right;color:red; font-size:16px;">最迟付款时间： {{this.datalist.orderPayLastTime}}</span>
            <span class="fr">订单编号：{{this.datalist.orderNo}}</span>
          </h3>
          <div style="line-height:32px;">
            <Row index="">

              <Col span="12">
                <span v-if="this.datalist.orderType==1"><a :href="`/users/plan/spot/${this.datalist.sourceId}`"
                                                           class="mt5 blackFont">合约编号：<span class="blue">{{this.datalist.sourceSn}}</span></a></span>
                <span v-if="this.datalist.orderType==3"><a :href="`/users/plan/aution/${this.datalist.sourceId}`"
                                                           class="mt5 blackFont">合约编号：<span class="blue">{{this.datalist.sourceSn}}</span></a></span>
              </Col>
              <Col span="12">ERP订单号：{{this.datalist.erpOrderSn}}</Col>
            </Row>
            <Row index="">
              <Col span="12">下单时间：{{this.datalist.createTime}}</Col>
              <Col span="12">有效提货时间：<span style="color:#ff2222">{{this.datalist.deliveryStart}}</span>至<span
                  style="color:#ff2222">{{this.datalist.deliveryDeadline}}</span></Col>
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
            <Row index="">
              <Col span="12">支付状态：<span style="color:#ff0000">{{getOrderState(this.datalist.status)}}</span></Col>
              <Col span="12">微信提货预约状态：</Col>
            </Row>
          </div>
        </div>
        <div class="whitebg mt20" style="padding:0px 18px 18px;">
          <h3 class="fs16 " style="line-height: 46px; border-bottom: 1px solid #ddd;">提货信息<span
              style="margin-left: 270px;">提货方式：</span>
            <template v-if="this.datalist.isDelivery == 0">自提
              <template v-if="(datalist.isAddDemand) || 0 == 0">(待发送物流询价)</template>
            </template>
            <template v-else-if="this.datalist.isDelivery == 1">配送</template>
            <span style="margin-left: 100px; color:#62c097;">
              <span style="cursor: pointer;" @click="addLog(datalist)"
                    v-if="datalist.isDelivery==0 && datalist.isAddDemand==0 && datalist.status!=2">物流询价/</span><span
                v-else style="color:#e8e8e8">我要询价/</span>
              <span style="cursor: pointer;" @click="detailLog(datalist)"
                    v-if="datalist.isDelivery==0 && datalist.isAddDemand==1 && datalist.status!=2">查看物流询价</span><span
                v-else style="color:#e8e8e8">查看物流询价</span>
            </span>
          </h3>

          <div style="line-height:32px;">
            <Row index="" style="font-weight: bold;">
              <Col span="12">联系人：<span
                  v-if="this.datalist.memberContacter">{{this.datalist.memberContacter}}</span><span v-else>--</span>
              </Col>
              <Col span="12">联系电话：<span v-if="this.datalist.memberPhone">{{this.datalist.memberPhone}}</span><span
                  v-else>--</span></Col>
            </Row>
            <Row index="">
              <Col span="12">运输方式：<span
                  v-if="this.datalist.transportationMode">{{this.datalist.transportationMode}}</span><span
                  v-else>--</span></Col>
              <Col span="12">收货人姓名：<span v-if="this.datalist.receiverName">{{this.datalist.receiverName}}</span><span
                  v-else>--</span></Col>
            </Row>
            <Row index="">
              <Col span="12">承运商：<span v-if="this.datalist.carrierName">{{this.datalist.carrierName}}</span><span
                  v-else-if="this.datalist.isDelivery == 0">待需方指定</span><span v-else>待供方指定</span>
              </Col>
              <Col span="12">收货人电话：<span v-if="this.datalist.receiverPhone">{{this.datalist.receiverPhone}}</span><span
                  v-else>--</span></Col>
            </Row>
            <Row index="">
              <Col span="12">承运商联系人：<span
                  v-if="this.datalist.carrierContacts">{{this.datalist.carrierContacts}}</span><span
                  v-else-if="this.datalist.isDelivery == 0">待需方指定</span><span v-else>待供方指定</span></Col>
              <Col span="12">收货人身份证：<span
                  v-if="this.datalist.receiverIdNumber">{{this.datalist.receiverIdNumber}}</span><span v-else>--</span>
              </Col>
            </Row>
            <Row index="">
              <Col span="12">承运商联系电话：<span v-if="this.datalist.carrierContactsMobile">{{this.datalist.carrierContactsMobile}}</span><span
                  v-else-if="this.datalist.isDelivery == 0">待需方指定</span><span v-else>待供方指定</span></Col>
              <Col span="12">详细地址：<span
                  v-if="this.datalist.receiverFullAddress">{{this.datalist.receiverFullAddress}}</span><span
                  v-else>--</span></Col>
            </Row>


          </div>
        </div>
        <!-- <div v-if="this.datalist.isDelivery === 0 && datalist.isAddDemand == 1" class="whitebg mt20" style="padding:0px 18px 18px;">
          <h3 class="fs16 " style="line-height: 46px; border-bottom: 1px solid #ddd;">提货信息<span style="margin-left: 270px;">提货方式：</span>
          <template v-if="this.datalist.isDelivery == 0">自提
              <template v-if="(datalist.isAddDemand) || 0 == 0">(待发送物流询价)</template>
          </template>
          <template v-else-if="this.datalist.isDelivery == 1">配送</template></h3>
          <div style="line-height:32px;">
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
        </div> -->

        <div class="whitebg mt20" style="padding:0px 18px 18px;">
          <h3 class="fs16 " style="line-height: 46px; border-bottom: 1px solid #ddd;">产品及支付信息</h3>
          <div style="line-height:32px; ">
            <Row index=""
                 style="background: #fafafa;line-height: 42px;text-align: center; border-bottom: 1px solid #eee;font-weight: bold;">
              <Col span="4">产品</Col>
              <Col span="2">数量</Col>
              <Col span="3">商品单价</Col>
              <Col span="2">运费</Col>
              <Col span="2">巨融易</Col>
              <Col span="4">本单单价（元/吨）</Col>
              <Col span="3">保证金金额（元）</Col>
              <Col span="4">本单总金额</Col>
            </Row>
            <Row index="" style="line-height: 32px;text-align: center;border-bottom: 1px solid #eee;">
              <Col span="4">{{this.datalist.skuName}}</Col>
              <Col span="2">{{this.datalist.orderNum}}吨</Col>
              <Col span="3">{{$utils.amountFormat(this.datalist.finalPrice - this.datalist.shippingFee -
                this.datalist.jryAdd)}}
              </Col>
              <Col span="2">+ {{this.datalist.shippingFee}}元/吨</Col>
              <Col span="2">+ {{this.datalist.jryAdd}}元/吨</Col>
              <Col span="4">{{this.datalist.finalPriceFormat}}</Col>
              <Col span="3">{{this.datalist.depositAmountFormat}}</Col>
              <Col span="4">{{this.datalist.totalAmountFormat}}</Col>
            </Row>
          </div>
          <div>

            <div
                style="line-height:30px; text-align:right; font-size:18px; padding-right:50px; font-weight: bold;    margin-top: 15px;">
              订单总额：<span style="color: #ff0000b3;margin-left: 30px;">{{this.datalist.totalAmountFormat}}</span></div>
            <div v-if="this.datalist.status == 2"
                 style="line-height:30px; text-align:right; font-size:18px; padding-right:50px; font-weight: bold;">
              待付金额：<span style="color: #ff0000b3;margin-left: 30px;">{{this.datalist.totalAmountFormat}}</span></div>
            <div v-if="this.datalist.status == 3 || this.datalist.status == 4"
                 style="line-height:30px; text-align:right; font-size:18px; padding-right:50px; font-weight: bold;">
              已支付：<span style="color: #ff0000b3;margin-left: 30px;">{{this.datalist.totalAmountFormat}}</span></div>
            <div style="line-height:32px; text-align:right; font-size:18px; padding-right:50px; background: #f2f2f2;"
                 v-if=" this.datalist.status == 2">巨融易：<span class="red" v-if='this.datalist.isJryService'>{{this.datalist.jryDays}}天</span>
              <span class="red" v-else>--</span>
              <span class="fr mr15 " style="margin-left:120px">
                  最后付款时间：
                  <span class="red">
                  <TimeDown :isshow="Timeloading" formatStr='{D}天{H}小时{M}分{S}秒'
                            :endTime="this.datalist.orderPayLastTime"></TimeDown>
                   </span>
                </span>
            </div>
            <div style="line-height:42px;font-weight: bold; text-align:right; font-size:20px; padding-right:10px;     margin: 40px;">
              <span>{{this.datalist.skuName}}</span> <span class="ml50" style="margin-right: 50px;">{{this.datalist.orderNum}}吨</span>
              <Button type="success" v-if="this.datalist.status == 2"
                      style="border-radius: 5px;padding: 10px 40px;font-size: 18px;align-items: center;  cursor: pointer;"
                      @click="paymentBut()">去支付
              </Button>
              <Button class="submitback ml10" @click='back'>返回</Button>
            </div>
          </div>
        </div>

      </div>
    </div>
    <OrderPay :isShow='payLoading' :order_id='payOrderID' @unChange="unPayOrder"></OrderPay>
    <FreightAdd :isshow="addloading" @unChange="unaddChange" :datalist='addList'></FreightAdd>
    <FreightDetail :isshow="detailloading" @unChange="undetailChange" :datalist='addList'></FreightDetail>
  </div>
</template>

<script>
import Navigation from '../../../../components/navigation'
import {orderpage, getorderDetail} from '../../../../api/order'
import config from '../../../../config/config'
import TimeDown from '../../../../components/timeDown'
import OrderPay from '../../../../components/paydeposit/orderPay'
import {sendHttp} from "../../../../api/common";
import FreightAdd from '../../../../components/freight-add/freight-add'
import FreightDetail from '../../../../components/freight-add/freght-detail'
import server from "../../../../config/api";

export default {
	name: "usertotalorder",
	layout: 'membercenter',
	middleware: 'memberAuth',
	components: {
		FreightAdd,
		FreightDetail,
		usernav: Navigation.user,
		TimeDown,
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
			payLoading: false,
			detailloading: false,
			addloading: false,
			Timeloading: false,
			datalist: [],
			addList: {},
			OrderList: {},
			payOrderID: 0,
			formSearch: {
				orderType: '',
				status: '',
				OrderList: '',
				orderNo: '',
				skuName: '',
				capit: '',
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
		back() {
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
		},
		unaddChange(res) {
			this.addloading = res
		},
		undetailChange(res) {
			this.detailloading = res
		},
		addLog(row) {
			this.addList = {
				id: this.orderid,
				orderNo: this.datalist.orderNo,
				skuName: this.datalist.skuName,
				orderNum: this.datalist.orderNum,
				warehouseName: this.datalist.warehouseName
			}
			this.addloading = true
		},
		detailLog(row) {
			this.addList = {
				id: this.orderid
			}
			this.detailloading = true
		},
		paymentBut() {
			//检查是否可以使用合约的保证金

			this.payOrderID = this.orderid
			this.payLoading = true

		},
		async orderlist() {
			let params = {
				orderId: this.orderid,
			}
			const res = await sendHttp(this, true, server.api.freight.InfoByOrderId, params, 1)

			this.OrderList = res.data


		},
	},


	mounted() {
		this.sourceDeta()
		// this.orderlist();


	},
	watch: {
		'$route'(to, from) {
			this.$router.go(0);
		}
	}
}
</script>
<style scoped>
  .submitback {
    border-radius: 5px;
    padding: 10px 40px;
    font-size: 18px;
    align-items: center;
    cursor: pointer;
    border: 1px solid #ff7300;
    color: #ff7300;
  }
</style>
