<template>
  <div class="TopLogo" @click="toIndex()">
    <nuxt-link to="/">
      <img src="~/assets/img/logo.png" alt="巨正源" >
    </nuxt-link>
  </div>
</template>

<script>
export default {
    name: "logo",
  data(){
      return{
        tid:'',
      }
  },
  methods:{
    toIndex(){
      var tid='index'
      this.$emit('tidName', tid)
    }
  }
}
</script>

<style scoped>
.TopLogo{margin-top: 40px;}
</style>
