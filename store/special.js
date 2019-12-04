/**
 * @description 专料
 * @module store/special
 * @author hmymingyu <fgf67@163.com>
 */
import api from '../config/api'
import { getCookies } from '../config/storage'
import { specialList ,monthspecialDetail} from '../api/special'
export const state = () => {
    return {
        speciallist: [],
        currPage: 0,
        specialDetail: {},
        feedingInfo:{},
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
    }
}

export const actions = {
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
            console.log(response)
            console.log(response.data.feedingInfo)
            commit('specialDetail', response.data)
            commit('feedingInfo', response.data.feedingInfo)
        })
        .catch(error => {
            console.log('err', error)
        })
    },
}