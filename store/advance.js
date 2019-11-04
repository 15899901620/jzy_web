import {sendCurl} from '../api/common'
import server from '../config/api'

export const state = () => {
	return {
		advanceList: [],
		total: 0
	}
};

export const mutations = {
	updateAdvanceList(state, data) {
		state.advanceList = data
	},
	updateTotal(state, data) {
		state.total = data
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
	}
}
