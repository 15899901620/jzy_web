/**
 * @description 限时竞拍
 * @module store/bidders
 * @author hmymingyu <fgf67@163.com>
 */
import { auctionInfor } from '../api/auction'
import api from '../config/api'

export const state = () => {
    return {
        biddersDetail: {},
    }
}
  
export const mutations = {
    updatebidderDetail(state, data) {
        state.biddersDetail = data
    },
    updateHelperCatList(state, data) {
        state.helpCatList = data
    },
    updatehelpDetail(state, data) {
        state.helpDetail = data
    }

}
  
export const actions = {
    async getBidderDetail({ commit }, { params }) { 
        const res = await auctionInfor(this, params)
            console.log(res)
        commit('updatebidderDetail', res)
    },
   
    async gethelpDetail({ commit },  params) {
        return await this.$axios.$get(api.prefix + api.api.helper.helpdetail, { params })
        .then(response => {
            commit('updatehelpDetail', response)
        })
        .catch(error => {
            console.log('err', error)
        })
    },
}