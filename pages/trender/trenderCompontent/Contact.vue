<template>
  <div class="whitebg mt20 fs14 ovh">
    <div class="notTitle">
      联系我们
    </div>
    <div class="ml15">
      <p class="mt10 mb10">客户服务</p>
      <p class="mt5 "><span class="gray">咨询、投诉及建议：</span>{{systeminfo.SERVICEHOTLINE}}</p>
      <p class="mt5 "><span class="gray">邮箱：</span>{{systeminfo.SERVICEEMAIL}}</p>
      <p class="mt5 "><span class="gray">在线客服：</span>{{systeminfo.ONLINESERVICE}}</p>
    </div>
    <div class="dflexAlemJust mt20 mb20">
      <button class="serviceBtn">在线客服</button>
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
       computed:{
          ...mapState({
              systeminfo: state => state.system.systeminfo,
          })
       },
    }
</script>

<style scoped>
  .notTitle{font-size: 16px;border-bottom: 1px solid #DEDEDE; padding: 20px 0; padding-left: 20px;}
  .serviceBtn{ background-color: #007de4; color: #fff; padding: 8px 20px; border-radius: 3px; cursor: pointer}
</style>
