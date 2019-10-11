<template>
    <div class="clearfix graybg">
        <div class="w1200 dflex " style="margin-bottom: 40px">
            <usernav></usernav>
            <div class="memberInfor ml20  whitebg bdccc  mt20">
                <h1 class="fs16 ml25 mt25 pb10 pr" style="border-bottom: 2px solid #DEDEDE;width: 95%;" >我的专料
                    <div class="bodbottom" style="width: 8%; height: 2px;"></div>
                </h1>
                <div class="" style="width: 95%; margin: 0 auto;">
                    <div class="order_operate">
                    <div class="dflex">
                        <Form :model="formSearch" style="float:left;" >
                            <FormItem prop='skuName' style="width:160px; display: inline-block;float:left;margin-right: 5px;margin-bottom:0px;">
                                <Input placeholder="输入订单号/商品名称查询" clearable v-model="formSearch.skuName" style="width: 160px" />
                            </FormItem>
                            <span @click="onSearch" style="margin: 0 10px;"><Button type="primary" icon="search">搜索</Button></span>
                            <Button @click="closeSearch" >重置</Button>
                        </Form>
                    </div>
                    </div>
                    <!--表格-->
                    <template>
                        <div>
                            <Table size="small" border stripe :loading="loading" highlight-row :columns="sourcecolumns" :data="datalist" :content="self" >
                                 <template slot-scope="{ row, index }" slot="status">
                                    <Tag color="primary" v-if="row.feedingType === '放'">{{row.feedingType}}</Tag>
                                    <Tag v-else color="warning">{{row.feedingType}}</Tag>
                                </template>
                            </Table>
                            <div style="margin: 10px auto;  float: right;">
                                <Page  :total="total" :current="current_page" @on-change="changePage" :page-size="page_size" @on-page-size-change="changePageSize" ></Page>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Navigation from '../../components/navigation'
import { specialList } from '../../api/special'
import { getCookies } from '../../config/storage'

export default {
    name: "userSpecmat",
	middleware: 'memberAuth',
    layout:'membercenter',
    components:{
        usernav: Navigation.user
    },
    fetch({ store }) {
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
            datalist: [],
            userinfo: {},
            formSearch: {
                skuName: '',
            },
            total: 0,
            page_size: 10,
            current_page: 1,
            sourcecolumns: [
                {
                    title: '类型',
                    width: '65',
                    slot: 'status',
                },
                {
                    title: '编号',
                    key: 'skuNo'
                },
                {
                    title: '商品名称',
                    key: 'skuName'
                },
                {
                    title: '厂商',
                    key: 'manufacturer'
                },
                {
                    title: '交货地',
                    key: 'warehouseName'
                },
                {
                    title: '单价',
                    key: 'finalPriceFormat'
                },
                {
                    title: '合同数量',
                    key: 'availableNum'
                },
                {
                    title: '已提吨数',
                    key: 'tokenNum'
                },
                {
                    title: '可提吨数',
                    key: 'maxCanDeliveryNum'
                }
            ]
        }
    },
    methods: {
        inLogin () {
            let userinfo = !getCookies('userinfor') ? '' : getCookies('userinfor')
            if (!userinfo) {
                this.$router.push('/login')
            }
            this.userinfo = userinfo
        },
        async sourceData () {
            this.loading = true
            let params = {
                current_page: this.current_page,
                page_size: this.page_size,
                status: 'CO',
                ...this.formSearch
            }
            const res = await specialList(this, params)
            if (res.status === 200) {
                this.datalist = res.data.items
                this.total = res.data.total
            } 
            this.loading = false
        },
        onSearch () {
            this.current_page = 1
            this.page_size = 20
            this.sourceData()
        },
        
        closeSearch () {
            this.current_page = 1
            this.page_size = 20
            this.sourceData()
        },
        changePage (row) {
            this.current_page = row
            this.sourceData()
        },
        changePageSize (row) {
            this.page_size = row
            this.sourceData()
        }
    },
    created() {
        this.inLogin()
    },
    mounted() {
        this.sourceData()
    }
}
</script>