<template>
      <div class="memberCenter">
        <headnews></headnews>
      </div>
</template>

<script>
  import headnews from '../detail-header/components/headnews'
    export default {
      name: "memberCenter",

      components:{
        headnews
      }
    }
</script>

<style scoped>
  .memberCenter{width: 1200px;margin: 0 auto;   position: relative; z-index: 4;  height: 1px;}

</style>
