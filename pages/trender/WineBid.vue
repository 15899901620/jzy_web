<template>

<div class="ovh graybg" >
     <div class=" mb40">
       <pageRoute></pageRoute>
        <div class="w1200 dflex">
<!-- 公告信息-->
           <div class="Notice">
              <div class="title">
                <span>公告信息</span><span class="fs14">共<span class="orangeFont">845</span>条数据</span>
              </div>
             <div class="graybg trendlistTitle">
               <span style="width: 25%; padding-left: 10px">招标编号</span><span class="tac" style="width:45%;">名称</span><span class="tac" style="width: 13%">结果</span><span class="tar mr10" style="width: 17%">招标时间</span>
             </div>
             <ul class="trendlist">
               <li @click="WineDetail">
                 <span class="pl10" style="width: 25%;">0744-184CSIE06913</span>
                 <span class="tac" style="width:45%;">东莞巨正源采购项目—三维激光扫描仪项目招标公告</span>
                 <span class="tac" style="width: 13%">已投</span>
                 <span class="tar gray  pr10" style="width: 17%">2019.3.28-2019.4.10</span>
               </li>
             </ul>

             <div class="whitebg ovh"><Pagination></Pagination></div>


           </div>

          <!-- 右边模块 -->
          <div class="rightMode">
          <!--个人中心-->
           <membercenter></membercenter>
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
  import Pagination from '../../components/pagination/pagination'
  import pageRoute from  './trenderCompontent/pageRoute'
  import membercenter from  './trenderCompontent/membercenter'
  import Commonproblem from  './trenderCompontent/Commonproblem'
  import Contact from  './trenderCompontent/Contact'
  import Notice from  './trenderCompontent/Notice'
  import Cookies from 'js-cookie'

    export default {
      name: "WineBid",
      layout:'membercenter',
      components:{
        pageRoute,
        Pagination,
        Contact,
        Commonproblem,
        membercenter,
        Notice
      },
      data() {
        return{};
      },
      methods:{
        WineDetail(){
          this.$router.push({ path:'./WineBidDetail'})
        },
      },
      mounted() {
        

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

