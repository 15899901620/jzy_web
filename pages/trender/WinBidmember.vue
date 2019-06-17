<template>
    <div class="clearfix mb40">
      <div class="w1200 dflex " id="app">
        <!--会员中心列表-->
        <div class="memberList whitebg mt20 fs14" style="height: 600px;">
          <ul class="mt25">
            <h1 class="curr">招标管理 <div class="bodbottom"></div></h1>
            <router-link to="{path:'./rightinfor', query{param1:'manage'}}"><li class="curr" >招标管理</li></router-link>
          </ul>
          <ul class="mt35">
            <h1 >账户管理 </h1>
            <router-link to='./rightinfor'><li >完善信息</li></router-link>
            <router-link :to="{path:'./rightcode', query:{param1:'manage'}}"><li>密码管理</li></router-link>
          </ul>
        </div>


        <!--右边信息-->
        <div class="memberInfor ml20  whitebg bdccc  mt20">

          <!--招标管理-->
          <div class="ml25 mr25">
            <h1 class="fs16  mt25">招标管理</h1>
            <div class="titleOrder mt15" >
              <ul class="dflex">
                <li class="curr">全部信息（2个）</li><li>待开标（0个）</li><li>已中标（0个）</li><li>未中标（0个）</li>
              </ul>
            </div>


            <div class="order_operate">
              <div class="dflex">
                <input type="text" placeholder="输入订单号/产品名称查询" name="" id="" value="" class="orderInput" />
                <div class="check">查看</div>
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
            <table class="listT mt10" border="" cellspacing="" cellpadding="">
              <tbody>
              <tr class="Ttitle graybg" >
                <td colspan="8">

                  <span class="ml10"> 招标时间：<span class="gray">2019-04-02  12:00:00</span></span>
                  <span class="ml15">订单类型：<span class="gray">招标</span></span>

                  <span class="fr mr15"><span class="gray">开标时间：</span><span class="gray"> 2019-04-02  12:00:00</span> </span>
                </td>
              </tr>
              <tr class="detailTable">
                <td style="width: 25%">0744-184CSIE06913</td>
                <td style="width: 42%">东莞巨正源采购项目—三维激光扫描仪项目招标公...</td>
                <td style="width: 17%">
                  待开标
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
  import Pagination from '../../components/Pagination'
   export default {
      name: "WinBidmember",
      components:{
        Pagination
      },
      data(){
          return{
          }
      },


    }
</script>

<style scoped>
  /*左侧菜单*/
  .memberList{border:1px solid #DEDEDE;border-top: 3px solid #007de4; width: 215px;}
  .memberList ul{margin-left: 45px;}
  .memberList ul li{color: #999;margin-top: 10px;}
  .memberList ul li:hover{color: #007de4;}
  .memberList ul li.curr{color: #007de4;}
  .memberList h1{font-size: 18px;margin-bottom: 10px; padding-bottom: 10px; position: relative;}

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
