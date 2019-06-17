import Vue from 'vue'
import VueRouter from 'vue-router'

import Router from './Router'
import WinBidmember from './WinBidmember'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: Router
})


new Vue({
  el: '#app',
  router,
  render: h => h(WinBidmember)
})




