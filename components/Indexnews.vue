<template>
  <div class="w1200 ">
    <div class="ListTitle  whitebg mt20">
      <div class="TitleName">行业资讯</div>
      <a class="mr20 mt15 mb15 gray fs14">更多 ></a>
    </div>

    <ul class="Indexnews">
      <li>
        <div class="ml15 mr15 mt15">
          <img src="../assets/img/news01.png" />
        </div>
        <div class="newsTile">聚丙烯期货入驻夜盘  我们该或喜或...</div>
        <div class="newsTimeLink">
          <span class="dflexAlem"><img src="../assets/img/time_icon.png" class="mr5"/>2019-05-05</span><a href="#.html">【查看全文】</a>
        </div>
      </li>
      <li>
        <div class="ml15 mr15 mt15">
          <img src="../assets/img/news02.png" />
        </div>
        <div class="newsTile">聚丙烯期货入驻夜盘  我们该或喜或...</div>
        <div class="newsTimeLink">
          <span class="dflexAlem"><img src="../assets/img/time_icon.png" class="mr5"/>2019-05-05</span><a href="#.html">【查看全文】</a>
        </div>
      </li>
      <li>
        <div class="ml15 mr15 mt15">
          <img src="../assets/img/news03.png" />
        </div>
        <div class="newsTile">聚丙烯期货入驻夜盘  我们该或喜或...</div>
        <div class="newsTimeLink">
          <span class="dflexAlem"><img src="../assets/img/time_icon.png" class="mr5"/>2019-05-05</span><a href="#.html">【查看全文】</a>
        </div>
      </li>
      <li>
        <div class="ml15 mr15 mt15">
          <img src="../assets/img/news04.png" />
        </div>
        <div class="newsTile">聚丙烯期货入驻夜盘  我们该或喜或...</div>
        <div class="newsTimeLink">
          <span class="dflexAlem"><img src="../assets/img/time_icon.png" class="mr5"/>2019-05-05</span><a href="#.html">【查看全文】</a>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
    export default {
        name: "Indexnews"
    }
</script>

<style scoped>
  .ListTitle{display: flex;justify-content: space-between;}
  .TitleName{border-left: 2px solid #279eff; padding-left: 10px; margin: 15px 0; font-size: 16px;}

  .Indexnews{ display: flex; margin-top: 1px;}
  .Indexnews li{width: 300px; box-sizing: border-box; background-color: #fff; display: flex;flex-direction: column; border-right: 1px solid #DEDEDE;}
  .Indexnews li:last-child{border-right: none;}
  .Indexnews li a:hover{color: #007de4;}

  .newsTile{ font-weight: bold;font-size: 16px; margin:  20px auto; width: 270px;overflow: hidden;text-overflow: ellipsis; white-space: nowrap;}
  .newsTimeLink{ display: flex; justify-content: space-between; align-items: center; color: #999; margin:  0px auto 20px; width: 270px;}

</style>
