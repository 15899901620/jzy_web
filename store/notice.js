/**
 * @description 资讯
 * @module store/article
 * @author hmymingyu <fgf67@163.com>
 */
import api from '../config/api'

export const state = () => {
    return {
        noticelist: [],
        noticedetailinfo: {},
        noticeHotlist: [],
        currPage: 0
    }
}

export const mutations = {
    updateNoticeList(state, data) {
        state.noticelist = data
    },
    updateNoticeDetail(state, data) {
        state.noticedetailinfo = data
    },
    updateNoticeHotList(state, data) {
        state.noticeHotlist = data
    },
    updateCurrPage (state, data) {
        state.currPage = data
    }
    
}

export const actions = {
    async getNoticeList({ commit }, params) {
        commit('updateCurrPage', parseInt(params.current_page))
        return await this.$axios.$get(api.prefix + api.api.information.announcement, { params })
        .then(response => {
            commit('updateNoticeList', response)
        })
        .catch(error => {
            console.log('err', error)
        })
    },
    async getNoticeDetail({ commit }, params) {
        return await this.$axios.$get(api.prefix + api.api.information.announcementdetail, { params })
        .then(response => {
            commit('updateNoticeDetail', response)
        })
        .catch(error => {
            console.log('err', error)
        })
    },
    async getNoticeDetailClick({ commit }, params) {
        return await this.$axios.$get(api.prefix + api.api.information.noticeclick, { params })
        .then(response => {})
        .catch(error => {
            console.log('err', error)
        })
    },
    async getNoticeHotList({ commit }, params) {
        return await this.$axios.$get(api.prefix + api.api.information.announcement, { params })
        .then(response => {
            commit('updateNoticeHotList', response.items)
        })
        .catch(error => {
            console.log('err', error)
        })
    },
}