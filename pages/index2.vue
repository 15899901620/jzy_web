<template>
  <div>
      <swiper-type></swiper-type>
      <countdown >
      </countdown>
  </div>
</template>

<script>
import SwiperType from '../components/swiper-type'
import countdown from '../components/countdown'
export default {
  name: 'index',
  data(){
    return {
      currentTime:1567411660,
      startTime:1567411660,
      endTime:1568908800,
    }
  },
  components: {
    SwiperType,
    countdown
  },
  methods: {
    countDownS_cb: function (x) {
      console.log(x)
    },
    countDownE_cb: function (x) {
      console.log(x)
    }
  }
}
</script>

<style>

</style>