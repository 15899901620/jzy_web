<template>
  <div :class="classes">
      <tabs>
        <tabs-pane label="网站公告" name='1'>
          <ul class="newscont">
            <template v-if="$store.state.article.noticeList.length > 0">
              <li v-for="(item, index) in $store.state.article.noticeList" :key="index">
                <span>{{item.time}}</span>
                <nuxt-link :to="{name:'notice-detail-id', params:{id:item.id}}">
                  {{item.title}}
                </nuxt-link>
              </li>
            </template>
            <template v-else>
              <li>暂无公告信息</li>
            </template>
          </ul>
        </tabs-pane>
        <tabs-pane label="公司动态" name='2' style="display: none;">
          <ul class="newscont">
            <template v-if="$store.state.article.articleList.length > 0">
            <li v-for="(item, index) in $store.state.article.articleList" :key="index">
              <span>{{item.time}}</span>
              <a :href="`/article/detail/${item.id}`">
                {{item.title}}
              </a>
            </li>
            </template>
            <template v-else>
              <li>暂无行业资讯</li>
            </template>
          </ul>
        </tabs-pane>
      </tabs>
  </div>
</template>

<script>
const prefixCls = 'ant-hotinfo'
import tabs from '../tabs'

export default {
  name: "hotinfo",
  components: {
    tabs,
    tabsPane: tabs.pane
  },

  mounted(){

  },
  computed: {
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
