import { spotList } from '../api/spot'
import api from '../config/api'

export const state = () => {
    return {
      spotlist: []
    }
}
  
export const mutations = {
    updateSpotList(state, data) {
      state.spotlist = data
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