/**
 * Created by stanley on 2019/7/8 0008.
 */
/**
 * @description 系统模块资讯内容
 */
import server from './server'
import { Message } from 'iview'
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
}
/**
 * @description 转料专场
 * @param data
 * @returns {*|never}
 */
export const specialList = (vm, data) => {
    vm.$axios.defaults.headers = {
        'Authorization': getCookie('webtoken') === false ? '' : getCookie('webtoken'),
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
    return vm.$axios.get(server.prefix + server.api.special.specialList,
        {
            params: {...data}
}).catch((e) => {
        let errorInfo = e.response
        console.log('specialListErr', errorInfo)
})
};