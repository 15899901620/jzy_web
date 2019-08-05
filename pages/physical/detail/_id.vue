<template>
  <div class="body">
      <Header title="头部"></Header>
      <div class="container" title="内容区块">
        <div class="breadcrumb">
          <breadcrumb>
            <breadcrumb-item><nuxt-link to="/">巨正源</nuxt-link></breadcrumb-item>
            <breadcrumb-item><nuxt-link to="/physical">物性表</nuxt-link></breadcrumb-item>
            <breadcrumb-item>{{this.physicaldetailinfo.title}}</breadcrumb-item>
          </breadcrumb>
        </div>
        <div class="Pages">
          <div class="Pages_left" style="background: #fff;">
            <div class="NewsDetail" >
              <h3 class="mt10 fs20">{{this.physicaldetailinfo.skuNo}}-{{this.physicaldetailinfo.title}}</h3>
              <div class="NewsDetail_tip mt20"  >
                <div class="dflexAlem">
                  <a href="/" class="blueFont">巨正源</a>
                  <div class="time">
                    <img src="/img/newsTime.png"/><span class="gray ml5">{{this.physicaldetailinfo.createTime}}</span>
                  </div>
                </div>
                <div class="newsShare">分享</div>
              </div>
              <div class="mt20 mb40 fs14" v-html="this.physicaldetailinfo.description"></div>
              <div class="mt20 mb40 fs14">
                <span>关键词:</span><span v-html="this.physicaldetailinfo.purposeValue"></span>
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
              <div class="mt20">
                <a href="">
                  <img src=" /img/phyAdv.png" />
                </a>
              </div>
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
  name: 'physicalDetailId',
  fetch({ store, params }) {
    return Promise.all([
      store.dispatch('menu/getMenuList'),
      store.dispatch('system/getSystemCnf'),
      store.dispatch('helper/getHelpCate', {parentId: 0,indexShow: 1}),
      store.dispatch('system/getLinksInfo'),
      store.dispatch('physical/getphysicalDetail', {id: !params.id ? 0 : params.id}),
      store.dispatch('physical/getphysicalHotList'),
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
      title: this.physicaldetailinfo.skuNo +'-'+this.physicaldetailinfo.title + '-巨正源',
      meta: [
          { hid: 'keywords', name: 'keywords', content: this.physicaldetailinfo.skuNo + this.physicaldetailinfo.purposeValue + this.physicaldetailinfo.featureValue  },
          { hid: 'description', name: 'description', content: !this.physicaldetailinfo.title }
      ]
    }
  },
  computed:{
    ...mapState({
        physicaldetailinfo: state => state.physical.physicaldetailinfo,
        physicalHotlist: state => state.physical.physicalHotlist,
    })
  }
}
</script>