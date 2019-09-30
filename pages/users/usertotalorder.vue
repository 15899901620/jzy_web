<template>
  <div class="clearfix graybg">
    <div class="w1200 dflex " style="margin-bottom: 40px">
      <usernav></usernav>
      <div class="memberInfor ml20  whitebg bdccc  mt20">
        <!--个人信息-->
        <h1 class="fs16 ml25" style="margin-top:15px">全部订单</h1>
        <div class="TableList">
          <div class="titleOrder mt15">
            <ul class="dflex">
              <li :class=" 0 === currTabs ? 'curr' : ''" :key="0" @click="setTabs(1)">全部订单({{$store.state.member.orderCount.total_cn}})</li>
              <li :class=" 1 === currTabs ? 'curr' : ''" :key="1" @click="setTabs(2)">待付款({{$store.state.member.orderCount.unpay_cn}})</li>
              <li :class=" 2 === currTabs ? 'curr' : ''" :key="2" @click="setTabs(3)">已付款({{$store.state.member.orderCount.payed_cn}})</li>
              <li :class=" 3 === currTabs ? 'curr' : ''" :key="3" @click="setTabs(0)">已取消({{$store.state.member.orderCount.cancel_cn}})</li>
            </ul>
          </div>
          <div class="order_operate">
            <div class="dflex">
			<Select v-model="formSearch.orderType" style="width:150px" placeholder="单据类型">
				<Option v-for="item in registType" :value="item.value" :key="item.value" >{{ item.label }}</Option>
			</Select>
			  <DatePicker  type="date"     format="yyyy-MM-dd"  placeholder="输入开始日期"  @on-change="formSearch.start_time = $event"></DatePicker>
			   <DatePicker  type="date"     format="yyyy-MM-dd" placeholder="输入结束日期"   @on-change="formSearch.end_time = $event"></DatePicker>
			    <Select v-model="formSearch.status" style="width:150px" placeholder="付款状态">
                  <Option v-for="item in paystatus" :value="item.value" :key="item.value" >{{ item.label }}</Option>
                </Select>
				<Select  style="width:150px" placeholder="提货状态">
                  <Option v-for="item in pickstatus" :value="item.value" :key="item.value" >{{ item.label }}</Option>
                </Select>
              <input type="text" v-model="formSearch.skuName" placeholder="输入产品名称" name="" value="" class="orderInput"
                     style="width:140px; margin-left:5px;"/>
              <div class="check" @click="onSearch" style="cursor: pointer;">查询</div>
            </div>
            <!-- <div class="dflexAlem">
            <span style="width: 90px;">起始日期</span><input type="text" class="layui-input" id="test6" placeholder="选择订单时间">
            </div> -->
          </div>
          <div class="TableTitle graybg">
            <!-- <span style="width: 10%;">单据类型</span> -->
            <span style="width: 12%;">商品信息</span>
            <span style="width: 12%;">单价(元)</span>
            <span style="width: 12%;">数量(吨)</span>
            <span style="width: 12%;">库区</span>
            <span style="width: 12%;">提货方式</span>
            <span style="width: 12%;">订单总金额</span>
			<span style="width: 12%;">订单状态</span>
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
                    <a  class="mt5"><span class="blue">{{item.sourceSn}}</span></a>
                  </span>
                  <span class="ml10">订单编号：<Tag color="success">{{getOrderType(item.orderType)}}</Tag>
                    <a :href="`/users/order/datail/${item.id}`" class="mt5 blackFont"><span class="blue">{{item.orderNo}}</span></a>
                  </span>
                  <span class="ml15">下单时间：<span class="gray">{{item.createTime}}</span></span>
                  <span class="fr mr15" v-show="item.status == 2"><span class="red">最迟付款时间：</span> <span class="red">{{item.orderPayLastTime}}</span></span>
                </td>
              </tr>
              <tr class="detailTable">
				<!-- <td>{{detailOrderType(item.orderType)}}</td> -->
                <td>{{item.skuName}}</td>
                <td><span class="orangeFont">{{item.finalPriceFormat}}</span> <span style="color:#999">/吨</span></td>
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
                <td>
                  {{item.totalAmountFormat}}
                  <template v-if="item.depositId > 0"><br><span
                      style="color:#ff9800;border:1px solid #ff9800;border-radius:3px;padding:2px 3px;font-size: 8px;">已付{{item.depositAmountFormat}}</span>
                  </template>
                </td>
                <td>
                  <span v-if="item.status == 3 || item.status == 4 " class="greenFont">{{getOrderState(item.status)}}</span>
                  <span v-else-if="item.status == 0" class="gray">{{getOrderState(item.status)}}</span>
                  <span v-else class="orangeFont">{{getOrderState(item.status)}}</span>
                </td>
                <td class="operate">
                  <div class="" v-if="item.status == 2">
                    <a class="Paybtn mt15" @click="paymentBut(item)">支付尾款</a>
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
            <Page style="margin:20px auto; float:right;" :total="$store.state.member.orderListTotal" :current="current_page" @on-change="changePage"
                  :page-size="page_size" @on-page-size-change="changePageSize"></Page>
          </template>
          <template v-else>
            <p style="font-size:14px; text-align:center; width:100%;">暂无任何信息！</p>
          </template>
        </div>
      </div>
    </div>
    <OrderPay :isShow='payLoading' :order_id='payOrderID' @unChange="unPayOrder"></OrderPay>
    <FreightAdd :isshow="addloading" @unChange="unaddChange" :datalist='addList'></FreightAdd>
    <FreightDetail :isshow="detailloading" @unChange="undetailChange" :datalist='addList'></FreightDetail>
  </div>
</template>

<script>
	import Navigation from '../../components/navigation'
	import config from '../../config/config'
	import OrderPay from '../../components/paydeposit/orderPay'
	import FreightAdd from '../../components/freight-add/freight-add'
	import FreightDetail from '../../components/freight-add/freght-detail'

	export default {
		name: "usertotalorder",
		middleware: 'memberAuth',
		layout: 'membercenter',
		components: {
			FreightAdd,
			FreightDetail,
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
				payOrderID: 0,
				paystatus:[
                  {'label': '已取消','value':0},
				  {'label': '待付货款','value':2},
				  {'label': '已付款','value':3},
                ],
				registType:[
                  {'label': '现货订单','value':1},
				  {'label': '预售订单','value':2},
				  {'label': '竞拍订单','value':3},
				  {'label': '专用料订单','value':4},
				  {'label': '出口订单','value':5},
				],
				pickstatus:[
                  {'label': '未提货','value':1},
				  {'label': '部分提货','value':2},
				  {'label': '已提货','value':3},
				],
				detailloading: false,
				addloading: false,
				payLoading: false,
				payInfo: {},
				addList: {},
				current_page: 1,
				page_size: 5,
				currTabs: 0,
				formSearch: {
					start_time:'',
					end_time:'',
					orderType: '',
					status: '',
					orderNo: '',
					skuName: ''
				},
			}
		},
		methods: {
			async getSourceData() {
				let params = {
					current_page: this.current_page,
					page_size: this.page_size,
					...this.formSearch
				}
				this.$store.dispatch('member/getOrderList', params)
			},
			async getCountData() {
				this.$store.dispatch('member/getOrderCount')
			},

			paymentBut(row) {
				//检查是否可以使用合约的保证金

				this.payLoading = true
        this.payOrderID = row.id
				/*this.payInfo = {
					'id': row.id,
					'orderNo' : row.orderNo,
					'skuNo' : row.skuNo,
					'skuName' : row.skuName,
					'orderNum' : row.orderNum,
					'totalAmount' : row.totalAmount,
					'payAmount' : row.payAmount,
					'deductAmount' : row.deductAmount,
				}*/
			},
			unPayOrder(row) {
				this.payLoading = row
				this.getSourceData()
			},
			addAddress() {
				this.addloading = true
			},
			unaddChange(res) {
				this.getSourceData()
				this.addloading = res
			},
			undetailChange(res) {
				this.detailloading = res
			},

			addLog(row) {
				this.addList = {
					...row
				}
				this.addloading = true
			},
			setTabs(res) {
				if (res == '1') {
					this.formSearch.status = ''
					this.currTabs = 0
				} else if (res == '2') {
					this.formSearch.status = 2
					this.currTabs = 1
				} else if (res == '3') {
					this.formSearch.status = 3
					this.currTabs = 2
				} else if (res == '0') {
					this.formSearch.status = '0'
					this.currTabs = 3
				}
				this.getSourceData()
			},
			detailLog(row) {
				this.addList = {
					...row
				}
				this.detailloading = true
			},
			//订单类型
			getOrderType(typeId) {
				if (!typeId) return
				return config.orderType[typeId].substring(0, 1)
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

			onSearch() {
				this.current_page = 1
				this.page_size = 20
				this.getSourceData()
			},
			closeSearch() {
				this.current_page = 1
				this.page_size = 20
				this.getSourceData()
			},
			changePage(row) {
				this.current_page = row
				this.getSourceData()
			},
			changePageSize(row) {
				this.page_size = row
				this.getSourceData()
			}
		},
		mounted() {
			let status = this.$route.query.status
			if (status == 2) {
				this.formSearch.status = 2
				this.currTabs = 1
			}
			this.getSourceData()
			this.getCountData()

		},
		watch: {
			'$route'(to, from) {
				this.$router.go(0);
			}
		}
	}
</script>