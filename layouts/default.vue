<template>
  <div style="background-color:#f5f5f5">
    <v-header v-on:headName="headName" ></v-header>

    <nuxt />
    <v-footer v-on:headName="headName"  ></v-footer>


  </div>
</template>

<script>
import VHeader from '~/components/header'
import memheader from '~/components/memheader'
import VFooter from '~/components/footer'
import siderfooter from '~/components/siderfooter'

export default {
  components: {
    VHeader,
    memheader,
    siderfooter,
    VFooter
  },
  data() {
    return {
      headname:'',
      judgetitle:''
    }
  },
  methods:{
    Toindex:function(data){
      if(data=='user.vue'){
        this.judgetitle=true
      }

    },
    headName:function (data) {
      this.headname=data
      this.headtitle()
    },
    headtitle(){
       if( this.headname == 'Physical'  || this.headname =='special' || this.headname == 'news' || this.headname == 'bidders'|| this.headname == 'advance'|| this.headname == 'spot' || this.headname == 'logistics')
      {
            this.judgetitle=true
      }else{
         this.judgetitle=false
       }
    }
  },
  created(){
  },
  mounted() {
    let data=this.$router.history.current.name
    this.headName(data)
  },
  activated(){
  },
  updated(){
  }
}
</script>
<style>
  @import '../assets/global.css';
  @import '../assets/index.css';
</style>
