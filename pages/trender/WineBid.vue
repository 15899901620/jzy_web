<template>

<div class="ovh graybg" >
     <div class=" mb40">
       <pageRoute></pageRoute>
        <div class="w1200 dflex">
<!-- 公告信息-->
           <div class="Notice">
              <div class="title">
                <span>招标列表</span><span class="fs14">共<span class="orangeFont">{{total}}</span>条数据</span>
              </div>
             <div class="graybg trendlistTitle">
               <span style="width: 25%; padding-left: 10px">招标编号</span><span class="tac" style="width:45%;">名称</span><span class="tac" style="width: 13%">结果</span><span class="tar mr10" style="width: 17%">招标时间</span>
             </div>
             <ul class="trendlist" v-for="(item, index) in dataList" :key="index">
               <li @click="WineDetail(item)">
                 <span class="pl10" style="width: 25%;">{{item.biddingNo}}</span>
                 <span class="tac" style="width:45%;">{{item.title}}</span>
                 <span class="tac" style="width: 13%">{{item.status}}</span>
                 <span class="tar gray  pr10" style="width: 17%">{{item.beginTime}}</span>
               </li>
             </ul>

             <div class="whitebg ovh">
               <pages :total="total" :show-total="showTotal" @change="changePage" :value="current_page">
                 </pages>
                 </div>


             </div>

          <!-- 右边模块 -->
          <div class="rightMode">
          <!--个人中心-->
           <membercenter :webSource="webName"></membercenter>
          <!--通知公告-->
          <Notice></Notice>

            <!--常见问题-->
            <Commonproblem></Commonproblem>
            <!--联系我们-->
            <Contact></Contact>



          </div>

        </div>



     </div>

  </div>


</template>

<script>
  import Pagination from '../../components/pagination'
  import pageRoute from  './trenderCompontent/pageRoute'
  import membercenter from  './trenderCompontent/membercenter'
  import Commonproblem from  './trenderCompontent/Commonproblem'
  import Contact from  './trenderCompontent/Contact'
  import Notice from  './trenderCompontent/Notice'
  import Cookies from 'js-cookie'
  import { sendHttp } from "../../api/common";
  import server from "../../config/api";

    export default {
      name: "WineBid",
      layout:'membercenter',
      components:{
        pageRoute,
        Contact,
        Commonproblem,
        membercenter,
        Notice,
        pages: Pagination.pages
      },
      data() {
        return{
          webName:'',
          dataList:{},
          current_page: 1,
          page_size: 10,
          total: 0
        };
      },
      methods:{
        WineDetail(row){
          this.$router.push({
                name: 'trender-WineBidDetail',
                params: {
                    id: row.id
                }
            })
        },
        showTotal(total) {
            return `全部 ${total} 条`;
        },
        changePage(row) {
            this.$router.push({
                name: 'special',
                query: {
                    page: row
                }
            })
        },
        async SourceData() {    
            let params = {
              page_size: this.page_size,
              current_page: this.current_page
            };
            const res = await sendHttp(this, false, server.api.biddding.bidddingList,params)
            this.dataList = res.data.items
            this.total = res.data.total
        },
      },
      mounted() {
        this.webName='supplier'
        this.SourceData();
       }
    }
</script>

<style scoped>

  .Notice{width: 80%;}
  .Notice .title{display: flex;justify-content: space-between; align-items: center; padding: 20px 10px;background-color: #fff;}
  .rightMode{width: 21%;   margin-left: 1%;}

  .trendlistTitle{    display: flex; }
  .trendlistTitle span{padding: 20px 0; font-size: 16px; }

  .trendlist{font-size: 14px;}
  .trendlist li{background-color: #fff;padding:24px 0; display: flex; margin-bottom: 1px; cursor: default;}
  .trendlist li:hover{background-color: #f2f8fe}


  .notTitle{font-size: 16px;border-bottom: 1px solid #DEDEDE; padding: 20px 0; padding-left: 20px;}
  .notlist{margin: 0px 20px;}
  .notlist li{border-bottom: 1px dashed #e3ecf5; display: flex;flex-direction: column;}
  .notlist li:last-child{border-bottom: none;}
  .notlist li .notlistTitle{font-size: 14px;color: #333;margin-top: 15px;
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap}


</style>

