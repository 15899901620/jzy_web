/**
 * @description 导航
 * @module store/menu
 * @author hmymingyu <fgf67@163.com>
 */
import api from '../config/api'
import { adposition } from '../api/adposition'
export const state = () => {
    return {
      systeminfo: [],
      linksinfo: [],
      bannerinfo: []
    }
}
export const mutations = {
    updateSystemCnf(state, data) {
        state.systeminfo = data
    },
    updataLinksInfo(state, data) {
        state.linksinfo = data
    },
    updateBannerInfo(state, data) {
        state.bannerinfo = data
    }
}
  
export const actions = {
    async getSystemCnf({ commit },  params = {}) {
        return await this.$axios.$get(api.prefix + api.api.sysconf.systemcof, { params })
        .then(response => {
            commit('updateSystemCnf', response)
        })
        .catch(error => {
            console.log('err', error)
        })
    },
    async getLinksInfo({ commit },  params = {}) {
        return await this.$axios.$get(api.prefix + api.api.sysconf.friendlink, { params })
        .then(response => {
            commit('updataLinksInfo', response)
        })
        .catch(error => {
            console.log('err', error)
        })
    },
    async getBannerInfo({ commit },   params ) {
        const res = await adposition(this, params).then(response => {
            commit('updateBannerInfo', response.data)
        })
        .catch(error => {
            console.log('err', error)
        })
    }
}