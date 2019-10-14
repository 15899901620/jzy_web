<template>
  <div class="body">
    <Header title=""></Header>
    <div class="container" title="">
      <!--内容-->
      <Banner title="" :bannerData="$store.state.common.adList.ad1" :heightNum="this.heightNum" style="height: 320px; overflow: hidden;"/>
      <div class="memberCenter">
        <hotrecommend>
          <hotinfo title=""></hotinfo>
        </hotrecommend>
      </div>
      <div class="hotbidding">
        <outpacking title="限时竞拍" cpadding="0px" :more="bidderData">
          <div slot="content">
            <hotbidding></hotbidding>
          </div>
        </outpacking>
      </div>
      <div class="hot-spot">
        <outpacking title="现货超市" cpadding="0px" :more="spotData">
          <div slot="content">
            <spot-list></spot-list>
          </div>
        </outpacking>
      </div>
      <!-- <div class="hot-spot">
        <outpacking title="物流找车" cpadding="0px" :more="logData">
          <div slot="content" style="display: flex;">
            <div class="logistic_banner">
              <img src="/img/logistics_banner.png"/>
            </div>
            <logistics-list></logistics-list>
          </div>
        </outpacking>
      </div> -->
      <div class="co-brands">
        <outpacking title="合作品牌" cpadding="0px">
          <div slot="content">
            <cobrands></cobrands>
          </div>
        </outpacking>
      </div>
      <div class="hot-industry" style=" overflow: hidden">
        <newsinfo></newsinfo>
      </div>
      <sidebar></sidebar>
    </div>
    <Footer size="default"   style="margin-top:18px;"></Footer>
  </div>
</template>

<script>

import { mapState } from 'vuex'
import Cookies from 'js-cookie'
// import { setStore, getStore } from '../plugins/storage'
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
import indexnewstabs from '../components/indexnewstabs'
import newsinfo from '../components/indexnews'
import {setCookies} from "../config/storage";
import { getCookies } from '../config/storage'


export default {
  fetch({store}) {
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
      //获取轮播图
      store.dispatch('common/getBannerList', 1),
      store.dispatch('article/getArticleList', {current_page:  1, page_size: 4, catId: 6,sortBy: 'add_time', desc: true, isShow: 1}),
      store.dispatch('article/getArticleCatList',{parentId: 0}),
      store.dispatch('article/getindexArticleList',{catId:this.articleCates}),
      //获取网站公告
      store.dispatch('article/getNoticeList', {
        current_page: 1,
        page_size: 5,
        sortBy: 'add_time', desc: true, isShow: 1
      }),
      //获取行业资讯
      store.dispatch('article/getHotArticle', {
        current_page: 1,
        page_size: 4, sortBy: 'add_time', desc: true, isShow: 1
      }),
      //获取竞拍列表
      store.dispatch('bidders/getAuctionList', {
        current_page: 1,
        page_size: 8
      }),
      //获取现货列表
      store.dispatch('spot/getSpotList', {
        current_page: 1,
        page_size: 20
      }),
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
    hottrade,
    sidebar,
    LogisticsList,
    SpotList,
    indexnewstabs,
    newsinfo
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
      articleCates:{},
    }
  },
  computed: {
    ...mapState({
      bannerinfo: state => state.system.bannerinfo
    })
  }
}
</script>
