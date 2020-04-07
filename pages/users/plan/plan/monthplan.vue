<template>
  <div>
    <Table size="small" border stripe :loading="loading" highlight-row :columns="sourcecolumns" @on-expand="getAttrVal"
           :data="datalist" :content="self">
      <template slot-scope="{ row, index }" slot="action">
        <Button title="编辑" type="primary" size="small" v-if="row.status === 'DR'" @click="editdischargeData(row)"
                style="margin-right: 5px;">编辑
        </Button>
        <Button title="转单" type="info" size="small" v-if="row.status === 'CO' && row.availableNum > 0 && row.feedingNum>0"
                @click="getSaleFeedingList(row.id)" style="margin-right: 5px;">转单
        </Button>
        <Button title="转单" type="primary" disabled size="small" v-if="row.status === 'CO' && row.availableNum > 0 && row.feedingNum==0" style="margin-right: 5px;">转单</Button>
        <Button type="success" size="small" v-if="row.status === 'CO'" target="_blank" @click="spotContract(row)">
          合同模板
        </Button>

				<Button v-if="sealType == 2" size="small" style="margin-bottom: 5px;" @click="toShowApplyContract(row.id)">开通电子印章</Button>
        <template v-else-if="row.contract_apply_status == 1 || row.contract_apply_status == 4">
          <Button type="success" size="small" target="_blank" @click="toShowApplyContract(row.id)">申请盖章</Button>
        </template>
        <template v-else-if="row.contract_apply_status == 2">
          <span>合同盖章中</span>
        </template>
        <template v-else-if="row.contract_apply_status == 3">
          <a :href="row.contract_final_pic" target="_blank" class="greenFont">查看合同</a>
        </template>
      </template>
      <template slot-scope="{ row, index }" slot="status">
        <Tag color="default" v-if="row.status === 'VO'">已取消</Tag>
        <Tag color="primary" v-else-if="row.status === 'DR'">等待审核</Tag>
        <Tag color="warning" v-else-if="row.status === 'AP'">正在审核</Tag>
        <Tag color="success" v-else-if="row.status === 'CO'">审核通过</Tag>
      </template>
      <template slot-scope="{ row, index }" slot="availableNum">
        <span class="ml15" :title="`月计划量：${row.monthNum}，待转单数量	：${row.availableNum}`">
          <template v-if="row.monthNum==0 && (row.monthNum-row.availableNum)==0 ">
              <Progress :percent="0" :stroke-width="20" style="background-color: beige;"/>
          </template>
          <template v-else>
              <Progress :percent="((row.monthNum-row.availableNum)*100/row.monthNum).toFixed(2)"
                        :stroke-width="20"/>
          </template>
        </span>
      </template>

    </Table>
    <Modal
        title="选择放料"
        v-model="selectFeedingModalShow"
        @on-cancel="selectFeedingModalCancel"
        :width='700'
        class-name="vertical-center-modal">
      <div class="">
        <Table size="small" border stripe highlight-row :columns="selectFeedingColumns" :data="selectFeedingData"
               :content="self">
          <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" v-if="row.availableNum>0" @click="toCreateOrder(row.id, curr_plan_id)">
              下单
            </Button>
            <Button type="primary" size="small" v-else disabled>下单</Button>
          </template>
        </Table>
      </div>
      <div slot="footer">
      </div>
    </Modal>
    <monthplanedit :isshow="editmodal" :datalist="editdata" @unChange="unEditdischarges"
                   @onChange="editOnSuccess"></monthplanedit>
    <paperApply :isShow="paperApplyShow" :planId="record_id" :planType="5"></paperApply>
  </div>
</template>
<script>
import server from "../../../../config/api";
import {sendHttp} from "../../../../api/common";
import monthplanedit from "./monthedit";
import monthorder from './monthorder.vue'

import paperApply from "../../../../components/contract/paperApply"

export default {
	props: {
		monthData: {
			type: Object
		},
	},
	components: {
		monthplanedit,
		paperApply
	},
	data() {
		return {
			self: this,
			loading: false,
			weekData: {},
			datalist: [],
			applyShow: false,
			applyRecordID: 0,
			addmodal: false,
			editmodal: false,
			rowweekdata: {},
			orderData: {},
			editdata: {},
			curr_plan_id: 0,
			selectFeedingColumns: [
				{title: '商品名称', key: 'skuName'},
				{title: '放料编号', key: 'feedingNo'},
				{title: '仓库', key: 'warehouseName'},
				{title: '放料单剩余数量', key: 'availableNum'},
				{title: '会员可下单数量', key: 'member_available_num'},
				{title: '操作', slot: 'action', key: 'action'}
			],
			selectFeedingModalShow: false,
			selectFeedingData: [],
			sourcecolumns: [
				{
					type: 'expand',
					width: 40,
					render: (h, params) => {
						return h(monthorder, {
							props: {
								orderData: this.orderData
							}
						})
					}
				},
				{title: '月份', width: '65', align: 'center', key: 'month'},
				{title: '月计划编号', width: '140', key: 'planNo'},
				{title: '月计划量', width: '90', align: 'center', key: 'monthNum',},
				{title: '待转数量', width: '90', align: 'center', key: 'availableNum'},
				{title: '计划完成率', width: '140', align: 'center', slot: 'availableNum', key: 'availableNum'},
				{title: '状态', width: '110', slot: 'status', key: 'status'},
				{title: '操作', width: 230, slot: 'action', key: 'action'}
			],

			sealType: 2,
			paperApplyShow: false,
			record_id: 0,
		}
	},
	methods: {
		spotContract(row) {
			window.open("/users/spotContract?type=5&id=" + row.id)
		},
		closeApply() {
			this.applyShow = false
			this.sourceData()
		},
		selectFeedingModalCancel() {
			this.selectFeedingModalShow = false
		},
		editdischargeData(res) {
			this.editdata = res
			this.editmodal = true
		},
		unEditdischarges(res) {
			this.editmodal = res
		},
		editOnSuccess(res) {
			if (res === 'success') {
				this.sourceData()
			}
		},
		addweelplan(res) {
			this.rowweekdata = res
			this.addmodal = true
		},

		unEditdWeek(res) {
			this.addmodal = res
		},
		async getSaleFeedingList(planned_id) {
			this.curr_plan_id = planned_id
			let params = {
				planned_id: planned_id
			}
			let res = await this.$utils.sendCurl(this, server.api.special.saleListByPlan, params)
			if (res.status === 200 && res.data) {
				if (res.data.length == 0) {
					this.$utils.showWarning(this, '放料信息已改变，请刷新再操作！', function () {
						location.reload(true)
					})
					return
				}
				if (res.data.length > 1) {
					//显示放料选择窗口
					this.selectFeedingData = res.data
					this.selectFeedingModalShow = true
					return
				}
				this.toCreateOrder(res.data[0].id, planned_id)
			}
		},
		toCreateOrder(feeding_id, planned_id) {
			let url = '/special/order/' + feeding_id + '?planned_id=' + planned_id
			location.href = url
		},
		async sourceData() {
			let params = {
				yearId: this.monthData.id
			}
			var res = await sendHttp(this, true, server.api.month.MonthPlannedByYearPlanId, params)
			if (res.status === 200) {
				this.datalist = res.data.map(ite => {
					ite._expanded = false
					return ite
				})
			} else {
				this.$Notice.warning({
					title: '提醒',
					desc: '获取不成功！请联系管理员'
				})
			}

		},
		getOrderState(typeId) {
			return config.orderState[typeId]
		},
		getAttrVal(row, status) {

			if (status) {
				this.datalist.map((item, index) => {
					if (item.id === row.id) {
						item._expanded = true
						this.orderData = item
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
				location.href = '/users/seal'
				//注释掉，暂不让客户在线申请纸质盖章
				/*this.record_id = id
				this.paperApplyShow = true*/
			} else {
				sendHttp(this, true, server.api.contract.getElcSignUrl, {'plan_id': id, 'plan_type': 4}).then(response => {
					if (response.status === 200) {
						if((response.data.errorcode || 0) == 0){
							window.open(response.data)
						}else{
							alert(response.data.message)
						}
					}
				})
			}
		},
	},
	created() {
	},
	mounted() {
		this.sourceData()
		this.getSealType()
	},
	watch: {
		monthData: {
			handler(newValue, oldValue) {
				this.sourceData()
			},
			deep: true
		}
	}
}
</script>
