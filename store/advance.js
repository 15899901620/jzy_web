import { sendCurl } from '../api/common'
import server from '../config/api'

export const state = () => {
    return {
        advanceList: [],
        total: 0
    }
};

export const mutations = {
    updateAdvanceList(state, data) {
        state.advanceList = data
    },
    updateTotal(state, data) {
        state.total = data
    }
}

export const actions = {
    async getAdvanceList({commit}, params) {
        console.log('params',params)
        let res = await sendCurl(this, server.api.advance.initAdvanceList, params)
        if (res.status === 200) {
            console.log('res',res)
            commit('updateAdvanceList', res.data.items)
            commit('updateTotal', res.data.total)
        }
    }
}
