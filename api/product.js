/**
 * @description 系统模块导航内容
 */
import server from '../config/api'

import Cookies from 'js-cookie'
import { stringify } from 'qs'
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
 * @description 获取产品列表
 * @param vm
 * @param data
 * @returns {*}
 */
export const getproductlist = (vm, data) => {
  return vm.$axios.get(server.prefix + server.api.product.productlist,
    {
      params: {...data}
    })
}


export const gooddemandadd = (vm, data) => {
  vm.$axios.defaults.headers = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    'Authorization': getCookie('webtoken') === false ? '' : getCookie('webtoken')
  }
  return vm.$axios.post(server.prefix + server.api.product.demandadd,
    {
      ...data
    }).catch((e) => {
      let errorInfo = e.response
      console.log('manageRegErr', errorInfo)
    })
}