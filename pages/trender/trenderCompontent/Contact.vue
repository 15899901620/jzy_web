<template>
  <div class="whitebg mt20 fs14 ovh">
    <div class="notTitle">
      联系我们
    </div>
    <div class="ml15">
      <p class="mt10 mb10">客户服务</p>
      <p class="mt5 "><span class="gray">咨询、投诉及建议：</span>{{this.$store.state.common.sysConfig.SERVICEHOTLINE}}</p>
      <p class="mt5 "><span class="gray">邮箱：</span>{{this.$store.state.common.sysConfig.SERVICEEMAIL}}</p>
      <p class="mt5 "><span class="gray">在线客服：</span>{{this.$store.state.common.sysConfig.ONLINESERVICE}}</p>
    </div>
    <div class="dflexAlemJust mt20 mb20">
      <button class="serviceBtn"  @click="OnlineService()"  alt="点击这里给我发消息" title="点击这里给我发消息">在线客服</button>
    </div>




  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
       name: "Contact",
       fetch({ store }) {
          return Promise.all([
              store.dispatch('system/getSystemCnf'),
          ])
       },

       methods: {
        OnlineService () {
            let url = 'http://wpa.qq.com/msgrd?v=3&uin='+ this.$store.state.common.sysConfig.ONLINESERVICE +'&site=qq&menu=yes'
            window.open(url)
      } ,
      }
    }
</script>

<style scoped>
  .notTitle{font-size: 16px;border-bottom: 1px solid #DEDEDE; padding: 20px 0; padding-left: 20px;}
  .serviceBtn{ background-color: #007de4; color: #fff; padding: 8px 20px; border-radius: 3px; cursor: pointer}
</style>
