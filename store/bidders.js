/**
 * @description 限时竞拍
 * @module store/bidders
 * @author hmymingyu <fgf67@163.com>
 */
import { auctionInfor, auctionPage } from '../api/auction'
import api from '../config/api'

export const state = () => {
    return {
        biddersbeingData: {},
        bidderssoonData: {},
        biddersendData: {}
    }
}
  
export const mutations = {
    updatebeingData(state, data) {
        state.biddersbeingData = data
    },
    updatesoonData(state, data) {
        state.bidderssoonData = data
    },
    updateendData(state, data) {
        state.biddersendData = data
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

    async getBiddersList({ commit },  params) {
        let res = await auctionPage(this, params)
        let datalist = res.data.items;
        let beingData = []
        let soonData = []
        let endData = []
        datalist.forEach((item,index) => {
            if (item.type == 2) {
                beingData.push(item)
            }
            if (item.type == 1) {
                soonData.push(item)
            }
            if (item.type == 3) {
                endData.push(item)
            }
        });
        commit('updatebeingData', beingData)
        commit('updatesoonData', soonData)
        commit('updateendData', endData)
    }
}