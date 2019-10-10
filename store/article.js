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
		console.log("data",data)
		state.indexarticelist=data
	},
}
export const getters={
	articleCat: state => state.articleCat
}
export const actions = {
	async getArticleList({commit}, params) {
		commit('updateCurrPage', parseInt(params.current_page))

		let res = await sendCurl(this, server.api.information.getArticleList, params)

		if (res.status === 200) {
		  commit('updateArticleList', res.data.items)
		  commit('updateArticleTotal', res.data.total)
		}
	},
	//首页行情资讯
	async getindexArticleList({getters,commit},catId) {


		let cate=6
		let dataarray=[]
		console.log('cate:',cate)
		for(var i=0;i<=6; i++){
			let params={
				current_page:  1, page_size: 4, catId: i,sortBy: 'add_time', desc: true, isShow: 1
			}
			console.log('params:',params)

			sendCurl(this, server.api.information.getArticleList, params).then(res=>{
			console.log('res',res)
				dataarray[i]=res.data.items

				commit('updateindexarticelist', dataarray)
			})
		}

		// cate.forEach((item,index)=>{
		// 	let params={
		// 		current_page:  1, page_size: 4, catId: item.id,sortBy: 'add_time', desc: true, isShow: 1
		// 	}
		// 	sendCurl(this, server.api.information.getArticleList, params).then(res=>{
		// 		dataarray[item.id]=res.data.items
		// 		commit('updateindexarticelist', dataarray)
		// 	})
		// })

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
    console.log(params)
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
