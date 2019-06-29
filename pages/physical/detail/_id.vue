<template>
    <div class="clearfix" style="">
      <div class="w1200" style="margin-top: 10px; font-size: 14px;"><a href="/">巨正源首页</a> > 物性表 > <span class="gray">{{detail.title}}</span></div>
      <div class="w1200 ovh" style="margin-top: 10px; display: flex;">
        <div class="whitebg" style="width: 80%;">
          <div class="phyDetailTitle">
            {{detail.title}}
          </div>
          <div v-html="detail.description">

          </div>


        </div>
        <!--右边栏-->
        <div class="ml20 ovh" style="width: 24%;">
          <!--热门标签-->
          <div class="whitebg">
            <div class="ListTitle   bb1">
              <div class="TitleName" style="border-left: 3px solid #279eff;">热门标签</div>
            </div>
            <ul class="phyLabel">
              <li>聚丙烯</li><li>乙二醇</li><li>二甘醇</li><li>苯乙烯</li><li>碳酸盐</li>
              <li>二元醇</li><li>氯化物</li><li>异丙醚</li><li>PTA</li><li>锌氧化物</li>
              <li>硫酸盐</li><li>其他无机盐</li>
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
          <div class="mt20">
            <a href="">
              <img src="../../../assets/img/phyAdv.png" />
            </a>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { productdetail } from '../../../api/product'
export default {
    name: "physical-detail-id",
    async asyncData(context) {
        let params = {
            id: !context.params.id ? 1 : context.params.id,
        }
        const resData = await productdetail(context, params).then(function (res) {
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
        async sourceData() {
            let params = {
                id: this.$route.params.id
            }
            const res = await productdetail(this, params)
            this.detail = res.data
        }
    },
    created () {
        this.sourceData()
    }
}
</script>

<style scoped>
  .ListTitle {display: flex;justify-content: space-between;}
  .TitleName{border-left: 2px solid #279eff; padding-left: 10px; margin: 15px 0; font-size: 16px;}

  .PhysearchInput{ margin-left: 10px;border-radius: 3px; width: 182px;border: 1px solid #dddddd; height: 32px; padding-left: 10px;box-sizing: border-box;}
  .phyList li{margin-top: 10px;background-color: #fff; display: flex; justify-content: space-between; font-size: 14px;}
  .phyList li .phyDetail{padding: 5px 20px;background-color: #007de4;color: #fff;border-radius: 3px;}

  .phyLabel{background-color: #fff;display: flex; flex-wrap: wrap; padding:0 20px 20px;}
  .phyLabel li{width: 33%;  color: #333;    margin-top: 10px;    overflow: hidden;  text-overflow: ellipsis;  white-space: nowrap;font-size: 14px;}


  .XhlistTitle h1{text-align: center;margin: 10px 0;}
  .Xhlist li{display: flex;align-items: center; margin-bottom: 1px;background-color: #fff;}
  .Xhlist li:hover{background-color: #f2f8fe;}
  .Xhlist li:last-child{margin-bottom: 30px;}
  .Xhlist li span{text-align: center; margin: 20px 0;}

  .newsWeek{margin-top: 20px;margin-left: 20px; margin-bottom: 20px;}
  .newsWeek li{margin-top: 10px; }
  .newsWeek li:first-child{margin-top: 0;}
  .newsWeek li a{display: flex; align-items: center;}
  .newsWeek li .text{width: 80%;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;color: #333; font-size: 14px;}
  .newsWeek li:hover{color: #ff7300; cursor: pointer;}
  .NumNews{ display: flex;justify-content: center; align-items: center; font-size: 12px; margin-right: 10px; width: 18px; height: 18px; border-radius: 25px;background-color: #f0f2f5;}

  .newsWeek li a{display: flex; align-self: center;
    color: #333;}
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


  .phyDetailTitle{border-bottom: 1px solid #007de4; text-align: center; font-size: 22px; padding: 22px 0; font-weight: bold; margin-top: 15px;}
</style>
