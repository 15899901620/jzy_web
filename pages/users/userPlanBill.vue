<template>

    <div class="clearfix graybg">
    <div class="w1200 dflex " style="margin-bottom: 40px">
        <usernav></usernav>
        <div class="memberInfor ml20  whitebg bdccc  mt20">
            <!--个人信息-->
            <h1 class="fs16 ml25" style="margin-top:15px">计划单据</h1>
            <div class="TableList">
            <div class="order_operate">
                <div class="dflex">
                    <input type="text" v-model="formSearch.orderNo" placeholder="输入订单号" name="" value="" class="orderInput"
                           style="width:140px;"/>
                    <input type="text" v-model="formSearch.skuName" placeholder="输入产品名称" name="" value="" class="orderInput"
                           style="width:140px; margin-left:5px;"/>
                    <div class="check" @click="onSearch" style="cursor: pointer;">查询</div>
                </div>
                <!-- <div class="dflexAlem">
                <span style="width: 90px;">起始日期</span><input type="text" class="layui-input" id="test6" placeholder="选择订单时间">
                </div> -->
            </div>
                <div class="TableTitle graybg">
                    <span style="width: 15%;">日期</span>
                    <span style="width: 15%;">产品</span>
                    <span style="width: 15%;">提货仓库</span>
                    <span style="width: 15%;">数量</span>
                    <span style="width: 15%;">单价</span>
                    <span style="width: 15%;">待转单数量</span>
                    <span style="width: 15%;">尾款支付状态</span>
                    <span style="width: 15%;">合同状态</span>
                    <span style="width: 15%;">转单操作</span>
                </div>


<!--                <table v-for="(item, index) in $store.state.member.orderList" :key="index" class="listT mt10" border="" cellspacing=""-->
<!--                       cellpadding="">-->
<!--                    <tbody>-->
<!--                    <tr class="Ttitle graybg">-->
<!--                        <td colspan="7">-->
<!--                  <span class="ml10">合约编号：<Tag color="success">{{getOrderType(item.orderType)}}</Tag>-->
<!--                    <a :href="`/users/order/datail/${item.id}`" class="mt5 blackFont"><span class="blue">{{item.orderNo}}</span></a>-->
<!--                  </span>-->
<!--                            <span class="ml15">下单时间：<span class="gray">{{item.createTime}}</span></span>-->
<!--                            <span class="fr mr15" v-show="item.status == 2"><span class="red">转单倒计时：</span> <span class="red">{{item.orderPayLastTime}}</span></span>-->
<!--                        </td>-->
<!--                    </tr>-->
<!--                    <tr class="detailTable">-->
<!--                        <td>{{item.skuName}}</td>-->
<!--                        <td><span class="orangeFont">{{item.finalPriceFormat}}</span> <span style="color:#999">/吨</span></td>-->
<!--                        <td>{{item.orderNum}}</td>-->
<!--                        <td>{{item.warehouseName}}</td>-->
<!--                        <td>-->
<!--                            {{item.totalAmountFormat}}-->
<!--                            <template v-if="item.depositId > 0"><br><span-->
<!--                                    style="color:#ff9800;border:1px solid #ff9800;border-radius:3px;padding:2px 3px;font-size: 8px;">已付{{item.depositAmountFormat}}</span>-->
<!--                            </template>-->
<!--                        </td>-->
<!--                        <td>-->
<!--                            <span v-if="item.status == 3 || item.status == 4 " class="greenFont">{{getOrderState(item.status)}}</span>-->
<!--                            <span v-else-if="item.status == 0" class="gray">{{getOrderState(item.status)}}</span>-->
<!--                            <span v-else class="orangeFont">{{getOrderState(item.status)}}</span>-->
<!--                        </td>-->
<!--                        <td class="operate">-->
<!--                            <div class="" v-if="item.status == 2">-->
<!--                                <a class="Paybtn mt15" @click="paymentBut(item)">去付款</a>-->
<!--                            </div>-->
<!--                            <div class="" v-if="item.status == 4   && item.isAddDemand == 0 && item.isDelivery == 0">-->
<!--                                <a class="greenFont mt15" @click="addLog(item)">我要找车</a>-->
<!--                            </div>-->
<!--                            <div class="" v-if="item.isAddDemand == 1 && item.isDelivery == 0">-->
<!--                                <a class="greenFont mt15" @click="detailLog(item)">查看需求详情</a>-->
<!--                            </div>-->
<!--                            <a :href="`/users/order/datail/${item.id}`" class="mt5 blackFont">查看详情</a>-->
<!--                        </td>-->
<!--                    </tr>-->
<!--                    </tbody>-->
<!--                </table>-->

                <table   class="listT mt10" border="" cellspacing=""
                       cellpadding="">
                    <tbody>
                    <tr class="Ttitle graybg">
                        <td colspan="7">
                  <span class="ml10">合约编号：<Tag color="success">000000000000000</Tag>
<!--                    <a :href="" class="mt5 blackFont"><span class="blue">2002222</span></a>-->
                  </span>
                            <span class="ml15">合约类型：<span class="gray">12:00</span></span>
                            <span class="fr mr15"  ><span class="red">转单倒计时：</span> <span class="red">12:00</span></span>
                        </td>
                    </tr>
                    <tr class="detailTable">
                        <td>在地上一</td>
                        <td><span class="orangeFont">厂商</span> <span style="color:#999">/吨</span></td>
                        <td>185236</td>
                        <td>名字名字</td>
                    <td>
                            1561651651
<!--                            <template v-if="item.depositId > 0"><br><span-->
<!--                                    style="color:#ff9800;border:1px solid #ff9800;border-radius:3px;padding:2px 3px;font-size: 8px;">已付{{item.depositAmountFormat}}</span>-->
<!--                            </template>-->
                        </td>
                        <td>
                            <span   class="greenFont">状态</span>
                            <span   class="gray">基有</span>
                            <span  class="orangeFont">在有</span>
                        </td>
                        <td class="operate">
                            <div class=""  >
                                <a class="Paybtn mt15"  >去付款</a>
                            </div>
                            <div class=""  >
                                <a class="greenFont mt15" @click="addLog(item)">我要找车</a>
                            </div>
                            <div class=""  >
                                <a class="greenFont mt15" @click="detailLog(item)">查看需求详情</a>
                            </div>
<!--                            <a :href=" " class="mt5 blackFont">查看详情</a>-->
                        </td>
                    </tr>
                    </tbody>
                </table>


                <!--页码-->
                <Page style="margin:20px auto; float:right;" :total="$store.state.member.orderListTotal" :current="current_page" @on-change="changePage"
                      :page-size="page_size" @on-page-size-change="changePageSize"></Page>

            </div>
        </div>
    </div>
    </div>
</template>

<script>
    import Navigation from '../../components/navigation'
    import {orderpage, orderCount} from '../../api/order'
    import pagination from '../../components/pagination'
    import config from '../../config/config'
    import paydeposit from '../../components/paydeposit'
    import FreightAdd from '../../components/freight-add/freight-add'
    import FreightDetail from '../../components/freight-add/freght-detail'
    export default {
        name: "userPlanBill",
        middleware: 'memberAuth',
        layout: 'membercenter',
        components: {
            FreightAdd,
            FreightDetail,
            usernav: Navigation.user,
            payorder: paydeposit.order
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
            return{
                formSearch: {
                    orderType: '',
                    status: '',
                    orderNo: '',
                    skuName: ''
                },
            };
        }

    }
</script>

<style scoped>

</style>
