<template>
  <div class="beginner">
    <ul>
      <li><h4>新手指南</h4><a href="#.html" rel="nofollow">购物流程</a><a href="#.html" rel="nofollow">注册 / 登录</a><a href="#.html" rel="nofollow">找回密码</a><a href="#.html" rel="nofollow">用户服务协议</a></li>
      <li><h4>购物指南</h4><a href="#.html" rel="nofollow">如何卖货</a><a href="#.html" rel="nofollow">如何找货</a><a href="#.html" rel="nofollow">公司转账</a></li>
      <li><h4>售后服务</h4><a href="#.html" rel="nofollow">发票说明</a><a href="#.html" rel="nofollow">物流配送</a><a href="#.html" rel="nofollow">仓库自提</a></li>
      <li><h4>联系我们</h4><a href="#.html" rel="nofollow">企业简介</a><a href="#.html" rel="nofollow">社会责任</a><a href="#.html" rel="nofollow">法律声明</a><a href="#.html" rel="nofollow">隐私声明</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "helpnav",
}
</script>

<style scoped>
.beginner ul{ display: flex;}
.beginner li {float: left;width: 160px;}
.beginner li h4 {font-size: 16px;  padding-bottom: 10px; color: #333333;}
.beginner li a {  color: #666; display: block;}
</style>
