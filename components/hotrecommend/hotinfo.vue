<template>
  <div :class="classes">
      <tabs>
        <tabs-pane label="网站公告" name='1'>
          <ul class="newscont">
            <li v-for="(item, index) in noticeInfo" :key="index">
              <span>{{item.time}}</span>
              <nuxt-link :to="{name:'notice-detail-id', params:{id:item.id}}">
                {{item.title}}
              </nuxt-link>
            </li>
          </ul>
        </tabs-pane>
        <tabs-pane label="行业资讯" name='2' style="display: none;">
          <ul class="newscont">
            <li v-for="(item, index) in articleInfo" :key="index">
              <span>{{item.time}}</span>
              <nuxt-link :to="{name:'article-detail-id', params:{id:item.id}}">
                {{item.title}}
              </nuxt-link>
            </li>
          </ul>
        </tabs-pane>
      </tabs>
  </div>
</template>

<script>
const prefixCls = 'ant-hotinfo'
import { mapState } from 'vuex'
import tabs from '../tabs'

export default {
  name: "hotinfo",
  components: {
    tabs,
    tabsPane: tabs.pane
  },
  computed: {
    ...mapState({
        noticeInfo: state => state.article.noticeInfo,
        articleInfo: state => state.article.articleInfo
    }),
    classes() {
      return [
        `${prefixCls}`,
        { [`${prefixCls}-hotinfo`]: this.vertical },
      ];
    },
  },
  methods:{
   
  },
}
</script>
