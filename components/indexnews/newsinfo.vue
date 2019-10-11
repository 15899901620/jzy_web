<template>
  <div :class="classes">
      <indextabs>

        <template v-for="(item,index) in articleCat">
          <indextabs-pane   :label="item.catName" :name='item.id'  >
            <ul class="Indexnews">
              <li v-for="(items, index) in indexarticelist[item.id]"  :key="index"  >
                <div class="ml15 mr15 mt15 NewsImage">
                  <a :href="'/article/detail/'+items.id" :title="items.title"><img :src="items.image" /></a>
                </div>
                <div class="newsTile">
                  <router-link :to="{name:'article-detail-id', params:{id:items.id}}">{{items.title}}</router-link></div>
                <div class="newsTimeLink">
                  <span class="dflexAlem"><img src="../../static/img/time_icon.png" class="mr5"/>{{items.addTime}}</span>
                  <router-link :to="{name:'article-detail-id', params:{id:items.id}}">【查看全文】</router-link>
                </div>
              </li>
            </ul>
          </indextabs-pane>
        </template>

      </indextabs>
  </div>
</template>

<script>
const prefixCls = 'ant-hotinfo'
import indextabs from '../indexnewstabs/indextabs'
import { mapState } from 'vuex'

export default {
  name: "newsinfo",
  components: {
    indextabs,
    indextabsPane: indextabs.pane
  },

  mounted(){

  },
  created(){
    console.log("hotarticleInfo",this.hotarticleInfo)
    console.log("articleCat",this.articleCat)
    console.log("indexarticelist",this.indexarticelist)
  },

  computed: {

    ...mapState({
      hotarticleInfo: state => state.article.hotarticleInfo,
      articleCat: state => state.article.articleCat,
      indexarticelist: state => state.article.indexarticelist
    }),

    classes() {
      return [
        `${prefixCls}`,
        { [`${prefixCls}-tabs`]: this.vertical },
      ];
    },
  },
  methods:{

  },
}
</script>

