<template>
    <div class="body">
        <Header title="头部"></Header>
        <div class="container" title="">
          <div class="breadcrumb">
            <breadcrumb>
              <breadcrumb-item><i type="home"></i><nuxt-link to="/">巨正源</nuxt-link></breadcrumb-item>
              <breadcrumb-item>{{this.currCategoryInfo.title}}</breadcrumb-item>
            </breadcrumb>
          </div>
          <div class="Pages">
            <div class="Pages_left">
              <outpacking :title="this.currCategoryInfo.title" v-if="!$store.state.article.articleTotal">
                <div slot="content">
                  <p style="width:100%; text-align:center">
                    <img src="../../static/img/Nothing.png"/>
                  </p>
                </div>
              </outpacking>
              <outpacking v-else :title="this.currCategoryInfo.title" :total="$store.state.article.articleTotal">
                <div slot="content">
                  <ul class="NewContentlist">
                    <li v-for="(items, index) in $store.state.article.articleList" :key="index">
                      <div class="newsImg">
                        <nuxt-link class="blueFont fr" :to="{name:'article-detail-id', params:{id:items.id}}"><img :src="items.image" :alt="items.title" :id="index"></nuxt-link>
                      </div>
                      <div class="News_content">
                        <nuxt-link :to="{name:'article-detail-id', params:{id:items.id}}">{{items.title}}</nuxt-link>
                        <div class="NewsList_text">{{items.seoDescription}}</div>
                        <div class=" mt20">
                          <div class="dflexAlem fl"><img src="/img/newsTime.png"/><span class="gray ml10">{{items.addTime}}</span></div><div class="gray fl ml30">来源：<nuxt-link to="/">巨正源</nuxt-link></div>
                          <nuxt-link class="blueFont fr" :to="{name:'article-detail-id', params:{id:items.id}}">阅读更多</nuxt-link>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <div class="whitebg ovh text-xs-center" style="padding: 18px 0; text-align: center;">
                    <pages :total="$store.state.article.articleTotal" :show-total="showTotal" :pageSize="6" @change="changePage" :value="currPage"></pages>
                  </div>
                </div>
              </outpacking>
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
import { mapState } from 'vuex'
import Header from '../../components/header'
import Footer from '../../components/footer'
import breadcrumb from '../../components/breadcrumb'
import outpacking from '../../components/outpacking'
import pagination from '../../components/pagination'
export default {
    name: 'articleList',
    fetch({ store, params, query }) {
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
          store.dispatch('article/getArticleList', {current_page: !query.page ? 1 : query.page, page_size: 6, catId: !params.id ? '' : params.id,sortBy: 'add_time', desc: true, isShow: 1}),
          store.dispatch('article/getHotArticle',  {current_page: 1, page_size: 10,sortBy: 'click', desc: true, isShow: 1}),
          store.dispatch('article/getArticleCatList',  {parentId: 0}),
          store.dispatch('article/getArticleCatDetail',  {id: !params.id ? 2 : params.id}),

        ])
    },
    components: {
        Header,
        Footer,
        outpacking,
        breadcrumb,
        breadcrumbItem:breadcrumb.item,
        pages: pagination.pages
    },
    head () {
        return {
            title:    this.currCategoryInfo.seoTitle+'-巨正源',
            meta: [
                { hid: 'keywords', name: 'keywords', content:   this.currCategoryInfo.seoKeywords +',巨正源' },
                { hid: 'description', name: 'description', content:    this.currCategoryInfo.seoDescription +'-巨正源' }
            ]
        }
    },
    data() {
        return {

            currCategoryInfo : ''
        };
    },
    methods: {
        showTotal(total) {
            console.log('total',total)
            return `全部 ${total} 条`;
        },
        changePage (row) {
            let id = this.$route.params.id
            this.$router.push({name:'article-id',params:{id:id},query:{page:row}})
        },

    },
    created(){
        let id = this.$route.params.id ? this.$route.params.id : 0
        let len = this.articleCat.length
        for (var i=0;i<len;i++)
        {
            if(this.articleCat[i].id == id){
                this.currCategoryInfo = this.articleCat[i]
                break
            }

        }
        if(this.currCategoryInfo == ''){
            this.currCategoryInfo = {
                title:'全部',
                seoKeywords:'全部',
                seoDescription:'全部',
                seoDescription:'全部',
            }
        }
    },
    computed:{
        ...mapState({
            currPage:  state => state.article.currPage,
            hotarticleInfo: state => state.article.hotarticleInfo,
            articleCat: state => state.article.articleCat,
            articecatDetail: state => state.article.articecatDetail
        })
    },
    watch: {
      '$route' (to, from) {
          this.$router.go(0);
      }
    }
}
</script>
