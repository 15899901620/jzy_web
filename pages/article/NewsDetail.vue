<template>
  <div class="clearfix graybg" >
    <div class="w1200" style="margin-top: 10px; font-size: 14px; color: #666;">
      <a>巨正源首页</a>><a>行业资讯</a>><span class="gray">{{NewsData.title}}</span>
    </div>
    <div class="w1200 ovh" style="margin-top: 10px; display: flex;">

      <div class="whitebg " style="width: 80%;">

        <div class="NewsDetail" >
          <h3 class="mt30 fs20">{{NewsData.title}}</h3>
          <div class="NewsDetail_tip mt20"  >
            <div class="dflexAlem">
              <a class="blueFont">巨正源</a>
              <div class="time">
                <img src="../../assets/img/newsTime.png"/><span class="gray ml5">{{NewsData.addTime}}</span>
              </div>
            </div>
            <div class="newsShare">分享</div>
          </div>
          <div class="mt20 mb40 gray fs14" v-html="NewsData.content">
            {{NewsData.content}}
          </div>
        </div>

        <div class="new_other">
          <a>【上一篇】中美贸易对塑料市场影响几何？</a>
          <a>【下一篇】PE华东地区：市场继续下跌 下游询盘一般 </a>
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
  import { infodetail } from '../../api/info'
  export default {
    name: "NewsDetail",
    data(){
        return{
          NewsData:{},
          id:''
        }
    },
    methods:{
      async NewsDetail(id) {
        let params = {
          id: id,
        }
        const res = await infoDetail(this, params)
        this.NewsData = res
      }

    },
    mounted(){
      this.id=this.$router.history.current.query.newsId
       this.NewsDetail(this.id)
    }
  }
</script>

<style scoped>
  a{color: #333;}
  .NewsDetail{width: 95%; margin:  0 auto;}
  .NewsDetail_tip{padding-bottom: 5px; display: flex; align-items: center;  justify-content: space-between;border-bottom: 1px solid #DEDEDE; font-size: 14px;}
  .NewsDetail_tip .newsShare{ width: 60px;  background: url(../../assets/img/icon.png)no-repeat 0px -409px;padding-left:20px;color: #999;}
  .NewsDetail_tip .time{display: flex;align-items: center; border-left: 1px solid #dedede; margin-left: 5px; padding-left: 5px;}
  .new_other{ font-size: 14px; border-top: 1px solid #DEDEDE;padding-top: 20px; padding-left:20px; padding-right:20px;display: flex;align-items: center;justify-content: space-between;}

  .ListTitle{display: flex;justify-content: space-between;}
  .TitleName{border-left: 2px solid #279eff; padding-left: 10px; margin: 15px 0; font-size: 16px;}


  /*资讯分类*/
  .newsCate{margin-left: 20px;margin-top: 20px; margin-bottom: 20px;}
  .newsCate li{margin-top: 10px; font-size: 14px;}
  .newsCate li:hover{ color:#ff7300;}
  .newsCate li:first-child{margin-top: 0;}
  .newsCate li::before{content:"●";color:#999; font-size:12px; margin-right: 10px;}
  .newsCate li::before:hover{content:"●";color:#ff7300;}
  /*一周排行*/
  .newsWeek{margin-top: 20px;margin-left: 20px; margin-bottom: 20px;}
  .newsWeek li{margin-top: 10px; font-size: 14px;}
  .newsWeek li:first-child{margin-top: 0;}
  .newsWeek li a{display: flex; align-items: center;}
  .newsWeek li .text{width: 80%;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
  .newsWeek li:hover{color: #ff7300; cursor: pointer;}
  .NumNews{ display: flex;justify-content: center; align-items: center; font-size: 12px; margin-right: 10px; width: 18px; height: 18px; border-radius: 25px;background-color: #f0f2f5;}
  /*热点推荐*/
  .newsWeek li a{display: flex; align-self: center;}
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
