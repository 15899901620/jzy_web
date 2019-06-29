<template>
  <div class="container">
        <div class="w1200 fs14" style="margin-top: 10px;"><a>巨正源首页</a>><span class="gray">网站公告</span></div>
        <div class="w1200 ovh" style="margin-top: 10px; display: flex;">
            <div class="whitebg " style="width: 85%; height: 100%;">
              <h3>{{detail.title}}</h3>
              <div v-html="detail.content"></div>
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
import { announcementdetail } from '../../../api/info'
export default {
  name: 'notice-detail-id',
  async asyncData(context) {
    let params = {
        id: !context.params.id ? 1 : context.params.id,
    }
    const resData = await announcementdetail(context, params).then(function (res) {
        console.log('detail', res)
        return {
            detail: res.data,
        }
        
    })
  },
  data () {
      return {
          detail: {}
      }
  },
  methods: {
    async sourceData () {
      let params = {
          id: this.$route.params.id
      }
      const res = await announcementdetail(this, params)
      this.detail = res.data
    }
  },
  created () {
      this.sourceData()
  }
}
</script>

<style scoped>
.container {padding: 0px;}
  a{color: #333;}
  .NewsDetail{width: 95%; margin:  0 auto;}
  .NewsDetail_tip{padding-bottom: 5px; display: flex; align-items: center;  justify-content: space-between;border-bottom: 1px solid #DEDEDE; font-size: 14px;}
  .NewsDetail_tip .newsShare{ width: 60px;  background: url(../../../assets/img/icon.png)no-repeat 0px -409px;padding-left:20px;color: #999;}
  .NewsDetail_tip .time{display: flex;align-items: center; border-left: 1px solid #dedede; margin-left: 5px; padding-left: 10px;}
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
