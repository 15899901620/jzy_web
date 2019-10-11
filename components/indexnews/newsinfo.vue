<template>
  <div :class="classes">
      <indextabs>


        <indextabs-pane v-for="(item, index) in indexarticelist " label="item.catName" name='index' :key="index">
          <ul class="Indexnews">
            <li v-for="(items, index) in item"  :key="index"  >
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







<!--        <indextabs-pane label="网站公告" name='1'>-->
<!--          <ul class="Indexnews">-->
<!--            <li v-for="(item, index) in hotarticleInfo" :key="index"  >-->
<!--              <div class="ml15 mr15 mt15 NewsImage">-->
<!--                <a :href="'/article/detail/'+item.id" :title="item.title"><img :src="item.image" /></a>-->
<!--              </div>-->
<!--              <div class="newsTile">-->
<!--                <router-link :to="{name:'article-detail-id', params:{id:item.id}}">{{item.title}}</router-link></div>-->
<!--              <div class="newsTimeLink">-->
<!--                <span class="dflexAlem"><img src="../../static/img/time_icon.png" class="mr5"/>{{item.addTime}}</span>-->
<!--                <router-link :to="{name:'article-detail-id', params:{id:item.id}}">【查看全文】</router-link>-->
<!--              </div>-->
<!--            </li>-->
<!--          </ul>-->
<!--        </indextabs-pane>-->




<!--        <indextabs-pane label="公司动态" name='2' style="display: none;">-->
<!--          <ul class="Indexnews">-->
<!--            <li v-for="(item, index) in hotarticleInfo" :key="index"  >-->
<!--              <div class="ml15 mr15 mt15 NewsImage">-->
<!--                <a :href="'/article/detail/'+item.id" :title="item.title"><img :src="item.image" /></a>-->
<!--              </div>-->
<!--              <div class="newsTile">-->
<!--                <router-link :to="{name:'article-detail-id', params:{id:item.id}}">{{item.title}}</router-link></div>-->
<!--              <div class="newsTimeLink">-->
<!--                <span class="dflexAlem"><img src="../../static/img/time_icon.png" class="mr5"/>{{item.addTime}}</span>-->
<!--                <router-link :to="{name:'article-detail-id', params:{id:item.id}}">【查看全文】</router-link>-->
<!--              </div>-->
<!--            </li>-->
<!--          </ul>-->
<!--        </indextabs-pane>-->
<!--        <indextabs-pane label="公司动态" name='3' style="display: none;">-->
<!--          <ul class="newscont">-->
<!--            <template v-if="$store.state.article.articleList.length > 0">-->
<!--              <li v-for="(item, index) in $store.state.article.articleList" :key="index">-->
<!--                <span>{{item.time}}</span>-->
<!--                <a :href="`/article/detail/${item.id}`">-->
<!--                  {{item.title}}-->
<!--                </a>-->
<!--              </li>-->
<!--            </template>-->
<!--            <template v-else>-->
<!--              <li>暂无行业资讯</li>-->
<!--            </template>-->
<!--          </ul>-->
<!--        </indextabs-pane>-->
<!--        <indextabs-pane label="公司动态" name='4' style="display: none;">-->
<!--          <ul class="newscont">-->
<!--            <template v-if="$store.state.article.articleList.length > 0">-->
<!--              <li v-for="(item, index) in $store.state.article.articleList" :key="index">-->
<!--                <span>{{item.time}}</span>-->
<!--                <a :href="`/article/detail/${item.id}`">-->
<!--                  {{item.title}}-->
<!--                </a>-->
<!--              </li>-->
<!--            </template>-->
<!--            <template v-else>-->
<!--              <li>暂无行业资讯</li>-->
<!--            </template>-->
<!--          </ul>-->
<!--        </indextabs-pane>-->
<!--        <indextabs-pane label="公司动态" name='5' style="display: none;">-->
<!--        <ul class="newscont">-->
<!--          <template v-if="$store.state.article.articleList.length > 0">-->
<!--            <li v-for="(item, index) in $store.state.article.articleList" :key="index">-->
<!--              <span>{{item.time}}</span>-->
<!--              <a :href="`/article/detail/${item.id}`">-->
<!--                {{item.title}}-->
<!--              </a>-->
<!--            </li>-->
<!--          </template>-->
<!--          <template v-else>-->
<!--            <li>暂无行业资讯</li>-->
<!--          </template>-->
<!--        </ul>-->
<!--      </indextabs-pane>-->
<!--        <indextabs-pane label="公司动态" name='6' style="display: none;">-->
<!--          <ul class="newscont">-->
<!--            <template v-if="$store.state.article.articleList.length > 0">-->
<!--              <li v-for="(item, index) in $store.state.article.articleList" :key="index">-->
<!--                <span>{{item.time}}</span>-->
<!--                <a :href="`/article/detail/${item.id}`">-->
<!--                  {{item.title}}-->
<!--                </a>-->
<!--              </li>-->
<!--            </template>-->
<!--            <template v-else>-->
<!--              <li>暂无行业资讯</li>-->
<!--            </template>-->
<!--          </ul>-->
<!--        </indextabs-pane>-->

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
    console.log("indexarticelist",this.indexarticelist)
  },

  computed: {

    ...mapState({
      hotarticleInfo: state => state.article.hotarticleInfo,
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

