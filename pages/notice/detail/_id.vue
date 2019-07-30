<template>
  <div class="body">
      <Header title="头部"></Header>
      <div class="container" title="内容区块">
        <div class="breadcrumb">
          <breadcrumb>
            <breadcrumb-item><nuxt-link to="/">巨正源</nuxt-link></breadcrumb-item>
            <breadcrumb-item><nuxt-link to="/notice/list">网站公告</nuxt-link></breadcrumb-item>
            <breadcrumb-item>{{this.noticedetailinfo.title}}</breadcrumb-item>
          </breadcrumb>
        </div>
        <div class="Pages">
          <div class="Pages_left" style="background: #fff;">
            <div class="NewsDetail" >
              <h3 class="mt10 fs20">{{this.noticedetailinfo.title}}</h3>
              <div class="NewsDetail_tip mt20"  >
                <div class="dflexAlem">
                  <a href="/" class="blueFont">巨正源</a>
                  <div class="time">
                    <img src="../../../assets/img/newsTime.png"/><span class="gray ml5">{{this.noticedetailinfo.addTime}}</span>
                  </div>
                </div>
                <div class="newsShare">分享</div>
              </div>
              <div class="mt20 mb40 fs14" v-html="this.noticedetailinfo.content"></div>
            </div>
          </div>
          <div class="Pages_right">
              <outpacking title="热点推荐">
                  <div slot="content">
                      <ul class="newsWeek">
                          <li v-for="(item, index) in noticeHotlist" :key="index">
                            <div v-if="index+1 ===1" class="Recommend_orangebg Recommend_icon">{{index+1}}</div>
                            <div v-else-if="index+1 === 2" class="Recommend_iconYellow Recommend_icon">{{index+1}}</div>
                            <div v-else-if="index+1 === 3" class="Recommend_iconYellow Recommend_icon">{{index+1}}</div>
                            <div v-else class="Recommend_icongray Recommend_icon">{{index+1}}</div>
                            <nuxt-link :to="{name:'notice-detail-id', params:{id:item.id}}">{{item.title}}</nuxt-link>
                          </li>
                      </ul>
                  </div>
              </outpacking>
          </div>
        </div>
      </div>
      <Footer size="default" title="底部" style="margin-top:18px;"></Footer>
  </div>
</template>

<script>
import breadcrumb from '../../../components/breadcrumb'
import { mapState } from 'vuex'
import Header from '../../../components/header'
import Footer from '../../../components/footer'
import outpacking from '../../../components/outpacking'

export default {
  name: 'noticeDetailId',
  fetch({ store, params }) {
    return Promise.all([
      store.dispatch('menu/getMenuList'),
      store.dispatch('system/getSystemCnf'),
      store.dispatch('helper/getHelpCate', {parentId: 0,indexShow: 1}),
      store.dispatch('system/getLinksInfo'),
      store.dispatch('notice/getNoticeDetail', {id: !params.id ? 0 : params.id}),
      store.dispatch('notice/getNoticeDetailClick', {id: !params.id ? 0 : params.id}),
      store.dispatch('notice/getNoticeHotList',  {current_page: !params.page ? 1 : params.page, page_size: 10, sortBy: 'click', desc: 'desc'}),
    ])
  },
  components: {
    Header,
    Footer,
    breadcrumb,
    outpacking,
    breadcrumbItem:breadcrumb.item,
  },
  head () {
    return {
      title: !this.noticedetailinfo.seoTitle ?  this.noticedetailinfo.title + '-巨正源' : this.noticedetailinfo.seoTitle,
      meta: [
          { hid: 'keywords', name: 'keywords', content:!this.noticedetailinfo.seoKeywords ? '' : this.noticedetailinfo.seoKeywords  },
          { hid: 'description', name: 'description', content: !this.noticedetailinfo.seoDescription ? '' : this.noticedetailinfo.seoDescription }
      ]
    }
  },
  computed:{
    ...mapState({
        noticedetailinfo: state => state.notice.noticedetailinfo,
        noticeHotlist: state => state.notice.noticeHotlist,
    })
  }
}
</script>