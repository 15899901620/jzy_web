import {sendCurl} from '../api/common'
import server from '../config/api'

export const state = () => {
	return {
		advanceList: [],
		total: 0,
		planList: [],
		planDetail: {},
		feedingList: [],
	}
};

export const mutations = {
	updateAdvanceList(state, data) {
 		state.advanceList = data
	},
	updateTotal(state, data) {
		state.total = data
	},
	updatePlanList(state, data) {
		state.planList = data
	},
	updatePlanDetail(state, data) {
		state.planDetail = data
	},
	updateFeedingList(state, data) {
		state.feedingList = data
	}
}

export const actions = {
	async getAdvanceList({commit}, params) {
		try {
			let res = await sendCurl(this, server.api.advance.getSaleList, params)
			if (res.status === 200) {
				commit('updateAdvanceList', res.data.items)
				commit('updateTotal', res.data.total)
			}
		}catch(err){
			console.log('获取预售列表异常：', err)
		}
	},
	async getPlanList({commit}, params) {
		try {
			let res = await sendCurl(this, server.api.advance.getMemberPlanList, params)
			if (res.status === 200) {
				commit('updatePlanList', res.data.items)
				commit('updateTotal', res.data.total)
			}
		}catch(err){
			console.log('获取预售合约列表异常：', err)
		}
	},
	async getPlanDetail({commit}, params) {
		try {
			let res = await sendCurl(this, server.api.advance.getSalePlanDetail, params)
			if (res.status === 200) {
				commit('updatePlanDetail', res.data)
			}
		}catch(err){
			console.log('获取预售合约放料详情异常：', err)
		}
	},
	async getFeedingList({commit}, params) {
		try {
			let res = await sendCurl(this, server.api.advance.getMemberFeedingList, params)
			if (res.status === 200) {
 				commit('updateFeedingList', res.data.items)
				commit('updateTotal', res.data.total)
			}
		}catch(err){
			console.log('获取预售放料列表异常：', err)
		}
	}
}
