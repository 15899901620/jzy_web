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

export const sendHttp = (vm, hasAuth, apiName, data, type) => {
    let authType = type || 1
    let authorization = ''
    if(hasAuth){
        if(authType == 1){
            authorization = getCookie('webtoken')
        }else if(authType == 2){
            authorization = getCookie('websuppliertoken')
        }
        if(authorization === false){
            window.location.href = '/login'
            return ;
        }
        
        
        vm.$axios.defaults.headers = {
            'Authorization': authorization,
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
    }else{
        vm.$axios.defaults.headers = {
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