<template>
<div class="w1200">
  <div class="mt20 fs16 mb10">友情链接：</div>
  <div style="display: flex;">
    <div class="LinkUrl" >
      <span v-for="(item, index) in links" :key="index" >
        <nuxt-link :to="item.router">{{ item.title }}</nuxt-link>
      </span>
    </div>
    <div class="uplist"></div>
  </div>
</div>
</template>

<script>
export default {
  name: "Links",
  data () {
    return {
      links: [
        { router: { path: '/users' }, title: '改性塑料' },
        { router: { path: '/about' }, title: '塑料地图' },
        { router: { path: '/about' }, title: '中国塑协' },
        { router: { path: '/about' }, title: '广东塑料网' },
        { router: { path: '/about' }, title: '塑料百科' },
        { router: { path: '/about' }, title: '中华石油化工网' },
        { router: { path: '/about' }, title: '广东塑料网' },
        { router: { path: '/about' }, title: '塑胶原料' },
        { router: { path: '/about' }, title: '塑料百科' },
        { router: { path: '/about' }, title: '塑胶原料' },
        { router: { path: '/about' }, title: '广东塑料网' },
        { router: { path: '/about' }, title: '中华石油化工网' },
        { router: { path: '/about' }, title: '中国塑协' }
      ],
    }
  },
}
</script>

<style scoped>
.LinkUrl{display: flex;flex-wrap: wrap; margin-bottom: 25px;}
.LinkUrl span{padding-right: 16px; font-size: 14px;}
.LinkUrl a:first-child{margin:5px 0;}
.LinkUrl a{margin: 5px 10px; color: #666666;}
.uplist{background: url(../../../assets/img/icon.png)no-repeat 0px -105px;width: 28px;height: 20px; cursor: pointer;}
</style>
