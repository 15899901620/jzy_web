<template>
  <div class="membercenter" @click="WinmemberCenter">
       <div class="head"></div>
      <p class="mt10"><span>{{username}}</span></p>
      <p class="mb40 mt10">欢迎来到巨正源招标平台</p>
  </div>
</template>

<script>
  import Cookies from 'js-cookie'
    export default {
      name: "membercenter",
      props:{
        webSource:String,
      },
      data(){
          return{
            username:'',

          }
      },

      methods:{
        WinmemberCenter(){
          this.$router.push({ path:'./WinBidmember'})
        }

      },
      create(){

      },
      mounted() {
        console.log('this.$router:', this.$router.history.current)
        console.log('Cookies', Cookies.get('supplierInfor'))
        this.username=JSON.parse(Cookies.get('supplierInfor')).username
      }

    }
</script>

<style scoped>

  .membercenter{display: flex; align-items: center; flex-direction: column; background-color: #fff; font-size: 14px;}
  .membercenter .head{width: 52px; height: 52px;border: 1px solid #DEDEDE; border-radius:25px; margin-top: 35px }

</style>
