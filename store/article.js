/**
 * @description 资讯
 * @module store/article
 * @author hmymingyu <fgf67@163.com>
 */
import api from '../config/api'

export const state = () => {
    return {
        articleCat: [],
        noticeInfo: [],
        articleInfo: [],
        hotarticleInfo: [],
        articlelist: [],
        articledetail: {},
        currPage: 0
        
    }
}

export const mutations = {
    updateArticleCatList(state, data) {
        state.articleCat = data
    },
    updateNoticeInfo(state, data) {
        state.noticeInfo = data
    },
    updateArticleInfo(state, data) {
        state.articleInfo = data
    },
    updateArticleList(state, data) {
        state.articlelist = data
    },
    updateHotArticleInfo(state, data) {
        state.hotarticleInfo = data
    },
    updateHotArticleDetail(state, data) {
        state.articledetail = data
    },
    updateCurrPage (state, data) {
        state.currPage = data
    }
    
}

export const actions = {
    async getHomeNotice({ commit }, {params}) {
        return await this.$axios.$get(api.prefix + api.api.information.announcement, { params })
        .then(response => {
            commit('updateNoticeInfo', response.items)
        })
        .catch(error => {
            console.log('err', error)
        })
    },
    async getHomeArticle({ commit }, {params}) {
        return await this.$axios.$get(api.prefix + api.api.information.info, { params })
        .then(response => {
            commit('updateArticleInfo', response.items)
        })
        .catch(error => {
            console.log('err', error)
        })
    },
    async getArticleClick({ commit }, params) {
        return await this.$axios.$get(api.prefix + api.api.information.infoClick, { params })
        .then(response => {
        })
        .catch(error => {
            console.log('err', error)
        })
    },
    async getHotArticle({ commit }, params) {
        return await this.$axios.$get(api.prefix + api.api.information.info, { params })
        .then(response => {
            commit('updateHotArticleInfo', response.items)
        })
        .catch(error => {
            console.log('err', error)
        })
    },
    async getArticleList({ commit }, params) {
        commit('updateCurrPage', parseInt(params.current_page))

        return await this.$axios.$get(api.prefix + api.api.information.info, { params })
        .then(response => {
            commit('updateArticleList', response)
        })
        .catch(error => {
            console.log('err', error)
        })
    },
    async getArticleCatList({ commit }, params) {
        return await this.$axios.$get(api.prefix + api.api.information.infocate, { params })
        .then(response => {
            // console.log('n', response)
            commit('updateArticleCatList', response)
        })
        .catch(error => {
            console.log('err', error)
        })
    },
    async getArticleDetail({ commit }, params) {
        return await this.$axios.$get(api.prefix + api.api.information.infodetail, { params })
        .then(response => {
            console.log('n', response)
            commit('updateHotArticleDetail', response)
        })
        .catch(error => {
            console.log('err', error)
        })
    },

    
    

}