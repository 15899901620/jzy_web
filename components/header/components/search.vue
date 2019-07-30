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
