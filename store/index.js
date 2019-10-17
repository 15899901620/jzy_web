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
  },
  setSupplierToken(state, auth) {
		state.supplierToken = auth
	},
	setSupplier: function (state, user) {
		state.supplierInfo = user
	},
	resetSupplierState(state) {
		state.supplierToken = null
		state.supplierInfo = null
	}
}


export const actions = {
	/**
	 * nuxt 初始化
	 * @param commit
	 * @param req
	 */
	nuxtServerInit({commit, state}, {req}) {
		if (req.headers.cookie) {
			commit('setMemberToken', utils.getMemberTokenInServer(req))
      commit('setMember', utils.getMemberInfoInServer(req))
      commit('setSupplierToken', utils.getSupperTokenInServer(req))
			commit('setSupplier', utils.getSupperInfoInServer(req))
		}
	}
}
