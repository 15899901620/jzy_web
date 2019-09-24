/**
 * @description 首页内容
 * @module store/home
 * @author hmymingyu <fgf67@163.com>
 */
import api from '../config/api'

export const state = () => {
    return {
      cobrandsInfo: []
    }
}
  
export const mutations = {
    updateCoBrandsInfo(state, data) {
        state.cobrandsInfo = data
    }
}
  
export const actions = {
    async getCoBrandsInfo({ commit },  params) {
        return await this.$axios.$get(api.prefix + api.api.sysconf.cooperativeBrand, { params })
        .then(response => {
            if(response.items) {
                let i = 0
                let cobrandData = []
                let list = []
                let a = 14
                for(let k in response.items) {
                    if(k<a) {
                        list[k] = Object.assign({}, response.items[k])
                    }else{
                        cobrandData.push(list)
                        list = []
                        i = i+1
                        a = a+a
                    }
                }
                const data =  Object.assign({}, cobrandData);
                commit('updateCoBrandsInfo', data)
            }
            
        })
        .catch(error => {
            console.log('err', error)
        })
    }
}