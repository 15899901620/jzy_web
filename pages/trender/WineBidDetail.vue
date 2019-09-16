<template>

    <div class="mb40">
        <pageRoute></pageRoute>
    <!--页面路径-->
      <div class="w1200">
        <div class="mt10 fs14">
          <a class="blackFont">巨正源首页</a> > <span class="gray">招标中心</span>> <span class="gray">中标详情</span>
        </div>
      </div>


      <div class="graybg mt10">
        <div class="w1200 dflex">
          <!--详情-->
          <div class="Notice">
            <DetailsBidding></DetailsBidding>
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
  import DetailsBidding from './trenderCompontent/DetailsBidding'
  import membercenter from  './trenderCompontent/membercenter'
  import Commonproblem from  './trenderCompontent/Commonproblem'
  import Contact from  './trenderCompontent/Contact'
  import Notice from  './trenderCompontent/Notice'
  import { sendHttp } from "../../api/common";
  import server from "../../config/api";
    export default {
        name: "WineBidDetail",
      components:{
        DetailsBidding,
        Contact,
        Commonproblem,
        membercenter,
        Notice
      },
      data() {
        return{
            id: !this.$route.params.id ? 0 :this.$route.params.id,
            dataList:{}
        };
      },
      methods:{
          async SourceData() {    
              let params = {
                id: this.id,
              };
              const res = await sendHttp(this, false, server.api.biddding.bidddingDetail,params)
              this.dataList = res.data
          },
          // async BySupplier() {    
          //     let params = {
          //       biddingId: this.id,
          //     };
          //     const res = await sendHttp(this, false, server.api.biddding.BySupplier,params)
          //     this.dataList = res.data
          // },

      },
      mounted() {
          this.SourceData()
          // this.BySupplier()
      }
    
    }
</script>

<style scoped>

  .Notice{width: 80%;}
  .Notice .title{display: flex;justify-content: space-between; align-items: center; padding: 20px 10px;background-color: #fff;}
  .rightMode{width: 21%;   margin-left: 1%;}


</style>
