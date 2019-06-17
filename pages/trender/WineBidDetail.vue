<template>
    <div class="mb40">
    <!--页面路径-->
      <div class="w1200">
        <div class="mt10 fs14">
          <a class="blackFont">巨正源首页</a> > <span class="gray">预售专栏</span>
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
    export default {
        name: "WineBidDetail",
      components:{
        DetailsBidding,
        Contact,
        Commonproblem,
        membercenter,
        Notice
      },

    }
</script>

<style scoped>

  .Notice{width: 80%;}
  .Notice .title{display: flex;justify-content: space-between; align-items: center; padding: 20px 10px;background-color: #fff;}
  .rightMode{width: 21%;   margin-left: 1%;}


</style>
