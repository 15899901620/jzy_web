<template>
  <div class="clearfix graybg">
    <div class="w1200 dflex " style="margin-bottom: 40px">
      <userright></userright>

      <div class="memberInfor ml20  whitebg bdccc  mt20">
        <!--个人信息-->
        <h1 class="fs16 ml25 mt25 pb10 pr" style="border-bottom: 2px solid #DEDEDE;width: 95%;" >我的专料
          <div class="bodbottom" style="width: 8%; height: 2px;"></div>
        </h1>
        <div class="" style="width: 95%; margin: 0 auto;">
          <div class="order_operate">
            <div class="dflex">
              <input type="text" placeholder="输入订单号/产品名称查询" name="" id="" value="" class="orderInput" />
              <div class="check">查看</div>
            </div>
            <div class="dflex" style="align-items: center;">
              <span style="width: 90px;">起始日期</span><input type="text" class="layui-input" id="test6" placeholder="选择订单时间">
            </div>
          </div>
          <!--表格-->
          <div class="TableTitle graybg">
            <span style="width: 15%;">商品信息</span>
            <span style="width: 15%;">单价(元)</span>
            <span style="width: 15%;">数量(吨)</span>
            <span style="width: 15%;">冻结金额</span>
            <span style="width: 15%;">库区</span>
            <span style="width: 15%;">交货方式</span>
            <span style="width: 15%;">状态</span>
            <span style="width: 15%;">订单操作</span>
          </div>
          <table class="listT mt10" border="" cellspacing="" cellpadding="">
            <tbody>
            <tr class="Ttitle graybg" >
              <td colspan="8">
                <span class="ml10">订单编号：<span class="gray">120002132</span></span>
                <span class="ml15">下单时间：<span class="gray">2019-04-02  12:00:00</span></span>
                <span class="fr mr15"><span class="gray">距离最后付款时间还剩：</span>02小时30分25秒</span>
              </td>
            </tr>
            <tr class="detailTable">
              <td>PP F08 专料</td>
              <td><span class="orangeFont">￥1055.00</span>/吨</td>
              <td>25.000吨</td>
              <td>1,076.10</td>
              <td>东莞市</td>
              <td>自提</td>
              <td><span class="redFont">待付款</span></td>
              <td>
                <div  class="operate">
                  <a class="Paybtn  PayCurr">去付款</a>
                  <div class="mt5 cp" @click="spcSee()">查看详情</div>
                  <div @click="showcancel()" class="fs14 cp mt5">取消订单</div>
                </div>

              </td>
            </tr>
            </tbody>

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
    <cancelorder @hidden="hiddenShow" v-show="showcancel_pop"></cancelorder>
  </div>
</template>

<script>
  import userright from './userCompontent/userright'
  import cancelorder from './userCompontent/cancelorder'
    export default {
        name: "userSpecmat",
   layout:'membercenter',
     components:{
        userright,
       cancelorder
  },
      data() {
        return {
          showcancel_pop:false
        };
      },
      methods:{
        showcancel(){
          this.showcancel_pop=true
        },
        hiddenShow(){
          let that = this;
          that.showcancel_pop = false
        },
        // 查看详情
        spcSee(){
          this.$router.push({path:'./userSpecmatdetail'})
        }

      }
    }
</script>

<style scoped>
  .memberInfor{width: 100%;}

  .memberList h1.curr{border-bottom: 1px solid #DEDEDE;}
  .bodbottom{ position: absolute; bottom: -2px;width: 80%; height: 4px; background-color: #007de4;}

  .order_operate{display: flex;justify-content: space-between; align-items: center; margin: 20px auto; font-size: 14px}
  .orderInput{width: 286px; border: 1px solid #DEDEDE; padding-left: 10px;box-sizing: border-box;}
  .check{ color: #fff; width: 60px;line-height: 32px; background-color: #007de4;text-align: center;margin-left: 5px;border-radius: 3px;}

  .TableTitle{margin: 10px auto; padding: 10px 0; display: flex;}
  .TableTitle span{text-align: center; font-size: 14px;}

  .listT {width: 100%;border: none;}
  .listT th{border: none; padding: 10px 0;}
  .listT td{ width: 12%; font-size: 14px;}
  .listT tr{margin-bottom: 10px;}
  .listT .Ttitle td { padding: 10px 0;}

  .detailTable {height: 80px;}
  .detailTable td {text-align: center;overflow: hidden;padding: 10px 0;}

  .detailTable .operate{width: 100%; display: flex;flex-direction: column;}
  .detailTable .operate .Paybtn {width: 64%;margin: 0 auto;padding: 4px 6px;color: #666;border-radius: 3px; }
  .detailTable .operate .PayCurr {background-color: #e93131;color: #fff;}


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
