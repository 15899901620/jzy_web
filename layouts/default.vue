<template>
  <div style="background-color:#f0f0f0">
    <detail-header v-on:headName="headName" ></detail-header>
    <nuxt />
    <detail-footer v-on:headName="headName"  ></detail-footer>
  </div>
</template>

<script>
import DetailHeader from '../components/detail-header'
import DetailFooter from '../components/detail-footer'
export default {
  components: {
    DetailHeader,
    DetailFooter
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
      if ( this.headname == 'Physical'  || this.headname =='special' || this.headname == 'news' || this.headname == 'bidders'|| this.headname == 'advance'|| this.headname == 'spot' || this.headname == 'logistics') {
        this.judgetitle=true
      } else {
        this.judgetitle=false
      }
    }
  },
  created(){
    let data=this.$router.history.current.name
    this.headName(data)
  },
  mounted() {
  
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
