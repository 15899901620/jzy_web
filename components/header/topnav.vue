<template>
  <div>
    <ul class="UserList">
      <li v-for="(category, index) in topnav" :key="index" :id="category.tid">
        <nuxt-link :to="category.router">{{ category.title }}</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "topnav",
  data () {
    return {
      topnav: [
        { router: { path: '/users' }, title: '会员中心', tid:'user' },
        { router: { path: '/about' }, title: '关于我们', tid:'about' },
        { router: { path: '/help' }, title: '帮助中心', tid:'help' }
      ],
    }
  },
}
</script>

<style scoped>
.UserList{display: flex; flex-direction: row;}
.UserList li:first-child{border-left:0;}.UserList li:last-child{border-right:0;}
.UserList li{  border-right:1px solid #ddd8dd;border-left:1px solid #fff;padding: 0 20px;}
</style>
