<template>
<div>
  <memheader></memheader>
  <nuxt />
  <VFooter></VFooter>
</div>
</template>

<script>
  import memheader from '../components/memheader'
  import VFooter from '~/components/footer'

  export default {
       components:{
         memheader,
         VFooter
       }

    }
</script>

<style scoped>

</style>
