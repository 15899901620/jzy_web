<template>
    <div class="main">
        <top></top>
        <!--nuxt 主体内容-->
        <nuxt/>
        <!--尾部组件-->
      <loginfooter></loginfooter>
    </div>
</template>

<script>
import top from '../components/header/top'
import loginfooter from '../components/footer/loginfooter'
export default {
  name: "noHeader",
  components: {
    top,
    loginfooter
  },
  data(){
    return{}
  },
  methods:{

  },
  mounted() {
    console.log('noheader_router', this.$router)

  }
}
</script>

<style scoped>

</style>
