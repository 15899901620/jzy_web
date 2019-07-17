import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

import Menu from './Menu/index'



const store =()=>{
  return  new Vuex.Store({
    state:{},
    mutations:{},
    getters:{},
    actions:{},
    modules: {
      Menu
    },
  })

}

export default store




