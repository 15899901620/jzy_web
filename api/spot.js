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

/**
 * @description 现货超市顶部分类
 * @param data
 * @returns {*|never}
 */
export const filterConditon = (vm, data) => {
    vm.$axios.defaults.headers = {
        'Authorization': getCookie('webtoken') === false ? '' : getCookie('webtoken'),
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
    return vm.$axios.get(server.prefix + server.api.spot.filterConditon,
        {
            params: {...data}
        }).catch((e) => {
        let errorInfo = e.response
    })
};

/**
 * @description 现货超市
 * @param data
 * @returns {*|never}
 */
export const spotList = (vm, data) => {
    vm.$axios.defaults.headers = {
        'Authorization': getCookie('webtoken') === false ? '' : getCookie('webtoken'),
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
    return vm.$axios.get(server.prefix + server.api.spot.spotList,
        {
            params: {...data}
        }).catch((e) => {
        let errorInfo = e.response
        console.log('submitOrder', errorInfo)
    })
};

export const spotDetail = (vm, data) => {
    vm.$axios.defaults.headers = {
        'Authorization': getCookie('webtoken') === false ? '' : getCookie('webtoken'),
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
    return vm.$axios.get(server.prefix + server.api.spot.spotDetail,
        {
            params: {...data}
        }).catch((e) => {
        let errorInfo = e.response
        console.log('specialDetailErr', errorInfo)
    })
};

/**
 * @description 提交订单
 * @param data
 * @returns {*|never}
 */
export const submitOrder = (vm, data) => {
    vm.$axios.defaults.headers = {
        'Authorization': getCookie('webtoken') === false ? '' : getCookie('webtoken'),
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
    return vm.$axios.post(server.prefix + server.api.spot.spotSubmitOrder,
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
export const  getFreightList = (vm, data) => {
    vm.$axios.defaults.headers = {
        'Authorization': getCookie('webtoken') === false ? '' : getCookie('webtoken'),
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
    return vm.$axios.get(server.prefix + server.api.spot.freightList,
        {
            params: {...data}
        }).catch((e) => {
        let errorInfo = e.response
        console.log('specialListErr', errorInfo)
    })
};