<template>
  <div>
    <ul class="UserList">
      <li v-for="(category, index) in topnav" :key="index" :id="category.tid">
        <div class="cp"  @click="TopInfor(category.tid)">{{ category.title }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
  import Cookies from 'js-cookie'

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
  methods:{
    TopInfor(Link){
      if(Link === 'user'){
        if(Cookies.get('userinfor') && Cookies.get('webtoken')){
          this.$router.push({name:'users-user'})
        }else {
          if(Cookies.get('userinfor') && !Cookies.get('webtoken')){
          this.$Modal.confirm({
            title: '提示',
            content: '<p>您登录超时，请重新登录</p>',
            okText:'去登录',
            onOk: () => {
              this.$router.push({name:'login'});
            },
          });
          }else{
            this.$Modal.confirm({
              title: '提示',
              content: '<p>您尚未登录，请登录</p>',
              okText:'去登录',
              onOk: () => {
                this.$router.push({name:'login'});
              },
            });
          }

        }
      }
      if(Link === 'about'){
        this.$router.push({ name: "about"})
      }
      if(Link === 'help'){
        this.$router.push({ name: "help-help"})
      }

    }
  }
}
</script>

<style scoped>
.UserList{display: flex; flex-direction: row;}
.UserList li:first-child{border-left:0;}.UserList li:last-child{border-right:0;}
.UserList li{  border-right:1px solid #ddd8dd;border-left:1px solid #fff;padding: 0 20px;}
</style>
