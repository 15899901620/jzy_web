/**
 * @description 资讯
 * @module store/article
 * @author hmymingyu <fgf67@163.com>
 */
import Cookies from 'js-cookie'
import api from '../config/api'
import { getCookies } from '../config/storage'

import { sendCurl } from '../api/common'
import server from '../config/api'

export const state = () => {
	return {
		articecatDetail: {},
		articleCat: [],
		noticeInfo: [],
		noticeInfo1:[],
		noticeInfo2:[],
		noticeInfo3:[],
		articleInfo: [],
		hotarticleInfo: [],
		articleList: [],
		articleList2: [],
		articleList3: [],
		articleList4: [],
		articleTotal: 0,
		noticeList: [],
		articledetail: {},
		currPage: 0,
		indexarticelist:[]
	}
}

export const mutations = {
	updateArticleList(state, data) {
		state.articleList = data
	},
	updateArticleList2(state, data) {
		state.articleList2 = data
	},
	updateArticleList3(state, data) {
		state.articleList3 = data
	},
	updateArticleList4(state, data) {
		state.articleList4 = data
  	},
  	updateArticleTotal(state, data) {
		state.articleTotal = data
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
	updateNoticeInfo1(state, data) {
		state.noticeInfo1 = data
	},
	updateNoticeInfo2(state, data) {
		state.noticeInfo2 = data
	},
	updateNoticeInfo3(state, data) {
		state.noticeInfo3 = data
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
	},
	updateindexarticelist(state, data){
		state.indexarticelist=data
	},
}
export const getters={
	articleCat: state => state.articleCat
}
export const actions = {
	async getArticleList({commit}, params) {
		try{
			commit('updateCurrPage', parseInt(params.current_page))

			let res = await sendCurl(this, server.api.information.getArticleList, params)

			if (res.status === 200) {
				console.log(res.data.items)
				
			commit('updateArticleTotal', res.data.total)
			commit('updateArticleList', res.data.items)

			}
		}catch (e) {
			console.log('获取资讯1异常')
		}
	},
	async getArticleList2({commit}, params) {
		try{
			commit('updateCurrPage', parseInt(params.current_page))

			let res = await sendCurl(this, server.api.information.getArticleList, params)

			if (res.status === 200) {
			commit('updateArticleList2', res.data.items)
			}
		}catch (e) {
			console.log('获取资讯2异常')
		}
	},
	async getArticleList3({commit}, params) {
		try{
			commit('updateCurrPage', parseInt(params.current_page))

			let res = await sendCurl(this, server.api.information.getArticleList, params)

			if (res.status === 200) {
			commit('updateArticleList3', res.data.items)
			}
		}catch (e) {
			console.log('获取资讯3异常')
		}
	},
	async getArticleList4({commit}, params) {
		try{
			commit('updateCurrPage', parseInt(params.current_page))

			let res = await sendCurl(this, server.api.information.getArticleList, params)

			if (res.status === 200) {
			commit('updateArticleList4', res.data.items)
			}
		}catch (e) {
			console.log('获取资讯4异常')
		}
	},
	//首页行情资讯
	async getindexArticleList({getters,commit},catId) {
		var  dataarray=[]
		await this.$axios.$get(api.prefix + api.api.information.infocate, {parentId: 0})
			.then(response => {

					response.forEach((item,index)=>{
						let params={
							current_page:  1, page_size: 4, catId: item.id,sortBy: 'add_time', desc: true, isShow: 1
						}
						sendCurl(this, server.api.information.getArticleList, params).then(res=>{

							dataarray[item.id]=res.data.items

							commit('updateindexarticelist', dataarray)
						})
					})

			})
			.catch(error => {
				console.log('err', error)
			})
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
	async getHomeNotice({commit}, params) {
		return await this.$axios.$get(api.prefix + api.api.information.announcement, {params})
			.then(response => {
				commit('updateNoticeInfo', response.items)
			})
			.catch(error => {
				console.log('err', error)
			})
	},
	async getHomeNotice1({commit}, params) {
		return await this.$axios.$get(api.prefix + api.api.information.announcement, {params})
			.then(response => {
				console.log('111',params)
				commit('updateNoticeInfo1', response.items)
			})
			.catch(error => {
				console.log('err', error)
			})
	},
	async getHomeNotice2({commit}, params) {
		return await this.$axios.$get(api.prefix + api.api.information.announcement, {params})
			.then(response => {
				console.log('222',params)
				commit('updateNoticeInfo2', response.items)
			})
			.catch(error => {
				console.log('err', error)
			})
	},
	async getHomeNotice3({commit},params) {
		return await this.$axios.$get(api.prefix + api.api.information.announcement, {params})
			.then(response => {
				console.log('333',params)
				commit('updateNoticeInfo3', response.items)
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
        if (response.errorcode) {
          response = {}
        }
				commit('updateHotArticleDetail', response)
			})
			.catch(error => {
				console.log('err', error)
			})
	},


}
