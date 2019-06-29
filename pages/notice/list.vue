<template>
    <div class="container">
        <div class="w1200 fs14" style="margin-top: 10px;"><a>巨正源首页</a>><span class="gray">网站公告</span></div>
        <div class="w1200 ovh" style="margin-top: 10px; display: flex;">
            <div class="whitebg " style="width: 85%; height: 100%;">
                <div class="ListTitle fs14  whitebg bb1" style="align-items: center">
                    <div class="TitleName" style="border-left: 3px solid #279eff;">网站公告</div>
                    <a class="mr20 mt15 mb15 gray">共{{this.total}}条数据 </a>
                </div>
                <ul class="NewContentlist">
                    <li v-for="(items, index) in datalist" :key="index">
                        <div class="News_content">
                            <h2><nuxt-link :to="{name:'notice-detail-id', params:{id:items.id}}">{{items.title}}</nuxt-link></h2>
                            <div class="NewsList_text">{{items.seoDescription}}</div>
                            <div class=" mt20">
                                <div class="dflexAlem fl"><img src="../../assets/img/newsTime.png"/><span class="gray ml10">{{items.addTime}}</span></div><div class="gray fl ml30">来源：{{items.author}}</div>
                                <a class="blueFont fr" @click="NewsDetail(items.id)">阅读更多</a>
                            </div>
                        </div>
                    </li>
                </ul>
                <div class="whitebg ovh text-xs-center" style="padding: 30px 0">
                    <Page :total="this.total"  @on-change="changePage" :page-size="page_size"  :current="current_page" show-total show-elevator   />
                </div>
            </div>
            <div class="ml20 ovh" style="width: 25%;">
                <div class="whitebg ovh">
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
import { announcement } from '../../api/info'
export default {
    name: 'notice-list',
    data() {
        return {
            self: this,
            loading: false,
            current_page: !this.$route.query.page ? 1 : this.$route.query.page,
            total: 0,
            page_size: 8,
            total_page: (this.total/this.page_size) < 1 ? 1 : parseInt(this.total/this.page_size),
            datalist:[]
        }
    },
    methods:{
        async sourceData() {
            let params = {
                current_page: this.current_page,
                page_size: this.page_size
            }
            const res = await announcement(this, params)
            console.log('tag', res)
            this.datalist = res.data.items
            this.total = res.data.total
        },
        changePage (row) {
            this.$router.push({name:'notice-list',query:{page:row}})
            this.current_page = row
            this.sourceData()
        }
    },
    created () {
        this.sourceData()
    },
}
</script>

<style scoped>
.container {padding: 0px;}
  /*行业资讯--页面*/
  .NewContentlist li{display: flex; border-bottom: 1px solid #D2D2D2; font-size: 14px;}
  .newsImg{width: 169px;height: 137px;border-radius: 5px; margin-top: 20px;margin-left: 20px;margin-bottom: 20px;}
  .newsImg img { width: 169px;height: 137px;}
  .News_content{width: 100%; margin-top: 20px; margin-bottom: 20px;margin-left: 20px;margin-right: 20px;}
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
