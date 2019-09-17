
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
 * @description 订单列表 无分页
 * @param data
 * @returns {*|never}
 */
export const orderlist = (vm, data) => {
    vm.$axios.defaults.headers = {
        'Authorization': getCookie('webtoken') === false ? '' : getCookie('webtoken'),
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
    return vm.$axios.get(server.prefix + server.api.order.orderlist,
    {
        params: {...data}
    }).catch((e) => {
        let errorInfo = e.response
        console.log('specialListErr', errorInfo)
    })
};


/**
 * @description 订单列表 分页
 * @param data
 * @returns {*|never}
 */
export const orderpage = (vm, data) => {
    vm.$axios.defaults.headers = {
        'Authorization': getCookie('webtoken') === false ? '' : getCookie('webtoken'),
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
    return vm.$axios.get(server.prefix + server.api.order.orderpage,
    {
        params: {...data}
    }).catch((e) => {
        let errorInfo = e.response
        console.log('specialListErr', errorInfo)
    })
};

/**
 * @description 订单列表 分页
 * @param data
 * @returns {*|never}
 */
export const orderCount = (vm, data) => {
    vm.$axios.defaults.headers = {
        'Authorization': getCookie('webtoken') === false ? '' : getCookie('webtoken'),
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
    return vm.$axios.get(server.prefix + server.api.order.orderCount,
        {
            params: {...data}
        }).catch((e) => {
        let errorInfo = e.response
        console.log('orderCount', errorInfo)
    })
};


export const getorderDetail = (vm, data) => {
    vm.$axios.defaults.headers = {
        'Authorization': getCookie('webtoken') === false ? '' : getCookie('webtoken'),
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
    return vm.$axios.get(server.prefix + server.api.order.orderDetail,
    {
        params: {...data}
    }).catch((e) => {
        let errorInfo = e.response
        console.log('specialListErr', errorInfo)
    })
};