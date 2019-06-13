<template>
  <div class="volume_find">
    <div class="dflex mt25" style="justify-content: center;">
      <div class="indexHead"><img  src="../../assets/img/index_head.png"/></div>
      <div class="ml10">
        <p class="mt5">HI,上午好！</p>
        <p class="gray">欢迎来到巨正源交易网!</p>
      </div>
    </div>
    <div class="loginReg mt10"><a href="" class="loginbg">登 录</a><a href="" class="registerbg ml10">注 册</a></div>
    <ul class="NewsList">
      <li   @click="cur=0" :class="{curr:cur==0}">网站公告</li><li @click="cur=1" :class="{curr:cur==1}">行业资讯</li>
    </ul>
    <ul class="news">
      <li v-show="cur==0">
        <ul class="newscont">
          <li><span class="newtitle">0热烈庆祝巨正源5周...</span><span class="ml10 Newsdate">05-08</span></li>
          <li><span class="newtitle">热烈庆祝巨正源5周...</span><span class="ml10 Newsdate">05-08</span></li>
          <li><span class="newtitle">热烈庆祝巨正源5周...</span><span class="ml10 Newsdate">05-08</span></li>
          <li><span class="newtitle">热烈庆祝巨正源5周...</span><span class="ml10 Newsdate">05-08</span></li>
          <li><span class="newtitle">热烈庆祝巨正源5周...</span><span class="ml10 Newsdate">05-08</span></li>

        </ul>
      </li>
      <li v-show="cur==1">
        <ul class="newscont">
          <li><span class="newtitle">1热烈庆祝巨正源5周...</span><span class="ml10 Newsdate">05-08</span></li>
          <li><span class="newtitle">热烈庆祝巨正源5周...</span><span class="ml10 Newsdate">05-08</span></li>
          <li><span class="newtitle">热烈庆祝巨正源5周...</span><span class="ml10 Newsdate">05-08</span></li>
          <li><span class="newtitle">热烈庆祝巨正源5周...</span><span class="ml10 Newsdate">05-08</span></li>
          <li><span class="newtitle">热烈庆祝巨正源5周...</span><span class="ml10 Newsdate">05-08</span></li>

        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
    export default {
        name: "headnews",
      data(){
          return{
            cur:0
          }
      },
      methods:{

      }
    }
</script>

<style scoped>
  .volume_find{background: #fff;position: absolute;top: -320px; right: 0; width: 240px;}
  .indexHead{ display: flex; justify-content: center; align-items: center; width: 54px;height: 54px;box-shadow: 0px 0px 5px #cccc; border-radius: 50%;}
  .loginReg{display: flex; justify-content: center;}
  .loginReg a{width: 96px;height: 30px;text-align: center;line-height: 30px; box-sizing: border-box; border-radius: 3px;}
  .loginReg .loginbg{background-color: #007de4; color: #fff; }
  .loginReg .registerbg{border: 1px solid #007de4; color:#007de4;}

  /*网站公告/行业资讯*/
  .NewsList{display: flex; margin-top: 20px;border-top: 1px solid #DEDEDE;}
  .NewsList li.curr{background-color: #fff; color: #007de4;}
  .NewsList li{width: 50%; text-align: center;background-color: #f5f5f5; padding: 10px 30px; cursor: pointer;}
  .news{display: flex; justify-content: center; margin: 7px 0; color: #666;}
  .news ul{list-style-type: disc;}
  .news li{width: 100%;}
  .newtitle{width: 80%; overflow: hidden;text-overflow: ellipsis; white-space: nowrap;}
  .newscont{ width: 90%; margin: 0 auto;}
  .newscont li{display: flex;align-items: center;list-style: disc inside; margin-top: 5px;}
  .Newsdate{width: 20%;}
</style>
