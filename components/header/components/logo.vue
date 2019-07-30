<template>
  <div class="Logo">
    <nuxt-link to="/">
      <img src="~/assets/img/logo.png" alt="巨正源" >
    </nuxt-link>
  </div>
</template>

<script>
export default {
    name: "Logo",
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