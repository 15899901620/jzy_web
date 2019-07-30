/**
 * @description 系统模块资金内容
 */
import server from './server'
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
 * @description 资金信息
 * @param vm
 * @param data
 * @returns {*}
 */
export const capitalinfo = (vm, data) => {
  vm.$axios.defaults.headers = {
    'Authorization': getCookie('webtoken') === false ? '' : getCookie('webtoken')
  }
  return vm.$axios.get(server.prefix + server.api.capital.capitalinfo,
    {
      params: {...data}
    })
}

/**
 * @description 资金详情
 * @param vm
 * @param data
 * @returns {*}
 */
export const capitaldetail = (vm, data) => {
  return vm.$axios.get(server.prefix + server.api.capital.capitaldetail,
    {
      params: {...data}
    })
}
