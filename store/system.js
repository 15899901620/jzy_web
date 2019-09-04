/**
 * @description 导航
 * @module store/menu
 * @author hmymingyu <fgf67@163.com>
 */
import api from '../config/api'
import { adposition } from '../api/adposition'
import { setCookies, getCookies } from '../config/storage'
export const state = () => {
    return {
      slidecode: 0,
      systeminfo: [],
      linksinfo: [],
      bannerinfo: [],
      hotsearch: []
    }
}
export const mutations = {
    setSlideVerify(state, data) {
      console.log("set",data)
      state.slidecode = data
    },
    updateSystemCnf(state, data) {
      state.systeminfo = data
    },
    updataLinksInfo(state, data) {
      state.linksinfo = data
    },
    updateBannerInfo(state, data) {
      state.bannerinfo = data
    },
    updateHotSearch(state, data) {
      state.hotsearch = data
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
    async getHotSearch({ commit },  params = {}) {
        console.log('tag', '')
        return await this.$axios.$get(api.prefix + api.api.search.hotsearch, { params })
        .then(response => {
            commit('updateHotSearch', response)
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