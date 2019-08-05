<template>
  <div class="w1200 ">
    <div class="ListTitle  whitebg mt20">
      <div class="TitleName">行业资讯</div>
      <div @click="News()" class="mr20 mt15 mb15 gray fs14" >更多 ></div>
    </div>
    <ul class="Indexnews">
      <li v-for="(item, index) in Newsdatalist" :key="index"  >
        <div class="ml15 mr15 mt15 NewsImage">
          <img :src="item.image" />
        </div>
        <div class="newsTile">
          <nuxt-link :to="{name:'article-detail-id', params:{id:item.id}}">{{item.title}}</nuxt-link></div>
        <div class="newsTimeLink">
          <span class="dflexAlem"><img src="../../static/img/time_icon.png" class="mr5"/>2019-05-05</span>
           <nuxt-link :to="{name:'article-detail-id', params:{id:item.id}}">【查看全文】</nuxt-link>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import { infolist } from '~/api/info'
  export default {
    name: "Indexnews",
    data(){
      return{
        Newsdatalist:[],
      }
    },
    methods:{
      News(){
        this.$router.push({path:'./news',})
      },
      async sourceData() {
        let params = {
          current_page: 1,
          page_size: 4,
        }
        const res = await infolist(this, params)
        this.Newsdatalist = res.data.items
      },
      // 资讯详情页
      NewsDetail(){
        this.$router.push({path:'../article/_detail', query:{index:''}})
      }
    },
    mounted() {
      this.sourceData()
    }
  }
</script>

<style scoped>
  .ListTitle{display: flex;justify-content: space-between;}
  .TitleName{border-left: 2px solid #279eff; padding-left: 10px; margin: 15px 0; font-size: 16px;}
  .Indexnews{ display: flex; margin-top: 1px;}
  .Indexnews li{width: 300px; box-sizing: border-box; background-color: #fff; display: flex;flex-direction: column; border-right: 1px solid #DEDEDE;}
  .Indexnews li:last-child{border-right: none;}
  .Indexnews li a:hover{color: #007de4;}
  .newsTile{ font-weight: bold;font-size: 16px; margin:  20px auto; width: 270px;overflow: hidden;text-overflow: ellipsis; white-space: nowrap;}
  .newsTimeLink{ display: flex; justify-content: space-between; align-items: center; color: #999; margin:  0px auto 20px; width: 270px;}
  .NewsImage{height: 168px;display: flex;align-items: center;justify-content: center;}
  .NewsImage img{height: 168px;width: 270px;}
</style>
