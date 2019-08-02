/**
 * @description 系统模块用户内容
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
 * @description 我的求购信息
 * @param vm
 * @param data
 * @returns {*}
 */
export const getbuylist = (vm, data) => {
  vm.$axios.defaults.headers = {
    'Authorization': getCookie('webtoken') === false ? '' : getCookie('webtoken')
  }
  return vm.$axios.get(server.prefix + server.api.buy.buylist,
    {
      params: {...data}
    }).catch((e) => {
    let errorInfo = e.response
    console.log('manageEditErr', errorInfo)
  })
}


/**
 * @description 客户通过竞拍计划单下单
 * @param vm
 * @param data
 * @returns {*}
 */
export const addbuyinfo = (vm, data) => {
  vm.$axios.defaults.headers = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    'Authorization': getCookie('webtoken') === false ? '' : getCookie('webtoken')
  }
  return vm.$axios.post(server.prefix + server.api.buy.addbuy,
    {
      ...data
    }).catch((e) => {
    let errorInfo = e.response
    console.log('manageEditErr', errorInfo)
  })
}