<template>
  <div>
    <v-header></v-header>
    <Indexbanner></Indexbanner>
    <div class="clearfix" style="background-color:#f5f5f5" >
    <membercener></membercener>
    <Timelimited></Timelimited>
    <Spotsupermarket></Spotsupermarket>
    <Logisticscar></Logisticscar>


    </div>
<!--    <nuxt />-->
  </div>
</template>

<script>
import VHeader from '~/components/header'
import Indexbanner from '~/components/Indexbanner'
import membercener from '~/components/memberCenter'
import Timelimited from '~/components/Timelimited'
import Spotsupermarket from '~/components/Spotsupermarket'
import Logisticscar from '~/components/Logisticscar'

export default {
  components: {
    VHeader,
    Indexbanner,
    membercener,
    Timelimited,
    Spotsupermarket,
    Logisticscar
  },
  data() {
    return {
    }
  }
}
</script>
<style>
  @import '../assets/global.css';
</style>
