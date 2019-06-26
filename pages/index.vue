<template>
  <div>
    <div class="clearfix"  >
        <Indexbanner></Indexbanner>
        <membercener></membercener>
        <Timelimited></Timelimited>
        <Spotsupermarket></Spotsupermarket>
        <Logisticscar></Logisticscar>
        <cooperatbrand></cooperatbrand>
        <Indexnews></Indexnews>
    </div>

  </div>
</template>

<script>
  import Indexbanner from '~/components/Indexbanner'
  import membercener from '~/components/memberCenter'
  import Timelimited from '~/components/Timelimited'
  import Spotsupermarket from '~/components/Spotsupermarket'
  import cooperatbrand from '~/components/cooperatbrand'
  import Logisticscar from '~/components/Logisticscar'
  import Indexnews from '~/components/Indexnews'



export default {
  name: "index",
  layout:'default',
  components: {
    Indexbanner,
    membercener,
    Timelimited,
    Spotsupermarket,
    Logisticscar,
    cooperatbrand,
    Indexnews,

  },
}
</script>

<style scoped>

</style>
