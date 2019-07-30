/**
 * @description 专料
 * @module store/special
 * @author hmymingyu <fgf67@163.com>
 */
import api from '../config/api'
import { getCookies } from '../config/storage'
import { specialList } from '../api/special'
export const state = () => {
    return {
        speciallist: [],
        currPage: 0
    }
}

export const mutations = {
    updatespeciallist(state, data) {
        state.speciallist = data
    },
    updateCurrPage (state, data) {
        state.currPage = data
    }
}

export const actions = {
    async getSpecialList({ commit }, params) {
        commit('updateCurrPage', parseInt(params.current_page))
        
        const res = await specialList(this, params).then(response => {
            console.log('tag', response)
            commit('updatespeciallist', response)
        })
        .catch(error => {
            console.log('err', error)
        })
    }
}