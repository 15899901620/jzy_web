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
          <span v-if="lastPage_id">【上一篇】
             <nuxt-link :to="{name: 'article-id', params:{ id: lastPage_id }}">{{ lastPage }}</nuxt-link>
          </span>
          <span v-if="nextPage_id">【下一篇】
             <nuxt-link :to="{name: 'article-id', params:{ id: nextPage_id }}">{{ nextPage }}</nuxt-link>
          </span>
        </div>

      </div>
      <news-right></news-right>
    </div>
  </div>
</template>

<script>
  import { infodetail } from '../../api/info'
  import  NewsRight  from './NewsRight'
  export default {
    name: "NewsDetail",
    components:{
      NewsRight
    },
    data(){
        return{
          NewsData:'',
          id:'',
          lastPage:'',
          lastPage_id:'',
          nextPage:'',
          nextPage_id:''
        }
    },
    methods:{
      async NewsDetail() {
        let params = {
          id: this.$router.history.current.params.id,
        }
        const res = await infodetail(this, params)
        this.NewsData = res.data
        this.lastPage= this.NewsData.lastPage.title
        this.lastPage_id=this.NewsData.lastPage.id
        this.nextPage= this.NewsData.nextPage.title
        this.nextPage_id=this.NewsData.nextPage.id

      }

    },
    mounted(){
       this.NewsDetail()
    },
    watch: {
    }
  }
</script>

<style scoped>
  a{color: #333;}
  .NewsDetail{width: 95%; margin:  0 auto;}
  .NewsDetail_tip{padding-bottom: 5px; display: flex; align-items: center;  justify-content: space-between;border-bottom: 1px solid #DEDEDE; font-size: 14px;}
  .NewsDetail_tip .newsShare{ width: 60px;  background: url(../../assets/img/icon.png)no-repeat 0px -409px;padding-left:20px;color: #999;}
  .NewsDetail_tip .time{display: flex;align-items: center; border-left: 1px solid #dedede; margin-left: 5px; padding-left: 10px;}
  .new_other{     margin-bottom: 20px;font-size: 14px; border-top: 1px solid #DEDEDE;padding-top: 20px; padding-left:20px; padding-right:20px;display: flex;align-items: center;justify-content: space-between;}

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
