import { sendCurl } from '../api/common'
import server from '../config/api'

export const state = () => {
	return {
		capitalInfo: {}
	}
}

export const mutations = {
	updateCapitalInfo(state, data) {
		state.capitalInfo = data
	}
}

export const actions = {
	async getCapitalInfo({commit}) {
		let res = await sendCurl(this, server.api.capital.myCapital, {})
		if (res.status === 200) {
			commit('updateCapitalInfo', res.data)
		}
	}
}