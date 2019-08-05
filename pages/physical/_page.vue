<template>
    <div class="body">
        <Header title="头部"></Header>
        <div class="container" title="内容区块">
            <div class="breadcrumb">
                <breadcrumb>
                    <breadcrumb-item><i type="home"></i><nuxt-link to="/">巨正源</nuxt-link></breadcrumb-item>
                    <breadcrumb-item>物性表</breadcrumb-item>
                </breadcrumb>
            </div>
            <div class="Pages">
                <div class="Pages_left">
                    <outpacking title="物性表" :total="physicallist.total">
                        <div slot="content">
                            <div class="XHsearch whitebg" style="display: flex;">
                              
                                <span>牌号</span><input type="text" v-model="title" name="title"  class="PhysearchInput" placeholder="请输入牌号"/>
                                <span class="ml30">用途</span><input type="text" v-model="purpose" name="purpose"  class="PhysearchInput" placeholder="请输入用途"/>
                                <span class="ml30">特性</span><input type="text" v-model="feature"  name="feature" class="PhysearchInput" placeholder="请输入特性"/>
                                <div class="xhBtn" style="margin-left: 60px;" @click="submitSearch">搜索</div>
                        
                            </div>
                        </div>
                    </outpacking>
                    <div style="margin-top:10px; background: #fff;">
                        <ul class="phyList">
                            <li v-for="(items,index) in physicallist.items" :key="index">
                                <div class="phylistlist mt10 ml20 mb30">
                                    <nuxt-link :to="{name:'physical-detail-id', params:{id:items.id}}">{{items.title}}</nuxt-link>
                                    <div class="mt10">
                                        用途 :{{items.purposeValue}},{{items.rocessingLevelValue}},{{items.featureValue}}
                                    </div>
                                    <div class="mt10  gray">
                                        <span>分类 :</span><span class="orangeFont ml10">{{items.cname1}}</span><span class="ml10">{{items.cname2}}</span><span class="ml10">{{items.cname3}}</span>
                                    </div>
                                </div>
                                <div class="dflexAlemJust mr20">
                                    <nuxt-link class="phyDetail" :to="{name:'physical-detail-id', params:{id:items.id}}">查看详情</nuxt-link>
                                </div>
                            </li>
                        </ul>
                        <div class="whitebg ovh text-xs-center" style="padding: 18px 0; text-align: center;">
                            <pages :total="physicallist.total" :show-total="showTotal" @change="changePage" :value="currPage"></pages>
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
                        <img src="../../static/img/phyAdv.png" />
                        </a>
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
    name: 'noticeList',
    fetch({ store, params, query }) {
        return Promise.all([
            store.dispatch('menu/getMenuList'),
            store.dispatch('system/getSystemCnf'),
            store.dispatch('helper/getHelpCate', {parentId: 0,indexShow: 1}),
            store.dispatch('system/getLinksInfo'),
            store.dispatch('physical/getphysicalList', {
                current_page: !query.page ? 1 : query.page, 
                page_size: 10,
                title: !query.title ? '' : query.title,
                purposeValue: !query.purpose ? '' : query.purpose,
                featureValue: !query.feature ? '' : query.feature,
                }),
            store.dispatch('physical/getphysicalHotList'),
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
            title: '物性表-巨正源',
            meta: [
                { hid: 'keywords', name: 'keywords', content:'物性表,巨正源' },
                { hid: 'description', name: 'description', content: '物性表-巨正源' }
            ]
        }
    },
    data() {
        return {
            title: '',
            purpose: '',
            feature: '',
        }
    },
    computed:{
        ...mapState({
            currPage:  state => state.physical.currPage,
            physicallist: state => state.physical.physicallist,
            physicalHotlist: state => state.physical.physicalHotlist,
        })
    },
    methods: {
        showTotal(total) {
            return `全部 ${total} 条`;
        },
        changePage (row) {
            let id = this.$route.params.id
            this.$router.push({name:'physical-page',params:{id:id},query:{page:row}})
        },
        submitSearch(res) {
            let search = {
                title: this.title,
                purpose: this.purpose,
                feature: this.feature,
            }
            this.$router.push({ name:'physical-page',query:search })
        }
    },
    watch: {
        '$route' (to, from) {
            this.$router.go(0);
        }
    }
}
</script>