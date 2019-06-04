<template>
  <div>
    <v-header></v-header>
    <nuxt />
  </div>
</template>

<script>
import VHeader from '~/components/header'

export default {
  components: {
    VHeader
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
