/**
 * @description 用户登录
 * @module store/login
 * @author hmymingyu <fgf67@163.com>
 */
import api from '../config/api'
import Cookies from 'js-cookie'

export const state = () => {
	return {
		chackPhone: false,
		userinfor: {},
		webtoken: '',
		websuppliertoken: ''
	}
}

export const getters = (state) => {
	return {
		userinfo: Cookies.get('userinfor')
	}
}

export const mutations = {
	updateUserInfof(state, data) {
		state.userinfor = data
	},
	updateChackPhone(state, list) {
		state.chackPhone = list
	},
}

export const actions = {
	setUserInfor({commit}, params) {
		commit('updateUserInfof', params)
	},
	getUserInfor({commit}, params) {
		commit('updateUserInfof', params)
	},
}