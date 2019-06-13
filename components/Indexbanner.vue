<template>
  <Carousel :autoplay="BannerSet.autoplay"
            :autoplay-speed="BannerSet.autoplaySpeed"
            :dots="BannerSet.dots"
            :trigger="BannerSet.trigger"
            :arrow="BannerSet.arrow"
            :height="BannerSet.height"
  >
    <Carousel-item v-for="(item, index) in items" :key="index">
      <div class="demo-carousel"> <img :src="item.src" /> </div>
    </Carousel-item>


  </Carousel>
</template>

<script>
    export default {
        name: "Indexbanner",

      data () {
        return {
          BannerSet: {
            autoplay: true,
            height:320,
            autoplaySpeed: 3000,
            dots: 'inside',
            trigger: 'click',
            arrow: 'never'
          },
          items: [
            {
              src: require('../assets/img/banner.png')
            },
            {
              src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg'
            },
            {
              src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg'
            },
            {
              src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg'
            }
          ]
        }
      }
    }
</script>

<style >



</style>
