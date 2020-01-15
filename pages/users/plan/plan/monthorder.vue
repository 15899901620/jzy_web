<template>
    <div>
        <Table size="small" border stripe :loading="loading" highlight-row :columns="sourcecolumns"    :data="datalist" :content="self" >
            <template slot-scope="{ row, index }" slot="isDelivery" >
               	<span v-if="row.isDelivery == 0">
						自提
                </span>
                  <span v-if="row.isDelivery == 1">
						配送
                </span>
            </template>
               <template slot-scope="{ row, index }" slot="status">
                   <div style="padding: 10px; display: flex; flex-direction: column; align-items: center">
                  <span v-if="row.status == 3 || row.status == 4 "
                        class="greenFont">{{getOrderState(row.status)}}</span>
                  <span v-else-if="row.status == 0" class="gray">{{getOrderState(row.status)}}</span>
                  <span v-else class="orangeFont">{{getOrderState(row.status)}}</span>
                  <template v-if="row.status == 2">
                      <span style="color:#ff9800;border:1px solid #ff9800;border-radius:3px;padding:2px 3px;font-size: 8px;">待付{{$utils.amountFormat(row.totalAmount)}}</span>
                  </template>
                   </div>
              </template>
              <template slot-scope="{ row, index }" slot="availableNum"  >
                    <span  class="ml15"  :title="`月计划量：${row.monthNum}，待转单数量	：${row.availableNum}`">
                        <template  v-if="row.monthNum==0 && (row.monthNum-row.availableNum)==0 " >
                            <Progress :percent="0" :stroke-width="20" style="background-color: beige;"/>
                        </template>
                        <template v-else >
                            <Progress :percent="((row.monthNum-row.availableNum)*100/row.monthNum).toFixed(2)" :stroke-width="20"/>
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
            <Table size="small" border stripe highlight-row :columns="selectFeedingColumns" :data="selectFeedingData" :content="self" >
              <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" size="small" v-if="row.availableNum>0" @click="toCreateOrder(row.id, curr_plan_id)">下单</Button>
                <Button type="primary" size="small" v-else  disabled>下单</Button>
              </template>
            </Table>
          </div>
          <div slot="footer">
          </div>
        </Modal>
        <monthplanedit :isshow="editmodal" :datalist="editdata" @unChange="unEditdischarges" @onChange="editOnSuccess"></monthplanedit>
    </div>
</template>
<script>
import server from "../../../../config/api";
import config from '../../../../config/config'
import {sendHttp} from "../../../../api/common";
import monthplanedit from "./monthedit";
export default {
    props: {
        orderData: {
            type: Object
        },
    },
    components: {
         monthplanedit

    },
    data() {
        return {
            self: this,
            loading: false,
            weekData: {},
            datalist: [],
            applyShow:false,
            applyRecordID:0,
            addmodal: false,
            editmodal: false,
            rowweekdata: {},
            editdata: {},
            curr_plan_id:0,
            selectFeedingColumns: [
				{ title: '商品名称', key: 'skuName' },
                { title: '放料编号', key: 'feedingNo'},
                {title: '仓库', key: 'warehouseName'},
                { title: '放料单剩余数量', key: 'availableNum'},
                { title: '会员可下单数量', key: 'member_available_num'},
                {title: '操作',slot: 'action',
                    key: 'action'
                }
			],
            selectFeedingModalShow: false,
			selectFeedingData: [],
            sourcecolumns: [
                {
                    title: '商品信息',
                    width: '150',
                    align: 'center',
                    key: 'skuName'
                },
                {
                    title: '单价（元/吨）',
                    width: '120',
                    key: 'finalPriceFormat'
                },
                {
                    title: '数量（吨）',
                    width: '100',
                    align: 'center',
                    key: 'orderNum',
                },
                {
                    title: '库区',
                    width: '150',
                    align: 'center',
                    key: 'warehouseName'
                },
                {
                    title: '提货方式',
                    width: '100',
                    align: 'center',
                    slot: 'isDelivery',
                    key: 'isDelivery'
                },
                {
                    title: '订单总金额',
                    width: '120',
                    key: 'status'
                },
                {
                    title: '付款状态',
                    width: '150',
                    slot: 'status',
                    key: 'status'
                },
            ]
        }
    },
    methods: {
       	getOrderState(typeId) {
            return config.orderState[typeId]
        },
        closeApply(){
            this.applyShow = false
            this.sourceData()
        },
        selectFeedingModalCancel(){

        },
        editdischargeData (res) {
            this.editdata = res
            this.editmodal = true
        },
        unEditdischarges (res) {
             this.editmodal = res
        },
        editOnSuccess (res) {
            if (res === 'success') {
                this.sourceData()
            }
        },
        addweelplan (res) {
            this.rowweekdata = res
            this.addmodal = true
        },

        unEditdWeek (res) {
            this.addmodal = res
        },
        async getSaleFeedingList(planned_id){
            this.curr_plan_id = planned_id
			let params = {
				planned_id: planned_id
			}
            let res = await this.$utils.sendCurl(this, server.api.special.saleListByPlan, params)

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
                this.toCreateOrder(res.data[0].id, planned_id)
			}
        },
        toCreateOrder(feeding_id, planned_id){
            let url='/special/order/'+feeding_id+'?planned_id='+planned_id
            location.href =url
		},
        async sourceData () {
            let params = {
                orderType:4,
                sourceId: this.orderData.id
            }
             let res = await this.$utils.sendCurl(this, server.api.order.monthorder, params)
                if (res.status === 200) {
                    this.datalist = res.data.items.map(ite =>{
                        ite._expanded = false
                        return ite
                    })
                } else {
                    this.$Notice.warning({
                        title: '提醒',
                        desc: '获取不成功！请联系管理员'
                    })
                }

        }
    },
    created () {
    },
    mounted() {
        this.sourceData()
    },
    watch: {
        orderData: {
            handler (newValue, oldValue) {
                this.sourceData()
            },
            deep: true
        }
    }
}
</script>
