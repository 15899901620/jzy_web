<template>
  <div class="membercenter" @click="WinmemberCenter">
       <div class="head"></div>
      <p class="mt10">Hi,上午好！</p>
      <p class="mb40 mt10">欢迎来到巨正源招标平台</p>
  </div>
</template>

<script>
    export default {
        name: "membercenter",
      data(){
          return{}
      },

      methods:{
        WinmemberCenter(){
          this.$router.push({ path:'./WinBidmember'})
        }

      },

    }
</script>

<style scoped>

  .membercenter{display: flex; align-items: center; flex-direction: column; background-color: #fff; font-size: 14px;}
  .membercenter .head{width: 52px; height: 52px;border: 1px solid #DEDEDE; border-radius:25px; margin-top: 35px }

</style>
