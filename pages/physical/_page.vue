<template>
  <div class="body">
    <Header name="头部"></Header>
    <div class="container" title="">
      <div class="breadcrumb">
        <breadcrumb>
          <breadcrumb-item><i type="home"></i>
            <nuxt-link to="/">巨正源</nuxt-link>
          </breadcrumb-item>
          <breadcrumb-item>物性表</breadcrumb-item>
        </breadcrumb>
      </div>
      <div class="Pages">
        <div class="Pages_left">
          <outpacking title="物性表" :total="physicallist.total">
            <div slot="content">
              <div class="XHsearch whitebg" style="display: flex;">
                <span>分类</span>
                <Select v-model="condition.cate_id" clearable style="width:170px;padding-left: 10px;">
                  <i-option v-for="(item, index) in categoryList" :value="item.id" :key="index">{{ item.name }}
                  </i-option>
                </Select>
                <span class="ml30">牌号</span><input type="text" style='width:150px' v-model="condition.name" name="title"
                                                   class="PhysearchInput" placeholder="请输入牌号"/>
                <span class="ml30">加工级别</span>
                <Select v-model="condition.attr" clearable style="width:150px;padding-left: 10px;">
                  <i-option v-for="(item, index) in specList" :value="item.id" :key="index">{{ item.value }}</i-option>
                </Select>
                <!-- <span class="ml30">是否显示</span>
              <Select v-model="condition.attr" clearable style="width:100px;padding-left: 10px;">
                  <i-option v-for="(item, index) in isshow" :value="item.id" :key="index">{{ item.value }}</i-option>
              </Select> -->
                <div class="xhBtn" style="margin-left: 20px;" @click="submitSearch">搜索</div>

              </div>
            </div>
          </outpacking>
          <div style="margin-top:10px; background: #fff;">
            <ul class="phyList">
              <li v-for="(items,index) in physicallist.items" :key="index">
                <div class="phylistlist mt10 ml20 mb30">
                  <nuxt-link :to="{name:'physical-detail-id', params:{id:items.id}}">{{items.title}}</nuxt-link>
                  <div class="mt10">
                    加工级别 : {{items.rocessingLevelValue}}
                  </div>
                  <div class="mt10  gray">
                    <span>分类 :</span><span class="orangeFont ml10">{{items.cname1}}</span><span class="ml10">{{items.cname2}}</span><span
                      class="ml10">{{items.cname3}}</span>
                  </div>
                </div>
                <div class="dflexAlemJust mr20">
                  <nuxt-link class="phyDetail" :to="{name:'physical-detail-id', params:{id:items.id}}">查看详情</nuxt-link>
                </div>
              </li>
            </ul>
            <div class="whitebg ovh text-xs-center" style="padding: 18px 0; text-align: center;">
              <pages :total="physicallist.total" :pageSize="8" :show-total="showTotal" @change="changePage"
                     :value="currPage"></pages>
            </div>
          </div>
        </div>
        <div class="Pages_right">
          <outpacking title="热点推荐">
            <div slot="content">
              <ul class="newsWeek">
                <li v-for="(item, index) in physicalHotlist" :key="index">
                  <div v-if="index+1 ===1" class="Recommend_orangebg Recommend_icon">{{index+1}}</div>
                  <div v-else-if="index+1 === 2" class="Recommend_iconYellow Recommend_icon">{{index+1}}</div>
                  <div v-else-if="index+1 === 3" class="Recommend_iconYellow Recommend_icon">{{index+1}}</div>
                  <div v-else class="Recommend_icongray Recommend_icon">{{index+1}}</div>
                  <nuxt-link :to="{name:'physical-detail-id', params:{id:item.id}}">{{item.title}}</nuxt-link>
                </li>
              </ul>
            </div>
          </outpacking>
          <template v-if="this.bannerinfo.length>0">
            <div class="mt20" style="cursor: pointer" v-for="(item, index) in this.bannerinfo" :key="index"
                 @click="Tospot(item.adLink)">
              <img :src="item.adImg"/>
            </div>
          </template>
        </div>
      </div>
    </div>
    <Footer size="default" title="底部" style="margin-top:18px;"></Footer>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Header from '../../components/header'
import Footer from '../../components/footer'
import breadcrumb from '../../components/breadcrumb'
import outpacking from '../../components/outpacking'
import pagination from '../../components/pagination'

import server from '../../config/api'
import {sendHttp} from '../../api/common'

export default {
	name: 'noticeList',
	fetch({store, params, query}) {
		return Promise.all([
			//获取顶部、中部、底部导航信息
			store.dispatch('common/getNavList'),
			//获取系统配置
			store.dispatch('common/getSysConfig'),
			store.dispatch('helper/getHelpCate', {parentId: 0, indexShow: 1}),
			store.dispatch('common/getFriendlyList'),
			store.dispatch('physical/getphysicalList', {
				current_page: !query.page ? 1 : query.page,
				page_size: 8,
				title: !query.name ? '' : query.name,
				enable: 1,
				cid1: !query.cate_id ? 0 : query.cate_id,
				level_id: !query.attr ? 0 : query.attr,
			}),
			store.dispatch('physical/getphysicalHotList'),
			store.dispatch('system/getBannerInfo', {
				positionId: 10
			}),
		])
	},
	components: {
		Header,
		Footer,
		outpacking,
		breadcrumb,
		breadcrumbItem: breadcrumb.item,
		pages: pagination.pages
	},
	head() {
		return {
			title: '物性表-巨正源',
			meta: [
				{hid: 'keywords', name: 'keywords', content: '物性表,巨正源'},
				{hid: 'description', name: 'description', content: '物性表-巨正源'}
			]
		}
	},
	data() {
		return {
			condition: {
				cate_id: !this.$route.query.cate_id ? 0 : parseInt(this.$route.query.cate_id),
				name: !this.$route.query.name ? '' : this.$route.query.name,
				attr: !this.$route.query.attr ? 0 : parseInt(this.$route.query.attr),
			},
			title: '',
			purpose: '',
			feature: '',
			categoryList: [],
			specList: [],
			physicallist: [],
		}
	},
	computed: {
		...mapState({
			currPage: state => state.physical.currPage,
			physicalHotlist: state => state.physical.physicalHotlist,
			bannerinfo: state => state.system.bannerinfo,
		})
	},
	created() {
		this.initCategoryListData()
		this.initAttrListData()
		this.goodslist()
	},
	methods: {
		Tospot(link) {
			if (link) {
				this.$router.push({name: link})
			}
		},
		async initCategoryListData() {
			const res = await sendHttp(this, false, server.api.product.categoryList, {'pid': 0})
			this.categoryList = res.data
		},
		async initAttrListData() {
			const res = await sendHttp(this, false, server.api.product.attrlist, {'spec_id': 1})
			this.specList = res.data
		},
		async goodslist() {
			let params = {
				enable: 1,
				isShow: 1,
				cid1: this.condition.cate_id,
				title: this.condition.name,
				level_id: this.condition.attr,
				current_page: this.$route.query.page || 1,
				page_size: 8
			}
			const res = await sendHttp(this, false, server.api.product.goodslist, params)

			this.physicallist = res.data
			//this.specList = res.data
		},

		showTotal(total) {
			return `全部 ${total} 条`;
		},
		changePage(row) {
			let id = this.$route.params.id
			this.$router.push({name: 'physical-page', params: {id: id}, query: {page: row}})
		},
		submitSearch() {

			this.goodslist()
		}
	},
	watch: {
		'$route'(to, from) {
			this.$router.go(0);
		}
	}
}
</script>
