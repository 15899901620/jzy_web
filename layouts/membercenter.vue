<template>
<div>
  <memheader  ></memheader>
  <nuxt />
  <loginfooter></loginfooter>
</div>
</template>

<script>
  import memheader from '../components/memheader'
  import loginfooter from '../components/footer/loginfooter'

  export default {
       components:{
         memheader,
         loginfooter
       },
    data(){
         return{
           currentTitle:''
         }
    },
    mounted(){

    }


    }
</script>

<style scoped>

</style>
