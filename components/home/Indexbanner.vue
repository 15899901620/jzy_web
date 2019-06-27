<template>
  <Carousel :autoplay="BannerSet.autoplay"
            :autoplay-speed="BannerSet.autoplaySpeed"
            :dots="BannerSet.dots"
            :trigger="BannerSet.trigger"
            :arrow="BannerSet.arrow"
            :height="BannerSet.height"
  >
    <Carousel-item v-for="(item, index) in items" :key="index">
      <div class="demo-carousel"><img :src="item.adImg" /></div>
    </Carousel-item>
  </Carousel>
</template>

<script>
import { adposition } from '../../api/adposition'
export default {
  name: "Indexbanner",
  data () {
    return {
      BannerSet: {
        autoplay: true,
        height:320,
        autoplaySpeed: 5000,
        dots: 'inside',
        trigger: 'click',
        arrow: 'never'
      },
      items: []
    }
  },
  methods:{
      async sourceData() {
        let params = {
          positionId: 2,
        }
        const res = await adposition(this, params)
        console.log('tag',res)
        this.items = res.data
      },
      // // 资讯详情页
      // NewsDetail(){
      //   this.$router.push({path:'../article/_detail', query:{index:''}})
      // }
    },
    mounted() {
      this.sourceData()
    }
}
</script>