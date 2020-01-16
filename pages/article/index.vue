<template>
    <div class="body">
        <Header name="头部"></Header>
        <div class="container" title="">
          <div class="breadcrumb">
            <breadcrumb>
              <breadcrumb-item><i type="home"></i><nuxt-link to="/">巨正源</nuxt-link></breadcrumb-item>
              <breadcrumb-item>{{this.currCategoryInfo.title}}</breadcrumb-item>
            </breadcrumb>
          </div>
          <div class="Pages">
            <div class="j_news_wrap">
              <div class="j_news_l">
                <h2 class="j_t mt20"><i>公司动态</i><span><nuxt-link :to="{name:'article-id', params:{id:6}}" >更多></nuxt-link></span></h2>
                <div class="j_n_pt" v-if="$store.state.article.articleList.length>0">

                  <div class="j_n_pic">
                    <img :src="$store.state.article.articleList[0].image" width="299" height="186"/>
                    <span>{{$store.state.article.articleList[0].title}}</span>
                  </div>
                  <ul class="j_n_text" >
                    <li v-for="(items, index) in $store.state.article.articleList" :key="index+1"> <nuxt-link :to="{name:'article-detail-id', params:{id:items.id}}"> {{items.title}}</nuxt-link> <span>{{items.time}}</span></li>
                  </ul>
                </div>
                <h2 class="j_t mt20"><i>市场行情</i><span><nuxt-link :to="{name:'article-id', params:{id:3}}" >更多></nuxt-link></span></h2>

                <ul class="j_mq"  v-if="$store.state.article.articleList2.length>0">
                  <div class="j_n_pic">
                      <img :src="$store.state.article.articleList2[0].image" width="299" height="186"/>
                  </div>
                  <li v-for="(items, index) in $store.state.article.articleList2" :key="index+1">
                      <span>{{items.title}}</span>
                      <nuxt-link :to="{name:'article-detail-id', params:{id:items.id}}">
                              <i v-html="items.content"></i>
                      </nuxt-link>
                  </li>
                </ul>


                <h2 class="j_t mt20"><i>信息公告</i></h2>
                <div class="j_n_pt">
                  <div class="j_n_info" style="margin-left: 22px;" v-if="$store.state.article.noticeInfo1.length>0">
                     <h3 class="fwb">招标公告</h3>
                    <ul class="j_n_info_l" style="margin-top: 15px;">
                      <li v-for="(items, index) in $store.state.article.noticeInfo1" :key="index"><nuxt-link :to="{name:'notice-detail-id', params:{id:items.id}}">{{items.title}}</nuxt-link><span>{{items.time}}</span></li>
                    </ul>
                  </div>
                  <div class="j_n_info"  v-if="$store.state.article.noticeInfo2.length>0">
                    <h3 class="fwb">销售公告</h3>
                    <ul class="j_n_info_l" style="margin-top: 15px;">
                      <li v-for="(items, index) in $store.state.article.noticeInfo2" :key="index"><nuxt-link :to="{name:'notice-detail-id', params:{id:items.id}}">{{items.title}}</nuxt-link><span>{{items.time}}</span></li>
                    </ul>
                  </div>
                  <div class="j_n_info" v-if="$store.state.article.noticeInfo3.length>0">
                    <h3 class="fwb">竞拍公告</h3>
                    <ul class="j_n_info_l" style="margin-top: 15px;">
                      <li  v-for="(items, index) in $store.state.article.noticeInfo3" :key="index"><nuxt-link :to="{name:'notice-detail-id', params:{id:items.id}}">{{items.title}}</nuxt-link><span>{{items.time}}</span></li>
                    </ul>
                  </div>
                </div>

              </div>


              <div  class="j_news_r">
                <div v-if="$store.state.article.articleList3.length>0">
                  <h2 class="j_t mt20"><i>今日行情</i><span> <nuxt-link :to="{name:'article-id', params:{id:2}}" >更多></nuxt-link></span></h2>
                  <ul class="j_t_in" style="height:214px;" >
                    <li v-for="(items, index) in $store.state.article.articleList3" :key="index"> <nuxt-link :to="{name:'article-detail-id', params:{id:items.id}}">{{items.title}}</nuxt-link><span>{{items.time}}</span></li>
                  </ul>
                </div>

                <div v-if="$store.state.article.noticeInfo.length>0">
                  <h2 class="j_t mt20"><i>网站公告</i><span><nuxt-link :to="{name:'notice-list-page'}">更多></nuxt-link></span></h2>
                  <ul class="j_t_in" style="height:388px;" >
                    <li v-for="(items, index) in $store.state.article.noticeInfo" :key="index"><nuxt-link :to="{name:'notice-detail-id', params:{id:items.id}}">{{items.title}}</nuxt-link><span>{{items.time}}</span></li>
                  </ul>
                </div>

                <div v-if="$store.state.article.articleList4.length>0">
                  <h2 class="j_t mt20"><i>行业资讯</i><span><nuxt-link :to="{name:'article-id', params:{id:1}}" >更多></nuxt-link></span></h2>
                  <ul class="j_t_in" style="height:211px;" >
                    <li v-for="(items, index) in $store.state.article.articleList4" :key="index"><nuxt-link :to="{name:'article-detail-id', params:{id:items.id}}">{{items.title}}</nuxt-link><span>{{items.time}}</span></li>
                  </ul>
                </div>
              </div>
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
          store.dispatch('article/getArticleList', {current_page: !query.page ? 1 : query.page, page_size: 6, catId:6 ,sortBy: 'add_time', desc: true, isShow: 1}),
          store.dispatch('article/getArticleList2', {current_page: !query.page ? 1 : query.page, page_size: 6, catId:3 ,sortBy: 'add_time', desc: true, isShow: 1}),
          store.dispatch('article/getArticleList3', {current_page: !query.page ? 1 : query.page, page_size: 6, catId:2 ,sortBy: 'add_time', desc: true, isShow: 1}),
          store.dispatch('article/getArticleList4', {current_page: !query.page ? 1 : query.page, page_size: 6, catId:1 ,sortBy: 'add_time', desc: true, isShow: 1}),
          store.dispatch('article/getHomeNotice', {desc: true,isShow: 1,page_size:12}),
          store.dispatch('article/getHomeNotice1', {typeId:1,desc: true,isShow: 1}),
          store.dispatch('article/getHomeNotice2', {typeId:2,desc: true,isShow: 1}),
          store.dispatch('article/getHomeNotice3', {typeId:4,desc: true,isShow: 1}),
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
    // head () {
    //     return {
    //         title:    this.currCategoryInfo.seoTitle+'-巨正源',
    //         meta: [
    //             { hid: 'keywords', name: 'keywords', content:   this.currCategoryInfo.seoKeywords +',巨正源' },
    //             { hid: 'description', name: 'description', content:    this.currCategoryInfo.seoDescription +'-巨正源' }
    //         ]
    //     }
    // },
    data() {
        return {

            currCategoryInfo : ''
        };
    },
    methods: {
        showTotal(total) {
            return `全部 ${total} 条`;
        },
        changePage (row) {
            let id = this.$route.params.id
            this.$router.push({name:'article-id',params:{id:id},query:{page:row}})
        },

    },
    mounted(){

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
            }
        }

    },
    computed:{
        ...mapState({
            currPage:  state => state.article.currPage,
            hotarticleInfo: state => state.article.hotarticleInfo,
            articleCat: state => state.article.articleCat,
            articecatDetail: state => state.article.articecatDetail,

        })
    },
    watch: {
      '$route' (to, from) {
          this.$router.go(0);
      }
    }
}
</script>

