<template>
  <div class="clearfix graybg">
    <div class="w1200 dflex " style="margin-bottom: 40px">
      <usernav></usernav>
      <div class="memberInfor ml20  whitebg bdccc  mt20">
        <!--个人信息-->
        <h1 class="fs16 ml25 mt25 pb10 pr" style="border-bottom: 2px solid #DEDEDE;width: 95%;" >可添加月计划
          <div class="bodbottom" style="width: 10%; height: 2px;"></div>
        </h1>

        <div class="" style="width: 95%; margin: 0 auto;">
          <div class="order_operate">
            <div class="dflex">
              <input type="text" placeholder="合约编号、商品名称搜索" ref="searchval" class="orderInput" v-model="formSearch.keyword"  />
              <div class="check" @click='checked()' style="cursor: pointer">查看</div>
            </div>
            <!-- <div class="dflex" style="align-items: center;">
              <span style="width: 90px;">起始日期</span><input type="text" class="layui-input" id="test6" placeholder="选择订单时间">
            </div> -->
          </div>
          <div class="TableTitle graybg">
            <span style="width: 5%;">年份</span>
            <span style="width: 5%;">月份</span>
            <span style="width: 15%;">商品信息</span>
            <span style="width: 15%;">商品编号</span>
            <span style="width: 10%;">月排产量</span>
            <span style="width: 10%;">月均计划量</span>

            <span style="width: 10%;">产品等级</span>
            <span style="width: 15%;">包装方式</span>
            <span style="width: 15%;">操作</span>
          </div>
          <template v-if="monthinfo.length > 0">
            <table v-for="(item, index) in monthinfo" :key="index" class="listT mt10" border="" cellspacing="" cellpadding="">
              <tbody>
              <tr class="detailTable">
                <td style="width: 5%;">{{item.year}}</td>
                <td style="width: 5%;">  {{item.canMonth}}</td>
                <td style="width: 15%;">{{item.skuName}}</td>
                <td style="width: 15%;">{{item.skuNo}}</td>
                <td style="width: 10%;">
                  {{item.estimateNum}}吨
                </td>
                <td style="width: 10%;">  {{item.defaultNum}}</td>

                <td style="width: 10%;">
                    <span class="" v-if="item.productGrade == 1">优等品</span>
                    <span class="" v-if="item.productGrade == 2">一等品</span>
                    <span class="" v-if="item.productGrade == 3">合格品</span>
                </td>
                <td style="width: 15%;">
                      <span class="" v-if="item.packingModes == 1">标准包装</span>
                       <span class="" v-else>非标准包装</span>
                </td>

                <td style="width: 15%;" class="operate">
                      <Tooltip content="添加月计划" placement="left" ><Button   title="添加月计划" icon="md-add" @click='addmonth(item)' size="small"></Button></Tooltip>
                </td>
              </tr>
              </tbody>
            </table>
          </template>
          <template v-else>
            <p style="font-size:14px; text-align:center; width:100%;">暂无任何信息！</p>
          </template>
          <pages :total="monthTotal" :show-total="showTotal" :value="current_page" style="margin:20px 0;"></pages>
          <monthplanadd :isshow="addmodalmonth" @unChange="unAdddmonth" :rowData='rowPlanData' @onChange="addOnmonthSuccess"></monthplanadd>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import server from '../../config/api'
import Navigation from '../../components/navigation'
import TimeDown from '../../components/timeDown'
import pagination from '../../components/pagination'
import monthplanadd from './plan/plan/monthadd.vue'
export default {
	name: "userauction",
	middleware: 'memberAuth',
	layout:'membercenter',
	components:{
		usernav: Navigation.user,
    pages: pagination.pages,
    monthplanadd,
		TimeDown
	},
	fetch({ store, query }) {
		return Promise.all([
			//获取顶部、中部、底部导航信息
			store.dispatch('common/getNavList'),
			//获取系统配置
			store.dispatch('common/getSysConfig'),
			//获取会员合约列表
			store.dispatch('special/monthaddPlan', {current_page:query.page||1, page_size: 6})
		])
	},
	computed: {
		...mapState({
      monthinfo: state => state.special.monthinfo,
      monthTotal: state => state.special.monthTotal,
		}),
	},
	data () {
		return {
			self: this,
			current_page: 1,
			page_size: 5,
			total: 0,
			datalist: [],
			auctionNo:'',
      curr_plan_id: 0,
      rowPlanData:{},
			formSearch: {
				keyword: '',
			},
        addmodalmonth:false,
			selectFeedingModalShow: false,
			selectFeedingData: [],
			selectFeedingColumns: [
				{ title: '放料有效期', key: 'valid_time' },
				{ title: '放料编号', key: 'feeding_no'},
				{ title: '可用数量', key: 'available_num',slot: 'available_num'},
				{ title: '操作', slot: 'action'}
			],
		}
	},
	methods: {
		selectFeedingModalCancel(){
			this.selectFeedingModalShow = false
		},
		showTotal(total) {
			return `全部 ${total} 条`;
		},
		checked(){
			location.href = '/users/advancePlan?keyword='+this.formSearch.keyword
    },
    addmonth (res) {
      this.rowPlanData = res
      this.addmodalmonth = true
    },
    applycance(id){
          let params = {
            id: id
          }
          this.$Modal.confirm({
            title: '取消提示',
            content: '<p>您是否要取消当前订单?</p>',
            onOk:async () => {
              let rs = await this.$utils.sendCurl(this, server.api.advance.bookingPlanclose, params)
              if(!rs.data.message){
                  this.$Notice.success({
                    title: '提醒',
                    desc: '申请成功'
                  })
              }else{
                    this.$Notice.warning({
                    title: '提醒',
                    desc: rs.data.message
                  })
              }
            },
            onCancel: () => {

            }
				})
    },
    unAdddmonth(res){
        this.addmodalmonth = res
    },
    addOnmonthSuccess (res) {
          if (res === 'success') {
              this.sourceData()
          }
    },
		toCreateOrder(feeding_id, planned_id){
			location.href = '/advance/change/feeding_id?id='+feeding_id+'&planned_id='+planned_id
		},
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
