<template>
  <div class="body">
    <Header title=""></Header>
    <div class="container">
      <div class="w1200">
        <div class="breadcrumb">
          <breadcrumb>
              <breadcrumb-item><i type="home"></i><nuxt-link to="/">巨正源</nuxt-link></breadcrumb-item>
              <breadcrumb-item><nuxt-link to="/advance">预售列表</nuxt-link></breadcrumb-item>
              <breadcrumb-item>合约列表</breadcrumb-item>
          </breadcrumb>
        </div>
 	<div class="" style="width: 95%; margin: 0 auto;">
          <div class="TableTitle graybg">
            <span style="width: 15%;">商品信息</span>
            <span style="width: 15%;">提货仓库</span>
            <span style="width: 10%;">数量</span>
            <span style="width: 10%;">单价</span>
            <span style="width: 10%;">待转单数</span>
            <span style="width: 10%;">尾款支付状态</span>
            <span style="width: 15%;">放料数量</span>
            <span style="width: 15%;">操作</span>
          </div>
          <template v-if="feedingList.length > 0">
            <table v-for="(item, index) in feedingList" :key="index" class="listT mt10" border="" cellspacing="" cellpadding="">
              <tbody>
              <tr class="Ttitle graybg" >
                <td colspan="8">
                  <div class="dflex" style="display: flex; justify-content: space-between">
                    <span class="ml10">合约编号：
                      <a :href="`/users/plan/advance/${item.id}`" class="mt5 blackFont"><span class="blue">{{item.plan_no}}</span></a>
                      <template v-if="item.status == 1">(待转单)</template>
                      <template v-else-if="item.status == 2">(已转单)</template>
                      <template v-else-if="item.status == 3">(已违约)</template>
                    </span>
                  <span class="ml15">下单时间：<span class="gray">{{item.create_time}}</span></span>
				<span  class="ml15" style="width: 18%;" :title="`合约量：${item.total_num}，待转单：${item.available_num}`">
                    <template v-if="item.total_num==0 && item.available_num==0 " >
                            <Progress :percent="0" :stroke-width="10"/>
                    </template>
                    <template v-else >
                          <Progress :percent="((item.total_num - item.available_num)*100/item.total_num).toFixed(2)" :stroke-width="10"/>
                   </template>

                </span>
                  <span class="fr mr15" v-if="item.status != 3 && item.available_num > 0 && (item.close_apply_status == 1 || item.close_apply_status == 4)">
                      <span class="red">转单倒计时：</span>
                      <span class="red"><TimeDown :endTime="item.last_ordered_date" formatStr="{D}天{H}时{M}分{S}秒" endMsg="已失效" :onTimeOver="$utils.reload"></TimeDown></span>
                  </span>
                  </div>

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
                  {{item.feeding_num}}
                  <!-- <div>待签合同</div>
                  <div><a :href="`/users/spotContract?type=3&id=${item.id}`" target="_blank" class="greenFont">查看合同模板</a></div> -->
                </td>

                <td style="width: 15%;" class="operate">
                  <div v-if="item.status == 3">
                    <a class="Paybtn CarCurr" style="margin-top: 5px; padding: 3px 6px">已违约</a>
                  </div>
                  <div v-else-if="item.available_num > 0">
                    <template v-if="item.close_apply_status == 1">
                      <a class="Paybtn CarCurr" v-if="item.feeding_num > 0" style="padding: 3px 6px" @click="getSaleFeedingList(item.id)">转单</a>
                      <a class="Paybtn CarCurr" v-else style="padding: 3px 6px;background-color: #dbdcde;cursor: default;">转单</a>
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
		<div class="whitebg ovh text-xs-center" style="padding: 30px 0" v-if="feedingList.length > 0">
            <pages :total="total" :pageSize="page_size" :show-total="showTotal" :value="current_page"></pages>
          </div>
        </div>
        <!--放料列表-->
        <!-- <div class="" style="margin: 10px auto;">
          <div class="XhlistTitle">
            <span style="width: 16%;">合约编号</span>
            <span style="width: 12%;">商品信息</span>
            <span style="width: 15%;">下单时间</span>
            <span style="width: 15%;">提货仓库</span>
            <span style="width: 11%;">单价（元/吨）</span>
            <span style="width: 18%;">合约完成量</span>
            <span style="width: 9%;">合同状态</span>
			<span style="width: 9%;">转单倒计时</span>
            <span style="width: 8%;">操作</span>
          </div>
          <ul class="Xhlist">
            <template v-if="total > 0">
              <li v-for="(item, index) in feedingList" :key="index">
                <span style="width: 16%;">{{item.plan_no}}</span>
                <span style="width: 12%;white-space:nowrap;text-overflow:ellipsis;word-break:keep-all;overflow: hidden;">{{item.sku_name}}</span>
                <span style="width: 15%; overflow: hidden;text-overflow: ellipsis; white-space: nowrap; cursor: default;">{{item.create_time}}</span>
                <span style="width: 15%;" >{{item.warehouse_name}}</span>
                <span class="orangeFont"
                      style="width: 11%;position:relative;">
                     <span style="position: relative">
                       {{$utils.amountFormat(item.final_price)}}
                        <i v-if="item.is_jry"  style="width: 15px; height: 18px; position: absolute; top: -10px; right: -15px; background:url('/img/Yi_icon.png')no-repeat;"></i>
                     </span>
                </span>

                <span style="width: 18%;" :title="`合约量：${item.total_num}，待转单：${item.available_num}`">
                    <template v-if="item.total_num==0 && item.available_num==0 " >
                            <Progress :percent="0" :stroke-width="20"/>
                    </template>
                    <template v-else >
                          <Progress :percent="((item.total_num - item.available_num)*100/item.total_num).toFixed(2)" :stroke-width="20"/>
                   </template>

                </span>
                <span style="width: 9%;">
                  <div>待签合同</div>
                  <div><a :href="`/users/spotContract?type=3&id=${item.id}`" target="_blank" class="greenFont">查看合同模板</a></div>
                </span>
				<span style="width: 9%;"> <span class="red"><TimeDown :endTime="item.last_ordered_date" formatStr="{D}天{H}时{M}分{S}秒" endMsg="已失效" :onTimeOver="$utils.reload"></TimeDown></span></span>
                <span style="width: 8%;">
                  <div class="ListBtn" @click="getSalePlanList(item.id)">转单</div>
                </span>
              </li>
            </template>
            <template v-else>
              <li style="overflow:hidden; height: 235px;">
                <p style="width:100%; text-align:center">
                  <img src="../../../static/img/Nothing.png"/>
                </p>
              </li>
            </template>
          </ul>
          <div class="whitebg ovh text-xs-center" style="padding: 30px 0" v-if="feedingList.length > 0">
            <pages :total="total" :pageSize="page_size" :show-total="showTotal" :value="current_page"></pages>
          </div>

        </div> -->
           <Modal
            title="选择放料"
            v-model="selectPlanModalShow"
            @on-cancel="selectPlanModalCancel"
            :width='700'
            class-name="vertical-center-modal">
          <div class="">
            <Table size="small" border stripe highlight-row :columns="selectPlanColumns" :data="selectPlanData" :content="self" >
              <template slot-scope="{ row, index }" slot="available_num">
                <template v-if="row.member_available_num > 0">
                  <tag color="error">定</tag>{{row.member_available_num}}
                </template>
                <template v-else>
                  {{row.available_num}}
                </template>
              </template>
              <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" size="small" @click="toCreateOrder( row.id,curr_plan_id)">下单</Button>
              </template>
            </Table>
          </div>
          <div slot="footer">
          </div>
        </Modal>
      </div>
    </div>
    <Footer size="default" title="底部" style="margin-top:18px;"></Footer>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
	import server from '../../../config/api'
	import Header from '../../../components/header'
	import Footer from '../../../components/footer'
	import pagination from '../../../components/pagination'
	import TimeDown from '../../../components/timeDown'

	export default {
		name: "advance-feeding",
		middleware: 'memberAuth',
		fetch({store, params, query}) {
			return Promise.all([
				//获取顶部、中部、底部导航信息
				store.dispatch('common/getNavList'),
				//获取系统配置
				store.dispatch('common/getSysConfig'),
				//获取友情链接
        		store.dispatch('common/getFriendlyList'),
        		//获取底部帮助分类
				store.dispatch('helper/getHelpCate', {
					catId: 0,
					indexShow: 1
				}),
				//获取放料列表GET /bookingPlan/getMyPlanList/page
				store.dispatch('advance/getFeedingList', {
            current_page: query.page || 1,
						page_size: 6,
						statusType:9
					}
				),
			])
		},
		components: {
			Header,
			Footer,
			pages: pagination.pages,
			TimeDown
		},
		computed: {
			...mapState({
				total: state => state.advance.total,
				feedingList: state => state.advance.feedingList,
			})
		},
		data() {
			return {
				self: this,
				selectRecordID: 0,
				checkTypeShow: false,

				current_page: parseInt(this.$route.query.page) || 1,
				page_size: 6,

				curr_feeding_id: 0,
        curr_plan_id:0,
				selectPlanModalShow: false,
				selectPlanData: [],
				selectPlanColumns: [
					{ title: '放料有效期', key: 'valid_time' },
          { title: '放料编号', key: 'feeding_no'},
          { title: '可用数量', key: 'available_num',slot: 'available_num'},
          { title: '操作', slot: 'action'}
				],
			}
		},
		methods: {
			addOrder(id) {
				location.href = '/spot/order/' + id
			},
			showTotal(total) {
				return `全部 ${total} 条`;
			},
			reloadPage() {
				location.reload()
			},
			selectPlanModalCancel(){
				this.selectPlanModalShow = false
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
					this.selectPlanData = res.data
					this.selectPlanModalShow = true
                    return
				}
			}
			this.toCreateOrder(res.data[0].id, planned_id)
		},
		toCreateOrder(feeding_id, planned_id){
			location.href = '/advance/change/feeding_id?id='+feeding_id+'&planned_id='+planned_id
		},
		},
		mounted() {
		},
		watch: {
			'$route'(to, from) {
				this.$router.go(0);
			}
		},
		head() {
			return {
				title: '巨正源-化工交易平台',
				page: 10,
				meta: [
					{name: 'viewport', content: 'width=device-width, initial-scale=1'},
					{name: 'keywords', content: '化工, 交易, 丙烷脱氢'},
					{hid: 'description', name: 'description', content: '巨正源-化工交易平台，提供丙烷脱氢,石化产品贸易、仓储服务、成品油运输服务'}
				]
			}
		}
	}
</script>
<style scoped>
  .Xhlist li {
    height: 55px;
    display: flex;
    align-items: center;
    margin-bottom: 1px;
    background-color: #fff;
  }
  .Xhlist li:hover{
    background-color: rgba(217,232,249,0.5);
  }
  .h50 {
    height: 50px;
  }
  .detailTable{background-color: #f7f7f7}
  .lightfont{color: #2d8cf0;}
  .colorB{color:#666;}
  .arrow-up {
    background: url(/img/icon.png) no-repeat 42px -147px;
  }
  .newClass{
    width:19px; height:15px;
    position: absolute; top: -7px;  left: 84px;background: url(/img/new_icon.gif)no-repeat;background-size: cover;
  }

  .ivu-progress >>> .ivu-progress-inner{background-color: #e2dfdf;}
</style>
