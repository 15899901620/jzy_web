<template>
	<div class="body">
		<Header title="头部"></Header>
		<div class="container" title="内容区块">
            <div class="w1200 fs14" style="margin-top:18px">
                <outpacking title="质检单" cpadding="0px">
					<div slot="content">
						<div class="whitebg" style="padding: 20px;" >
                            <Form :model="formSearch" >
                                <Row :gutter="24" index="">
                                    <!-- <Col span="4">
                                        <FormItem prop='skuNo'>
                                            <Input placeholder="商品编码" clearable v-model="formSearch.skuNo"/>
                                        </FormItem>
                                    </Col>
                                    <Col span="4">
                                        <FormItem prop='skuTitle'>
                                            <Input placeholder="商品标题" clearable v-model="formSearch.skuTitle"/>
                                        </FormItem>
                                    </Col> -->
                                    <Col span="4">
                                        <FormItem prop='batchNo'>
                                            <Input placeholder="批次号" clearable v-model="formSearch.batchNo"/>
                                        </FormItem>
                                    </Col>
                                    <Col span="4">
                                        <FormItem prop='productionDate'>
                                            <DatePicker type="date"  v-model="formSearch.productionDate" placeholder="生产日期"></DatePicker>
                                        </FormItem>
                                    </Col>
                                    <Col span="4" style="padding:0px;">
                                        <span @click="handleSearch" style="margin: 0 10px;"><Button type="primary" icon="search">搜索</Button></span>
                                        <Button @click="closeSearch" >重置</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                        <div class="qualityTitle">
                            <span style="width: 20%">商品编号</span>
                            <span style="width: 20%">商品名称</span>
                            <span style="width: 20%">生产日期</span>
                            <span style="width: 20%">批次号</span>
                            <span style="width: 20%">操作</span>
                        </div>
                        <ul class="qualityList" v-if="datalist.length > 0">
                            <li v-for="(items,index) in datalist"  :key="index"  >
                                <span style="width: 20%">{{items.skuNo}}</span>
                                <span style="width: 20%">{{items.skuTitle}}</span>
                                <span style="width: 20%">{{items.productionDate}}</span>
                                <span style="width: 20%">{{items.batchNo}}</span>
                                <span style="width: 20%">
                                    <p class="qualitySeeDetail" @click="seedetail(items)">查看质检单</p>
                                </span>
                            </li>
                        </ul>
					</div>
				</outpacking>
            </div>
		</div>
        <Modal 
            v-model="showmodal"  
            :title="rowData.title"
            @on-cancel="cancel"
            width="1200">
             <div class="show">
                 <img :src="rowData.inspectionElc">
             </div>
            <div slot="footer">
            </div>
        </Modal>
		<Footer size="default" title="底部" style="margin-top:18px;"></Footer>
	</div>
</template>

<script>
import {mapState} from 'vuex'
import Header from '../components/header'
import Footer from '../components/footer'
import outpacking from '../components/outpacking'
import { inspectionlistPage } from '../api/users'

export default {
    name: "quality-page",
    fetch({
        store
    }) {
        return Promise.all([
            store.dispatch('menu/getMenuList'),
            store.dispatch('system/getSystemCnf'),
            store.dispatch('helper/getHelpCate', {
                parentId: 0,
                indexShow: 1
            }),
            store.dispatch('system/getLinksInfo'),
            
        ])
    },
    components: {
        Header,
        Footer,
        outpacking
    },
    data() {
        return {
            showmodal: false,
            datalist:[],
            page_size:5,
            current_page:1,
            total: 0,
            rowData: {},
            formSearch: {
                // skuNo: '',
                // skuTitle: '',
                batchNo: !this.$route.query.batchNo ? '' : this.$route.query.batchNo,
                productionDate: !this.$route.query.productionDate ? '' : this.$route.query.productionDate,
            }
        }
    },
    methods: {
        async SourceData() {
            let params = {
                current_page: this.current_page,
                page_size: this.page_size,
                ...this.formSearch
            }
            const res = await inspectionlistPage(this, params)
            this.datalist = res.data.items
            this.total = res.data.total
        },
        handleSearch() {
            this.SourceData();
        },
        closeSearch () {
            this.formSearch.skuNo = ''
            this.formSearch.skuTitle = ''
            this.formSearch.batchNo = ''
            this.formSearch.productionDate = ''
            
            this.SourceData();
        },
        seedetail (info) {
            this.rowData = info
            this.rowData.title = info.skuNo + info.skuTitle + '质检单'
            this.showmodal = true
        },
        cancel () {
            this.showmodal = false
        }

    },
    mounted() {
        this.SourceData()
    },
    watch: {
        '$route' (to, from) {
            this.$router.go(0);
        }
    }
}
</script>
<style scoped>
.ivu-form-item {
    margin: 0px;
}
.qualitySeeDetail {
    width: 90px;
    margin:  0px auto;
}
</style>
