<template>
    <div class="clearfix  graybg">
      <div class="w1200 dflex " id="app" style="margin-bottom: 40px">
        <!--会员中心列表-->
        <Rightmenu></Rightmenu>

        <!--右边信息-->
        <div class="memberInfor ml20  whitebg bdccc  mt20">

          <!--招标管理-->
          <div class="ml25 mr25">
            <h1 class="fs16  mt25">招标管理</h1>
            <div class="titleOrder mt15" >
              <ul class="dflex" >
                <li  v-for="(item, index) in cateName" :key="index" :class="{curr:changeSelectStyle == index}" @click="changeStyle(index)" >
                  {{item.name}}({{item.count}}个)
                  </li>
              </ul>
            </div>


            <div class="order_operate">
              <div class="dflex">
                <input type="text" placeholder="输入招标号" name="" id="" value="" class="orderInput" v-model="biddingNo" />
                <div class="check" @click='operate()'>查看</div>
              </div>
              <div class="dflex" style="align-items: center;">
                <span style="width: 90px;">起始日期</span><input type="text" class="layui-input" id="test6" placeholder="选择订单时间">
              </div>
            </div>

            <div class="TableTitle graybg">
              <span style="width: 25%; padding-left: 10px">招标编号</span>
              <span class="tac" style="width:42%;">项目名称</span>
              <span class="tac" style="width: 17%">订单状态</span>
              <span class="tac mr10" style="width: 17%">订单操作</span>

            </div>
            <table class="listT mt10" border="" cellspacing="" cellpadding="" v-for="(item, index) in dataList" :key="index">
              <tbody>
              <tr class="Ttitle graybg" >
                <td colspan="8">

                  <span class="ml10"> 招标时间：<span class="gray">{{item.lastEndTime}}</span></span>
                  <span class="ml15">订单类型：<span class="gray">招标</span></span>

                  <span class="fr mr15"><span class="gray">开标时间：</span><span class="gray"> {{item.beginTime}}</span> </span>
                </td>
              </tr>
              <tr class="detailTable">
                <td style="width: 25%">{{item.biddingNo}}</td>
                <td style="width: 42%">{{item.title}}</td>
                <td style="width: 17%">
                  {{item.statusName}}
                </td>
                <td class="operate" style="width: 17%">
                  <div class="">
                    <a class="Paybtn mt15 CarCurr">去提货</a>
                  </div>
                </td>
              </tr>

              </tbody>
            </table>



            <Pagination></Pagination>
          </div>


        </div>



      </div>

    </div>

</template>

<script>
 import Header from "../../components/header";
  import Rightmenu from './trenderCompontent/Rightmenu'
  import Pagination from '../../components/pagination/pagination'
  import { sendHttp } from "../../api/common";
  import server from "../../config/api";
   export default {
      name: "WinBidmember",
     layout:'membercenter',
      components:{
        Header,
        Pagination,
        Rightmenu
      },
      data(){
          return{
            Totile:'',
            cateName: [
                {"name":"全部信息"},
                {"name":"待开标"},
                {"name":"已中标"},
                {"name":"未中标"},
            ],
            biddingNo:'',
            changeSelectStyle:'',
            dataList:{},
            current_page: 1,
            page_size: 10,
            total: 0
          }
      },
     methods:{
       changeStyle(index){
         this.changeSelectStyle = index;
         this.SourceData();
       },
        operate() {    
            this.SourceData();
        },
        async SourceData() {    
           var type =   this.changeSelectStyle;
           
            let params = {
              page_size: this.page_size,
              current_page: this.current_page,
              type:type,
              biddingNo:this.biddingNo
            };
            const res = await sendHttp(this, true, server.api.biddding.bidList,params,2)
            this.dataList = res.data.items
            this.total = res.data.total
        },
        async getMyBiddingListCount() {  
         
            let params = {}          
            const res = await sendHttp(this, true, server.api.biddding.bidddingCount,params,2)
            var count = res.data
             this.cateName[0].count= count.all
             this.cateName[1].count= count.bidOpening
             this.cateName[2].count= count.unWonBid
             this.cateName[3].count= count.wonBid
        },
     },
     mounted(){
       this.Totile=this.$router.history.current.query.category
       this.SourceData();
       this.getMyBiddingListCount()
     }


    }
</script>

<style scoped>


  /*右侧内容*/
  .memberInfor{width: 970px;}

  .titleOrder{ display: flex; justify-content: space-between; align-items: center;  border-bottom: 2px solid #007de4; font-size: 14px;}
  .titleOrder li{padding: 8px 20px;}
  .titleOrder li.curr{background-color: #007de4; color: #fff;}

  /*订单搜索*/
  .order_operate{display: flex;justify-content: space-between; align-items: center; margin: 20px auto; font-size: 14px;}
  .orderInput{width: 286px; border: 1px solid #DEDEDE; padding-left: 10px;box-sizing: border-box;}
  .check{ color: #fff; width: 60px;line-height: 32px; background-color: #007de4;text-align: center;margin-left: 5px;border-radius: 3px;}

  .TableTitle{margin: 10px auto; padding: 10px 0; display: flex; font-size: 14px;}
  .TableTitle span{text-align: center;}

  .listT{width: 100%;border: none; }
  .listT:last-child{margin-bottom: 30px;}
  .listT .Ttitle td{padding: 10px 0;  font-size: 14px;}
  .detailTable{height: 80px; font-size: 14px;}
  .detailTable td{text-align: center;overflow: hidden; padding: 10px 0;}
  .detailTable .operate .Paybtn{ width: 64%; margin: 0 auto;  padding: 4px 6px; color: #666; border-radius: 3px;display: inherit; }
  .detailTable .operate .CarCurr{background-color: #007de4; color: #fff;}


</style>
