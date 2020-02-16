/**
 * @description 专料
 * @module store/special
 * @author hmymingyu <fgf67@163.com>
 */
import api from '../config/api'
import { getCookies } from '../config/storage'
import { specialList ,monthspecialDetail,monthaddPlan} from '../api/special'
import { sendCurl } from '../api/common'
import server from '../config/api'
export const state = () => {
    return {
        speciallist: [],
        currPage: 0,
        specialDetail: {},
        feedingInfo:{},
        spotList:[],
        monthinfo:[],
        monthTotal:0,
        total:0
    }
}

export const mutations = {
    updatespeciallist(state, data) {
        state.speciallist = data
    },
    updateCurrPage (state, data) {
        state.currPage = data
    },
    specialDetail (state, data) {
        state.specialDetail = data
    },
    feedingInfo (state, data) {
        state.feedingInfo = data
    },
    monthaddList(state, data){
        state.monthinfo = data
    },
    updateSpotList(state, data) {
        console.log("speciallist:",data)
		state.spotList = data
    },
    monthTotal(state, data){
        state.monthTotal = data
    },
	updateTotal(state, data) {
		state.total = data
	},
}

export const actions = {
    async monthaddPlan({ commit }, params) {
        const res = await monthaddPlan(this, params).then(response => {
            commit('specialDetail', response.data)
            commit('feedingInfo', response.data.feedingInfo)
        })
        .catch(error => {
            console.log('err', error)
        })
    },
    async getSpecialList({ commit }, params) {
        commit('updateCurrPage', parseInt(params.current_page))

        const res = await specialList(this, params).then(response => {
            commit('updatespeciallist', response)
        })
        .catch(error => {
            console.log('err', error)
        })
    },
    async monthspecialDetail({ commit }, params) {
        const res = await monthspecialDetail(this, params).then(response => {
            commit('specialDetail', response.data)
            commit('feedingInfo', response.data.feedingInfo)
        })
        .catch(error => {
            console.log('err', error)
        })
    },
    async monthaddPlanList({commit}, params) {
		try{
            let res = await sendCurl(this, server.api.special.monthaddPlan, params)
			if (res.status === 200 && (res.data.errorcode||0) == 0) {
                commit('monthaddList', res.data.items)
                commit('monthTotal', res.data.total)

			}
		}catch(err){
			console.log('获取月计划列表异常：', err)
		}

	},
    async getSpotList({commit}, params) {
		try{
            let res = await sendCurl(this, server.api.special.initsaleList, params)
            console.log(res)
			if (res.status === 200) {
				commit('updateSpotList', res.data)
				// commit('updateTotal', res.data.total)
			}
		}catch (e) {
			console.log('获取现货列表异常：', e)
		}
	},

}
