/**
 * @description 系统模块标签内容
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
 * @description 会员标签
 * @param {*} data
 */
export const userlabel = (vm, data) => {
  return vm.$axios.get(server.prefix + server.api.user.userlabel,
    {
        params: {...data}
      
    }).catch((e) => {
      console.log(data)
      let errorInfo = e.response
    })
}

