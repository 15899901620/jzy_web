/**
 * @description 限时竞拍
 * @module store/bidders
 * @author hmymingyu <fgf67@163.com>
 */
import {auctionInfor, auctionPage} from '../api/auction'
import api from '../config/api'
import utils from '~/utils/utils'

import { sendCurl } from '../api/common'
import server from '../config/api'

export const state = () => {
	return {
		auctionTotal: 0,
		auctionList:[],
		auctionInfo:{},
		planTotal: 0,
		partakeList:[],
		planList:[],
		planDetail: {},


		hotbidderList: []
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
	updatePartakeList(state, data) {
		state.partakeList = data
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
			console.log(res.data)
			commit('updateAuctionInfo', res.data)
		}
	},
	async getPartakeList({commit}) {
		let authorization = ''
		if(process.server){
			authorization = utils.getMemberTokenInVm(this)
		}else{
			authorization = utils.getMemberTokenInClient()
		}
		if(authorization !== false && authorization != ''){
			console.log('getPartakeList has ')
			let res = await sendCurl(this, server.api.Auction.getPartakeList)
			console.log('getPartakeList', res)
			if (res.status === 200 && (res.data.errorcode||0) == 0) {
				commit('updatePartakeList', res.data)
			}
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
