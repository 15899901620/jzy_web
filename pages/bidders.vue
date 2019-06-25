<template>
  <div>
    <!--banner-->
    <div class="tac">
      <img src="../assets/img/auctionBanner.png" />
    </div>
    <div class="w1200">
      <!--竞拍时间-->
      <div class="AuctionTime mt35">

        <ul>
          <li class="curr">
            <div class="fs20">
              5月16日 10:30 场
            </div>
            <div class="AtP">
              正在竞拍
            </div>
          </li>
          <li class="">
            <div class="fs20">
              5月17日 14:00 场
            </div>
            <div class="AtP">
              <span class="Atborder">即将开始</span>
            </div>
          </li>
          <li class="">
            <div class="fs20">
              5月12日 14:00 场
            </div>
            <div class="AtP"  >
              <span class="Atborder">竞拍结束</span>
            </div>
          </li>
        </ul>
      </div>


      <!--竞拍列表-->

      <div class="acuList">
        <ul>
          <li>
            <div class="acuProduct">
              <h1>巨正源 SGP PPCP （原厂正牌）</h1>
              <div class="mt10">起拍价：<span class="orangeFont fwb fs16">8800.00元/吨</span></div>
              <div class="mt10">数    量：100吨</div>
              <div class="mt30 fs18">
                开始时间：2019-03-27  09:00
              </div>
            </div>
            <div class="acuOpear">
              <div class="mt10">城市：东莞</div>
              <div class="mt5">竞品厂商：巨正源</div>
              <div class="btnStart" @click="BidersDetail()">即将开始</div>
            </div>
          </li>
          <li>
            <div class="acuProduct">
              <h1>巨正源 SGP PPCP （原厂正牌）</h1>
              <div class="mt10">起拍价：<span class="orangeFont fwb fs16">8800.00元/吨</span></div>
              <div class="mt10">数    量：100吨</div>
              <div class="mt30 fs18">
                开始时间：2019-03-27  09:00
              </div>
            </div>
            <div class="acuOpear">
              <div class="mt10">城市：东莞</div>
              <div class="mt5">竞品厂商：巨正源</div>
              <div class="btnStart">即将开始</div>
            </div>
          </li>
          <li>
            <div class="acuProduct">
              <h1>巨正源 SGP PPCP （原厂正牌）</h1>
              <div class="mt10">起拍价：<span class="orangeFont fwb fs16">8800.00元/吨</span></div>
              <div class="mt10">数    量：100吨</div>
              <div class="mt30 fs18">
                开始时间：2019-03-27  09:00
              </div>
            </div>
            <div class="acuOpear">
              <div class="mt10">城市：东莞</div>
              <div class="mt5">竞品厂商：巨正源</div>
              <div class="btnStart">即将开始</div>
            </div>
          </li>
          <li>
            <div class="acuProduct">
              <h1>巨正源 SGP PPCP （原厂正牌）</h1>
              <div class="mt10">起拍价：<span class="orangeFont fwb fs16">8800.00元/吨</span></div>
              <div class="mt10">数    量：100吨</div>
              <div class="mt30 fs18">
                开始时间：2019-03-27  09:00
              </div>
            </div>
            <div class="acuOpear">
              <div class="mt10">城市：东莞</div>
              <div class="mt5">竞品厂商：巨正源</div>
              <div class="btnStart">即将开始</div>
            </div>
          </li>
          <li>
            <div class="acuProduct">
              <h1>巨正源 SGP PPCP （原厂正牌）</h1>
              <div class="mt10">起拍价：<span class="orangeFont fwb fs16">8800.00元/吨</span></div>
              <div class="mt10">数    量：100吨</div>
              <div class="mt30 fs18">
                开始时间：2019-03-27  09:00
              </div>
            </div>
            <div class="acuOpear">
              <div class="mt10">城市：东莞</div>
              <div class="mt5">竞品厂商：巨正源</div>
              <div class="btnStart">即将开始</div>
            </div>
          </li>
          <li>
            <div class="acuProduct">
              <h1>巨正源 SGP PPCP （原厂正牌）</h1>
              <div class="mt10">起拍价：<span class="orangeFont fwb fs16">8800.00元/吨</span></div>
              <div class="mt10">数    量：100吨</div>
              <div class="mt30 fs18">
                开始时间：2019-03-27  09:00
              </div>
            </div>
            <div class="acuOpear">
              <div class="mt10">城市：东莞</div>
              <div class="mt5">竞品厂商：巨正源</div>
              <div class="btnStart">即将开始</div>
            </div>
          </li>
        </ul>


      </div>
      <div class="w1200">
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
</template>

<script>
    export default {
        name: "bidders",
      components: {
      },
      data(){
          return{}
      },
      methods:{
        BidersDetail(){
          this.$router.push({path:'./Biders/BidersBegin'})
        }
      },
    }
</script>

<style scoped>
  .paipinacu{color: #333;}
  .AuctionTime ul{display: flex;}
  .AuctionTime li{background-color: #fff;width: 33.3%; text-align: center;padding: 10px 0;}
  .AuctionTime li.curr{color: #fff;background-color: #ff6c00; box-shadow: 6px 0px 3px 1px #ff6c00;z-index: 10;position: relative;}
  .AtP{margin-top: 3px;display: flex; justify-content: center; align-items: center;}
  .Atborder{ text-align: center; padding: 0px 10px;  border-radius: 15px; border: 1px solid #CCCCCC;  color: #CCCCCC; font-size: 14px; overflow: hidden;}

  .acuList{display: flex;}
  .acuList ul{display: flex;flex-wrap: wrap;width: 100%;}
  .acuList li{background-color: #fff;width: 49%; margin-top: 15px; display: flex;}
  .acuList li:nth-child(even){margin-left: 2%;}
  .acuList li .acuProduct{width: 300px; border-right: 1px solid #ccc; margin: 35px 0; margin-left: 45px;}
  .acuList li .acuOpear{font-size: 18px; width: 245px; margin-top: 35px;display: flex; flex-direction: column; align-items: center;}
  .acuList li .acuOpear .btnStart{background-color: #26a96d;color: #fff; padding: 10px 50px; border-radius:5px;margin-top:20px;cursor: pointer;}
  .acuList li .acuProduct h1{margin-top: 5px; font-weight: bold; font-size: 16px;}



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
