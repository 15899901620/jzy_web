<template>
<div>
  <div class="w1200 fs14" style="margin-top: 10px;"><a>巨正源首页</a>><span class="gray">预售专栏</span></div>
  <div class="w1200 ovh" style="margin-top: 10px; display: flex;">
    <div class="whitebg " style="width: 85%; height: 100%;">
      <div class="ListTitle fs14  whitebg bb1" style="align-items: center">
        <div class="TitleName" style="border-left: 3px solid #279eff;">资讯列表</div>
        <a class="mr20 mt15 mb15 gray">共{{this.total}}条数据 </a>
      </div>
      <ul class="NewContentlist">
        <li v-for="(items, index) in datalist" :key="index">
          <div class="newsImg">
          <img :src="items.image" :alt="items.title" :id="index">
          </div>
          <div class="News_content">
            <h2><nuxt-link :to="{name:'article-detail',params:{newsId:1}}">{{items.title}}</nuxt-link></h2>
            <div class="NewsList_text">{{items.seoDescription}}</div>
            <div class=" mt20">
              <div class="dflexAlem fl"><img src="../assets/img/newsTime.png"/><span class="gray ml10">{{items.addTime}}</span></div><div class="gray fl ml30">来源：{{items.author}}</div><a class="blueFont fr">阅读更多</a>
            </div>
          </div>
        </li>
      </ul>
      <div class="whitebg ovh text-xs-center" style="padding: 30px 0">
        <Page :total="this.total" show-elevator   />
      </div>


    </div>

    <div class="ml20 ovh" style="width: 25%;">

      <!--资讯分类-->
      <div class="whitebg ovh">
        <div class="ListTitle  whitebg bb1">
          <div class="TitleName" style="border-left: 3px solid #279eff;">资讯分类</div>
        </div>
        <ul class="newsCate">
          <li><a href="">行业快讯</a></li>
          <li><a href="">市场分析</a></li>
          <li><a href="">行业资讯</a></li>
          <li><a href="">巨正源公告</a></li>
          <li><a href="">巨正源百科</a></li>
          <li><a href="">行情中心</a></li>
        </ul>
      </div>
      <!--一周排行榜-->
      <div class="whitebg ovh mt20">
        <div class="ListTitle  whitebg bb1">
          <div class="TitleName" style="border-left: 3px solid #279eff;">一周排行榜</div>
        </div>

        <ul class="newsWeek">
          <li><a href=""><div class="NumNews orangebg">1</div><span class="text">超四十款终端预年内上市百亿</span></a></li>
          <li><a href=""><div class="NumNews">2</div><span class="text">2019 中国地产智能家居高峰</span></a></li>
          <li><a href=""><div class="NumNews">3</div><span class="text">捷报！巨正源荣获2018中国</span></a></li>
          <li><a href=""><div class="NumNews">4</div><span class="text">四川茂县叠溪镇领导一行到访</span></a></li>
          <li><a href=""><div class="NumNews">5</div><span class="text">国庆物流发货公告</span></a></li>
          <li><a href=""><div class="NumNews">6</div><span class="text">中秋物流延迟公告</span></a></li>
          <li><a href=""><div class="NumNews">7</div><span class="text">利用安防监控助力食品安全</span></a></li>
          <li><a href=""><div class="NumNews">8</div><span class="text">弱电计算机机房工程施工方案</span></a></li>
        </ul>
      </div>
      <!--热点推荐-->
      <div class="whitebg ovh mt20">
        <div class="ListTitle  whitebg bb1">
          <div class="TitleName" style="border-left: 3px solid #279eff;">热点推荐</div>
        </div>
        <ul class="newsWeek">
          <li><a href=""><div class="Recommend_orangebg Recommend_icon">1</div><span class="text">超四十款终端预年内上市百亿</span></a></li>
          <li><a href=""><div class="Recommend_icon Recommend_iconYellow">2</div><span class="text">2019 中国地产智能家居高峰</span></a></li>
          <li><a href=""><div class="Recommend_icon Recommend_iconYellow">3</div><span class="text">捷报！巨正源荣获2018中国</span></a></li>
          <li><a href=""><div class="Recommend_icon Recommend_icongray">4</div><span class="text">四川茂县叠溪镇领导一行到访</span></a></li>
          <li><a href=""><div class="Recommend_icon Recommend_icongray">5</div><span class="text">国庆物流发货公告</span></a></li>
          <li><a href=""><div class="Recommend_icon Recommend_icongray">6</div><span class="text">中秋物流延迟公告</span></a></li>
          <li><a href=""><div class="Recommend_icon Recommend_icongray">7</div><span class="text">利用安防监控助力食品安全</span></a></li>
          <li><a href=""><div class="Recommend_icon Recommend_icongray">8</div><span class="text">弱电计算机机房工程施工方案</span></a></li>
        </ul>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import VFooter from '../components/footer'
import Pagination from '../components/Pagination'
import { infolist } from '../api/info'
import axios from '../plugins/axios'
export default {
  name: "news",
  components: {
    VFooter,
    Pagination
  },
  data () {
    return {
      self: this,
      loading: false,
      current_page: 1,
      total: 0,
      page_size: 20,
      total_page: (this.total/this.page_size) < 1 ? 1 : parseInt(this.total/this.page_size),
      datalist:[],
      formSearch: {
        is_show: 1,
        title: '',
        start_time: '',
        end_time: ''
      }
    }
  },
  methods: {
    async sourceData() {
      let params = {
        current_page: this.current_page,
        page_size: this.page_size,
        ...this.formSearch
      }
      const res = await infolist(params)
      this.datalist = res.items
      this.total = res.total
    }

  },
  created () {

  },
  mounted () {
    this.sourceData()
  },
  watch: {

  },
}
</script>

<style scoped>
  /*行业资讯--页面*/
  .NewContentlist li{display: flex; border-bottom: 1px solid #D2D2D2; font-size: 14px;}
  .newsImg{width: 169px;height: 137px;border-radius: 5px; margin-top: 20px;margin-left: 20px;margin-bottom: 20px;}
  .newsImg img { width: 169px;height: 137px;}
  .News_content{ margin-top: 20px; margin-bottom: 20px;margin-left: 20px;margin-right: 20px;}
  .News_content h2{color: #333; font-weight: bold; margin-top: 15px;}
  .News_content .NewsList_text{ color: #999; margin-top: 15px; height: 40px; overflow:hidden;
    text-overflow:ellipsis;display:-webkit-box; -webkit-box-orient:vertical;-webkit-line-clamp:2; }

  .blueFont{color: #00a1e9}

  /*资讯分类*/
  .newsCate{margin-left: 20px;margin-top: 20px; margin-bottom: 20px;}
  .newsCate li{margin-top: 10px; }
  .newsCate li a{color: #333;font-size: 14px;}
  .newsCate li:hover{ color:#ff7300;}
  .newsCate li:first-child{margin-top: 0;}
  .newsCate li::before{content:"●";color:#999; font-size:12px; margin-right: 10px;}
  .newsCate li::before:hover{content:"●";color:#ff7300;}
  /*一周排行*/
  .newsWeek{margin-top: 20px;margin-left: 20px; margin-bottom: 20px;}
  .newsWeek li{margin-top: 10px; }
  .newsWeek li:first-child{margin-top: 0;}
  .newsWeek li a{display: flex; align-items: center;color: #333;font-size: 14px;}
  .newsWeek li .text{width: 80%;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
  .newsWeek li:hover{color: #ff7300; cursor: pointer;}
  .NumNews{ display: flex;justify-content: center; align-items: center; font-size: 12px; margin-right: 10px; width: 18px; height: 18px; border-radius: 25px;background-color: #f0f2f5;}
  /*热点推荐*/
  .newsWeek li a{display: flex; align-items: center; color: #333;font-size: 14px;}
  .newsWeek li .Recommend_icon{ text-align: center;	width: 16px;  height: 23px;
    background-size: 100% 100%;background-repeat: no-repeat;margin-right: 10px;
    padding-bottom: 2px;}
  .Recommend_icongray{background:
    linear-gradient(-40deg, transparent 10px, #f0f2f5 0) bottom left,
    linear-gradient(40deg, transparent 10px, #f0f2f5 0) bottom right;}
  .Recommend_iconYellow{background:
    linear-gradient(-40deg, transparent 10px, #ffa800 0) bottom left,
    linear-gradient(40deg, transparent 10px, #ffa800 0) bottom right;color: #fff;}
  .Recommend_orangebg{background:
    linear-gradient(-40deg, transparent 10px, #ff6450 0) bottom left,
    linear-gradient(40deg, transparent 10px, #ff6450 0) bottom right;
    color: #fff;}
</style>
