<template>
  <div class="body">
    <Header title=""></Header>
    <div class="container">
      <div class="w1200">
        <div class="breadcrumb">
          <breadcrumb>
              <breadcrumb-item><i type="home"></i><nuxt-link to="/">巨正源</nuxt-link></breadcrumb-item>
              <breadcrumb-item><nuxt-link to="/advance">预售列表</nuxt-link></breadcrumb-item>
              <breadcrumb-item>放料列表</breadcrumb-item>
          </breadcrumb>
        </div>

        <!--放料列表-->
        <div class="" style="margin: 10px auto;">
          <div class="XhlistTitle">
            <span style="width: 16%;">牌号</span>
            <span style="width: 12%;">厂商</span>
            <span style="width: 10%;">交货仓</span>
            <span style="width: 7%;">包装方式</span>
            <span style="width: 9%;">剩余数量（吨）</span>
            <span style="width: 11%;">单价（元/吨）</span>
            <span style="width: 18%;">合约完成量</span>
            <span style="width: 9%;">距下架时间</span>
            <span style="width: 8%;">操作</span>
          </div>
          <ul class="Xhlist">
            <template v-if="total > 0">
              <li v-for="(item, index) in feedingList" :key="index">
                <span style="width: 16%;">{{item.sku_name}}</span>
                <span style="width: 12%;white-space:nowrap;text-overflow:ellipsis;word-break:keep-all;overflow: hidden;">{{item.manufacturer}}</span>
                <span :title="item.warehouse_name" style="width: 10%; overflow: hidden;text-overflow: ellipsis; white-space: nowrap; cursor: default;">{{item.warehouse_name}}</span>
                <span style="width: 7%;" v-if='item.packing_modes=="1"'>标准包装</span>
                <span style="width: 7%;" v-else>非标准包装</span>
                <span style="width: 9%; display: flex; justify-content: center; align-items: center; position: relative">
                  <span style="position: relative">{{item.available_num}}</span>
                </span>
                <span class="orangeFont"
                      style="width: 11%;position:relative;padding-right:18px;">
                     <span style="position: relative">
                       {{$utils.amountFormat(item.final_price)}}
                        <i v-if="item.is_jry"  style="width: 15px; height: 18px; position: absolute; top: -10px; right: -15px; background:url('/img/Yi_icon.png')no-repeat;"></i>
                     </span>
                </span>
                <span style="width: 18%;" :title="`合约量：${item.plan_total_num}，待转单：${item.plan_available_num}`">
                  <Progress :percent="((item.plan_total_num - item.plan_available_num)*100/item.plan_total_num).toFixed(2)" :stroke-width="20"/>
                </span>
                <span style="width: 9%;">
                  <TimeDown :endTime="item.valid_time" endMsg="已结束" :onTimeOver="reloadPage"></TimeDown>
                </span>
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
          <Modal
              title="选择合约"
              v-model="selectPlanModalShow"
              @on-cancel="selectPlanModalCancel"
              :width='700'
              class-name="vertical-center-modal">
            <div class="">
              <Table size="small" border stripe highlight-row :columns="selectPlanColumns" :data="selectPlanData" :content="self" >
                <template slot-scope="{ row, index }" slot="action">
                  <Button type="primary" size="small" @click="toCreateOrder(curr_feeding_id, row.id)">转单</Button>
                </template>
              </Table>
            </div>
            <div slot="footer">
            </div>
          </Modal>
        </div>
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
				//获取放料列表
				store.dispatch('advance/getFeedingList', {
						current_page: query.page || 1,
						page_size: 6
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

				selectPlanModalShow: false,
				selectPlanData: [],
				selectPlanColumns: [
					{ title: '转单有效期', key: 'last_ordered_date',width: 160 },
					{ title: '合约编号', key: 'plan_no'},
					{ title: '合约总数', key: 'total_num'},
					{ title: '待转单数', key: 'available_num'},
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
			async getSalePlanList(feeding_id) {
				this.curr_feeding_id = feeding_id
				let params = {
					feeding_id: feeding_id
				}
				let res = await this.$utils.sendCurl(this, server.api.advance.getPlanByFeeding, params)
				if(res.status === 200 && res.data){
					if(res.data.length == 0){
						this.$utils.showWarning(this, '合约信息已改变，请刷新再操作！', function(){
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
				this.toCreateOrder(feeding_id, res.data[0].id)
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
  .lightfont{color: #2d8cf0;}
  .colorB{color:#666;}
  .arrow-up {
    background: url(/img/icon.png) no-repeat 42px -147px;
  }
  .newClass{
    width:19px; height:15px;
    position: absolute; top: -7px;  left: 84px;background: url(/img/new_icon.gif)no-repeat;background-size: cover;
  }
</style>
