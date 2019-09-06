import { spotList } from '../api/spot'
import api from '../config/api'

export const state = () => {
    return {
        SpotList: [],
        biddersbeingData: {},
        bidderssoonData: {},
        biddersendData: {}
    }
}
  
export const mutations = {
    updateSpotList(state, data) {
      state.SpotList = data
    },
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
    async getSpotList({ commit }, { params }) {
      let res = await spotList(this,params)
      if(res.status === 200){
        commit('updateSpotList', res.data.items)
      }
    }
}