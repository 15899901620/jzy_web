/**
 * @description 系统模块导航内容
 */
import server from './server'

/**
 * @description 导航列表
 * @param vm
 * @param data
 * @returns {*}
 */
export const navlist = (vm, data) => {
  return vm.$axios.get(server.prefix + server.api.navigation.navlist,
    {
      params: {...data}
    })
}
/**
 * @description 导航单条明细
 * @param vm
 * @param data
 * @returns {*}
 */
export const navdetail = (vm, data) => {
  return vm.$axios.get(server.prefix + server.api.navigation.navdetail,
    {
      params: {...data}
    })
}
