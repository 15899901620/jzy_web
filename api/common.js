/**
 * @description 系统模块广告内容
 */
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

export const sendHttp = (vm, hasAuth, apiName, data) => {
    let authorization = ''
    if(hasAuth){
        authorization = getCookie('webtoken')
        if(authorization === false){
            window.location.href = '/login'
        }
    }
    vm.$axios.defaults.headers = {
        'Authorization': authorization,
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }

    return vm.$axios.request({
        url: server.prefix + apiName.url,
        method: apiName.method,
        params: {
          ...data
        }
    })
};