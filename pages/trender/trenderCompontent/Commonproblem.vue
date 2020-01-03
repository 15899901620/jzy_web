<template>
  <div class="whitebg mt20 ovh">
    <div class="notTitle">
      常见问题
    </div>
    <ul class="Commonproblem">
      <li>神华招标网电子招投标项目数字...</li>
      <li>神华招标网电子招投标项目数字...</li>
      <li>神华招标网电子招投标项目数字...</li>

    </ul>

  </div>
</template>

<script>

    export default {
        name: "Commonproblem"
    }
</script>

<style scoped>

  .notTitle{font-size: 16px;border-bottom: 1px solid #DEDEDE; padding: 12px 0; padding-left: 20px;}

  .Commonproblem{ margin: 10px 20px 20px;display: flex;flex-direction: column;}
  .Commonproblem li{  margin: 10px 0;font-size: 14px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;}

</style>
