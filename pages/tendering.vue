<template>
<div>
  <div class="tac fs0">
    <img src="../assets/img/Tenderingbanner.png" />
  </div>
  <div class="trenderCenter">
      <div class="trendLogin fs14">
          <div class="trendLoginCenter">
            <p class="trendTitle">招标登录</p>
            <input type="text" class="trendInput mt20" placeholder="手机/用户名">
            <input type="text" class="trendInput mt15" placeholder="密码">
            <div class="trendbtn mt35">登 录</div>
            <div class="dflexAlem mt40" style="justify-content: space-between"><span>忘记密码</span><span>注册新账号</span></div>
          </div>
      </div>
  </div>
<!--  招标流程-->
  <div class="whitebg dflexAlemJust" style="padding: 40px 0 50px;">
    <img src="../assets/img/trendFlow.png" />
  </div>
<!--  公告信息-->
<div class="graybg">
  <div class="w1200 " style="margin-bottom: 50px">
    <div class="ListTitle  whitebg mt20">
      <div class="TitleName">公告信息</div>
      <a class="mr20 mt15 mb15 gray fs14"> 更多 </a>
    </div>
    <div class="graybg trendlistTitle">
      <span style="width: 25%; padding-left: 10px">招标编号</span><span class="tac" style="width:45%;">招标名称</span><span class="tac" style="width: 13%">招标状态</span><span class="tar mr10" style="width: 17%">招标时间</span>
    </div>
    <ul class="trendlist">
      <li>
        <span class="pl10" style="width: 25%;">0744-184CSIE06913</span>
        <span class="tac" style="width:45%;">东莞巨正源采购项目—三维激光扫描仪项目招标公告</span>
        <span class="tac" style="width: 13%">已投</span>
        <span class="tar gray  pr10" style="width: 17%">2019.3.28-2019.4.10</span>
      </li>
      <li>
        <span class="pl10" style="width: 25%;">0744-184CSIE06913</span>
        <span class="tac" style="width:45%;">东莞巨正源采购项目—三维激光扫描仪项目招标公告</span>
        <span class="tac" style="width: 13%">已投</span>
        <span class="tar gray  pr10" style="width: 17%">2019.3.28-2019.4.10</span>
      </li>
      <li>
      <span class="pl10" style="width: 25%;">0744-184CSIE06913</span>
      <span class="tac" style="width:45%;">东莞巨正源采购项目—三维激光扫描仪项目招标公告</span>
      <span class="tac" style="width: 13%">已投</span>
      <span class="tar gray  pr10" style="width: 17%">2019.3.28-2019.4.10</span>
    </li>


    </ul>

  </div>
</div>
<div class="whitebg ovh">
  <div class="w1200 dflex" style="margin-top: 40px; margin-bottom: 40px; justify-content: space-between">
     <div class="WineBid">
       <div class="winebidTitle winebidTitlebluebg"><span class="fs20">中标公告</span>
          <span class="fs14 cp" @click="WineBid">更多</span>
       </div>
       <ul class="listWineBid" >
         <li><span class="trendtextTitle">东莞巨正源采购项目—三维激光扫描仪项目招标公...</span><span class="gray">2019.3.28-2019.4.10</span></li>
         <li><span class="trendtextTitle">东莞巨正源采购项目—三维激光扫描仪项目招标公...</span><span class="gray">2019.3.28-2019.4.10</span></li>

         <li><span class="trendtextTitle">东莞巨正源采购项目—三维激光扫描仪项目招标公...</span><span class="gray">2019.3.28-2019.4.10</span></li>

       </ul>
     </div>
    <div class="Deal">
      <div class="winebidTitle winebidTitlegreenbg"><span class="fs20">成交公告</span> <span  class="fs14 cp">更多</span> </div>
      <ul class="listWineBid" >
        <li><span class="trendtextTitle">东莞巨正源采购项目—三维激光扫描仪项目招标公...</span><span class="gray">2019.3.28-2019.4.10</span></li>
        <li><span class="trendtextTitle">东莞巨正源采购项目—三维激光扫描仪项目招标公...</span><span class="gray">2019.3.28-2019.4.10</span></li>

        <li><span class="trendtextTitle">东莞巨正源采购项目—三维激光扫描仪项目招标公...</span><span class="gray">2019.3.28-2019.4.10</span></li>

      </ul>
    </div>
  </div>


</div>



</div>
</template>

<script>
    export default {
        name: "tendering",
      data(){
          return{}
      },
      methods:{
        WineBid(){
          this.$router.push({ path:'./trender/WineBid'  })

         }
      },
      mounted() {

      }
    }
</script>

<style scoped>
  .trenderCenter{width: 1200px;margin: 0 auto;position: relative;z-index: 4;height: 0px;}
  .trendLogin{background: #fff;position: absolute;top: -385px;right: 0;width: 310px; border-radius: 3px;}

  .trendTitle{border-left: 1px solid #d7d7d7; padding-left: 10px}

  .trendLoginCenter{margin: 30px 40px 45px;}
  .trendInput{ padding-left: 10px;box-sizing: border-box;    border: 1px solid #DEDEDE;width: 100%; height: 36px; border-radius: 3px;}

  .trendbtn{ height: 36px; line-height: 36px; color: #fff; text-align: center; border-radius: 3px; background-color: #007de4;}

  .trendlistTitle{    display: flex; }
  .trendlistTitle span{padding: 20px 0; font-size: 16px; }

  .trendlist{font-size: 14px;}
  .trendlist li{background-color: #fff;padding:24px 0; display: flex; margin-bottom: 1px;}
  .trendlist li:hover{background-color: #f2f8fe}

  .WineBid{width: 49%}
  .Deal{width: 49%;}
  .winebidTitle{display: flex;align-items: center; justify-content: space-between; height: 60px;padding: 0 15px; color: #fff;}
  .winebidTitlebluebg{background-color: #2d92ea}
  .winebidTitlegreenbg{background-color: #14a758}

  .listWineBid{border: 1px solid #DEDEDE;}
  .listWineBid li{padding: 20px 10px; display: flex; justify-content: space-between; font-size: 14px;}
  .listWineBid li:nth-child(even){background-color: #f8f7f7;}
  .listWineBid li .trendtextTitle{width: 70%; overflow:hidden; text-overflow: ellipsis;white-space: nowrap;    color: #666;}
</style>
