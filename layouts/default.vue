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
      console.log('data', data)
      if(data=='user.vue'){
        this.judgetitle=true
      }

    },
    headName:function (data) {
      console.log('---data---',data)
      this.headname=data
      this.headtitle()
    },
    headtitle(){
      console.log('---this.headname---', this.headname)
       if( this.headname == 'Physical'  || this.headname =='special' || this.headname == 'news' || this.headname == 'bidders'|| this.headname == 'advance'|| this.headname == 'spot' || this.headname == 'logistics')
      {
            this.judgetitle=true
      }else{
         this.judgetitle=false
       }
    }
  },
  created(){
    console.log(this.$router)
  },
  mounted() {
    console.log('headName',this.$router)
    let data=this.$router.history.current.name
    this.headName(data)
     console.log(this.$router.history.current.name)
  },
  activated(){
    console.log('activated', this.$router)
  },
  updated(){
    console.log('this.$router', this.$router)
  }
}
</script>
<style>
  @import '../assets/global.css';
  @import '../assets/index.css';
</style>
