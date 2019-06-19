<template>
  <div class="clearfix graybg">
    <div class="w1200 dflex " style="margin-bottom: 40px">
      <userright></userright>
      <div class="memberInfor ml20  whitebg bdccc  mt20">
        <!--物流管理-->
        <h1 class="fs16 ml25 mt25 bb1 pb10" >物流管理</h1>
        <div class="TableList">
          <div class="titleOrder mt15" >
            <ul class="dflex">
              <li class="curr">全部状态（2个）</li>
              <li>等待报价（0 ）</li>
              <li>报价中（0个）</li>
              <li>已完成（0个）</li>
              <li>已取消（1个）</li>
            </ul>
            <a>查看全部订单 ></a>
          </div>

          <div class="order_operate">
            <div class="dflex">
              <input type="text" placeholder="输入订单号/产品名称查询" name="" id="" value="" class="orderInput" /><div class="check">查看</div>
            </div>
            <div class="dflex" style="align-items: center;">
              <span style="width: 65px;">订单筛选:</span>

            </div>

          </div>
          <!--表格标题-->
          <div class="TableTitle graybg">
            <span style="width: 12%;">装货点</span>
            <span style="width: 12%;">卸货点</span>
            <span style="width: 12%;">货物名称</span>
            <span style="width: 12%;">货物重量</span>
            <span style="width: 12%;">联系人</span>
            <span style="width: 12%;">电话</span>
            <span style="width: 12%;">订单状态</span>
            <span style="width: 12%;">订单操作</span>
          </div>

          <ul class="logistics">
            <h2>
              <span>订单编号：<span class="gray">120002132</span></span><span>发布时间：<span class="gray">2019-04-02  12:00:00</span></span>
            </h2>
            <li><div class="priOpen">
              <span>上海 市辖区</span><span>吉林 白山 临江市</span><span>PP F08</span><span>102.00</span>
              <span>王小牛</span><span>15000256652</span><span>等待报价</span>
              <span><a class="logBtn redbg">取消</a></span>
            </div>
            </li>
          </ul>

          <ul class="logistics mt10">
            <h2>
              <span>订单编号：<span class="gray">120002132</span></span><span>发布时间：<span class="gray">2019-04-02  12:00:00</span></span>
            </h2>
            <li>
              <div class="priOpen">
                <span>上海 市辖区</span><span>吉林 白山 临江市</span><span>PP F08</span><span>102.00</span>
                <span>王小牛</span><span>15000256652</span><span>等待报价</span>
                <span><a class="logBtn bluebg">收 起</a></span>
              </div>
              <div class="pro_jmts">
                <ul>
                  <li>
                    <span style="width: 40%; text-align: left;margin-left: 10px;">上海塑创电子商务有限公司</span>
                    <span>￥12000.00</span>
                    <span>王小牛</span>
                    <span>15000256652</span>
                    <span><a class="logBtn greenbg">入 选</a></span>
                  </li>
                  <li>
                    <span style="width: 40%; text-align: left;margin-left: 10px;">上海塑创电子商务有限公司</span>
                    <span>￥12000.00</span>
                    <span>王小牛</span>
                    <span>15000256652</span>
                    <span><a class="logBtn greenbg">入 选</a></span>
                  </li>
                  <li>
                    <span style="width: 40%; text-align: left;margin-left: 10px;">上海塑创电子商务有限公司</span>
                    <span>￥12000.00</span>
                    <span>王小牛</span>
                    <span>15000256652</span>
                    <span><a class="logBtn greenbg">入 选</a></span>
                  </li>
                </ul>
              </div>

            </li>
          </ul>
          <ul class="logistics mt10">
            <h2>
              <span>订单编号：<span class="gray">120002132</span></span><span>发布时间：<span class="gray">2019-04-02  12:00:00</span></span>
            </h2>
            <li>
              <div class="priOpen">
                <span>上海 市辖区</span><span>吉林 白山 临江市</span><span>PP F08</span><span>102.00</span>
                <span>王小牛</span><span>15000256652</span><span>等待报价</span>
                <span><a class="logBtn bluebg">收 起</a></span>
              </div>
              <div class="pro_jmts">
                <ul>
                  <li>
                    <span style="width: 40%; text-align: left;margin-left: 10px;">上海塑创电子商务有限公司</span>
                    <span>￥12000.00</span>
                    <span>王小牛</span>
                    <span>15000256652</span>
                    <span><a class="logBtn greenbg">入 选</a></span>
                  </li>
                  <li>
                    <span style="width: 40%; text-align: left;margin-left: 10px;">上海塑创电子商务有限公司</span>
                    <span>￥12000.00</span>
                    <span>王小牛</span>
                    <span>15000256652</span>
                    <span><a class="logBtn greenbg">入 选</a></span>
                  </li>
                  <li>
                    <span style="width: 40%; text-align: left;margin-left: 10px;">上海塑创电子商务有限公司</span>
                    <span>￥12000.00</span>
                    <span>王小牛</span>
                    <span>15000256652</span>
                    <span><a class="logBtn greenbg">入 选</a></span>
                  </li>
                </ul>
              </div>

            </li>
          </ul>

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
            <div class="ml30">转到第<input type="text" class="pageText" />页</div>
            <a class="PageNext">Go</a>
          </ul>


        </div>

     </div>
    </div>
  </div>
</template>

<script>
  import userright from './userCompontent/userright'
    export default {
        name: "userlog",
      layout:'membercenter',
      components:{
        userright
      }
    }
</script>

<style scoped>
.memberInfor{width: 100%;}

  .TableList{width: 95%;  margin: 0 auto;}
  .titleOrder{ display: flex; justify-content: space-between; align-items: center;  border-bottom: 2px solid #007de4; }
  .titleOrder li{padding: 8px 20px; font-size: 14px;}
  .titleOrder li.curr{background-color: #007de4; color: #fff;}

  .order_operate{display: flex;justify-content: space-between; align-items: center; margin: 20px auto;}
  .orderInput{width: 286px; border: 1px solid #DEDEDE; padding-left: 10px;box-sizing: border-box;}
  .check{ color: #fff; width: 60px;line-height: 32px; background-color: #007de4;text-align: center;margin-left: 5px;border-radius: 3px;}


    .TableTitle{margin: 10px auto; padding: 10px 0; display: flex;}
    .TableTitle span{text-align: center; font-size: 14px}
    .listT{width: 100%;border: none; }
    .listT:last-child{margin-bottom: 30px;}
    .listT .Ttitle td{padding: 10px 0;}
    .listT td{width: 15%; }
    .detailTable{height: 80px;}
    .detailTable td{text-align: center;overflow: hidden; padding: 10px 0;}
    .detailTable .operate .Paybtn{ width: 64%; margin: 0 auto;  padding: 4px 6px; color: #666; border-radius: 3px;display: inherit; }
    .detailTable .operate .PayCurr{background-color: #e93131; color: #fff;}
    .detailTable .operate .CarCurr{background-color: #007de4; color: #fff;}

    .logistics h2{ padding: 13px 10px; background-color: #f4f4f4;display: flex;justify-content: space-between; font-size: 14px;}
    .logistics li{border: 1px solid #e6e6e6;box-sizing: border-box; display: flex; flex-direction: column;   box-sizing: border-box; font-size: 14px;}
    .logistics li:hover{background-color: #fcfeff;}
    .logistics li>span{margin: 20px 4px;width: 18%;text-align: center;}
    .logBtn{padding: 4px 18px; color: #fff; border-radius: 3px;}
    .logistics li .priOpen{display: flex;align-items: center;width: 100%;}
    .logistics li .priOpen span{margin: 20px 4px;width: 18%; text-align: center;}
    .greenbg{background-color: #23aa36;}

    .pro_jmts ul{ background-color: #fff; border: 1px solid #e6f1f7;width: 95%;margin: 0 auto;margin-bottom: 10px;}
    .pro_jmts li{border: none; border-bottom: 1px solid #e6f1f7; display: flex; flex-direction: row;}
    .pro_jmts li:last-child{border-bottom: none;}

    /*页码*/
    ul.pagination {  display: inline-block;  padding: 0;   margin: 30px auto;display: flex;justify-content: center;}
    ul.pagination li{display: flex;align-items: center;}
    ul.pagination li a {background-color: #efefef;padding: 5px 11px;}
    ul.pagination li a{  color: #333;border: 1px solid #efefef; border-radius: 4px; padding: 8px 10px;
      text-decoration: none;transition: background-color .3s;  margin: 0 8px;}
    ul.pagination li a.active{background-color: #007de4; color: #fff;  border: 1px solid #007de4;}
    ul.pagination li a:hover:not(.active){background-color: #007de4; color: #fff;border: 1px solid #007de4;}
    ul.pagination .pageText{width: 40px;height: 35px; margin: 0 8px; border-radius:3px;    box-sizing: border-box; border: 1px solid #dededede;
      background-color: #fff;text-align: center;}
    ul.pagination .PageNext{border-radius: 2px; color: #666; width: 40px;height: 35px; line-height: 35px; margin: 0 15px; text-align: center;
      border: 1px solid #dededede;box-sizing: border-box;background-color: #efefef;}

</style>
