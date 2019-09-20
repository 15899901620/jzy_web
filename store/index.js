import utils from '~/utils/utils'

export const state = () => {
	return {
		memberToken: '',
		memberInfo: null,
		supplierToken: '',
		supplierInfo: null,
	}
}

export const mutations = {
	setMemberToken(state, auth) {
		state.memberToken = auth
	},
	setMember: function (state, user) {
		state.memberInfo = user
	},
	resetMemberState(state) {
		state.memberAuth = null
		state.memberInfo = null
	}
}


export const actions = {
	/**
	 * nuxt 初始化
	 * @param commit
	 * @param req
	 */
	nuxtServerInit({commit, state}, {req}) {
		let auth = null
		if (req.headers.cookie) {
			console.log(utils.getMemberTokenInServer(req))
			console.log(utils.getMemberInfoInServer(req))
			commit('setMemberToken', utils.getMemberTokenInServer(req))
			commit('setMember', utils.getMemberInfoInServer(req))
		}
	}
}
