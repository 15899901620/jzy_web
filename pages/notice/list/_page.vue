<template>
    <div class="body">
        <Header title="头部"></Header>
        <div class="container" title="内容区块">
            <div class="breadcrumb">
                <breadcrumb>
                    <breadcrumb-item><i type="home"></i><nuxt-link to="/">巨正源</nuxt-link></breadcrumb-item>
                    <breadcrumb-item>网站公告</breadcrumb-item>
                </breadcrumb>
            </div>
            <div class="Pages">
                <div class="Pages_left">
                    <outpacking title="网站公告" :total="noticelist.total">
                        <div slot="content">
                            <ul class="NewContentlist">
                                <li v-for="(items, index) in noticelist.items" :key="index">
                                    <div class="News_content">
                                        <h2><nuxt-link :to="{name:'notice-detail-id', params:{id:items.id}}">{{items.title}}</nuxt-link></h2>
                                        <div class="NewsList_text">{{items.seoDescription}}</div>
                                        <div class=" mt20">
                                            <div class="dflexAlem fl"><img src="../../../assets/img/newsTime.png"/><span class="gray ml10">{{items.addTime}}</span></div><div class="gray fl ml30">来源：<nuxt-link to="/">巨正源</nuxt-link></div>
                                            <nuxt-link class="blueFont fr" :to="{name:'notice-detail-id', params:{id:items.id}}">阅读更多</nuxt-link>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <div class="whitebg ovh text-xs-center" style="padding: 18px 0; text-align: center;">
                                <pagination :total="noticelist.total" urlPage="notice-list-page" :value="currPage"></pagination>
                            </div>
                        </div>
                    </outpacking>
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
import { mapState } from 'vuex'
import Header from '../../../components/header'
import Footer from '../../../components/footer'
import breadcrumb from '../../../components/breadcrumb'
import outpacking from '../../../components/outpacking'
import pagination from '../../../components/pagination'

export default {
    name: 'noticeList',
    fetch({ store, params }) {
        return Promise.all([
            store.dispatch('menu/getMenuList'),
            store.dispatch('system/getSystemCnf'),
            store.dispatch('helper/getHelpCate', {parentId: 0,indexShow: 1}),
            store.dispatch('system/getLinksInfo'),
            store.dispatch('notice/getNoticeList', {current_page: !params.page ? 1 : params.page, page_size: 10}),
            store.dispatch('notice/getNoticeHotList',  {current_page: !params.page ? 1 : params.page, page_size: 10, sortBy: 'click', desc: 'desc'}),
        ])
    },
    components: {
        Header,
        Footer,
        outpacking,
        breadcrumb,
        breadcrumbItem:breadcrumb.item,
        pagination
    },
    head () {
        return {
            title: '网站公告-巨正源',
            meta: [
                { hid: 'keywords', name: 'keywords', content:'网站公告,巨正源' },
                { hid: 'description', name: 'description', content: '网站公告-巨正源' }
            ]
        }
    },
    computed:{
        ...mapState({
            currPage:  state => state.notice.currPage,
            noticelist: state => state.notice.noticelist,
            noticeHotlist: state => state.notice.noticeHotlist,
        })
    },
}
</script>