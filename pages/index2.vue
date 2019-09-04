<template>
  <div>
      <slide-verify @onChange="onTime"></slide-verify>
  </div>
</template>

<script>
import SwiperType from '../components/swiper-type'
import countdown from '../components/countdown'
import SlideVerify from '../components/slide-verify'
import {mapState} from 'vuex'

export default {
  name: 'index',
  data(){
    return {
      currentTime:1567411660,
      startTime:1567411660,
      endTime:1568908800,
    }
  },
  computed: {
    ...mapState([
      'slidecode'
    ])
  },
  components: {
    // SwiperType,
    // countdown,
    SlideVerify
  },
  methods: {
    countDownS_cb: function (x) {
      console.log(x)
    },
    countDownE_cb: function (x) {
      console.log(x)
    },
    onTime(res){
      console.log("1",this.slidecode)
      console.log(res)
    }
  }
}
</script>

<style>

</style>