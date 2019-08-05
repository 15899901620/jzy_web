<template>
    <div :class="classes">
        <ul class="Indexnews">
            <li v-for="(item, index) in hotarticleInfo" :key="index"  >
                <div class="ml15 mr15 mt15 NewsImage">
                    <nuxt-link  :to="{name:'article-detail-id', params:{id:item.id}}"  :title="item.title"><img :src="item.image" /></nuxt-link>
                </div>
                <div class="newsTile">
                    <nuxt-link :to="{name:'article-detail-id', params:{id:item.id}}">{{item.title}}</nuxt-link></div>
                <div class="newsTimeLink">
                    <span class="dflexAlem"><img src="../../static/img/time_icon.png" class="mr5"/>{{item.addTime}}</span>
                    <nuxt-link :to="{name:'article-detail-id', params:{id:item.id}}">【查看全文】</nuxt-link>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
const prefixCls = 'ant-hottrade'
import { mapState } from 'vuex'

export default {
    name:'hottrade',
    computed: {
        ...mapState({
            hotarticleInfo: state => state.article.hotarticleInfo,
        }),
        classes() {
            return [
                `${prefixCls}`,
                { [`${prefixCls}-hottrade`]: this.vertical },
            ];
        },
    },
}
</script>

<style>

</style>
