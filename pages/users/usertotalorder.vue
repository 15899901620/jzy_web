<template>
  <div class="clearfix graybg">
     <div class="w1200 dflex " style="margin-bottom: 40px">
      <userright></userright>

      <div class="memberInfor ml20  whitebg bdccc  mt20">
        <!--个人信息-->
        <h1 class="fs16 ml25 mt25">全部订单</h1>
        <div class="TableList">
          <div class="titleOrder mt15" >
            <ul class="dflex">
              <li class="curr">全部订单</li><li>全部订单（2个）</li><li>已付款（0个）</li><li>待付款（2个）</li>
            </ul>
            <a>查看全部订单 ></a>
          </div>

          <div class="order_operate">
            <div class="dflex">
              <input type="text" placeholder="输入订单号/产品名称查询" name="" id="" value="" class="orderInput" /><div class="check">查看</div>
            </div>
            <div class="dflexAlem">
              <span style="width: 90px;">起始日期</span><input type="text" class="layui-input" id="test6" placeholder="选择订单时间">
            </div>
          </div>
          <div class="TableTitle graybg">
            <span style="width: 15%;">商品信息</span>
            <span style="width: 15%;">单价(元)</span>
            <span style="width: 15%;">数量(吨)</span>
            <span style="width: 15%;">库区</span>
            <span style="width: 15%;">订单总金额(元)</span>
            <span style="width: 15%;">订单状态</span>
            <span style="width: 15%;">订单操作</span>
          </div>
          <table class="listT mt10" border="" cellspacing="" cellpadding="">
            <tr class="Ttitle graybg" >
              <td colspan="7">
                <span class="ml10">订单编号：<span class="gray">120002132</span></span>
                <span class="ml15">订单类型：现货</span>
                <span class="ml15">下单时间：<span class="gray">2019-04-02  12:00:00</span></span>
                <span class="fr mr15"><span class="gray">距离最后付款时间还剩：</span>02小时30分25秒</span>
              </td>
            </tr>
            <tr class="detailTable">
              <td>PP F08 现货</td>
              <td><span class="orange">￥1055.00</span>/吨</td>
              <td>102.000</td>
              <td>东莞市</td>
              <td>1,076.10</td>
              <td><span class="red">待付款</span></td>
              <td class="operate">
                <div class="">
                  <a class="Paybtn mt15 PayCurr">去付款</a>
                </div>
                <a class="mt5">查看详情</a>
              </td>
            </tr>
          </table>

          <table class="listT" border="" cellspacing="" cellpadding="">
            <tr class="Ttitle graybg" >
              <td colspan="7">
                <span class="ml10">订单编号：<span class="gray">120002132</span></span>
                <span class="ml15">订单类型：现货</span>
                <span class="ml15">下单时间：<span class="gray">2019-04-02  12:00:00</span></span>
                <span class="fr mr15"><span class="gray">距离最后付款时间还剩：</span>02小时30分25秒</span>
              </td>
            </tr>
            <tr class="detailTable">
              <td>PP F08 <span class="blue">现货</span></td>
              <td><span class="orange">￥1055.00</span>/吨</td>
              <td>102.000</td>
              <td>东莞市</td>
              <td>1,076.10</td>
              <td><span class="green">已完成</span></td>
              <td class="operate">
                <div class="">
                  <a class="mt15">查看详情</a>
                </div>
                <a class="mt5 blue">查看发票</a>
              </td>
            </tr>
          </table>
          <table class="listT" border="" cellspacing="" cellpadding="">
            <tr class="Ttitle graybg" >
              <td colspan="7">
                <span class="ml10">订单编号：<span class="gray">120002132</span></span>
                <span class="ml15">订单类型：现货</span>
                <span class="ml15">下单时间：<span class="gray">2019-04-02  12:00:00</span></span>
                <span class="fr mr15"><span class="gray">距离最后付款时间还剩：</span>02小时30分25秒</span>
              </td>
            </tr>
            <tr class="detailTable">
              <td>PP F08 <span class="blue">现货</span></td>
              <td><span class="orange">￥1055.00</span>/吨</td>
              <td>102.000</td>
              <td>东莞市</td>
              <td>1,076.10</td>
              <td><span class="blue">已付款</span></td>
              <td class="operate">
                <div class="">
                  <a class="mt15 Paybtn CarCurr">发布找车</a>
                </div>

                <a class="mt5 break">违约单</a>
              </td>
            </tr>
          </table>

          <!--页码-->
          <ul class="pagination">
            <li><a href="#">首页</a></li>
            <li><a href="#">上一页</a></li>
            <li><a href="#">1</a></li>
            <li><a class="active" href="#">2</a></li>
            <li><a href="#">3</a></li>
            <li><a href="#">4</a></li>
            <li><a href="#">5</a></li>
            <li><a href="#">6</a></li>
            <li><a href="#">7</a></li>
            <li><a href="#">下一页</a></li>
            <li><a href="#">尾页</a></li>
            <li class="ml10">共40页</li>
            <div class="ml30">转到第<input type="text" class="pageText bdccc" />页</div>
            <a class="PageNext graybg">Go</a>
          </ul>
        </div>



      </div>

    </div>
  </div>

</template>

<script>
  import userright from './userCompontent/userright'

    export default {
      name: "usertotalorder",
      layout:'membercenter',
      components:{
         userright
      }
    }
</script>

<style scoped>
  .memberInfor{width: 970px;}

  .TableList{width: 95%;  margin: 0 auto;}
  .titleOrder{font-size: 14px; display: flex; justify-content: space-between; align-items: center;  border-bottom: 2px solid #007de4; }
  .titleOrder li{padding: 8px 20px;}
  .titleOrder li.curr{background-color: #007de4; color: #fff;}

  .TableTitle{margin: 10px auto; padding: 10px 0; display: flex;}
  .TableTitle span{text-align: center;}
  .listT{width: 100%;border: none; }
  .listT:last-child{margin-bottom: 30px;}
  .listT .Ttitle td{padding: 10px 0;}
  .listT td{width: 15%; }
  .detailTable{height: 80px;}
  .detailTable td{text-align: center;overflow: hidden; padding: 10px 0;}
  .detailTable .operate .Paybtn{ width: 64%; margin: 0 auto;  padding: 4px 6px; color: #666; border-radius: 3px;display: inherit; }
  .detailTable .operate .PayCurr{background-color: #e93131; color: #fff;}
  .detailTable .operate .CarCurr{background-color: #007de4; color: #fff;}

</style>
