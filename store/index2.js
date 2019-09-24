import Vuex from 'vuex'

/*
const createStore = () => {
	return new Vuex.Store({
		state: {
			memberAuth: null,
			memberInfo: null,
		},
		mutations: {
			setMemberAuth(state, auth) {
				state.memberAuth = auth
			},
			setMember: function (state, user) {
				state.memberInfo = user
			},
			resetMemberState(state) {
				state.memberAuth = null
				state.memberInfo = null
			}
		},
		actions: {
			/!**
			 * nuxt 初始化
			 * @param commit
			 * @param req
			 *!/
			nuxtServerInit({commit, state}, {req}) {
				let auth = null
				if (req.headers.cookie) {
					//const parsed = cookieparser.parse(req.headers.cookie)
					let service_cookie = {}
					req.headers.cookie.split(';').forEach(function (val) {
						let parts = val.split('=');
						service_cookie[parts[0].trim()] = (parts[1] || '').trim();
					})

					try {
						auth = JSON.parse(service_cookie.token)
					} catch (err) {
						// No valid cookie found
					}
					commit('setMemberAuth', auth)
				}
			}
		}
	})
}

export default createStore*/
