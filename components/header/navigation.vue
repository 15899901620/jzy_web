<template>
  <div class="menu">
    <ul>
      <li v-for="(category, index) in categories" :key="index" :id="category.tid"
          @click="getDescribe(category.tid, index, category.nameTitle)"
          :class="[ navIndex == index ? 'curr' : ' ']"
      >
        <nuxt-link  :to="category.router" >{{ category.title }}</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import Bus from '../Bus'
export default {
  name: "navigation",

  data () {
    return {
      currclass:false,
      navIndex: 0,
      categories: [
        { router: { name: 'index' }, title: '首页', tid:'index' },
        { router: { path: '/spot' }, title: '现货超市', tid:'spot' },
        { router: { path: '/advance' }, title: '预售专栏', tid:'advance' },
        { router: { path: '/bidders' }, title: '限时竞拍', tid:'bidders' },
        { router: { path: '/special' }, title: '专料专场', tid:'special' },
        { router: { path: '/logistics' }, title: '物流找车', tid:'logistics' },
        { router: { path: '/news' }, title: '行业资讯', tid:'news' },
        { router: { path: '/supply' }, title: '承运商', tid:'supply', nameTitle:'承运商管理后台'},
        { router: { path: '/tendering' }, title: '招标中心', tid:'tendering',nameTitle:'招标' }
      ],
    }
  },

  methods:{
    getDescribe(tid, index, headtitle) {
      console.log('tid：', tid)
      this.$emit('tidName', tid)
      console.log('headtitle', headtitle)
      Bus.$emit('val', headtitle)
      this.navIndex = index;
     },
    checkRouterLocal(path) {
      // 查找当前路由下标高亮
      this.navIndex = this.categories.findIndex(item => {
          return item.router.path === path
      });

    }

  },
    created () {
      let path = this.$route.path;
      // 检索当前路径
      this.checkRouterLocal(path);
    },

    mounted () {


    },
  watch: {
  }

}
</script>

<style scoped>

.menu{background: #fff; display: flex;align-items: center; padding-left: 7px;}
.menu li { float: left; position: relative; font-size: 16px; margin: 0 23px;}
.menu li:last-child{background:none;}
.menu li a{line-height:33px; color: #333;}
.menu li a:hover,.menu li.curr a{color:#007de4;text-decoration:none;  padding-bottom: 9px; border-bottom:2px solid #007de4;}

</style>
