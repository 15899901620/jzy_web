<template>
<div>
  <memheader  ></memheader>
  <nuxt />
 <loginfooter></loginfooter>
</div>
</template>

<script>
  import memheader from '../components/user-header/memheader'
  import loginfooter from '../components/sider-footer/siderfooter'

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
