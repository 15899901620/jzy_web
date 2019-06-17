<template>
  <div class="whitebg mt20">
    <div class="notTitle">
      通知公告
    </div>
    <ul class="notlist">
      <li>
        <span class="notlistTitle">关于巨正源招标网信</span>
        <span class="fs12 mb10 gray">2019-04-28</span>
      </li>
      <li>
        <span class="notlistTitle">关于巨正源招标网信</span>
        <span class="fs12 mb10 gray">2019-04-28</span>
      </li>
      <li>
        <span class="notlistTitle">关于巨正源招标网信</span>
        <span class="fs12 mb10 gray">2019-04-28</span>
      </li>
    </ul>
  </div>
</template>

<script>
    export default {
        name: "Notice"
    }
</script>

<style scoped>
  .notTitle{font-size: 16px;border-bottom: 1px solid #DEDEDE; padding: 20px 0; padding-left: 20px;}
  .notlist{margin: 0px 20px;}
  .notlist li{border-bottom: 1px dashed #e3ecf5; display: flex;flex-direction: column;}
  .notlist li:last-child{border-bottom: none;}
  .notlist li .notlistTitle{font-size: 14px;color: #333;margin-top: 15px;
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap}
</style>
