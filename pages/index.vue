<template>
  <div class="body">
    <Header name="name" :topNavProp="indexData.nav.top" :middleNavProp="indexData.nav.middle" :configProp="indexData.config" :hotCategoryProp="indexData.hotCate" :hotProductProp="indexData.hotGoods" :levelSpecsProp="indexData.levelSpecs"></Header>
    <div class="container" title="">
      <!--内容-->
      <Banner title="" :bannerData="indexData.adList" :heightNum="this.heightNum" style="height: 320px; overflow: hidden;"/>
      <div class="memberCenter">
        <div class="mc_tm">
          <hotrecommend>
            <hotinfo :announcementListProp="indexData.announcementList" :newsListProp="indexData.newsList"></hotinfo>
          </hotrecommend>
        </div>
      </div>
       
      <div class="transaction_data"><h2>交易数据</h2>
        <div style="display: flex; justify-content: space-between; width: 90%">
        <span>今日成交量：<i>{{$utils.numFormat(indexData.turnoverInfo.todayNum)}}</i>昨日成交量：<i>{{$utils.numFormat(indexData.turnoverInfo.yesterdayNum)}}</i>月成交量：<i>{{$utils.numFormat(indexData.turnoverInfo.monthNum)}}</i>累计成交量：<i>{{$utils.numFormat(indexData.turnoverInfo.allNum)}}</i></span><b style="display: flex; align-items: center"><img src="/img/new_time.gif">更新时间：{{indexData.turnoverInfo.ctime}}</b>
        </div>
      </div>
      <div class="transaction_data"><h2>网站公告</h2>
        <marqueeText :newsListProp="indexData.announcementList"></marqueeText>
        <span class='more' @click="announe">更多</span>
      </div>
      <div class="hotbidding">
        <outpacking title="限时竞拍" cpadding="0px" :more="bidderData">
          <div slot="content">
            <hotbidding :auctionListProp="indexData.auctionList"></hotbidding>
          </div>
        </outpacking>
      </div>
      <div class="hot-spot">
        <outpacking title="现货超市" cpadding="0px" :more="spotData">
          <div slot="content">
            <spot-list :spotListProp="indexData.spotList"></spot-list>
          </div>
        </outpacking>
      </div>
      <!--
      <div v-if="indexData.config.INDEX_SHOW_INFOMATION == 1" class="hot-industry" style=" overflow: hidden">
        <newsinfo></newsinfo>
      </div>
      -->
      <div class="co-brands">
        <cobrands :isDelivery='0' :brandListProp="indexData.brandList" :friendListProp="indexData.friendList"></cobrands>
      </div>
      <sidebar :configProp="indexData.config"></sidebar>
    </div>
    <Footer size="default" :configProp="indexData.config" :bottomNavProp="indexData.nav.bottom" :helpCatListProp="indexData.helpCateList" style="margin-top:18px;"></Footer>
  </div>
</template>

<script>

import { mapState } from 'vuex'
import Cookies from 'js-cookie'
import Header from '../components/header'
import Footer from '../components/footer'
import Banner from '../components/banner'
import hotrecommend from '../components/hotrecommend'
import hotbidding from '../components/hotbidding'
import outpacking from '../components/outpacking'
import cobrands from '../components/cobrands'
import sidebar from '../components/sidebar'
import SpotList from '../components/spot-list'
import LogisticsList from '../components/logistics-list'
import indexnewstabs from '../components/indexnewstabs'
import newsinfo from '../components/indexnews'
import marqueeText from '../components/marquee'

export default {
  fetch({store}) {
    return Promise.all([
      store.dispatch('page/getIndexData')
      /*//获取顶部、中部、底部导航信息
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
      //获取轮播图
      store.dispatch('common/getBannerList', 1),
      store.dispatch('common/getTurnoverInfo'),
      store.dispatch('article/getArticleList', {current_page:  1, page_size: 4, catId: 6,sortBy: 'add_time', desc: true, isShow: 1}),
      store.dispatch('article/getArticleCatList',{parentId: 0}),
      store.dispatch('article/getindexArticleList',{catId:this.articleCates}),
      //获取行业资讯
      store.dispatch('article/getHotArticle', {
        current_page: 1,
        page_size: 4, sortBy: 'add_time', desc: true, isShow: 1
      }),
      //获取竞拍列表
      store.dispatch('bidders/getAuctionList', {
        current_page: 1,
        page_size: 8,
        product_type:1
      }),
      //获取现货列表
      store.dispatch('spot/getSpotList', {
        current_page: 1,
        page_size: 6
      }),*/
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
    tabpacking:outpacking.tab,
    cobrands,
    sidebar,
    LogisticsList,
    SpotList,
    indexnewstabs,
    newsinfo,
    marqueeText
  },
  data() {
    return {
      bidderData: {
        title: '更多',
        url: '/bidders'
      },
      spotData: {
        title: '前往现货超市',
        url: '/spot'
      },
      moreData: {
        title: '更多',
        url: '/article/1'
      },
      logData: {
        title: '更多',
        url: '/logistics'
      },
      heightNum: 320,
      articleCates: {}
    }

  },
  computed: {
    ...mapState({
      indexData: state => state.page.indexData
      //bannerinfo: state => state.system.bannerinfo,
      //newItemList: state => state.article.noticeList
     })
  },
  methods:{
    announe(){
      this.$router.push({  name: "article" }) 
    }
  },
	head: {
		script: [
			 { body: true, src: 'https://wp.qiye.qq.com/qidian/2885709291/25de54b1b05179506f548d8f6e40700f', id: 'qd288570929125de54b1b05179506f548d8f6e40700f' }
		]
	}
}
</script>
