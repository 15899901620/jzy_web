<template>
  <div class="body">
    <Header name="头部"></Header>
    <div class="container" title="">
      <div class="w1200 fs14" style="margin-top:18px">
        <outpacking title="质检单" cpadding="0px">
          <div slot="content">
            <div class="whitebg" style="padding: 20px;">
              <Form :model="formSearch">
                <Row :gutter="24" index="">
                  <Col span="4">
                    <FormItem prop='batchNo'>
                      <Input placeholder="批次号" clearable v-model="formSearch.batchNo"/>
                    </FormItem>
                  </Col>
                  <Col span="4">
                    <FormItem prop='productionDate'>
                      <DatePicker type="month" placement="bottom-end" placeholder="生产年月"
                                  @on-change="selectTime"></DatePicker>
                    </FormItem>
                  </Col>
                  <Col span="4">
                    <FormItem prop='skuTitle'>
                      <Input placeholder="商品名称" clearable v-model="formSearch.skuTitle"/>
                    </FormItem>
                  </Col>
                  <Col span="4" style="padding:0px;">
                    <span @click="changePage(1)" style="margin: 0 10px;"><Button type="primary" icon="search">搜索</Button></span>
                    <Button @click="closeSearch">重置</Button>
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
            <ul class="qualityList">
              <template v-if="datalist.length > 0">
                <li v-for="(items,index) in datalist" :key="index">
                  <span style="width: 20%">{{items.skuNo}}</span>
                  <span style="width: 20%">{{items.skuTitle}}</span>
                  <span style="width: 20%">{{items.productionDate}}</span>
                  <span style="width: 20%">{{items.batchNo}}</span>
                  <span style="width: 20%">
                    <p class="qualitySeeDetail"><a :href="items.inspectionElc" target="_blank">查看质检单</a></p>
                  </span>
                </li>
              </template>
              <template v-else>
                <li>
                  <p style="width:100%; text-align:center; font-size: large;padding-top: 30px;">暂无任何符合条件的质检单信息！</p>
                </li>
              </template>
            </ul>
            <div class="whitebg ovh text-xs-center" style="padding: 30px 0" v-if="datalist">
              <pages :total="total" :pageSize="page_size"
                     :otherParams="`batchNo=${this.formSearch.batchNo}&productionDate=${this.formSearch.productionDate}`"
                     :show-total="showTotal" @change="changePage" :value="current_page"></pages>
            </div>
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
import Header from '../components/header'
import Footer from '../components/footer'
import pagination from '../components/pagination'
import outpacking from '../components/outpacking'

import server from '../config/api'
import {sendHttp} from '../api/common'

export default {
	name: "quality-page",
	fetch({
					store
				}) {
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

		])
	},
	components: {
		Header,
		Footer,
		outpacking,
		pages: pagination.pages
	},
	data() {
		return {
			showmodal: false,
			datalist: [],
			page_size: 10,
			current_page: this.$route.query.page ? this.$route.query.page : 1,
			total: 0,
			rowData: {},
			formSearch: {
				// skuNo: '',
				skuTitle: '',
				batchNo: !this.$route.query.batchNo ? '' : this.$route.query.batchNo,
				productionDate: !this.$route.query.productionDate ? '' : this.$route.query.productionDate,
			}
		}
	},
	methods: {
		async SourceData() {
			if (!this.formSearch.batchNo && !this.formSearch.productionDate && !this.formSearch.skuTitle) {
				return;
			}
			let params = {
				current_page: this.current_page,
				page_size: this.page_size,
				...this.formSearch
			}
			const res = await sendHttp(this, false, server.api.inspection.inspectionlistPage, params)
			this.datalist = res.data.items
			this.total = res.data.total
		},
		handleSearch() {
			if (!this.formSearch.batchNo && !this.formSearch.productionDate && !this.formSearch.skuTitle) {
				this.$Modal.warning({
					title: '提示',
					content: '请输入查询条件！'
				});
				return;
			}
			this.SourceData();
		},
		selectTime(res) {
			this.formSearch.productionDate = res
		},
		closeSearch() {
			this.formSearch.skuNo = ''
			this.formSearch.skuTitle = ''
			this.formSearch.batchNo = ''
			this.formSearch.productionDate = ''
			this.current_page = 1

			this.SourceData();
		},
		showTotal(total) {
			return `全部 ${total} 条`;
		},
		changePage(row) {
			this.current_page = row
			this.handleSearch()
		},
		seedetail(info) {
			this.rowData = info
			this.rowData.title = info.skuNo + info.skuTitle + '质检单'
			this.showmodal = true
		},
		cancel() {
			this.showmodal = false
		}

	},
	mounted() {
		this.SourceData()
	},
	watch: {
		/*'$route' (to, from) {
        this.$router.go(0);
    }*/
	}
}
</script>
<style scoped>
  .ivu-form-item {
    margin: 0px;
  }

  .qualitySeeDetail {
    width: 90px;
    margin: 0px auto;
  }
</style>
