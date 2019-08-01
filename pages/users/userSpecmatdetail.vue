<template>
  <div class="clearfix graybg">

    <div class="w1200 dflex " style="margin-bottom: 40px">
      <usernav></usernav>

      <div class="memberInfor ml20  whitebg bdccc  mt20">
        <!--个人信息-->
        <h1 class="fs16 ml25 mt25 bb1 pb10" >竞拍详情</h1>

        <!--进度表-->
        <div class="pressage">

          <ul class="order_cat_title_list">
            <li class="curr">
              <i><img src="../../assets/img/progress_icon01.png"/></i>
              <span>
							<p>冻结保证金</p>
							<p class="gray">12月18日 17:00</p>
						</span>
            </li>
            <li><i><img src="../../assets/img/progress_icon02.png"/></i><span>提交订单</span></li>
            <li><i><img src="../../assets/img/progress_icon03.png"/></i><span>支付货款</span></li>
            <li><i><img src="../../assets/img/progress_icon04.png"/></i><span>支付完成</span></li>
            <li><i><img src="../../assets/img/progress_icon05.png"/></i><span style="left: -61px;width: 77px;">支付完成</span></li>

          </ul>

        </div>
        <!--商品信息-->
        <div class="ProInfor">
          <h1 class="fs16 fwb">商品信息</h1>
          <ul class="SpotGoods">
            <li>品种：<span>PP</span></li>
            <li>牌号：<span>F08</span></li>
            <li>厂商：<span>巨正源</span></li>
            <li>单价：<span>￥10550.00</span>元</li>
            <li>购买数量：<span>102.098</span>吨</li>
          </ul>
          <div class="ml25 mt20 mb30 fs14">订单总额：<span class="fwb fs18 orangeFont">￥1,076,198.00</span> 元</div>
        </div>

        <div class="goodsinfor">
          <h1 class="fs16 fwb">收货信息</h1>
          <ul class="deliveryinfor mt10">
            <li>姓       名：张先生</li>
            <li>联系电话：15602110231</li>
            <li>收货地址：上海市浦东新区康新公路2000号</li>
            <li>身份证号：422422199012125656</li>
          </ul>
        </div>
        <!--横线-->
        <div class="goodsLine"></div>

        <div class="goodsinfor">
          <h1 class="fs16 fwb">发票信息</h1>
          <ul class="invoiceList">
            <li>
              <img src="../../assets/img/incve.png"/>
              <a class="See">查看<img src="../../assets/img/See_icon.png" /></a>
            </li>
            <li>
              <img src="../../assets/img/incve.png"/>
              <a class="See">查看<img src="../../assets/img/See_icon.png" /></a>
            </li>
            <li>
              <img src="../../assets/img/incve.png"/>
              <a class="See">查看<img src="../../assets/img/See_icon.png" /></a>
            </li>
          </ul>
        </div>

      </div>





    </div>


  </div>
</template>

<script>
import Navigation from '../../components/navigation'

export default {
  name: "userSpecmatdetail",
  layout:'membercenter',
  components:{
    usernav: Navigation.user
  },
  fetch({ store }) {
    return Promise.all([
      store.dispatch('system/getSystemCnf'),
      store.dispatch('menu/getMenuList')
    ])
  }
}
</script>

<style scoped>
  .memberInfor{width: 83%;}

  .memberList h1.curr{border-bottom: 1px solid #DEDEDE;}
  .bodbottom{ position: absolute; bottom: -2px;width: 80%; height: 4px; background-color: #007de4;}

  /*进度表*/
  .pressage{width: 95%;margin: 0 auto; height: 120px;}
  .order_cat_title_list {border-radius: 15px; margin-bottom: 60px; margin-top: 40px;    margin-left: 109px;}
  .order_cat_title_list li.curr {  background: #23aa36; border-radius: 15px;}
  .order_cat_title_list li { height: 5px; position: relative;float: left;  width: 130px;
    margin-right: 29px; background-color: #dedede;  border-radius: 5px;  margin-left: 15px;}
  .order_cat_title_list li i { font-weight: bold;    line-height: 36px;   background: #cccccc;
    color: #fff; border-radius: 50%; left: -40px;   top: -17px;  position: absolute;   width: 36px; height: 36px;display: flex;align-items: center;justify-content: center;  }
  .order_cat_title_list li:last-child{background: none;width: 40px;}
  .order_cat_title_list li.curr i { background: #23aa36;}
  .order_cat_title_list li.curr p:first-child { color: #23aa36;}
  .order_cat_title_list li span{text-align: center;position: absolute; top: 26px;
    width: 100%;  left: -90px;}

  /*商品信息*/
  .ProInfor{width: 95%;  background-color: #fefdee;    margin: 0 auto;  border: 1px solid #f8e5bb;}
  .ProInfor h1{font-size: 16px;margin-left: 25px;margin-top: 15px;}
  .SpotGoods{display: flex;margin-left: 25px;margin-top: 25px;}
  .SpotGoods li:first-child{margin-left: 0;}
  .SpotGoods li{margin-left: 20px; font-size: 14px;}
  .SpotGoods li span{color: #ff7300;}


  .goodsinfor{width: 90%;  margin: 40px auto;}
  .deliveryinfor{display: flex; flex-wrap: wrap;margin-left: -20px;}
  .deliveryinfor li{width: 45%;  margin-top: 10px;  margin-left: 20px; display: flex; font-size: 14px}

  .goodsLine{width: 95%; margin: 0 auto;height: 1px;background-color: #D2D2D2;}

  /*发票信息*/
  .invoiceList{display: flex; flex-wrap: wrap; margin-left: -30px;}
  .invoiceList li{margin-left: 30px; margin-top: 20px; position: relative;border: 1px solid #ccc;}
  .invoiceList li .See{opacity: 0; color: #fff; width: 100%;background: rgba(0,0,0,0.5);display: flex;align-items: center;justify-content: center; height: 100%;position: absolute; top: 0; transition: all 0.5s; }
  .invoiceList li:hover .See{opacity: 1; }
  .invoiceList li .See img{ padding-left: 5px;}

</style>
