<template>
  <div class="body">
      <Header title="头部"></Header>
      <div class="container" title="内容区块">
          <div class="materials_banner">
            <img src="../assets/img/auctionBanner.png" />
          </div>
          <div class="w1200" style="margin-top: 20px">
           
          </div>
       </div>
      <Footer size="default" title="底部" style="margin-top:18px;"></Footer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Header from '../components/header'
import Footer from '../components/footer'
import pagination from '../components/pagination'


export default {
    name: 'bidders',
    fetch({ store, params, query }) {
        return Promise.all([
            store.dispatch('menu/getMenuList'),
            store.dispatch('system/getSystemCnf'),
            store.dispatch('helper/getHelpCate', {parentId: 0,indexShow: 1}),
            store.dispatch('system/getLinksInfo'),
        ])
    },
    components:{
        Header,
        Footer,
        pages: pagination.pages
    },
    computed:{
        ...mapState({
        })
    },
    watch: {
        '$route' (to, from) {
            this.$router.go(0);
        }
    }
}
</script>

<style>

</style>
