<template>
    <div class="main">
        <top></top>
        <!--nuxt 主体内容-->
        <nuxt/>
        <!--尾部组件-->
    </div>
</template>

<script>
import {top} from '../components/header'
export default {
  name: "noHeader",
  components: {
    top
  },
}
</script>

<style scoped>

</style>
