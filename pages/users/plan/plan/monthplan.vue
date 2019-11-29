<template>
    <div>
        <Table size="small" border stripe :loading="loading" highlight-row :columns="sourcecolumns" :data="datalist" :content="self" >
            <template slot-scope="{ row, index }" slot="action" v-if="row.status === 'DR'">
                <Button title="编辑" type="primary" size="small"  @click="editdischargeData(row)" icon="md-brush"  style="margin-right: 5px;">编辑</Button>
            </template>
               <template slot-scope="{ row, index }" slot="status">
                <Tag color="default" v-if="row.status === 'VO'">已取消</Tag>
                <Tag color="primary" v-else-if="row.status === 'DR'">等待审核</Tag>
                <Tag color="warning" v-else-if="row.status === 'AP'">正在审核</Tag>
                <Tag color="success" v-else-if="row.status === 'CO'">审核通过</Tag>
              </template>
            
        </Table>
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
            sourcecolumns: [
                {
                    title: '月份',
                    width: '65',
                    align: 'center',
                    key: 'month'
                },
                {
                    title: '月计划编号',
                    width: '130',
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

        async sourceData () {
            let params = {
                yearId: this.monthData.id
            }
            var res = await sendHttp(this, true, server.api.month.MonthPlannedByYearPlanId, params)
             console.log(res)
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
