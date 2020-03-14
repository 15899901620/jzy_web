import { sendCurl } from '../api/common'
import server from '../config/api'

export const state = () => {
	return {
		capitalInfo: {},
		orderList:[],
		orderListTotal: 0,
		orderCount: {},
		orderPayInfo: {},
		auctionCurr:{},
		memberCurr:{},
		DefaultsTotal:{},
		DefaultsCurr:{},
		sealInfo: {},
	}
}

export const mutations = {
	updateCapitalInfo(state, data) {
		state.capitalInfo = data
	},
	updateOrderList(state, data) {
		state.orderList = data
	},
	updateOrderListTotal(state, data) {
		state.orderListTotal = data
	},
	updateMemberTotal(state, data) {
		state.MemberTotal = data
	},
	updateAuctionTotal(state, data) {
		state.AuctionTotal = data
	},
	updateOrderCount(state, data) {
		state.orderCount = data
	},
	updateOrderPayInfo(state, data){
		state.orderPayInfo = data
	},
	updateMemberCurr(state, data){
		state.memberCurr = data
	},
	updateAuctionCurr(state, data){
		state.auctionCurr = data
	},

	updateDefaultsCurr(state, data){
		state.DefaultsCurr = data
	},
	updateDefaultsTotal(state, data){
		state.DefaultsTotal = data
	},
	updateSealInfo(state, data){
		state.sealInfo = data
	},
}

export const actions = {
	async getCapitalInfo({commit}, params) {
		let res = await sendCurl(this, server.api.capital.myCapital, params)
		if (res.status === 200) {
			commit('updateCapitalInfo', res.data)
		}
	},
	async getOrderList({commit}, params) {
		let res = await sendCurl(this, server.api.order.getMemberOrderList, params)
		if (res.status === 200) {
			commit('updateOrderList', res.data.items)
			commit('updateOrderListTotal', res.data.total)
		}
	},
	async getOrderCount({commit}) {
		let res = await sendCurl(this, server.api.order.getMemberOrderCount, {})
		if (res.status === 200) {
			commit('updateOrderCount', res.data)
		}
	},
	async getMemberCurr({commit},params) {
		let res = await sendCurl(this, server.api.Auction.membercurr, params)
		if (res.status === 200) {
			commit('updateMemberTotal', res.data.total)
			commit('updateMemberCurr', res.data.items)
		}
	},
	async getAuctionCurr({commit},params) {
		let res = await sendCurl(this, server.api.Auction.auctioncurr,params)
		if (res.status === 200) {
			commit('updateAuctionTotal', res.data.total)
			commit('updateAuctionCurr', res.data.items)
		}
	},
	async getmemberDefaults({commit},params) {
		let res = await sendCurl(this, server.api.Auction.memberDefaults,params)
		if (res.status === 200) {
			commit('updateDefaultsTotal', res.data.total)
			commit('updateDefaultsCurr', res.data.items)
		}
	},
	async getOrderPayInfo({commit}, params) {
		let res = await sendCurl(this, server.api.order.getOrderPayInfo, params)
		if (res.status === 200) {
			commit('updateOrderPayInfo', res.data)
		}
	},
	async getSealInfo({commit}) {
		let res = await sendCurl(this, server.api.seal.getMemberSealInfo, {})
		if (res.status === 200) {
			commit('updateSealInfo', res.data)
		}
	},
}
