import {sendCurl,sendHttp} from '../api/common'
import server from '../config/api'

export const state = () => {
	return {
		indexData: {},
		auctionData: {},
		publicData: {}
	}
};

export const mutations = {
	updateIndexData(state, data) {
 		state.indexData = data
	},
    updatePublicData(state, data) {
        state.publicData = data
    },
    updateAuctionData(state, data) {
        state.auctionData = data
    }
}

export const actions = {
	async getPublicData({commit}) {
		try {
			let res = await sendCurl(this, server.api.pageData.publicData)
			if (res.status === 200) {
				commit('updatePublicData', res.data)
			}
		}catch(err){
			console.log('获取数据异常：', err)
		}
	},
    async getIndexData({commit}) {
        try {
            let res = await sendCurl(this, server.api.pageData.indexData)
            if (res.status === 200) {
                commit('updateIndexData', res.data)
            }
        }catch(err){
            console.log('获取数据异常：', err)
        }
    },
    async getAuctionData({commit}) {
        try {
            let res = await sendCurl(this, server.api.pageData.auctionData)
            if (res.status === 200) {
                commit('updateAuctionData', res.data)
            }
        }catch(err){
            console.log('获取数据异常：', err)
        }
    }
}
