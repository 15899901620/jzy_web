<template>
    <div>
        <Table size="small" border stripe :loading="loading" highlight-row :columns="sourcecolumns" :data="datalist" :content="self" >
            <template slot-scope="{ row, index }" slot="action" >
                <Button title="编辑" type="primary" size="small" v-if="row.status === 'DR' && row.status === 'CO'"  @click="editdischargeData(row)" icon="md-brush"  style="margin-right: 5px;">编辑</Button>
                <Button title="转单" type="info" size="small" v-if="row.availableNum > 0"  @click="getSaleFeedingList(row.id)"   style="margin-right: 5px;">转单</Button>
                <Button title="转单" type="primary" disabled size="small" v-else   style="margin-right: 5px;">转单</Button>
            </template>
               <template slot-scope="{ row, index }" slot="status">
                <Tag color="default" v-if="row.status === 'VO'">已取消</Tag>
                <Tag color="primary" v-else-if="row.status === 'DR'">等待审核</Tag>
                <Tag color="warning" v-else-if="row.status === 'AP'">正在审核</Tag>
                <Tag color="success" v-else-if="row.status === 'CO'">审核通过</Tag>
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
import {sendHttp} from "../../../../api/common";
import monthplanedit from "./monthedit";
export default {
    props: {
        monthData: {
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
                    title: '月份',
                    width: '65',
                    align: 'center',
                    key: 'month'
                },
                {
                    title: '月计划编号',
                    width: '150',
                    key: 'planNo'
                },
                {
                    title: '月计划量',
                    width: '100',
                    align: 'center',
                    key: 'monthNum',
                },
                {
                    title: '本计划执行量',
                    width: '120',
                    align: 'center',
                    key: 'availableNum'
                },
                {
                    title: '商品名称',
                    width: '165',
                    key: 'skuName'
                },
                {
                    title: '状态',
                    width: '120',
                    slot: 'status',
                    key: 'status'
                },
                {
                    title: '操作',
                    width: 200,
                    slot: 'action',
                    key: 'action'
                }
            ]
        }
    },
    methods: {
        addmonthplan () {

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
                    console.log(this.selectFeedingModalShow)
                    return
                }
                console.log(res)
                this.toCreateOrder(res.data[0].id, planned_id)
			}
        },
        toCreateOrder(feeding_id, planned_id){
             this.$router.push({name:'special-order-id',params:{id:feeding_id,planned_id:planned_id}})
		},
        async sourceData () {
            let params = {
                yearId: this.monthData.id
            }
            var res = await sendHttp(this, true, server.api.month.MonthPlannedByYearPlanId, params)
                if (res.status === 200) {
                    this.datalist = res.data.map(ite =>{
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
        monthData: {
            handler (newValue, oldValue) {
                this.sourceData()
            },
            deep: true
        }
    }
}
</script>
