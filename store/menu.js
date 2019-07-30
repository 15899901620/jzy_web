/**
 * @description 导航
 * @module store/menu
 * @author hmymingyu <fgf67@163.com>
 */
import api from '../config/api'
export const state = () => {
    return {
      topMenu: [],
      middleMenu: [],
      footMenu: []
    }
}
  
export const mutations = {
    updateTopMenu(state, list) {
        state.topMenu = list
    },
    updateMiddleMenu(state, list) {
        state.middleMenu = list
    },
    updateFootMenu(state, list) {
        state.footMenu = list
    },
}
  
export const actions = {
    async getMenuList({ commit },  params = {}) {
        return await this.$axios.$get(api.prefix + api.api.navigation.navlist, { params })
        .then(response => {
            let TopMenuData = []
            let MiddleMenuData = []
            let FootMenuData = []
            response.forEach((item,index) => {
                if (item.type === 'top') {
                    TopMenuData.push(item)
                }
                if (item.type === 'middle') {
                    MiddleMenuData.push(item)
                }
                if (item.type === 'bottom') {
                    FootMenuData.push(item)
                }
            });
            commit('updateTopMenu', TopMenuData)
            commit('updateMiddleMenu', MiddleMenuData)
            commit('updateFootMenu', FootMenuData)
        })
        .catch(error => {
            console.log('err', error)
        })
    }
}