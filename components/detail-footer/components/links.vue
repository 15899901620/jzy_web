<template>
  <div class="w1200">
    <div class="mt20 fs16 mb10">友情链接：</div>
    <div style="display: flex;">
      <div class="LinkUrl" >
        <span v-for="(item, index) in links" :key="index" >
          <a :href="item.linkUrl" target="_blank">{{ item.name }}</a>
        </span>
      </div>
      <div class="uplist"></div>
    </div>
  </div>
</template>

<script>
import { friendlink } from '../../../api/system'
export default {
  name: "Links",
  data () {
    return {
      links: [],
    }
  },
  methods: {
    async sourceData() {
      let params = {}
      const res = await friendlink(this, params)
      this.links = res.data
    }
  },
  mounted () {
    this.sourceData()
  }
}
</script>

<style scoped>
.LinkUrl{display: flex;flex-wrap: wrap; margin-bottom: 25px;}
.LinkUrl span{padding-right: 16px; font-size: 14px;}
.LinkUrl a:first-child{margin:5px 0;}
.LinkUrl a{margin: 5px 10px; color: #666666;}
.uplist{background: url(../../../assets/img/icon.png)no-repeat 0px -105px;width: 28px;height: 20px; cursor: pointer;}
</style>
