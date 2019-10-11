<template>
  <div class="clearfix graybg">
    <div class="w1200 dflex " style="margin-bottom: 40px">
      <usernav></usernav>
      <div class="memberInfor ml20  whitebg bdccc  mt20">
        <!--个人信息-->
        <h1 class="fs16 ml25 mt25 pb10 pr" style="border-bottom: 2px solid #DEDEDE;width: 95%;" >竞拍合约
          <div class="bodbottom" style="width: 8%; height: 2px;"></div>
        </h1>

        <div class="" style="width: 95%; margin: 0 auto;">
          <div class="order_operate">
            <div class="dflex">
              <input type="text" placeholder="输入竞拍计划编号查询" ref="searchval" class="orderInput" v-model="formSearch.planNo"  />
              <div class="check" @click='checked()' style="cursor: pointer">查看</div>
            </div>
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
                  <td style="width: 15%;">待签合同</td>
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
          <pages :total="$store.state.bidders.planTotal" :show-total="showTotal" :value="current_page" style="margin-top:20px;"></pages>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from '../../components/navigation'
import TimeDown from '../../components/timeDown'
import pagination from '../../components/pagination'

export default {
  name: "userauction",
	middleware: 'memberAuth',
  layout:'membercenter',
  components:{
    usernav: Navigation.user,
    pages: pagination.pages,
		TimeDown
  },
  fetch({ store, query }) {
    return Promise.all([
			//获取顶部、中部、底部导航信息
			store.dispatch('common/getNavList'),
			//获取系统配置
			store.dispatch('common/getSysConfig'),
			//获取会员合约列表
			store.dispatch('bidders/getPlanList', {current_page:query.page||1, page_size: 6,planNo:query.plan_no ? query.plan_no: ''})
    ])
  },
  data () {
    return {
      current_page: 1,
      page_size: 5,
      total: 0,
      datalist: [],
      auctionNo:'',
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
    checked(){
			location.href = '/users/auctionPlan?plan_no='+this.formSearch.planNo
    },
		toCreateOrder(id){
			location.href = '/auction/change/'+id
		}
  },
  mounted(){
  },
  created(){
  },
  watch: {
    '$route' (to, from) {
        this.$router.go(0);
    }
  },
  destoryed () {
    // clearTimeout()
  },
}
</script>