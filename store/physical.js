/**
 * @description 资讯
 * @module store/article
 * @author hmymingyu <fgf67@163.com>
 */
import api from '../config/api'

export const state = () => {
    return {
        physicallist: [],
        physicaldetailinfo: {},
        physicalHotlist: [],
        currPage: 0
    }
}

export const mutations = {
    updatephysicalList(state, data) {
        state.physicallist = data
    },
    updatephysicalDetail(state, data) {
        state.physicaldetailinfo = data
    },
    updatephysicalHotList(state, data) {
        state.physicalHotlist = data
    },
    updateCurrPage (state, data) {
        state.currPage = data
    }
    
}

export const actions = {
    async getphysicalList({ commit }, params) {
        commit('updateCurrPage', parseInt(params.current_page))
        return await this.$axios.$get(api.prefix + api.api.product.productlist, { params })
        .then(response => {
            commit('updatephysicalList', response)
        })
        .catch(error => {
            console.log('err', error)
        })
    },
    async getphysicalDetail({ commit }, params) {
        return await this.$axios.$get(api.prefix + api.api.product.productdetail, { params })
        .then(response => {
            commit('updatephysicalDetail', response)
        })
        .catch(error => {
            console.log('err', error)
        })
    },
    async getphysicalHotList({ commit }, params = {}) {
        return await this.$axios.$get(api.prefix + api.api.product.goodsHot.url, { params })
        .then(response => {
            commit('updatephysicalHotList', response)
        })
        .catch(error => {
            console.log('err', error)
        })
    },
}