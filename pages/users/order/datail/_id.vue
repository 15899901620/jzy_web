<template>
    <div class="clearfix graybg">
        <div class="w1200 dflex " style="margin-bottom: 40px">
            <usernav></usernav>
            <div class="memberInfor ml20 mt20">
                <!--个人信息-->
                <div class="whitebg" style="padding:0px 18px 18px;">
                    <h3 class="fs16 " style="line-height: 46px; border-bottom: 1px solid #ddd;">订单详情 <span v-if="this.datalist.status == 2" style="float:right;color:red; font-size:16px;">最迟付款时间： {{this.datalist.orderPayLastTime}}</span></h3>
                    <div style="line-height:32px;">
                        <Row index="">
                            <Col span="">公司名称：{{this.datalist.companyName}}</Col>
                        </Row>
                        <Row index="">
                            <Col span="12">订单编号：{{this.datalist.orderNo}}</Col>
                            <Col span="12">下单时间：{{this.datalist.createTime}}</Col>
                        </Row>
                        <Row index="">
                            <Col span="12">订单类型：
                                <Tag v-if="this.datalist.orderType  === 1"  color="default">现货订单</Tag>
                                <Tag v-else-if="this.datalist.orderType  === 2"  color="default">预售订单</Tag>
                                <Tag v-else-if="this.datalist.orderType  === 3"  color="default">竞拍订单</Tag>
                                <Tag v-else-if="this.datalist.orderType  === 4"  color="default">专用料订单</Tag>
                                <Tag v-else-if="this.datalist.orderType  === 5"  color="default">出口订单</Tag>
                                <Tag v-else color="default">其他</Tag>
                            </Col>
                            <Col span="12">订单状态：
                                <Tag v-if="this.datalist.status === 0"  color="default">已取消</Tag>
                                <Tag v-else-if="this.datalist.depositAmount > 0 && this.datalist.status == 2"  color="orange">待付尾款</Tag>
                                <Tag v-else-if="this.datalist.depositAmount == 0 && this.datalist.status == 2"  color="orange">待付款</Tag>
                                <Tag v-else-if="this.datalist.status === 3"  color="green">已付款</Tag>
                                <Tag v-else color="default">其他</Tag>
                            </Col>
                        </Row>
                        <Row index="" v-if="this.datalist.depositPayTime">
                            <Col span="12">保证金额：{{this.datalist.depositAmountFormat}}</Col>
                            <Col span="12">支付时间：{{this.datalist.depositPayTime}}</Col>
                        </Row>
                        <Row index="12" v-if="this.datalist.orderPayTime">
                            <Col span="">付款时间：
                                <span>{{this.datalist.orderPayTime}}</span>
                            </Col>
                        </Row>
                        <Row index="">
                            <Col span="12">配送方式：
                                <Tag v-if="this.datalist.isDelivery  === 1"  color="default">配送</Tag>
                                <Tag v-else color="default">自提</Tag>
                            </Col>
                            <Col span="12">包装方式：
                                <Tag v-if="this.datalist.packingModes === 1" color="default">标准包装</Tag>
                                <Tag v-if="this.datalist.packingModes === 2" color="default">非标准包装</Tag>
                            </Col>
                        </Row>
                        <Row index="">
                            <Col span="12">有效提货时间：
                                <span>{{this.datalist.deliveryStart}} 至 {{this.datalist.deliveryDeadline}}</span>
                            </Col>
                        </Row>
                    </div>
                </div>
                 <div v-if="this.datalist.isDelivery === 0" class="whitebg mt20" style="padding:0px 18px 18px;">
                    <h3 class="fs16 " style="line-height: 46px; border-bottom: 1px solid #ddd;">用车需求</h3>
                    <div style="line-height:32px;">
                        <Row index="">
                            <Col span="">仓库名称：{{this.datalist.warehouseName}}</Col>
                        </Row>
                         <Row index="">
                            <Col span="">仓库地址：{{this.datalist.warehouseAddress}}</Col>
                        </Row>
                    </div>
                </div>
                <!--配送信息-->
                <div v-if="this.datalist.isDelivery === 0" class="whitebg mt20" style="padding:0px 18px 18px;">
                    <h3 class="fs16 " style="line-height: 46px; border-bottom: 1px solid #ddd;">自提信息</h3>
                    <div style="line-height:32px;">
                        <Row index="">
                            <Col span="">仓库名称：{{this.datalist.warehouseName}}</Col>
                        </Row>
                         <Row index="">
                            <Col span="">仓库地址：{{this.datalist.warehouseAddress}}</Col>
                        </Row>
                    </div>
                </div>
                <div v-if="this.datalist.isDelivery === 1" class="whitebg mt20" style="padding:0px 18px 18px;">
                    <h3 class="fs16 " style="line-height: 46px; border-bottom: 1px solid #ddd;">配送信息</h3>
                    <div style="line-height:32px;">
                        <Row index="">
                            <Col span="">联系人：{{this.datalist.memberContacter}}</Col>
                        </Row>
                        <Row index="">
                            <Col span="">联系电话：{{this.datalist.memberPhone}}</Col>
                        </Row>
                        <Row index="">
                            <Col span="">收货人姓名：{{this.datalist.receiverName}}</Col>
                        </Row>
                        <Row index="">
                            <Col span="">收货人电话：{{this.datalist.receiverPhone}}</Col>
                        </Row>
                        <Row index="">
                            <Col span="">收货人身份证：{{this.datalist.receiverIdNumber}}</Col>
                        </Row>
                        <Row index="">
                            <Col span="">收货地址：{{this.datalist.receiverFullAddress}}</Col>
                        </Row>
                        <Row index="">
                            <Col span="">运输方式：{{this.datalist.transportationMode}}</Col>
                        </Row>
                        <Row index="">
                            <Col span="">承运商：<span v-if="this.datalist.carrierName">{{this.datalist.carrierName}}</span><span v-else>待供方指定</span></Col>
                        </Row>
                    </div>
                </div>

                <div class="whitebg mt20" style="padding:0px 18px 18px;">
                    <h3 class="fs16 " style="line-height: 46px; border-bottom: 1px solid #ddd;">商品信息</h3>
                    <div style="line-height:32px; ">
                        <Row index="" style="background: #fafafa;line-height: 42px;text-align: center; border-bottom: 1px solid #eee;">
                            <Col span="4">货物信息</Col>
                            <Col span="3">发货仓</Col>
                            <Col span="2">商品单价</Col>
                            <Col span="2">运费</Col>
                            <Col span="2">巨融易</Col>
                            <Col span="4">合计单价（元/吨）</Col>
                            <Col span="3">数量</Col>
                            <Col span="4">小计</Col>
                        </Row>
                        <Row index="" style="line-height: 32px;text-align: center;border-bottom: 1px solid #eee;">
                            <Col span="4">{{this.datalist.skuName}}</Col>
                            <Col span="3">{{this.datalist.warehouseName}}</Col>
                            <Col span="2">{{this.amountFormat(this.datalist.finalPrice - this.datalist.shippingFee - this.datalist.jryAdd)}}</Col>
                            <Col span="2">+ {{this.datalist.shippingFee}}</Col>
                            <Col span="2">+ {{this.datalist.jryAdd}}</Col>
                            <Col span="4">{{this.datalist.finalPriceFormat}}</Col>
                            <Col span="3">{{this.datalist.orderNum}}</Col>
                            <Col span="4">{{this.datalist.totalAmountFormat}}</Col>
                        </Row>
                    </div>
                    <div>
                        <p style="line-height:32px; text-align:right; font-size:15px; padding-right:10px;" v-if="this.datalist.isJryService">巨融易：{{this.datalist.jryDays}}天</p>
                        <p style="line-height:42px; text-align:right; font-size:16px; padding-right:10px;">订单总额：{{this.datalist.totalAmountFormat}}</p>
                        <p v-if="this.datalist.status == 2" style="line-height:42px;color:red; text-align:right; font-size:17px; padding-right:10px;">待付金额：{{this.amountFormat(this.datalist.totalAmount - this.datalist.depositAmount)}}</p>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import Navigation from '../../../../components/navigation'
import { orderpage, getorderDetail } from '../../../../api/order'
import { getCookies } from '../../../../config/storage'
import config from '../../../../config/config'
import utils from '../../../../plugins/common'


export default {
    name: "usertotalorder",
    layout:'membercenter',
    components:{
        usernav: Navigation.user,
    },
    fetch({ store }) {
        return Promise.all([
            store.dispatch('system/getSystemCnf'),
            store.dispatch('menu/getMenuList')
        ])
    },
    data() {
        return {
            payloading: false,
            datalist: {},
            formSearch: {
                orderType: '',
                status: '',
                OrderList:'',
                orderNo: '',
                skuName: ''
            },
            orderid:  !this.$route.params.id ? 0 : this.$route.params.id,
            userinfo: {}
        }
    },
    methods:{
        inLogin () {
            let userinfo = !getCookies('userinfor') ? '' : getCookies('userinfor')
            if (!userinfo) {
                this.$router.push('/login')
            }
            this.userinfo = userinfo
        },
        //订单类型
        getOrderType(typeId) {
            if(!typeId) return
            return config.orderType[typeId]
        },
        //订单状态
        getOrderState(typeId) {
            if(!typeId) return
            return config.orderState[typeId]
        },
        async dataList(){
            let params = {
                orderId:this.datalist.id,
            }
            const res = await sendHttp(this, true, server.api.freight.InfoByOrderId,params,1)
           
            this.OrderList=  res.data

        },
        async sourceDeta() {
            let params = {
                id: this.orderid
            }
            let res = await getorderDetail(this, params)
            this.datalist = res.data
        },
        amountFormat: function(amount, sign){
            return utils.amountFormat(amount, sign)
        },
    },
    created(){
        this.dataList();
        this.inLogin()
        this.sourceDeta()
    },
    watch: {
        '$route' (to, from) {
            this.$router.go(0);
        }
    }
}
</script>