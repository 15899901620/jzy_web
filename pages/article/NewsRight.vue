<template>
  <div class="ml20 ovh" style="width: 25%;">

    <!--资讯分类-->
    <div class="whitebg ovh">
      <div class="ListTitle  whitebg bb1">
        <div class="TitleName" style="border-left: 3px solid #279eff;">资讯分类</div>
      </div>
      <ul class="newsCate">
        <li v-for="(items, index) in NewsCateData" :key="index"><a href="">{{items.title}}</a></li>

      </ul>
    </div>
    <!--一周排行榜-->
    <div class="whitebg ovh mt20">
      <div class="ListTitle  whitebg bb1">
        <div class="TitleName" style="border-left: 3px solid #279eff;">一周排行榜</div>
      </div>

      <ul class="newsWeek">
        <li v-for="(items, index) in NewsWeekList" :key="index"><a href="">
          <template v-if="index==0">
            <div class="NumNews NumNewsorangebg" >{{index+1}}</div>
          </template>
          <template v-else-if="index==1 || index==2">
            <div class="NumNews  NumNewscle" >{{index+1}}</div>
          </template>
          <template v-else>
            <div class="NumNews NumNewsbg" >{{index+1}}</div>
          </template>



          <span class="text">{{items.title}}</span></a>
        </li>
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
</template>

<script>
  import { infocate, infolist } from '../../api/info'
    export default {
        name: "NewsRight",
      data(){
          return{
            NewsCateData:[],
            NewsWeekList:[]
          }
      },
      methods:{
        async NewsCate() {
          let params = {
            parentId: 0
          }
          const res = await infocate(this, params)
          this.NewsCateData = res.data
        },

        async NewsWeeks() {
          let params = {
            current_page:1,
            page_size:10
          }
          const res = await infolist(this, params)
          console.log('资讯',res.data)
         this.NewsWeekList = res.data.items
        },

      },
      mounted() {
          this.NewsCate()//资讯分类
        this.NewsWeeks()
      }
    }
</script>

<style scoped>
  a{color: #333;}
  a:hover{color:#ff7300 }
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
  .NumNews{ display: flex;justify-content: center; align-items: center; font-size: 12px; margin-right: 10px; width: 20px; height: 20px; border-radius: 25px;}
  .NumNewsorangebg{background-color: #ff6450;color: #fff}
  .NumNewsbg{background-color: #f0f2f5;}
  .NumNewscle{background-color: #ffa800;color: #fff;}
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
