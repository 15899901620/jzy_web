<template>
    <div class="body">
        <Header title="头部"></Header>
        <div v-if="!articledetail">
          <p style="width:100%; text-align:center">
            <img src="../../../static/img/Nothing.png"/>
          </p>
        </div>
        <div class="container" title="" v-else>
            <div class="breadcrumb">
                <breadcrumb>
                    <breadcrumb-item><nuxt-link to="/">巨正源</nuxt-link></breadcrumb-item>
                    <breadcrumb-item><nuxt-link :to="{name:'article-id', params:{id:this.articledetail.catId}}" >{{this.articledetail.catName}}</nuxt-link></breadcrumb-item>
                    <breadcrumb-item>{{this.articledetail.title}}</breadcrumb-item>
                </breadcrumb>
            </div>
            <div class="Pages">
                <div class="Pages_left" style="background: #fff;">
                    <div class="NewsDetail">
                        <h3 class="mt10 fs20">{{this.articledetail.title}}</h3>
                        <div class="NewsDetail_tip mt20">
                        <div class="dflexAlem">
                            <a href="/" class="blueFont">{{this.articledetail.author}}</a>
                            <div class="time">
                            <img src="/img/newsTime.png"/><span class="gray ml5">{{this.articledetail.addTime}}</span>
                            </div>
                        </div>
                        <div class="newsShare">分享</div>
                        </div>
                        <div class="mt20 mb40 fs14" v-html="this.articledetail.content" style="min-height: 80vh"></div>
                        <div class="new_other" style="margin-bottom:20px;">
                            <span v-if="!this.articledetail.lastPage.id">【上一篇】{{this.articledetail.lastPage.title}}</span>
                            <span v-else>【上一篇】
                                <nuxt-link :to="{name: 'article-detail-id', params:{ id: this.articledetail.lastPage.id }}">{{ this.articledetail.lastPage.title }}</nuxt-link>
                            </span>
                            <span v-if="!this.articledetail.nextPage.id">【下一篇】{{this.articledetail.nextPage.title}}</span>
                            <span v-else>【下一篇】
                                <nuxt-link :to="{name: 'article-detail-id', params:{ id: this.articledetail.nextPage.id }}">{{ this.articledetail.nextPage.title }}</nuxt-link>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="Pages_right">
                    <outpacking title="资讯分类">
                        <div slot="content">
                            <ul class="newsCate">
                                <li v-for="(items, index) in articleCat" :key="index">
                                    <nuxt-link :to="{name:'article-id', params:{id:items.id}}" >{{items.title}}</nuxt-link>
                                </li>
                            </ul>
                        </div>
                    </outpacking>
                    <outpacking title="热点推荐" style="margin-top:18px;">
                        <div slot="content">
                            <ul class="newsWeek">
                                <li v-for="(item, index) in hotarticleInfo" :key="index">
                                <div v-if="index+1 ===1" class="Recommend_orangebg Recommend_icon">{{index+1}}</div>
                                <div v-else-if="index+1 === 2" class="Recommend_iconYellow Recommend_icon">{{index+1}}</div>
                                <div v-else-if="index+1 === 3" class="Recommend_iconYellow Recommend_icon">{{index+1}}</div>
                                <div v-else class="Recommend_icongray Recommend_icon">{{index+1}}</div>
                                <nuxt-link :to="{name:'article-detail-id', params:{id:item.id}}">{{item.title}}</nuxt-link>
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
  name: 'articleDetailId',
  fetch({ store, params }) {
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

        store.dispatch('article/getArticleDetail', {id: !params.id ? 0 : params.id}),
        store.dispatch('article/getArticleClick', {id: !params.id ? 0 : params.id}),
        store.dispatch('article/getHotArticle',  {current_page: 1, page_size: 10}),
        store.dispatch('article/getArticleCatList',  {parentId: 0}),
    ])
  },
    head: {
        script: [
            { src: 'https://cdn.bootcss.com/social-share.js/1.0.16/js/social-share.min.js' }
        ],
        link: [
            { rel: 'stylesheet', href: 'https://cdn.bootcss.com/social-share.js/1.0.16/css/share.min.css' }
        ]
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
      title: !this.articledetail.seoTitle ?  this.articledetail.title + '-巨正源' : this.articledetail.seoTitle,
      meta: [
          { hid: 'keywords', name: 'keywords', content:!this.articledetail.seoKeywords ? '' : this.articledetail.seoKeywords  },
          { hid: 'description', name: 'description', content: !this.articledetail.seoDescription ? '' : this.articledetail.seoDescription }
      ]
    }
  },

  computed:{
    ...mapState({
        articledetail: state => state.article.articledetail,
        hotarticleInfo: state => state.article.hotarticleInfo,
        articleCat: state => state.article.articleCat
    })
  }
}
</script>
