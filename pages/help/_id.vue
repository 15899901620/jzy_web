<template>
    <div class="body">
        <Header title="头部"></Header>
        <div class="container" title="内容区块">
            <div class="helpPage">
                <div class="helpCat">
                    <ul v-if="helpCatList">
                        <li v-for="(item, index) in helpCatList" :key="index">
                            <h4>{{item.title}}</h4>
                            <p v-for="(items, index2) in item.clist" :key="index2">
                                <nuxt-link :to="{name: 'help-id',params:{ id: items.id }}">{{ items.title }}</nuxt-link>
                            </p>
                        </li>
                    </ul>
                </div>
                <div class="detailInfo">
                    <h3 class="title">{{helpDetail.title}}</h3>
                    <div v-html="helpDetail.content"></div>
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

export default {
    data(){
        return{
        }
    },
    head () {
        return {
            title: this.helpDetail.title + '-巨正源',
            meta: [
                { hid: 'description', name: 'description', content: 'My custom description' }
            ]
        }
    },
    components: {
        Header,
        Footer
    },
    fetch({ store, params }) {
        return Promise.all([
            store.dispatch('menu/getMenuList'),
            store.dispatch('system/getSystemCnf'),
            store.dispatch('helper/getHelpCate', {parentId: 0,indexShow: 1}),
            store.dispatch('helper/getHelpCateAll',{parentId: 0, indexShow: 1}),
            store.dispatch('helper/gethelpDetail',{id:params.id}),
            store.dispatch('system/getLinksInfo')
        ])
    },
    computed:{
        ...mapState({
            helpCatList: state => state.helper.helpCatList,
            helpDetail: state => state.helper.helpDetail
        })
    },
    watch: {
        '$route' (to, from) {
            this.$router.go(0);
        },
    }
}
</script>
</script>
</script>