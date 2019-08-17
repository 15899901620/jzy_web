<template>
    <div class="clearfix graybg">
        <div class="w1200 dflex " style="margin-bottom: 40px">
            <usernav></usernav>
            <div class="memberInfor ml20  whitebg bdccc  mt20">
                <!--个人信息-->
                <!--个人信息-->
                <h1 class="fs16 ml25 mt25 pb10 pr" style="border-bottom: 2px solid #DEDEDE;width: 95%;" >我的预售
                    <div class="bodbottom" style="width: 8%; height: 2px;"></div>
                </h1>
                <div class="" style="width: 95%; margin: 0 auto;">
                    <div class="order_operate">
                    <div class="dflex">
                        <input type="text" placeholder="输入订单号/产品名称查询" name="" id="" value="" class="orderInput" />
                        <div class="check">查看</div>
                    </div>
                   
                    </div>
                    <div class="TableTitle graybg"  >
                    <span style="width: 12%;">商品信息</span>
                    <span style="width: 12%;">单价(元)</span>
                    <span style="width: 12%;">预定量(吨)</span>
                    <span style="width: 12%;">冻结金额</span>
                    <span style="width: 13%;">库区</span>
                    <span style="width: 10%;">交货方式</span>
                    <span style="width: 13%;">放货时间</span>
                    <span style="width: 12%;">状态</span>
                    <span style="width: 13%;">操作</span>
                    </div>
                    <table class="listT mt10" border="" cellspacing="" cellpadding="">
                        <tbody>
                            <tr class="Ttitle graybg" >
                                <td colspan="9">
                                <span class="ml10">订单编号：<span class="gray">120002132</span></span>
                                <span class="ml15">预定时间：<span class="gray">2019-04-02  12:00:00</span></span>
                                <span class="fr mr15"><span class="gray">距离最后付款时间还剩：</span>02小时30分25秒</span>
                                </td>
                            </tr>
                            <tr class="detailTable">
                                <td>PP F08 现货</td>
                                <td><span class="orangeFont">￥1055.00</span>/吨</td>
                                <td>102.000</td>
                                <td>102.000</td>
                                <td>东莞市</td>
                                <td>自提</td>
                                <td>2019年4月中旬</td>
                                <td><span class="redFont">待付款</span></td>
                                <td class="operate">
                                <div class="">
                                    <a class="Paybtn mt15 PayCurr">去付款</a>
                                </div>
                                <a class="mt5 blackFont">查看详情</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <!--页码-->
                 
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Navigation from '../../components/navigation'
export default {
  name: "useradvsale",
  layout:'membercenter',
  components:{
     usernav: Navigation.user
  },
  fetch({ store }) {
    return Promise.all([
      store.dispatch('system/getSystemCnf'),
      store.dispatch('menu/getMenuList')
    ])
  },
}
</script>

<style scoped>
  .memberInfor{width: 83%;}

  .memberList h1.curr{border-bottom: 1px solid #DEDEDE;}
  .bodbottom{ position: absolute; bottom: -2px;width: 80%; height: 4px; background-color: #007de4;}

  .order_operate{display: flex;justify-content: space-between; align-items: center; margin: 20px auto; font-size: 14px}
  .orderInput{width: 286px; border: 1px solid #DEDEDE; padding-left: 10px;box-sizing: border-box;}
  .check{ color: #fff; width: 60px;line-height: 32px; background-color: #007de4;text-align: center;margin-left: 5px;border-radius: 3px;}

  .TableTitle{margin: 10px auto; padding: 10px 0; display: flex;}
  .TableTitle span{text-align: center; font-size: 14px;}

  .listT{width: 100%;border: none; font-size: 14px;}
  .listT:last-child{margin-bottom: 30px;}
  .listT .Ttitle td{padding: 10px 0;}
  .listT td{width: 10%; }

  .detailTable{height: 80px;}
  .detailTable td{text-align: center;overflow: hidden; padding: 10px 0;}
  .detailTable .operate .Paybtn{ width: 64%; margin: 0 auto;  padding: 4px 6px; color: #666; border-radius: 3px;display: inherit; }
  .detailTable .operate .PayCurr{background-color: #e93131; color: #fff;}
  .detailTable .operate .CarCurr{background-color: #007de4; color: #fff;}

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
