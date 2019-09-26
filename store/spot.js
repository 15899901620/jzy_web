import { sendCurl } from '../api/common'
import server from '../config/api'

export const state = () => {
	return {
		spotList: [],
		total: 0,
		condition:{
			category: [],
			process: [],
		},
		spotInfo: {}
	}
}

export const mutations = {
	updateSpotList(state, data) {
		state.spotList = data
	},
	updateTotal(state, data) {
		state.total = data
	},
	updateCondition(state, data) {
		state.condition = data
	},
	updateSpotInfo(state, data) {
		state.spotInfo = data
	}
}

export const actions = {
	async getSpotList({commit}, params) {
		let res = await sendCurl(this, server.api.spot.initSpotList, params)
		if (res.status === 200) {
			commit('updateSpotList', res.data.items)
			commit('updateTotal', res.data.total)
		}
	},
	async getFilterConditonData({commit}) {
		let res = await sendCurl(this, server.api.spot.getFilterConditon, {})
		if (res.status === 200) {
			let condition = {
				category: res.data.categoryFilter,
				process: res.data.specLevelFilter
			}
			commit('updateCondition', condition)
		}
	},
	async getSpotInfo({commit}, params) {
		let res = await sendCurl(this, server.api.spot.getSpotInfoToOrder, params)
		if (res.status === 200) {
			commit('updateSpotInfo', res.data.items)
		}
	}
}
