/**
 * @description 帮助中心
 * @module store/helper
 * @author hmymingyu <fgf67@163.com>
 */
import {helpCatTree, helpPage} from '../api/helper'
import api from '../config/api'

import { sendCurl } from '../api/common'
import server from '../config/api'

export const state = () => {
	return {
		helpCatInfo: [],
		helpCatList: [],
		helpDetail: {}
	}
}

export const mutations = {
	updateHelperCat(state, data) {
		state.helpCatInfo = data
	},
	updateHelperCatList(state, data) {
		state.helpCatList = data
	},
	updatehelpDetail(state, data) {
		state.helpDetail = data
	}
}

export const actions = {
	async getHelpCate({commit}, params) {
		let res = await sendCurl(this, server.api.helper.getHelpCatTree, params)
		if (res.status === 200) {
			let cateData = res.data
			for (let k in cateData) {
				let params2 = {
					catId: cateData[k].id,
					indexShow: 1
				}
				const rest = await sendCurl(this, server.api.helper.getHelpPage, params2)

				let restdata = rest.data
				cateData[k]['clist'] = restdata
			}
			commit('updateHelperCat', cateData)
		}
	},

	async getHelpCateAll({commit}, {params}) {
		const res = await helpCatTree(this, params)
		let cateData = res.data
		for (let k in cateData) {
			let paramst = {
				catId: cateData[k].id,
				indexShow: 1
			}
			const rest = await helpPage(this, paramst)
			let restdata = rest.data
			cateData[k]['clist'] = restdata
		}
		commit('updateHelperCatList', cateData)
	},
	async gethelpDetail({commit}, params) {
		return await this.$axios.$get(api.prefix + api.api.helper.helpdetail, {params})
			.then(response => {
				commit('updatehelpDetail', response)
			})
			.catch(error => {
				console.log('err', error)
			})
	},
}
