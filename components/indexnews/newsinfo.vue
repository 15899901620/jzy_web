<template>
  <div :class="classes">
      <indextabs>
        <template v-for="(item,index) in articleCat">
          <indextabs-pane   :label="item.catName" :name='item.id'  >
            <ul class="Indexnews">
              <li v-for="(items, index) in indexarticelist[item.id]"  :key="index"  >
<!--                <div class="ml15 mr15 mt15 NewsImage">-->
<!--                  <a :href="'/article/detail/'+items.id" :title="items.title"><img :src="items.image" /></a>-->
<!--                </div>-->
                <div style="color: #666">【{{items.catName}}】</div>
                <div class="newsTile">
                  <router-link :to="{name:'article-detail-id', params:{id:items.id}}" :title="items.title">{{items.title}}</router-link></div>
                <div class="newsTimeLink">
                  <span class="dflexAlem">{{items.addTime}}</span>
<!--                  <router-link :to="{name:'article-detail-id', params:{id:items.id}}">【查看全文】</router-link>-->
                </div>
              </li>
            </ul>
          </indextabs-pane>
        </template>
      </indextabs>
  </div>
</template>

<script>
const prefixCls = 'ant-newsinfo'

import indextabs from '../indexnewstabs/indextabs'

import { mapState } from 'vuex'

export default {
  name: "newsinfo",
  components: {
    indextabs,
    indextabsPane: indextabs.pane
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
        { [`${prefixCls}-newsinfo`]: this.vertical },
      ];
    },
  }
}
</script>

