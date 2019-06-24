<template>
    <div>
      <div class="mt25"><input type="text" class="NumInput" name="" id="" value="username" placeholder="手机/用户名" /></div>
      <div class="mt15"><input type="text" class="NumInput" name="" id="" value="password" placeholder="密码" /></div>
      <button class="logingAccount">登 录</button>
    </div>
</template>

<script>
    export default {
        name: "memberlogin",
      data() {
        return{};
      },
      methods:{},
      mounted() {
      }
    }
</script>

<style scoped>
  .NumInput{ padding-left: 10px; width: 100%;border: 1px solid #dddddd; border-radius: 3px; line-height: 36px;box-sizing: border-box;}
  .logingAccount{ width: 100%; cursor: pointer; background-color: #007de4;border: none;line-height: 36px;color: #fff;border-radius: 3px;margin-top: 35px;}
</style>
