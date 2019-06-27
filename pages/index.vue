<template>
  <div>
    <div class="clearfix"  >
        <Indexbanner></Indexbanner>
        <member-center></member-center>
        <Timelimited></Timelimited>
        <Spotsupermarket></Spotsupermarket>
        <Logisticscar></Logisticscar>
        <cooperatbrand></cooperatbrand>
        <Indexnews></Indexnews>
    </div>
  </div>
</template>

<script>
import Indexbanner from '../components/home/Indexbanner'
import memberCenter from '../components/home/memberCenter'
import Timelimited from '../components/home/Timelimited'
import Spotsupermarket from '../components/home/Spotsupermarket'
import cooperatbrand from '../components/home/cooperatbrand'
import Logisticscar from '../components/home/Logisticscar'
import Indexnews from '../components/home/Indexnews'

export default {
  name: "index",
  components: {
    Indexbanner,
    memberCenter,
    Timelimited,
    Spotsupermarket,
    Logisticscar,
    cooperatbrand,
    Indexnews
  },
  head () {
    return {
      title: '巨正源-化工交易平台'
    }
  }
}
</script>

<style scoped>

</style>
