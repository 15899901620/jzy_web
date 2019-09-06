<template>
	<div class="body">
		<Header title="头部"></Header>
		<div class="container" title="内容区块">
			<!--内容-->
			<Banner title="广告" :bannerData="this.bannerinfo" :heightNum="this.heightNum"
				style="height: 320px; overflow: hidden;"></Banner>
			<div class="memberCenter">
				<hotrecommend>
					<hotinfo title="最新资讯&公告"></hotinfo>
				</hotrecommend>
			</div>
			<div class="hotbidding">
				<div class="Time_Banner pr">
					<img src="/img/Time_banner.png" />
					<a class="bidders_front" href="/bidders"></a>
				</div>
				<hotbidding title="热门竞拍"></hotbidding>
			</div>
      <div class="hot-spot">
	      <outpacking title="现货超市" cpadding="0px" :more="spotData">
          <div slot="content">
            <spot-list></spot-list>
          </div>
    	  </outpacking>
      </div>
      <div class="hot-spot">
	      <outpacking title="物流找车" cpadding="0px" :more="logData">
          <div slot="content" style="display: flex;">
            <div class="logistic_banner">
              <img src="/img/logistics_banner.png" />
            </div>
            <logistics-list></logistics-list>
          </div>
    	  </outpacking>
      </div>
			<div class="co-brands">
				<outpacking title="合作品牌" cpadding="0px">
					<div slot="content">
						<cobrands></cobrands>
					</div>
				</outpacking>
			</div>
			<div class="hot-industry">
				<outpacking title="行业资讯" cpadding="0px" :more="moreData">
					<div slot="content">
						<hottrade></hottrade>
					</div>
				</outpacking>
			</div>
			<sidebar></sidebar>
		</div>
		<Footer size="default" title="底部" style="margin-top:18px;"></Footer>
	</div>
</template>

<script>
import api from '../config/api'
import { mapState } from 'vuex'
import Header from '../components/header'
import Footer from '../components/footer'
import Banner from '../components/banner'
import hotrecommend from '../components/hotrecommend'
import hotbidding from '../components/hotbidding'
import outpacking from '../components/outpacking'
import cobrands from '../components/cobrands'
import hottrade from '../components/hottrade'
import sidebar from '../components/sidebar'
import SpotList from '../components/spot-list'
import LogisticsList from '../components/logistics-list'


export default {
    async asyncData({ app }) {
        return await app.$axios.get(api.prefix + api.api.information.info)
            .then((res) => {
                return {
                    datalist: res.data.items
                }
            })
    },
    fetch({ store }) {
        return Promise.all([
            store.dispatch('menu/getMenuList'),
            store.dispatch('system/getSystemCnf'),
            store.dispatch('helper/getHelpCate', {
                parentId: 0,
                indexShow: 1
            }),
            store.dispatch('system/getLinksInfo'),
            store.dispatch('system/getBannerInfo', {
                positionId: 1
            }),
            store.dispatch('article/getHomeNotice', {
                current_page: 1,
                page_size: 8,
                sortBy: 'add_time', desc: true,isShow: 1
            }),
            store.dispatch('article/getHomeArticle', {
                current_page: 1,
                page_size: 8,sortBy: 'add_time', desc: true,isShow: 1
            }),
            store.dispatch('article/getHotArticle', {
                current_page: 1,
                page_size: 4
            }),
            store.dispatch('bidders/getHotBidderList', {
                current_page: 1,
                page_size: 20
            }),
            store.dispatch('spot/getSpotList', {
                current_page: 1,
                page_size: 20
            })  
        ])
    },

    components: {
        Header,
        Footer,
        Banner,
        hotrecommend,
        hotinfo: hotrecommend.hotinfo,
        hotbidding,
        outpacking,
        cobrands,
        hottrade,
        sidebar,
        LogisticsList,
        SpotList
    },
    data() {
        return {
            spotData: {
              title: '前往现货超市...',
              url: '/spot'
            },
            moreData: {
                title: '更多...',
                url: '/article/1'
            },
            logData:{
                title: '更多...',
                url: '/logistics'
            },
            heightNum: 320
        }
    },
    computed: {
      ...mapState({
        bannerinfo: state => state.system.bannerinfo,
      })
    },
    methods: {
       
    },
  
}
</script>
