/**
 * @description 限时竞拍
 * @module store/bidders
 * @author hmymingyu <fgf67@163.com>
 */
import {auctionInfor, auctionPage} from '../api/auction'
import api from '../config/api'

import { sendCurl } from '../api/common'
import server from '../config/api'

export const state = () => {
	return {
		auctionTotal: 0,
		auctionList:[],
		auctionInfo:{},
		planTotal: 0,
		planList:[],
		planDetail: {},
		hotbidderList: [],
		biddersbeingData: {},
		bidderssoonData: {},
		biddersendData: {}
	}
}

export const mutations = {
	updateAuctionTotal(state, data) {
		state.auctionTotal = data
	},
	updateAuctionList(state, data) {
		state.auctionList = data
	},
	updateAuctionInfo(state, data) {
		state.auctionInfo = data
	},
	updatePlanTotal(state, data) {
		state.planTotal = data
	},
	updatePlanList(state, data) {
		state.planList = data
	},
	updatePlanDetail(state, data) {
		state.planDetail = data
	},


	updateHotBidderData(state, data) {
		state.hotbidderList = data
	},
	updatebeingData(state, data) {
		state.biddersbeingData = data
	},
	updatesoonData(state, data) {
		state.bidderssoonData = data
	},
	updateendData(state, data) {
		state.biddersendData = data
	},
	updatebidderDetail(state,data){

	},
}

export const actions = {
	async getAuctionList({commit}, params) {
		let res = await sendCurl(this, server.api.Auction.getAuctionList, params)
		if (res.status === 200 && (res.data.errorcode||0) == 0) {
			commit('updateAuctionList', res.data.items)
			commit('updateAuctionTotal', res.data.total)
		}
	},
	async getAuctionInfo({commit}, params) {
		let res = await sendCurl(this, server.api.Auction.getAuctionInfo, params)
		if (res.status === 200 && (res.data.errorcode||0) == 0) {
			commit('updateAuctionInfo', res.data)
		}
	},
	async getPlanList({commit}, params) {
		let res = await sendCurl(this, server.api.Auction.getAuctionPlan, params)
		if (res.status === 200 && (res.data.errorcode||0) == 0) {
			commit('updatePlanList', res.data.items)
			commit('updatePlanTotal', res.data.total)
		}
	},
	async getPlanDetail({commit}, params) {
		let res = await sendCurl(this, server.api.Auction.getPlanDetail, params)
		if (res.status === 200 && (res.data.errorcode||0) == 0) {
			commit('updatePlanDetail', res.data)
		}
	},

	async getHotBidderList({commit}, {params}) {
		let res = await auctionPage(this, params)
		if (res.status === 200) {
			commit('updateHotBidderData', res.data.items)
		}
	},

	async getBidderDetail({commit}, {params}) {
		const res = await auctionInfor(this, params)
		commit('updatebidderDetail', res)
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

	async getBiddersList({commit}, params) {
		let res = await auctionPage(this, params)
		let datalist = res.data.items;
		let beingData = []
		let soonData = []
		let endData = []
		datalist.forEach((item, index) => {
			if (item.type == 2) {
				beingData.push(item)
			}
			if (item.type == 1) {
				soonData.push(item)
			}
			if (item.type == 3) {
				endData.push(item)
			}
		});
		commit('updatebeingData', beingData)
		commit('updatesoonData', soonData)
		commit('updateendData', endData)
	}
}
