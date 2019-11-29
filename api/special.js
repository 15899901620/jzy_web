/**
 * Created by stanley on 2019/7/8 0008.
 */
/**
 * @description 系统模块资讯内容
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
/**
 * @description 我的年计划
 * @param data
 * @returns {*|never}
 */
export const myYearList = (vm, data) => {
    vm.$axios.defaults.headers = {
        'Authorization': getCookie('webtoken') === false ? '' : getCookie('webtoken'),
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
    return vm.$axios.get(server.prefix + server.api.special.myYearList,
    {
        params: {...data}
    }).catch((e) => {
        let errorInfo = e.response
        console.log('specialListErr', errorInfo)
    })
};

export const specialDetail = (vm, data) => {
    vm.$axios.defaults.headers = {
        'Authorization': getCookie('webtoken') === false ? '' : getCookie('webtoken'),
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
    return vm.$axios.get(server.prefix + server.api.special.specialDetail,
    {
        params: {...data}
    }).catch((e) => {
        let errorInfo = e.response
        console.log('specialDetailErr', errorInfo)
    })
};
export const getWeek = (vm, data) => {
    vm.$axios.defaults.headers = {
        'Authorization': getCookie('webtoken') === false ? '' : getCookie('webtoken'),
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
    return vm.$axios.get(server.prefix + server.api.week.getWeek,
    {
        params: {...data}
    }).catch((e) => {
        let errorInfo = e.response
        console.log('getWeek', errorInfo)
    })
};

export const submitOrder = (vm, data) => {
    vm.$axios.defaults.headers = {
        'Authorization': getCookie('webtoken') === false ? '' : getCookie('webtoken'),
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
    return vm.$axios.post(server.prefix + server.api.special.submitOrder,
    {
        ...data
    }).catch((e) => {
        let errorInfo = e.response
        console.log('submitOrder', errorInfo)
    })
};

/**
 * @description 运费
 * @param data
 * @returns {*|never}
 */
export const  devDetail = (vm, data) => {
    vm.$axios.defaults.headers = {
        'Authorization': getCookie('webtoken') === false ? '' : getCookie('webtoken'),
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
    return vm.$axios.get(server.prefix + server.api.extra.extraDetail,
    {
        params: {...data}
    }).catch((e) => {
            let errorInfo = e.response
            console.log('specialListErr', errorInfo)
    })
};
