<template>
  <div class="clearfix graybg">
    <div class="w1200 dflex " style="margin-bottom: 40px">
      <usernav></usernav>
      <div class="memberInfor ml20  whitebg bdccc  mt20">
        <!--个人信息-->
        <h1 class="fs16 ml25 mt25 pb10 pr" style="border-bottom: 2px solid #DEDEDE;width: 95%;" >预售合约
          <div class="bodbottom" style="width: 8%; height: 2px;"></div>
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
            <span style="width: 15%;">商品信息</span>
            <span style="width: 15%;">提货仓库</span>
            <span style="width: 10%;">数量</span>
            <span style="width: 10%;">单价</span>
            <span style="width: 10%;">待转单数</span>
            <span style="width: 10%;">尾款支付状态</span>
            <span style="width: 15%;">合同状态</span>
            <span style="width: 15%;">操作</span>
          </div>
          <template v-if="planList.length > 0">
            <table v-for="(item, index) in planList" :key="index" class="listT mt10" border="" cellspacing="" cellpadding="">
              <tbody>
              <tr class="Ttitle graybg" >
                <td colspan="8">
                    <span class="ml10">合约编号：
                      <a :href="`/users/plan/advance/${item.id}`" class="mt5 blackFont"><span class="blue">{{item.plan_no}}</span></a>
                      <template v-if="item.status == 1">(待转单)</template>
                      <template v-else-if="item.status == 2">(已转单)</template>
                      <template v-else-if="item.status == 3">(已违约)</template>
                    </span>
                  <span class="ml15">下单时间：<span class="gray">{{item.create_time}}</span></span>
                  <span class="fr mr15" v-if="item.status != 3 && item.available_num > 0 && (item.close_apply_status == 1 || item.close_apply_status == 4)">
                      <span class="red">转单倒计时：</span>
                      <span class="red"><TimeDown :endTime="item.last_ordered_date" formatStr="{D}天{H}时{M}分{S}秒" endMsg="已失效" :onTimeOver="$utils.reload"></TimeDown></span>
                  </span>
                </td>
              </tr>
              <tr class="detailTable">
                <td style="width: 15%;">{{item.sku_name}}</td>
                <td style="width: 15%;">{{item.warehouse_name}}</td>
                <td style="width: 10%;">
                  {{item.total_num}}吨
                </td>
                <td style="width: 10%;">{{$utils.amountFormat(item.final_price)}}</td>
                <td style="width: 10%;">{{item.available_num}}</td>
                <td style="width: 10%;">
                  <span class="gray" v-if="item.taken_num === 0">待支付</span>
                  <span class="gray" v-else-if="item.taken_num > 0 && item.taken_num < item.total_num">部分支付</span>
                  <span class="gray" v-else-if="item.taken_num == item.total_num">已支付</span>
                </td>
                <td style="width: 15%;">
                  <div v-if="item.status != 3 && item.total_num > 0">
                    <a v-if="sealType == 2" style="padding: 3px 6px;background-color: #007de4;border-radius: 3px;color: #FFF;" @click="toShowApplyContract(item.id)">开通电子印章</a>
                    <a v-else-if="item.contract_apply_status == 1 || item.contract_apply_status == 4" style="padding: 3px 6px;background-color: #007de4;border-radius: 3px;color: #f90;" @click="toShowApplyContract(item.id)">电子盖章</a>
                    <a v-else-if="item.contract_apply_status == 2" style="margin-top: 5px;padding: 3px 6px;background-color: #007de4;border-radius: 3px;color: #FFF;" :href="item.contract_final_pic" target="_blank">盖章中</a>
                    <span v-else-if="item.contract_apply_status == 3" style="padding: 3px;background-color: #aaa;border-radius: 3px;color: #FFF;">已盖章</span>
                  </div>
                  <!--<template v-if="item.contract_apply_status == 1">
                    <div>待签合同</div>
                  </template>
                  <template v-else-if="item.contract_apply_status == 2">
                    <div>合同盖章中</div>
                  </template>
                  <template v-else-if="item.contract_apply_status == 3">
                    <div><a :href="item.contract_final_pic" target="_blank" class="greenFont">查看合同</a></div>
                  </template>
                  <template v-else-if="item.contract_apply_status == 4">
                    <div>待签合同</div>
                  </template>
                  <div>待签合同</div>-->

                  <div>
                    <a v-if="item.contract_apply_status == 3" class="greenFont" :href="item.contract_final_pic" target="_blank">下载合同</a>
                    <a v-else @click='Spot(item.id)' class="greenFont">查看合同模板</a>
                  </div>
                </td>

                <td style="width: 15%;" class="operate">
                  <div v-if="item.status == 3">
                    <a class="Paybtn CarCurr" style="margin-top: 5px; padding: 3px 6px">已违约</a>
                  </div>
                  <div v-else-if="item.available_num > 0">
                    <template v-if="item.close_apply_status == 1">
                      <a class="Paybtn CarCurr" v-if="item.feeding_num > 0" style="padding: 3px 6px" @click="getSaleFeedingList(item.id)">转单</a>
                      <a class="Paybtn CarCurr" v-else style="padding: 3px 6px;background-color: #dbdcde;cursor: default;">转单</a>
                      <!-- <a class="Paybtn CarCurr" v-if="item.feeding_num > 0"  style="margin-top: 6px;" @click='applycance(item.id)'>申请取消</a> -->
                    </template>
                    <template v-else-if="item.close_apply_status == 2">
                      <a class="Paybtn CarCurr" style="margin-top: 5px; padding: 3px 6px">取消审核中</a>
                    </template>
                    <template v-else-if="item.close_apply_status == 3">
                      <a class="Paybtn CarCurr" style="margin-top: 5px; padding: 3px 6px">取消同意</a>
                    </template>
                    <template v-else-if="item.close_apply_status == 4">
                      <a class="Paybtn CarCurr" style="padding: 3px 6px" @click="getSaleFeedingList(item.id)">转单</a>
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
          <pages :total="planTotal" :show-total="showTotal" :value="current_page" :pageSize="6" style="margin:20px 0;"></pages>
        </div>
        <Modal
            title="选择放料"
            v-model="selectFeedingModalShow"
            @on-cancel="selectFeedingModalCancel"
            :width='700'
            class-name="vertical-center-modal">
          <div class="">
            <Table size="small" border stripe highlight-row :columns="selectFeedingColumns" :data="selectFeedingData" :content="self" >
              <template slot-scope="{ row, index }" slot="available_num">
                <template v-if="row.member_available_num > 0">
                  <tag color="error">定</tag>{{row.member_available_num}}
                </template>
                <template v-else>
                  {{row.available_num}}
                </template>
              </template>
              <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" size="small" @click="toCreateOrder(row.id, curr_plan_id)">下单</Button>
              </template>
            </Table>
          </div>
          <div slot="footer">
          </div>
        </Modal>
      </div>
    </div>
    <paperApply :isShow="paperApplyShow" :planId="record_id" :planType="2"></paperApply>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import server from '../../config/api'
import Navigation from '../../components/navigation'
import TimeDown from '../../components/timeDown'
import pagination from '../../components/pagination'
import {sendHttp} from "../../api/common"
import paperApply from "../../components/contract/paperApply"

export default {
	name: "userauction",
	middleware: 'memberAuth',
	layout:'membercenter',
	components:{
		usernav: Navigation.user,
		pages: pagination.pages,
		TimeDown,
		paperApply
	},
	fetch({ store, query }) {
		return Promise.all([
			//获取顶部、中部、底部导航信息
			store.dispatch('common/getNavList'),
			//获取系统配置
			store.dispatch('common/getSysConfig'),
			//获取会员合约列表
			store.dispatch('advance/getPlanList', {current_page:query.page||1, page_size: 6, keyword:query.keyword ? query.keyword: ''})
		])
	},
	computed: {
		...mapState({
			planList: state => state.advance.planList,
			planTotal: state => state.advance.total,
		}),
	},
	data () {
		return {
			self: this,
			current_page: this.$route.query.page || 1,
			page_size: 5,
			total: 0,
			datalist: [],
			auctionNo:'',
      curr_plan_id: 0,
			formSearch: {
				keyword: '',
			},

			selectFeedingModalShow: false,
			selectFeedingData: [],
			selectFeedingColumns: [
				{ title: '放料有效期', key: 'valid_time' },
				{ title: '放料编号', key: 'feeding_no'},
				{ title: '可用数量', key: 'available_num',slot: 'available_num'},
				{ title: '操作', slot: 'action'}
			],

			sealType: 2,
			paperApplyShow: false,
			record_id: 0,
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
		async getSaleFeedingList(planned_id) {
			this.curr_plan_id = planned_id
			let params = {
				planned_id: planned_id
			}
			let res = await this.$utils.sendCurl(this, server.api.advance.getFeedingByPlan, params)
      if(res.status === 200 && res.data){
      	if(res.data.length == 0){
					this.$utils.showWarning(this, '放料信息已改变，请刷新再操作！', function(){
						location.reload(true)
					})
          return
        }
				if(res.data.length > 1){
					//显示放料选择窗口
					this.selectFeedingData = res.data
					this.selectFeedingModalShow = true
          return
				}
			}
			this.toCreateOrder(res.data[0].id, planned_id)
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
		toCreateOrder(feeding_id, planned_id){
			location.href = '/advance/change/feeding_id?id='+feeding_id+'&planned_id='+planned_id
		},

		getSealType() {
			sendHttp(this, true, server.api.contract.getSealType, {}).then(response => {
				if (response.status === 200) {
					if ((response.data.errorcode || 0) == 0) {
						this.sealType = response.data.type
					}
				}
			})
		},
		toShowApplyContract(id){
			if(this.sealType == 2){
				location.href = '/users/seal'
        //注释掉，暂不让客户在线申请纸质盖章
        /*this.record_id = id
        this.paperApplyShow = true*/
			} else {
        sendHttp(this, true, server.api.contract.getElcSignUrl, {'plan_id': id, 'plan_type': 2}).then(response => {
          if (response.status === 200) {
            if((response.data.errorcode || 0) == 0){
              window.open(response.data)
              this.$Modal.info({
                title: '电子签章提醒',
                content: '<p>在线电子签章已在新页面打开，签章后注意刷新页面查看状态是否改变！</p>',
                onOk: () => {
                  location.reload(true)
                }
              })
            }else{
              alert(response.data.message)
            }
          }
        })
      }
		},
	},
	mounted(){
    this.getSealType()
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
