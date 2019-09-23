<template>
  <div class="w1200 ">
    <div class="ListTitle  whitebg mt20">
      <div class="TitleName">物流找车</div>
      <a class="mr20 mt15 mb15 gray">更多 ></a>
    </div>

    <div class="logistic dflex">
      <div class="logistic_banner">
        <img src="../../static/img/logistics_banner.jpg" />
      </div>
      <ul class="logisticList mt1 dflex">
        <li>
          <div class="dflexAlem mt35" style="justify-content: center; flex-direction: column;">
            <p>广东省 东莞市</p>
            <p class="mt10 mb10"><img src="../../static/img/down.png"/></p>
            <p>广东省 东莞市</p>
          </div>
          <div class="logNumTime graybg"  >
            <p><span class="logNumTime_title">数       量 :</span> <span class="Numorange">15,000吨</span></p>
            <p class="mt10"><span class="logNumTime_title">装货时间 :</span> 2019-5-20</p>
          </div>
        </li>
        <li>
          <div class="dflexAlem mt35" style="justify-content: center; flex-direction: column;">
            <p>广东省 东莞市</p>
            <p class="mt10 mb10"><img src="../../static/img/down.png"/></p>
            <p>广东省 东莞市</p>
          </div>
          <div class="logNumTime graybg"  >
            <p><span class="logNumTime_title">数       量 :</span> <span class="Numorange">15,000吨</span></p>
            <p class="mt10"><span class="logNumTime_title">装货时间 :</span> 2019-5-20</p>
          </div>
        </li>
        <li>
          <div class="dflexAlem mt35" style="justify-content: center; flex-direction: column;">
            <p>广东省 东莞市</p>
            <p class="mt10 mb10"><img src="../../static/img/down.png"/></p>
            <p>广东省 东莞市</p>
          </div>
          <div class="logNumTime graybg"  >
            <p><span class="logNumTime_title">数       量 :</span> <span class="Numorange">15,000吨</span></p>
            <p class="mt10"><span class="logNumTime_title">装货时间 :</span> 2019-5-20</p>
          </div>
        </li>
        <li>
          <div class="dflexAlem mt35" style="justify-content: center; flex-direction: column;">
            <p>广东省 东莞市</p>
            <p class="mt10 mb10"><img src="../../static/img/down.png"/></p>
            <p>广东省 东莞市</p>
          </div>
          <div class="logNumTime graybg"  >
            <p><span class="logNumTime_title">数       量 :</span> <span class="Numorange">15,000吨</span></p>
            <p class="mt10"><span class="logNumTime_title">装货时间 :</span> 2019-5-20</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Logisticscar"
    }
</script>

<style scoped>
  .ListTitle{display: flex;justify-content: space-between;}
  .ListTitle{font-size: 14px;}
  .TitleName { border-left: 2px solid #279eff;   padding-left: 10px;  margin: 15px 0; font-size: 16px;}
  .logisticList li{width: 240.8px; margin-right: 1px; background-color: #fff; font-size: 14px;}
  .Numorange{color: #ff6600}
  .logNumTime{width: 85%; margin: 30px auto 0px; padding: 15px 30px;  display: flex; flex-direction: column;   box-sizing: border-box;}
  .logNumTime p{display: flex;align-items: center;}
  .logNumTime_title{width: 70px;text-align-last: justify; margin-right: 5px;}
</style>
