<template>
   <div class="body">
      <Header title="头部"></Header>
      <div class="container" title="内容区块">
    <div class="w1200">
      <div class="mt10">
        <a>巨正源首页</a>><span class="gray">预售专栏</span>
      </div>
    </div>
    <div class="w1200 dflex" style="margin-top: 10px;">
    <div  style="width: 76%;">
      <div  class="whitebg">
        <h1 class="AdvSaleTitle">预售专栏</h1>
      </div>
      <div class="dflex whitebg" style="justify-content: space-between; align-items: center;">
        <div class="XHsearch" style="display: flex;">
          <span>品种</span><input type="text"  class="XHsearchInput" placeholder="请输入品种"/>
          <span class="ml15">牌号</span><input type="text" class="XHsearchInput" placeholder="请输入牌号"/>
          <div class="ml20">
            <input type="text" class="priceInput" placeholder="￥最低价"/>-<input type="text" class="priceInput" placeholder="￥最高价"/>
          </div>
          <div class="xhBtn">确定</div>
        </div>
        <div class="mr15 fs14">共搜到<span class="orangeFont">845</span>条数据</div>
      </div>

      <div class="XhlistTitle graybg">
        <span style="width: 11%;">品种</span>
        <span style="width: 11%;">牌号</span>
        <span style="width: 10%;">厂商</span>
        <span style="width: 14%;">库区</span>
        <span style="width: 13%;">总吨数 </span>
        <span style="width: 14%;">交货时间</span>
        <span style="width: 14%;">单价（元/吨）</span>
        <span style="width: 13%;">操作</span>
      </div>

      <ul class="Xhlist">
        <li>
          <span style="width: 11%;">PP</span>
          <span style="width: 11%;">F08</span>
          <span style="width: 10%;">巨正源</span>
          <span style="width: 14%;">东莞</span>
          <span style="width: 13%;">20</span>
          <span style="width: 14%;">31分钟前</span>
          <span class="orangeFont" style="width: 14%;">¥10550</span>
          <span style="width: 13%;"><div class="ListBtn">预定</div></span>
        </li>
        <li>
          <span style="width: 11%;">PP</span>
          <span style="width: 11%;">F08</span>
          <span style="width: 10%;">巨正源</span>
          <span style="width: 14%;">东莞</span>
          <span style="width: 13%;">20</span>
          <span style="width: 14%;">31分钟前</span>
          <span class="orangeFont" style="width: 14%;">¥10550</span>
          <span style="width: 13%;"><div class="ListBtn">预定</div></span>
        </li>
        <li>
          <span style="width: 11%;">PP</span>
          <span style="width: 11%;">F08</span>
          <span style="width: 10%;">巨正源</span>
          <span style="width: 14%;">东莞</span>
          <span style="width: 13%;">20</span>
          <span style="width: 14%;">31分钟前</span>
          <span class="orangeFont" style="width: 14%;">¥10550</span>
          <span style="width: 13%;"><div class="ListBtn">预定</div></span>
        </li>
      </ul>
      <div class="whitebg ovh" style="padding:18px; text-align:center;">
        <page></page>
      </div>
    </div>

      <div class="ml10" style="width: 23%;">
        <div class="whitebg">
          <h1  style="padding: 16px 15px;background-color: #fcfcfc; font-size: 16px;border-bottom:1px solid #DEDEDE">求购信息</h1>

          <!--求购-->

          <purchasing></purchasing>
        </div>
        <!--最近交易-->

        <div class="mt20 whitebg">
          <h1  style="padding: 16px 15px;background-color: #fcfcfc;  font-size: 16px;border-bottom:1px solid #DEDEDE">最近交易
            <span class="fr gray dflexAlem"><i class="fresh"></i>换一批</span></h1>
          <ul class="currdate">
            <li>
              <span class="fwb">FB2310 北欧化工</span>
              <span class="mt5">价格：￥9400.00/吨</span>
              <div class="mt5 mb10" style="display: flex;justify-content: space-between;"><span class="redFont">待付款</span><span>2019-04-28</span></div>
            </li>
            <li>
              <span class="fwb">FB2310 北欧化工</span>
              <span class="mt5">价格：￥9400.00/吨</span>
              <div class="mt5 mb10" style="display: flex;justify-content: space-between;"><span class="redFont">待付款</span><span>2019-04-28</span></div>
            </li>
            <li>
              <span class="fwb">FB2310 北欧化工</span>
              <span class="mt5">价格：￥9400.00/吨</span>
              <div class="mt5 mb10" style="display: flex;justify-content: space-between;"><span class="redFont">待付款</span><span>2019-04-28</span></div>
            </li>
            <li>
              <span class="fwb">FB2310 北欧化工</span>
              <span class="mt10">价格：￥9400.00/吨</span>
              <div class="mt10 mb15" style="display: flex;justify-content: space-between;"><span class="redFont">待付款</span><span>2019-04-28</span></div>
            </li>
            <li>
              <span class="fwb">FB2310 北欧化工</span>
              <span class="mt10">价格：￥9400.00/吨</span>
              <div class="mt10 mb15" style="display: flex;justify-content: space-between;"><span class="redFont">待付款</span><span>2019-04-28</span></div>
            </li>
          </ul>
        </div>
      </div>




    </div>
    </div>
      <Footer size="default" title="底部" style="margin-top:18px;"></Footer>
  </div>
</template>

<script>

import { mapState } from 'vuex'
import Header from '../components/header'
import Footer from '../components/footer'
import purchasing from '../components/purchasing'

export default {
  name: "advance",
  fetch({ store, params }) {
    return Promise.all([
      store.dispatch('menu/getMenuList'),
      store.dispatch('system/getSystemCnf'),
      store.dispatch('helper/getHelpCate', {parentId: 0,indexShow: 1}),
      store.dispatch('system/getLinksInfo')
    ])
  },
  components: {
    Header,
    Footer,
    purchasing
  },

}
</script>

<style scoped>
  .AdvSaleTitle{border-bottom: 1px solid #DEDEDE;padding: 16px 0; font-size: 16px; margin-left: 20px;}
  .XHsearch{padding: 20px; display: flex;align-items: center; font-size: 14px}
  .XHsearchInput{width: 120px;height: 30px;border: 1px solid #D2D2D2; margin-left:10px;padding-left: 5px;box-sizing: border-box;}
  .priceInput{width: 90px;height: 30px;margin: 0 10px;border: 1px solid #D2D2D2; padding-left: 5px;box-sizing: border-box;}
  .xhBtn{padding: 6px 20px;background-color: #007de4; box-sizing: border-box;color: #fff;border-radius: 3px; margin-left: 10px;}
  .orangeFont{color: #ff9800;}

  .XhlistTitle{display: flex; align-items: center;}
  .XhlistTitle span{text-align: center;margin: 10px 0; font-size: 14px}
  .Xhlist li{display: flex;align-items: center; margin-bottom: 1px;background-color: #fff; font-size: 14px}
  .Xhlist li:hover{background-color: #f2f8fe;}
  .Xhlist li:last-child{ }
  .Xhlist li span{text-align: center; margin: 20px 0;}

  /*下单按钮*/
  .ListBtn{ cursor: pointer; width: 76px;line-height: 30px;margin:0 auto; color: #007de4; border-radius:3px; border: 1px solid #007de4;background-color: #f2f8fe;}
  .ListBtn:hover{background-color: #007de4; color: #fff;}

  /*求购信息*/
  .purInfor{margin-top: 20px;margin-left: 15px;}
  .purInfor li{margin: 15px auto;display: flex; align-items: center;}
  .purInfor li .Infortitle{color: #999;width: 60px; font-size: 14px}
  .purInfor li .input{ padding-left: 10px;box-sizing: border-box; width: 168px; line-height: 30px; border: 1px solid #DDDDDD; border-radius: 3px; margin-left: 10px;}
  .date_icon{position: absolute; right:8px;top:7px;width: 25px;height: 25px;background: url(/img/icon.png)no-repeat 0px -282px;}
  .DateTIME{width: 168px;margin-left: 12px;position: relative; cursor: pointer;}
  .purinfobtn{ cursor: pointer;   background-color: #007de4;display: inline-block; color: #fff;  padding: 9px 20px; border-radius: 3px; margin-left: 73px; margin-bottom: 20px;  margin-top: 10px;}
  .redFont{color: #f70503;}
  /*最近交易*/
  .fresh{display: inline-block;width: 17px;height: 17px;background: url(/img/icon.png)no-repeat -2px -317px;    margin-right: 6px;}
  .currdate{margin: 18px 20px;  overflow:hidden;}
  .currdate li{border-bottom: 1px dotted #DDDDDD;display: flex;flex-direction: column; margin-top: 10px; font-size: 14px;}
  .currdate li:last-child{margin-bottom: 30px;}
</style>
