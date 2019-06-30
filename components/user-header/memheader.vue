<template>
<div class="clearfix">
  <!--头部-文字-->
  <div class="IndexTop">
    <div class="w1200 TopPos">
      <div class="">您好，欢迎来到巨正源化工交易网！<span class="gray" style="border-left:1px solid #ccc; padding-left: 5px;"> <nuxt-link to="/">返回巨正源</nuxt-link></span>  </div>
      <!-- <topnav></topnav> -->
    </div>
  </div>
  <headerlogo v-on:Toindex="Toindex(ToTitle)" ></headerlogo>
</div>
</template>

<script>
  // import topnav from '~/components/detail-header/components/topnav'
  import headerlogo from '../memheader/headerlogo'
  export default {
    name: "memheader",
    props:{
      PageTitle:String
    },
    components:{
      // topnav,
      headerlogo
    },
    data(){
          return{
            ToTitle:''
          }
    },
    methods:{

      Toindex:function(data){
        let toindex=data
        this.$emit('Toindex',toindex)
      }


    },
    mounted() {
          var PageTitle=this.$router.history.current.name
          if(PageTitle == 'users-user'){
            this.PageTitle='会员中心'
          }

    }

  }
</script>

<style scoped>

  /*头部*/
  .IndexTop{background-color: #f8f8f8;border-bottom: 1px solid #f0f0f0;}
  .TopPos{color: #333; display: flex; justify-content: space-between; align-items: center; height: 30px; font-size: 14px;}

</style>
