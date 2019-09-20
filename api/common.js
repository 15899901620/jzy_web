import utils from '~/utils/utils'
import server from '../config/api'
import Cookies from 'js-cookie'

const getCookie = name => {
    if (!name) return
    let data = Cookies.get(name)
    if (!data) {
        return false
    }
    if (typeof data !== 'string') {
        return JSON.parse(data)
    }
    return data
};

export const sendCurl = (vm, apiName, params, isMember) => {
	isMember = isMember || true
	let authorization = ''

	if(isMember){
		if(process.server){
			authorization = utils.getMemberTokenInServer()
		}else{
			authorization = utils.getMemberTokenInClient()
		}
	}else{
		authorization = vm.store.state.supplierToken
	}

	if(authorization === false){
		vm.$axios.defaults.headers = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
		}
	}else{
		vm.$axios.defaults.headers = {
			'Authorization': authorization,
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
		}
	}

	return vm.$axios.request({
		url: server.prefix + apiName.url,
		method: apiName.method,
		params: {
			...params
		}
	})
};

export const sendHttp = (vm, hasAuth, apiName, data, type) => {
    let authType = type || 1
    let authorization = ''
    if(process.server){
        if(authType == 1){
            authorization = vm.$cookies.get('webtoken')
        }else if(authType == 2){
            authorization = vm.$cookies.get('websuppliertoken')
        }
    }else{
        if(authType == 1){
            authorization = getCookie('webtoken')
        }else if(authType == 2){
            authorization = getCookie('websuppliertoken')
        }
    }

    if(hasAuth && authorization === false){
        window.location.href = '/login'
        return
    }
    console.log("authorization:", authorization)

    if(authorization === false){
        vm.$axios.defaults.headers = {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
    }else{
        vm.$axios.defaults.headers = {
            'Authorization': authorization,
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
    }

    return vm.$axios.request({
        url: server.prefix + apiName.url,
        method: apiName.method,
        params: {
          ...data
        }
    })
};