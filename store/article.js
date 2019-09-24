/**
 * @description 资讯
 * @module store/article
 * @author hmymingyu <fgf67@163.com>
 */
import api from '../config/api'
import { sendCurl } from '../api/common'
import server from '../config/api'

export const state = () => {
	return {
		articecatDetail: {},
		articleCat: [],
		noticeInfo: [],
		articleInfo: [],
		hotarticleInfo: [],
		articleList: [],
		noticeList: [],
		articledetail: {},
		currPage: 0
	}
}

export const mutations = {
	updateArticleList(state, data) {
		state.articleList = data
	},
	updateNoticeList(state, data) {
		state.noticeList = data
	},

	updateArticleCatList(state, data) {
		state.articleCat = data
	},
	updateNoticeInfo(state, data) {
		state.noticeInfo = data
	},
	updateArticleInfo(state, data) {
		state.articleInfo = data
	},

	updateHotArticleInfo(state, data) {
		state.hotarticleInfo = data
	},
	updateHotArticleDetail(state, data) {
		state.articledetail = data
	},
	updateCurrPage(state, data) {
		state.currPage = data
	},
	updatearticecatDetail(state, data) {
		state.articecatDetail = data
	}
}

export const actions = {
	async getArticleList({commit}, params) {
		commit('updateCurrPage', parseInt(params.current_page))

		let res = await sendCurl(this, server.api.information.getArticleList, params)
		if (res.status === 200) {
			commit('updateArticleList', res.data.items)
		}
	},
	async getNoticeList({commit}, params) {
		commit('updateCurrPage', parseInt(params.current_page))

		let res = await sendCurl(this, server.api.information.getNoticeCatList, params)
		if (res.status === 200) {
			commit('updateNoticeList', res.data.items)
		}
	},

	async getArticleCatDetail({commit}, params) {
		return await this.$axios.$get(api.prefix + api.api.information.articleCatDetail, {params})
			.then(response => {
				commit('updatearticecatDetail', response.data)
			})
			.catch(error => {
				console.log('err', error)
			})
	},
	async getHomeNotice({commit}, {params}) {
		return await this.$axios.$get(api.prefix + api.api.information.announcement, {params})
			.then(response => {
				commit('updateNoticeInfo', response.items)
			})
			.catch(error => {
				console.log('err', error)
			})
	},
	async getArticleClick({commit}, params) {
		return await this.$axios.$get(api.prefix + api.api.information.infoClick, {params})
			.then(response => {
			})
			.catch(error => {
				console.log('err', error)
			})
	},
	async getHotArticle({commit}, params) {
		return await this.$axios.$get(api.prefix + api.api.information.info, {params})
			.then(response => {
				commit('updateHotArticleInfo', response.items)
			})
			.catch(error => {
				console.log('err', error)
			})
	},

	async getArticleCatList({commit}, params) {
		return await this.$axios.$get(api.prefix + api.api.information.infocate, {params})
			.then(response => {
				commit('updateArticleCatList', response)
			})
			.catch(error => {
				console.log('err', error)
			})
	},
	async getArticleDetail({commit}, params) {
		return await this.$axios.$get(api.prefix + api.api.information.infodetail, {params})
			.then(response => {
				commit('updateHotArticleDetail', response)
			})
			.catch(error => {
				console.log('err', error)
			})
	},


}