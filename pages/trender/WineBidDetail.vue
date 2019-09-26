<template>
<div class="body">
    <Header-small title="招标中心">
      <div slot="headerother">
        <div
          data-v-228ad150
          class="dflexAlem gray fs14"
          style="color: rgb(102, 102, 102);    margin-top: 50px;"
        >
          <span data-v-228ad150 class="bbright pr10 blackFont">已有账号？</span>
          <a data-v-228ad150 href="/login" class="blueFont pl10">直接登录</a>
        </div>
      </div>
    </Header-small>

    <div class="mb40">

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
            <!-- <Commonproblem></Commonproblem> -->
            <!--联系我们-->
            <Contact></Contact>



          </div>



        </div>

      </div>

    </div>
</div>
</template>

<script>
  import Header from "../../components/header";
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
        HeaderSmall: Header.small,
        DetailsBidding,
        Contact,
        Commonproblem,
        membercenter,
        Notice,

      },
      data() {
        return{
            id: !this.$route.query.id ? 1 :this.$route.query.id,
            dataList:{}
        };
      },
      methods:{

          // async BySupplier() {
          //     let params = {
          //       biddingId: this.id,
          //     };
          //     const res = await sendHttp(this, false, server.api.biddding.BySupplier,params)
          //     this.dataList = res.data
          // },

      },
      mounted() {
          // this.BySupplier()
      }

    }
</script>

<style scoped>

  .Notice{width: 80%;}
  .Notice .title{display: flex;justify-content: space-between; align-items: center; padding: 20px 10px;background-color: #fff;}
  .rightMode{width: 21%;   margin-left: 1%;}


</style>
