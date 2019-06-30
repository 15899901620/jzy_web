<template>
    <div class="container">
<div class="w1200 ovh" style="margin-top: 10px; display: flex;">
        <div class="" style="width: 80%;">
          <div class="ListTitle  whitebg bb1">
            <div class="TitleName" style="border-left: 3px solid #279eff;">物性表</div>
            <a class="mr20 mt15 mb15 gray">共<span class="orangeFont">{{total}}</span>条数据 </a>
          </div>

          <div class="XHsearch whitebg" style="display: flex;">
            <span>牌号</span><input type="text"  class="PhysearchInput" placeholder="请输入品种"/>
            <span class="ml30">用途</span><input type="text" class="PhysearchInput" placeholder="请输入牌号"/>
            <span class="ml30">特性</span><input type="text" class="PhysearchInput" placeholder="请输入牌号"/>
            <div class="xhBtn" style="margin-left: 60px;">搜索</div>
          </div>
          <ul class="phyList">

            <li v-for="(items,index) in datalist" :key="index">
              <div class="mt30 ml20 mb30">
                <h2 class="blueFont fs16"><nuxt-link :to="{name:'physical-detail-id', params:{id:items.id}}">{{items.title}}</nuxt-link></h2>
                <div class="mt10">
                  用途 :{{items.purposeValue}},{{items.rocessingLevelValue}},{{items.featureValue}}
                </div>
                <div class="mt10  gray">
                  <span>分类 :</span><span class="orangeFont ml10">{{items.cname1}}</span><span class="ml10">{{items.cname2}}</span><span class="ml10">{{items.cname3}}</span>
                </div>
              </div>
              <div class="dflexAlemJust mr20">
                  <nuxt-link class="phyDetail" :to="{name:'physical-detail-id', params:{id:items.id}}">查看详情</nuxt-link>
              </div>
            </li>
          </ul>
          <div class="whitebg" style="text-align:center; padding:15px; ">
              <Page :total="total"  @on-change="changePage" :page-size="page_size" show-total show-elevator   />
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
              <img src="../../assets/img/phyAdv.png" />
            </a>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import {productlist} from '../../api/product'
export default {
    name: 'physical-id',
    async asyncData(context) {
      let params = {
            current_page: !context.query.page ? 1 : context.query.page,
            page_size: 8,
            catId: !context.params.id ? 1 : context.params.id,
        }
        const resData = await productlist(context, params).then(function (res) {
            return {
                datalist: res.data.items,
                total: res.data.total
            }
            
        })
    },
    data () {
        return {
            loading: false,
            current_page: !this.$route.query.page ? 1 : this.$route.query.page,
            total: 0,
            catId: !this.$route.params.id ? 1 : this.$route.params.id,
            page_size: 8,
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
                catId: this.$route.params.id,
                ...this.formSearch
            }
            const res = await productlist(this, params)
            this.datalist = res.data.items
            this.total = res.data.total
        },
        changePage (row) {
            this.$router.push({name:'physical-id',params:{id:this.catId},query:{page:row}})
            this.current_page = row
            this.sourceData()
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


  .XHsearch{padding: 20px; display: flex;align-items: center; font-size: 14px;}
  .XHsearchInput{width: 120px;height: 30px;border: 1px solid #D2D2D2; margin-left:10px;padding-left: 5px;box-sizing: border-box;}
  .priceInput{width: 90px;height: 30px;margin: 0 10px;border: 1px solid #D2D2D2; padding-left: 5px;box-sizing: border-box;}
  .xhBtn{padding: 6px 20px;background-color: #007de4; box-sizing: border-box;color: #fff;border-radius: 3px; margin-left: 10px;}

  .XhlistTitle{display: flex; align-items: center;}
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

  /*热点推荐*/
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

  ul.pagination li a{border: 1px solid #efefef; background-color: #fff;}
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
