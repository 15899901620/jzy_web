/**
 * @description 系统模块资金内容
 */
import server from './server'

/**
 * @description 资金信息
 * @param vm
 * @param data
 * @returns {*}
 */
export const capitalinfo = (vm, data) => {
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
