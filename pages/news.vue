<template>
  <div class="clearfix graybg">

    <div class="w1200" style="margin-top: 10px;"><a>巨正源首页</a>><span class="gray">资讯列表</span></div>
    <div class="w1200 ovh" style="margin-top: 10px; display: flex;">

      <div class="whitebg " style="width: 85%;">

        <div class="ListTitle  whitebg bb1">
          <div class="TitleName" style="border-left: 3px solid #279eff;">资讯列表</div>
          <a class="mr20 mt15 mb15 gray">共2546条数据 </a>
        </div>
        <ul class="NewContentlist">
          <li v-for="(items, index) in Newsdatalist" :key="index">
            <div class="newsImg">
              <img :src="items.image" />
            </div>
            <div class="News_content">
              <h2>{{items.title}}</h2>
              <div class="NewsList_text">{{items.seoDescription}}</div>
              <div class=" mt20">
                <div class="dflexAlem fl"><img src="../assets/img/newsTime.png"/><span class="gray ml10">{{items.addTime}}</span></div><div class="gray fl ml30">来源：巨正源</div><a @click="NewsDetail(items.id)" class="blueFont fr">阅读更多</a>
              </div>
            </div>
          </li>


        </ul>
        <div class="">
          <!--页码-->
          <ul class="pagination">
            <li><a href="#">首页</a></li>
            <li><a href="#">上一页</a></li>
            <li><a href="#">1</a></li>
            <li><a class="active" href="#">2</a></li>
            <li><a href="#">3</a></li>
            <li><a href="#">4</a></li>
            <li><a href="#">5</a></li>
            <li><a href="#">6</a></li>
            <li><a href="#">7</a></li>
            <li><a href="#">下一页</a></li>
            <li><a href="#">尾页</a></li>
            <li class="ml10">共40页</li>
            <div class="ml30">转到第<input type="text" class="pageText bdccc" />页</div>
            <a class="PageNext graybg">Go</a>
          </ul>
        </div>

      </div>

<!--      右边侧边栏-->
      <news-right></news-right>

    </div>


  </div>
</template>

<script>
  import { infolist } from '../api/info'
  import NewsRight from './article/NewsRight'
    export default {
        name: "News",
      components:{
        NewsRight
      },
      data(){
          return{
            Newsdatalist:[],
            current_page:1,
            page_size:6
          }
      },
      methods:{
        NewsDetail(id){
          this.$router.push({path:'./article/NewsDetail',query:{id:id}})
        },
        async sourceData() {
          let params = {
            current_page: this.current_page,
            page_size: this.page_size,
          }
          const res = await infolist(this, params)
          console.log('res', res)
          this.Newsdatalist = res.data.items
          console.log('Newsdatalist',this.Newsdatalist)
        },
      },
      mounted(){
          this.sourceData()

      }
    }
</script>

<style scoped>

  /*行业资讯--页面*/
  .NewContentlist li{display: flex; border-bottom: 1px solid #D2D2D2; font-size: 14px;}
  .newsImg{width: 169px;height: 137px;border-radius: 5px; margin-top: 20px;margin-left: 20px;margin-bottom: 20px;    display: flex;
    align-items: center;justify-content: center;}
  .News_content{width: 100%; margin-top: 20px; margin-bottom: 20px;margin-left: 20px;margin-right: 20px;}
  .News_content h2{color: #333; font-weight: bold; margin-top: 15px;}
  .News_content .NewsList_text{ color: #999; margin-top: 15px; height: 40px; overflow:hidden;
    text-overflow:ellipsis;display:-webkit-box; -webkit-box-orient:vertical;-webkit-line-clamp:2; }




  /*资讯分类*/
  .newsCate{margin-left: 20px;margin-top: 20px; margin-bottom: 20px;}
  .newsCate li{margin-top: 10px;}
  .newsCate li:hover{ color:#ff7300;}
  .newsCate li:first-child{margin-top: 0;}
  .newsCate li::before{content:"●";color:#999; font-size:12px; margin-right: 10px;}
  .newsCate li::before:hover{content:"●";color:#ff7300;}
  /*一周排行*/
  .newsWeek{margin-top: 20px;margin-left: 20px; margin-bottom: 20px;}
  .newsWeek li{margin-top: 10px; }
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




  /*分页*/

  ul.pagination {  display: inline-block;  padding: 0;   margin: 30px auto;display: flex;justify-content: center;}
  ul.pagination li{display: flex;align-items: center;}
  ul.pagination li a {background-color: #efefef;padding: 5px 11px;}
  ul.pagination li a{  color: #333;border: 1px solid #fff; border-radius: 4px; padding: 8px 10px;
    text-decoration: none;transition: background-color .3s;  margin: 0 8px;}
  ul.pagination li a.active{background-color: #007de4; color: #fff;  border: 1px solid #007de4;}
  ul.pagination li a:hover:not(.active){background-color: #007de4; color: #fff;border: 1px solid #007de4;}
  ul.pagination .pageText{width: 40px;height: 35px; margin: 0 8px; border-radius:3px;    box-sizing: border-box;}
  ul.pagination .PageNext{border-radius: 2px; color: #666; width: 40px;height: 35px; line-height: 35px; margin: 0 15px; text-align: center;}

</style>
