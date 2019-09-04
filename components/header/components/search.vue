<template>
  <div class="TopSearch">
    <div style="display: flex;">
      <input class="search-text" autocomplete="off" id="keyword" v-model="keyword" type="text" name="keyword" placeholder="请输入牌号、厂商进行搜索">
      <input class="search-btn" id="search_submit" type="button" v-on:click="gotoSearch" value="搜  索">
    </div>
    <div class="HotTip mt5 fs12" style="display: flex;">
        <span>热门搜索 :</span>
      <ul><li v-for="(item, index) in hotsearch" :key="index"><nuxt-link to="/">{{ item.searchKey }}</nuxt-link></li></ul>
    </div>
  </div>
</template>

<script>
import api from '../../../config/api'
import {gethotsearch} from '../../../api/helper'
import { setStore, getStore, hasStore} from '../../../config/storage'
import { parse, stringify } from 'qs'

export default {
    name: "search",
    data() {
        return {
            hotsearch:[],
            keyword: !this.$route.query.kd ? '' :this.$route.query.kd 
        }
    },
    methods: {
        async getHotSearch () {            
            if (!hasStore('hotsearch')) {
                let res = await gethotsearch(this, {})
                setStore('hotsearch',res.data,10)
                this.hotsearch = res.data
            } else {
                this.hotsearch = getStore('hotsearch')
            }
        },
        gotoSearch() {
            let kd = this.keyword
            if(!kd) return false;
            this.$router.push({name:'spot-page',query:{kd:kd}})
        }
    },
    created() {
        this.getHotSearch()
    },
    mounted() {
        this.getHotSearch()
    }
}
</script>
