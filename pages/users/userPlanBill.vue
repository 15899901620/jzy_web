<template>

    <div class="clearfix graybg">
    <div class="w1200 dflex " style="margin-bottom: 40px">
        <usernav></usernav>
        <div class="memberInfor ml20  whitebg bdccc  mt20">
            <!--个人信息-->
            <h1 class="fs16 ml25" style="margin-top:15px">待办事项</h1>
            <div class="bb1 pb10" style="width: 95%; margin: 0 auto;">
            <div class="order_operate">
                <h1 class="fs16 ml25" style="margin-top:15px">现货合约</h1>
            <!-- <div class="dflex" style="align-items: center;">
              <span style="width: 90px;">起始日期</span><input type="text" class="layui-input" id="test6" placeholder="选择订单时间">
            </div> -->
          </div>
          <div class="TableTitle graybg">
            <span style="width: 15%;">商品信息</span>
            <span style="width: 15%;">提货仓库</span>
            <span style="width: 10%;">数量</span>
            <span style="width: 10%;">单价</span>
            <span style="width: 10%;">待转单数</span>
            <span style="width: 10%;">尾款支付状态</span>
            <span style="width: 15%;">合同状态</span>
            <span style="width: 15%;">操作</span>
          </div>
          <template v-if="$store.state.spot.spotPlanList.length > 0">
            <table v-for="(item, index) in $store.state.spot.spotPlanList" :key="index" class="listT mt10" border=""
                   cellspacing="" cellpadding="">
              <tbody>
              <tr class="Ttitle graybg">
                <td colspan="8">
                  <span class="ml10">合约编号：
                    <a :href="`/users/plan/spot/${item.id}`" class="mt5 blackFont"><span
                        class="blue">{{item.plan_no}}</span></a>
                    <template v-if="item.status == 1">(待转单)</template>
                    <template v-else-if="item.status == 2">(已转单)</template>
                    <template v-else-if="item.status == 3">(已违约)</template>
                  </span>
                  <span class="ml15">下单时间：<span class="gray">{{item.create_time}}</span></span>
                  <span class="fr mr15"
                        v-if="item.available_num > 0 && item.status == 1">
                    <span class="red">转单倒计时：</span>
                    <span class="red"><TimeDown :endTime="item.last_ordered_date" hoursShow endMsg="已失效"
                                                :onTimeOver="reloadPage"></TimeDown></span>
                  </span>
                </td>
              </tr>
              <tr class="detailTable">
                <td style="width: 15%;">{{item.sku_name}}</td>
                <td style="width: 15%;">{{item.warehouse_name}}</td>
                <td style="width: 10%;">
                  {{item.total_num}}吨
                  <template v-if="item.cancel_num > 0"><br>
                    <Tag color="error">取消{{item.cancel_num}}吨</Tag>
                  </template>
                </td>
                <td style="width: 10%;">{{$utils.amountFormat(item.final_price)}}</td>
                <td style="width: 10%;">{{item.available_num}}</td>
                <td style="width: 10%;">
                  <span class="gray" v-if="item.cancel_num > 0">已取消</span>
                  <span class="gray" v-else-if="item.taken_num === 0">待支付</span>
                  <span class="gray" v-else-if="item.taken_num > 0 && item.taken_num < item.total_num">部分支付</span>
                  <span class="gray" v-else-if="item.taken_num == item.total_num">已支付</span>
                </td>
                <td style="width: 15%;">
                  <div>待签合同</div>
                  <div><a @click='Spot(item.id)' class="greenFont">查看合同模板</a></div>
                </td>
                <td style="width: 15%;" class="operate">
                  <div v-if="item.status == 3">
                    <a class="Paybtn CarCurr" style="margin-top: 5px; padding: 3px 6px;background-color:#ed4014">已违约</a>
                  </div>
                  <div v-else-if="item.available_num > 0">
                    <template v-if="item.close_apply_status == 1">
                      <a class="Paybtn CarCurr" style="padding: 3px 6px" @click="toCreateOrder(item.id)">转单</a>
                      <a class="Paybtn CarCurr" style="margin-top: 5px; padding: 3px 6px"
                         @click="cancelPlan(item)">申请取消</a>
                    </template>
                    <template v-else-if="item.close_apply_status == 2">
                      <a class="Paybtn CarCurr" style="margin-top: 5px; padding: 3px 6px">取消审核中</a>
                    </template>
                    <template v-else-if="item.close_apply_status == 3">
                      <a class="Paybtn CarCurr" style="margin-top: 5px; padding: 3px 6px">取消同意</a>
                    </template>
                    <template v-else-if="item.close_apply_status == 4">
                      <a class="Paybtn CarCurr" style="padding: 3px 6px" @click="toCreateOrder(item.id)">转单</a>
                      <a class="Paybtn CarCurr" style="margin-top: 5px; padding: 3px 6px">取消拒绝</a>
                    </template>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </template>
          <template v-else>
            <p style="font-size:14px; text-align:center; width:100%;">暂无任何信息！</p>
          </template>
          <!-- <pages :total="$store.state.spot.total" :page-size="page_size" :show-total="showTotal" :value="current_page"
                 style="margin:20px 0;"></pages> -->
        </div>
        <div  style="width: 95%; margin: 0 auto;" class="bb1 pb10">
          <div class="order_operate">
                 <h1 class="fs16 ml25" style="margin-top:15px">竞拍合约</h1>
            <!-- <div class="dflex" style="align-items: center;">
              <span style="width: 90px;">起始日期</span><input type="text" class="layui-input" id="test6" placeholder="选择订单时间">
            </div> -->
          </div>
          <div class="TableTitle graybg">
            <span style="width: 15%;">商品信息</span>
            <span style="width: 15%;">提货仓库</span>
            <span style="width: 10%;">数量</span>
            <span style="width: 10%;">单价</span>
            <span style="width: 10%;">待转单数</span>
            <span style="width: 10%;">尾款支付状态</span>
            <span style="width: 15%;">合同状态</span>
            <span style="width: 15%;">操作</span>
          </div>
          <template v-if="$store.state.bidders.planList.length > 0">
            <table v-for="(item, index) in $store.state.bidders.planList" :key="index" class="listT mt10" border="" cellspacing="" cellpadding="">
              <tbody>
                <tr class="Ttitle graybg" >
                  <td colspan="8">
                    <span class="ml10">合约编号：
                      <a :href="`/users/plan/auction/${item.id}`" class="mt5 blackFont"><span class="blue">{{item.planNo}}</span></a>
                      <template v-if="item.status == 1">(待转单)</template>
                      <template v-else-if="item.status == 2">(已转单)</template>
                      <template v-else-if="item.status == 3">(已违约)</template>
                    </span>
                    <span class="ml15">下单时间：<span class="gray">{{item.createTime}}</span></span>
                    <span class="fr mr15" v-if="item.status != 3 && item.availableNum > 0 && (item.closeApplyStatus == 1 || item.closeApplyStatus == 4)">
                      <span class="red">转单倒计时：</span>
                      <span class="red"><TimeDown :endTime="item.lastOrderedDate" hoursShow endMsg="已失效" :onTimeOver="$utils.reload"></TimeDown></span>
                  </span>
                  </td>
                </tr>
                <tr class="detailTable">
                  <td style="width: 15%;">{{item.skuName}}</td>
                  <td style="width: 15%;">{{item.warehouseName}}</td>
                  <td style="width: 10%;">
                    {{item.totalNum}}吨
                    <template v-if="item.cancelNum > 0"><br>
                      <Tag color="error">取消{{item.cancelNum}}吨</Tag>
                    </template>
                  </td>
                  <td style="width: 10%;">{{$utils.amountFormat(item.bidPrice)}}</td>
                  <td style="width: 10%;">{{item.availableNum}}</td>
                  <td style="width: 10%;">
                    <span class="gray" v-if="item.cancelNum > 0">已取消</span>
                    <span class="gray" v-else-if="item.takenNum === 0">待支付</span>
                    <span class="gray" v-else-if="item.takenNum > 0 && item.takenNum < item.totalNum">部分支付</span>
                    <span class="gray" v-else-if="item.takenNum == item.totalNum">已支付</span>
                  </td>
                  <td style="width: 15%;">
                     <div>待签合同</div>
                    <div><a @click='Spot(item.id)' class="greenFont">查看合同模板</a></div>
                  </td>
                  
                  <td style="width: 15%;" class="operate">
                    <div v-if="item.status == 3">
                      <a class="Paybtn CarCurr" style="margin-top: 5px; padding: 3px 6px">已违约</a>
                    </div>
                    <div v-else-if="item.availableNum > 0">
                      <template v-if="item.closeApplyStatus == 1">
                        <a class="Paybtn CarCurr" style="padding: 3px 6px" @click="toCreateOrder(item.id)">转单</a>
                      </template>
                      <template v-else-if="item.closeApplyStatus == 2">
                        <a class="Paybtn CarCurr" style="margin-top: 5px; padding: 3px 6px">取消审核中</a>
                      </template>
                      <template v-else-if="item.closeApplyStatus == 3">
                        <a class="Paybtn CarCurr" style="margin-top: 5px; padding: 3px 6px">取消同意</a>
                      </template>
                      <template v-else-if="item.closeApplyStatus == 4">
                        <a class="Paybtn CarCurr" style="padding: 3px 6px" @click="toCreateOrder(item.id)">转单</a>
                        <a class="Paybtn CarCurr" style="margin-top: 5px; padding: 3px 6px">取消拒绝</a>
                      </template>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </template>
          <template v-else>
            <p style="font-size:14px; text-align:center; width:100%;">暂无任何信息！</p>
          </template>
          <!-- <pages :total="$store.state.bidders.planTotal" :page-size="page_size" :show-total="showTotal" :value="current_page" style="margin-top:20px;"></pages> -->
        </div>
        <div style="width: 95%; margin: 0 auto;" >
             <div class="order_operate">
                 <h1 class="fs16 ml25" style="margin-top:15px">待付订单</h1>
            <!-- <div class="dflex" style="align-items: center;">
              <span style="width: 90px;">起始日期</span><input type="text" class="layui-input" id="test6" placeholder="选择订单时间">
            </div> -->
          </div>
             <div class="TableTitle graybg">
            <!-- <span style="width: 10%;">单据类型</span> -->
            <span style="width: 10%;">商品信息</span>
            <span style="width: 10%;">单价(元/吨)</span>
            <span style="width: 10%;">数量(吨)</span>
            <span style="width: 10%;">库区</span>
            <span style="width: 10%;">提货方式</span>
            <span style="width: 14%;">订单总金额</span>
            <span style="width: 14%;">付款状态</span>
            <span style="width: 12%;">订单操作</span>
            <span style="width: 12%;">提货状态</span>
          </div>
          <template v-if="$store.state.member.orderList.length > 0">
            <table v-for="(item, index) in $store.state.member.orderList" :key="index" class="listT mt10" border="" cellspacing=""
                   cellpadding="">
              <tbody>
              <tr class="Ttitle graybg">
                <td colspan="10">
				  <span class="ml10">合约编号:
						<span  v-if="item.orderType==1"><a :href="`/users/plan/spot/${item.sourceId}`" class="mt5 blackFont blue">{{item.sourceSn}}</a></span>
              			<span  v-if="item.orderType==3"><a :href="`/users/plan/aution/${item.sourceId}`" class="mt5 blackFont blue">{{item.sourceSn}}</a></span>
                    <!-- <a  class="mt5"><span class="blue">{{item.sourceSn}}</span></a> -->
                  </span>
                  <span class="ml10">订单编号：<Tag color="success">{{getOrderType(item.orderType)}}</Tag>
                    <a :href="`/users/order/datail/${item.id}`" class="mt5 blackFont"><span class="blue">{{item.orderNo}}</span></a>
                  </span>
                  <span class="ml15">下单时间：<span class="gray">{{item.createTime}}</span></span>
                  <span class="fr mr15" v-if="item.status == 2"><span class="red">最迟付款时间：</span> <span class="red">{{item.orderPayLastTime}}</span></span>
                </td>
              </tr>
              <tr class="detailTable">
				<!-- <td>{{detailOrderType(item.orderType)}}</td> -->
                <td>{{item.skuName}}</td>
                <td><span class="orangeFont">{{item.finalPriceFormat}}</span></td>
                <td>{{item.orderNum}}</td>
                <td>{{item.warehouseName}}</td>
				<td>
					<span v-if="item.isDelivery == 0">
						自提
					</span>
					<span v-if="item.isDelivery == 1">
						配送
					</span>
				</td>
                <td style="width: 14%;">
                  {{item.totalAmountFormat}}
                  <template v-if="item.status == 3 || item.status == 4 "><br><span
                      style="color:#ff9800;border:1px solid #ff9800;border-radius:3px;padding:2px 3px;font-size: 8px;">已付{{$utils.amountFormat(item.totalAmount)}}</span>
                  </template>
                </td>
                <td style="width: 14%;">
                  <span v-if="item.status == 3 || item.status == 4 " class="greenFont">{{getOrderState(item.status)}}</span>
                  <span v-else-if="item.status == 0" class="gray">{{getOrderState(item.status)}}</span>
                  <span v-else class="orangeFont">{{getOrderState(item.status)}}</span>
				  <template v-if="item.status == 2"><br><span
                      style="color:#ff9800;border:1px solid #ff9800;border-radius:3px;padding:2px 3px;font-size: 8px;">待付{{$utils.amountFormat(item.totalAmount)}}</span>
                  </template>
                </td>
                <td class="operate" style="width: 11%;">
                  <div class="" v-if="item.status == 2">
                    <a class="Paybtn mt15" @click="paymentBut(item)">支付尾款</a>
                    <a class="blackFont mt15" @click="closeBut(item)">重开订单</a>
                  </div>
					<div class="" v-if="item.status == 4   && item.isAddDemand == 0 && item.isDelivery == 0">
                    <a class="greenFont mt15" @click="addLog(item)">我要找车</a>
                  </div>
                  <div class="" v-if="item.isAddDemand == 1 && item.isDelivery == 0">
                    <a class="greenFont mt15" @click="detailLog(item)">查看用车详情</a>
                  </div>
                  <a :href="`/users/order/datail/${item.id}`" class="mt5 blackFont">订单详情</a>
                </td>
				<td>
					
				</td>
              </tr>
              </tbody>
            </table>
            <!--页码-->
            <!-- <Page style="margin:20px auto; float:right;" :total="$store.state.member.orderListTotal" :current="current_page" @on-change="changePage"
                  :page-size="page_size" @on-page-size-change="changePageSize"></Page> -->
          </template>
          <template v-else>
            <p style="font-size:14px; text-align:center; width:100%;">暂无任何信息！</p>
          </template>
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
    import TimeDown from '../../components/timeDown'
    import server from '../../config/api'
	import {sendHttp} from "../../api/common";
    export default {
        name: "userPlanBill",
        middleware: 'memberAuth',
        layout: 'membercenter',
        components: {
            TimeDown,
            pages: pagination.pages,
            usernav: Navigation.user,
            payorder: paydeposit.order
        },
        fetch({store,query}) {
            return Promise.all([
                //获取顶部、中部、底部导航信息
                store.dispatch('common/getNavList'),
                //获取系统配置
                store.dispatch('common/getSysConfig'),
                store.dispatch('spot/getSpotPlanList', {
					          current_page: query.page || 1,
                    page_size: 5,
                    status:1,
				          	plan_no: query.plan_no ? query.plan_no : ''
                }),
                store.dispatch('bidders/getPlanList', {current_page:query.page||1, status:1,page_size: 5,planNo:query.plan_no ? query.plan_no: ''})
            ])
        },
        data() {
            return{
                current_page: 1,
                page_size: 5,
                total: 0,
                formSearch: {
                    orderType: '',
                    status: '',
                    orderNo: '',
                    skuName: ''
                },
            };
        },
      methods: {
        async getSourceData() {
            let params = {
              current_page: this.current_page,
                        page_size: this.page_size,
                        status:2,
            }
            this.$store.dispatch('member/getOrderList', params)
            this.$store.dispatch('member/getOrderCount')
          },
      toCreateOrder(id) {
				location.href = '/spot/change/' + id
			},
      reloadPage() {
				location.reload(true)
      },
            	//订单类型
			getOrderType(typeId) {
				if (!typeId) return
				return config.orderType[typeId].substring(0, 1)
      },
      Spot(id){
				location.href = '/users/spotContract?id=' + id
      },
			//订单类型
			detailOrderType(typeId) {
				if (!typeId) return
				return config.orderType[typeId]
			},
			//订单状态
			getOrderState(typeId) {
				return config.orderState[typeId]
			},
            showTotal(total) {
				return `全部 ${total} 条`;
			},
        },
        mounted() {
            this.getSourceData()
        }

    }
</script>

<style scoped>

</style>
