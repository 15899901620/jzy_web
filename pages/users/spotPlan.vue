<template>
  <div class="clearfix graybg">
    <div class="w1200 dflex " style="margin-bottom: 40px">
      <usernav></usernav>
      <div class="memberInfor ml20  whitebg bdccc  mt20">
        <!--个人信息-->
        <h1 class="fs16 ml25 mt25 pb10 pr" style="border-bottom: 2px solid #DEDEDE;width: 95%;">现货合约
          <div class="bodbottom" style="width: 8%; height: 2px;"></div>
        </h1>

        <div class="" style="width: 95%; margin: 0 auto;">
          <div class="order_operate">
            <div class="dflex">
              <input type="text" placeholder="输入竞拍计划编号查询" ref="searchval" class="orderInput"/>
              <div class="check">查看</div>
            </div>
            <!-- <div class="dflex" style="align-items: center;">
              <span style="width: 90px;">起始日期</span><input type="text" class="layui-input" id="test6" placeholder="选择订单时间">
            </div> -->
          </div>
          <div class="TableTitle graybg">
            <span style="width: 15%;">产品</span>
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
                    <a :href="`/users/plan/spot/${item.id}`" class="mt5 blackFont"><span class="blue">{{item.plan_no}}</span></a>
                  </span>
                  <span class="ml15">下单时间：<span class="gray">{{item.create_time}}</span></span>
                  <span class="fr mr15" v-if="item.available_num > 0"><span class="red">转单倒计时：</span>
                    <span class="red"><TimeDown :endTime="item.last_ordered_date" hoursShow endMsg="已失效" :onTimeOver="reloadPage"></TimeDown></span></span>
                </td>
              </tr>
              <tr class="detailTable">
                <td style="width: 15%;">{{item.sku_name}}</td>
                <td style="width: 15%;">{{item.warehouse_name}}</td>
                <td style="width: 10%;">{{item.total_num}}</td>
                <td style="width: 10%;">{{amountFormat(item.final_price)}}</td>
                <td style="width: 10%;">{{item.available_num}}</td>
                <td style="width: 10%;">
                  <span class="gray" v-if="item.taken_num === 0">待支付</span>
                  <span class="gray" v-else-if="item.taken_num > 0 && item.taken_num < item.total_num">部分支付</span>
                  <span class="gray" v-else-if="item.taken_num == item.total_num">已支付</span>
                </td>
                <td style="width: 15%;">待签合同</td>
                <td style="width: 15%;" class="operate">
                  <div v-if="item.available_num > 0">
                    <a class="Paybtn CarCurr" style="padding: 3px 6px" @click="toCreateOrder(item.id)">转单</a>
                    <a class="Paybtn CarCurr" style="margin-top: 5px; padding: 3px 6px" @click="cancelPlan(item)">申请结束</a>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </template>
          <template v-else>
            <p style="font-size:14px; text-align:center; width:100%;">暂无任何信息！</p>
          </template>
          <pages :total="$store.state.spot.total" :show-total="showTotal" :value="current_page"
                 style="margin:20px 0;"></pages>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
	import Navigation from '../../components/navigation'
	import pagination from '../../components/pagination'
	import TimeDown from '../../components/timeDown'
	import Utils from '../../plugins/common'

	export default {
		name: "spotPlan",
		middleware: 'memberAuth',
		layout: 'membercenter',
		components: {
			usernav: Navigation.user,
			pages: pagination.pages,
			TimeDown
		},
		fetch({store, query}) {
			return Promise.all([
				//获取顶部、中部、底部导航信息
				store.dispatch('common/getNavList'),
				//获取系统配置
				store.dispatch('common/getSysConfig'),
        //获取会员合约列表
				store.dispatch('spot/getSpotPlanList', {current_page:query.page||1, page_size: 6})
			])
		},
		data() {
			return {
				current_page: this.$route.query.page ? parseInt(this.$route.query.page) : 1,
				page_size: 10,
				formSearch: {
					planNo: '',
					skuNo: '',
					auctionId: '',
					status: ''
				}
			}
		},
		methods: {
			showTotal(total) {
				return `全部 ${total} 条`;
			},
			BidersDetail(id) {
			},
			amountFormat (amount, sign) {
				return Utils.amountFormat(amount, sign)
			},
			reloadPage (){
				location.reload(true)
      },
			toCreateOrder(id){

      },
      cancelPlan(row){
				this.$Modal.confirm({
					title: '合约申请结束',
					content: '<p style="font-size:14px;">您确认申请结束当前合约单？申请取消执行剩余'+row.available_num+'吨货物转订单</p>',
					onOk: () => {

					},
					onCancel: () => {

					}
				})
      }
		},
		mounted() {
		},
		created() {
		},
		watch: {
			'$route'(to, from) {
				this.$router.go(0);
			}
		}
	}
</script>