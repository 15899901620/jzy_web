<template>
  <div class="clearfix graybg">
    <div class="w1200 dflex " style="margin-bottom: 40px">
      <usernav></usernav>
      <div class="memberInfor ml20  whitebg bdccc  mt20">
        <h1 class="fs16 ml25 mt25 pb10 pr" style="border-bottom: 2px solid #DEDEDE;width: 95%;">我的专料
          <div class="bodbottom" style="width: 8%; height: 2px;"></div>
        </h1>
        <div class="" style="width: 95%; margin: 0 auto;">
          <div class="order_operate">
            <div class="dflex">
              <Form :model="formSearch" style="float:left;">
                <FormItem prop='skuName'
                          style="width:160px; display: inline-block;float:left;margin-right: 5px;margin-bottom:0px;">
                  <Input placeholder="商品名称查询" clearable v-model="formSearch.skuName" style="width: 160px"/>
                </FormItem>
                <span @click="onSearch" style="margin: 0 10px;"><Button type="primary" icon="search">搜索</Button></span>
                <Button @click="closeSearch">重置</Button>
              </Form>
            </div>
          </div>
          <!--表格-->
          <template>
            <div>
              <Table size="small" border stripe :loading="loading" highlight-row :columns="sourcecolumns"
                     @on-expand="getAttrVal" :data="datalist" :content="self">
                <template slot-scope="{ row, index }" slot="status">
                  <Tag color="primary" v-if="row.feedingType === '放'">{{row.feedingType}}</Tag>
                  <Tag v-else color="warning">{{row.feedingType}}</Tag>
                </template>
                <template slot-scope="{ row, index }" slot="action">
                  <div style="padding: 10px 0px;">
                    <template v-if="row.contract_apply_status == 1 || row.contract_apply_status == 4">
                      <Button type="success" size="small" target="_blank" style="margin-bottom: 5px;" @click="toShowApplyContract(row.id)">申请盖章</Button>
                    </template>
                    <template v-else-if="row.contract_apply_status == 2">
                      <span style="margin-bottom: 5px;">合同盖章中</span>
                    </template>
                    <template v-else-if="row.contract_apply_status == 3">
                      <a style="margin-bottom: 5px;" :href="row.contract_final_pic" target="_blank" class="greenFont">查看合同</a>
                    </template>

                    <Button type="success" size="small" target="_blank" @click="spotContract(row)">合同模板</Button>
                  </div>
                </template>
                <template slot-scope="{ row, index }" slot="yearNum">
                  <span class="ml15" :title="`年计划量：${row.yearNum}，月计划总量：${row.monthAllNum}`">
                    <template v-if="row.yearNum==0 && row.monthAllNum==0 ">
                      <Progress :percent="0" :stroke-width="20" style="background-color: beige;"/>
                    </template>
                    <template v-else>
                      <Progress :percent="(row.monthAllNum*100/row.yearNum).toFixed(2)"
                                   :stroke-width="20"/>
                    </template>
                  </span>
                </template>
              </Table>
              <div style="margin: 10px auto;  float: right;">
                <Page :total="total" :current="current_page" @on-change="changePage" :page-size="page_size"
                      @on-page-size-change="changePageSize"></Page>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <paperApply :isShow="paperApplyShow" :planId="record_id" :planType="4"></paperApply>
  </div>
</template>

<script>
import Navigation from '../../components/navigation'
import {specialList, myYearList} from '../../api/special'
import monthplan from './plan/plan/monthplan.vue'

import server from '../../config/api'
import {sendHttp} from "../../api/common"
import paperApply from "../../components/contract/paperApply"

export default {
	name: "userSpecmat",
	middleware: 'memberAuth',
	layout: 'membercenter',
	components: {
		usernav: Navigation.user,
		paperApply
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
			self: this,
			loading: false,
			addmodalmonth: false,
			datalist: [],
			rowPlanData: {},
			userinfo: {},
			monthData: {},
			formSearch: {
				skuName: '',
			},
			total: 0,
			page_size: 10,
			current_page: 1,
			sourcecolumns: [
				{
					type: 'expand',
					width: 40,
					render: (h, params) => {
						return h(monthplan, {
							props: {
								monthData: this.monthData
							}
						})
					}
				},
				{title: '年份', width: '70', key: 'year',},
				{title: '年计划编号', key: 'planNo', width: '140',},
				{title: '年计划量', key: 'yearNum', width: '90'},
				{title: '年计划执行进度条', slot: 'yearNum', key: 'yearNum'},
				{title: '商品名称', key: 'skuName'},
				{title: '操作', width: '110', slot: 'action', key: 'action'},
			],

			sealType: 2,
			paperApplyShow: false,
			record_id: 0,
		}
	},
	methods: {
		async sourceData() {
			// this.loading = true
			let params = {
				current_page: this.current_page,
				page_size: this.page_size,
				...this.formSearch
			}
			const res = await myYearList(this, params)
			if (res.status === 200) {
				this.datalist = res.data.items.map(ite => {
					ite._expanded = false
					return ite
				})
				this.total = res.data.total
			}
			this.loading = false
		},
		spotContract(row) {
			window.open("/users/spotContract?type=4&id=" + row.id);
		},
		onSearch() {
			this.current_page = 1
			this.sourceData()
		},
		unAdddmonth(res) {
			this.datalist.map((item, index) => {
				item._expanded = false
			})
			this.addmodalmonth = res
		},
		addOnmonthSuccess(res) {
			if (res === 'success') {
				this.sourceData()
			}
		},
		addmonth(res) {
			this.rowPlanData = res
			this.addmodalmonth = true
		},
		closeSearch() {
			this.current_page = 1
			this.sourceData()
		},

		changePage(row) {
			this.current_page = row
			this.sourceData()
		},
		changePageSize(row) {
			this.page_size = row
			this.sourceData()
		},
		getAttrVal(row, status) {
			if (status) {
				this.datalist.map((item, index) => {
					if (item.id === row.id) {
						item._expanded = true
						this.monthData = item
					} else {
						item._expanded = false
						return item
					}
				})
			}
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
				this.record_id = id
				this.paperApplyShow = true
			}
		},
	},
	created() {
	},
	mounted() {
		this.sourceData()
	}
}
</script>
