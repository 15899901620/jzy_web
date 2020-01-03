import {sendCurl,sendHttp} from '../api/common'
import server from '../config/api'

export const state = () => {
	return {
		advanceList: [],
		total: 0,
		Feedingtotal:0,
		planList: [],
		planDetail: {},
		feedingList: [],
		WineBidInfo:[],
		BidInfo:[],
		Total1:0
	}
};

export const mutations = {
	updateAdvanceList(state, data) {
 		state.advanceList = data
	},
	updateTotal(state, data) {
		state.total = data
	},
	updateBidInfo(state, data){
		state.BidInfo = data
	},
	WineTotals(state, data){
		state.Total1 = data
	},
	updateFeedingtotal(state, data){
		state.Feedingtotal = data
	},
	updatePlanList(state, data) {
		state.planList = data
	},
	updatePlanDetail(state, data) {
		state.planDetail = data
	},
	updateFeedingList(state, data) {
		state.feedingList = data
	},
	updateAdvanceList(state, data) {
		state.advanceList = data
   },
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
	async getWineBidInfo({commit}, params) {
		try{
			let res = await sendHttp(this, false, server.api.biddding.bidddingList, params,2)
			console.log(res.data.total)
			if (res.status === 200 && (res.data.errorcode||0) == 0) {
				commit('updateBidInfo', res.data.items)
				commit('WineTotals', res.data.total)
			}
		}catch(err){
			console.log('获取招标信息异常：', err)
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
				commit('updateFeedingtotal', res.data.total)
			}
		}catch(err){
			console.log('获取预售放料列表异常：', err)
		}
	}
}
