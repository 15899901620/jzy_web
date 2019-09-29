import { sendCurl } from '../api/common'
import server from '../config/api'

export const state = () => {
	return {
		capitalInfo: {},
		orderList:[],
		orderListTotal: 0,
		orderCount: {},
		orderPayInfo: {}
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
	updateOrderCount(state, data) {
		state.orderCount = data
	},
	updateOrderPayInfo(state, data){
		state.orderPayInfo = data
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
	async getOrderPayInfo({commit}, params) {
		let res = await sendCurl(this, server.api.order.getOrderPayInfo, params)
		if (res.status === 200) {
			console.log(res)
			commit('updateOrderPayInfo', res.data)
		}
	},

}