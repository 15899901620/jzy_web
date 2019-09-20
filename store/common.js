import { sendCurl } from '../api/common'
import server from '../config/api'

export const state = () => {
	return {
		hotSearch: [],
		nav:{
			topNav:[],
			middleNav:[],
			bottomNav:[],
		},
		hotCategory: [],
		hotProduct: [],
		productLevelValues: [],
		sysConfig: {},
		adList:{}
	}
}

export const mutations = {
	updateHotSearch(state, data) {
		state.hotSearch = data
	},
	updateNav(state, data) {
		state.nav = data
	},
	updateHotCategory(state, data) {
		state.hotCategory = data
	},
	updateHotProduct(state, data) {
		state.hotProduct = data
	},
	updateProductLevelValues(state, data) {
		state.productLevelValues = data
	},
	updateSysConfig(state, data) {
		state.sysConfig = data
	},
	updateAdList(state, data) {
		let key = data.key
		state.adList[key] = data.value
	},
}

export const actions = {
	async getHotSearch({commit}) {
		let res = await sendCurl(this, server.api.search.getHotSearch, {})
		if (res.status === 200) {
			commit('updateHotSearch', res.data)
		}
	},
	async getNavList({commit}) {
		let res = await sendCurl(this, server.api.navigation.getNavList, {})
		if (res.status === 200) {
			let nav = {
				topNav:[],
				middleNav:[],
				bottomNav:[],
			}
			res.data.forEach((item, index) => {
				if (item.type === 'top') {
					nav.topNav.push(item)
				}
				if (item.type === 'middle') {
					nav.middleNav.push(item)
				}
				if (item.type === 'bottom') {
					nav.bottomNav.push(item)
				}
			})
			commit('updateNav', nav)
		}
	},
	async getHotCategory({commit}) {
		let res = await sendCurl(this, server.api.product.cateHot, {})
		if (res.status === 200) {
			commit('updateHotCategory', res.data)
		}
	},
	async getHotProduct({commit}) {
		let res = await sendCurl(this, server.api.product.goodsHot, {})
		if (res.status === 200) {
			commit('updateHotProduct', res.data)
		}
	},
	async getProductLevelValues({commit}) {
		let res = await sendCurl(this, server.api.product.attrlist, {spec_id: 1})
		if (res.status === 200) {
			commit('updateProductLevelValues', res.data)
		}
	},
	async getSysConfig({commit}) {
		let res = await sendCurl(this, server.api.sysconf.getSysConfig, {})
		if (res.status === 200) {
			commit('updateSysConfig', res.data)
		}
	},
	async getBannerList({commit}, position) {
		let res = await sendCurl(this, server.api.ad.getAdList, {'positionId': position})
		if (res.status === 200) {
			commit('updateAdList', {'key': 'ad'+position, 'value':res.data})
		}
	},
}