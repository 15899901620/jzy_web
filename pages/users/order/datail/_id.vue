<template>
    <div class="clearfix graybg">
        <div class="w1200 dflex " style="margin-bottom: 40px">
            <usernav></usernav>
            <div class="memberInfor ml20 mt20">
                <!--个人信息-->
                <div class="whitebg" style="padding:0px 18px 18px;">
                    <h3 class="fs16 " style="line-height: 46px; border-bottom: 1px solid #ddd;">订单详情 <span v-if="this.datalist.status == 2" style="float:right;color:#999; font-size:12px;">最迟付款时间： {{this.datalist.orderPayLastTime}}</span></h3>
                    <div style="line-height:32px;">
                        <Row index="">
                            <Col span="">公司名称：{{this.datalist.companyName}}</Col>
                        </Row>
                        <Row index="">
                            <Col span="">订单日期：{{this.datalist.createTime}}</Col>
                        </Row>
                        <Row index="">
                            <Col span="">订单编号：{{this.datalist.orderNo}}</Col>
                        </Row>
                        <Row index="">
                            <Col span="">订单状态：
                                <Tag v-if="this.datalist.status  === 0"  color="default">已取消</Tag>
                                <Tag v-else-if="this.datalist.status  === 2"  color="orange">待付款</Tag>
                                <Tag v-else-if="this.datalist.status  === 3"  color="green">已付款</Tag>
                                <Tag v-else color="default">其他</Tag>
                            </Col>
                        </Row>
                        <Row index="">
                            <Col span="">订单类型：
                                <Tag v-if="this.datalist.orderType  === 1"  color="default">现货订单</Tag>
                                <Tag v-else-if="this.datalist.orderType  === 2"  color="default">预售订单</Tag>
                                <Tag v-else-if="this.datalist.orderType  === 3"  color="default">竞拍订单</Tag>
                                <Tag v-else-if="this.datalist.orderType  === 4"  color="default">专用料订单</Tag>
                                <Tag v-else-if="this.datalist.orderType  === 5"  color="default">出口订单</Tag>
                                <Tag v-else color="default">其他</Tag>
                            </Col>
                        </Row>
                        <Row index="">
                            <Col span="">配送方式：
                                <Tag v-if="this.datalist.isDelivery  === 1"  color="default">配送</Tag>
                                <Tag v-else color="default">自提</Tag>
                            </Col>
                        </Row>
                        <Row index="" v-if="this.datalist.orderPayTime">
                            <Col span="">付款时间：
                                <span>{{this.datalist.orderPayTime}}</span>
                            </Col>
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
                            <Col span="">联系人：{{this.datalist.receiverName}}</Col>
                        </Row>
                        <Row index="">
                            <Col span="">联系电话：{{this.datalist.receiverPhone}}</Col>
                        </Row>
                        <Row index="">
                            <Col span="">配送地址：{{this.datalist.receiverFullAddress}}</Col>
                        </Row>
                        <Row index="">
                            <Col span="">运输方式：{{this.datalist.transportationMode}}</Col>
                        </Row>
                    </div>
                </div>

                <div class="whitebg mt20" style="padding:0px 18px 18px;">
                    <h3 class="fs16 " style="line-height: 46px; border-bottom: 1px solid #ddd;">商品信息</h3>
                    <div style="line-height:32px; ">
                        <Row index="" style="background: #fafafa;line-height: 42px;text-align: center; border-bottom: 1px solid #eee;">
                            <Col span="5">编号</Col>
                            <Col span="5">货物信息</Col>
                            <Col span="5">单价（元/吨）</Col>
                            <Col span="4">数量</Col> 
                            <Col span="5">小计</Col>
                        </Row>
                        <Row index="" style="line-height: 32px;text-align: center;border-bottom: 1px solid #eee;">
                            <Col span="5">{{this.datalist.skuNo}}</Col>
                            <Col span="5">{{this.datalist.skuName}}</Col>
                            <Col span="5">{{this.datalist.finalPriceFormat}}</Col>
                            <Col span="4">{{this.datalist.orderNum}}</Col> 
                            <Col span="5">{{this.datalist.totalAmountFormat}}</Col>
                        </Row>
                    </div>
                    <div>
                        <p style="line-height:52px; text-align:right; font-size:14px; padding-right:10px;">订单总额：{{this.datalist.totalAmountFormat}}</p>
                        <p style="line-height:32px; text-align:right; font-size:14px; padding-right:10px;" v-if="this.datalist.isJryService">巨融易：{{this.datalist.jryDays}}天</p>
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
        async sourceDeta() {
            let params = {
                id: this.orderid
            }
            let res = await getorderDetail(this, params)
            this.datalist = res.data
            console.log('res', res)
        }
    },
    created(){
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