<template>
  <div class="TopSearch">
    <div class=""style="display: flex;">
      <input class="search-text" autocomplete="off" value="" id="keyword" type="text" name="keyword" placeholder="请输入牌号、厂商进行搜索">
      <input class="search-btn" id="search_submit" type="button" value="搜  索">
    </div>
    <div class="HotTip mt5 fs12">
      <span>热门搜索 :</span> <span v-for="(item, index) in hotsearch"><nuxt-link to="/">{{ item }}</nuxt-link></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "search",
  data () {
    return {
      hotsearch: ['2426H','5502','T30S','LLDPE','ABS']
    }
  },
}
</script>

<style scoped>
.TopSearch{width: 530px; margin: 40px auto 0;}
.TopSearch .HotTip>span{margin-right: 20px; cursor: pointer;}
.TopSearch .HotTip>span:first-child{cursor: default;margin-right:5px;}
.TopSearch .search-text { padding-left: 35px; float: left; width: 420px; height: 40px;line-height: 40px; border: 2px solid #007de4; box-sizing: border-box; z-index: 0; background: url(../../assets/img/search-icon.png) no-repeat 6px 8px #fff; border-right: 0 none;}
.TopSearch .search-btn {position: relative;z-index: 1;float: left; border: 0 none; border-top-right-radius: 2px; border-bottom-right-radius: 2px; background: none; font-size: 16px;
	width: 80px;  height: 40px;  color: #fff; cursor: pointer; background: #007de4;transition: all 0.3s linear 0s;}
</style>
