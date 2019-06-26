/**
 * @description 系统模块导航内容
 */
import server from './server'

/**
 * @description 帮助中心列表
 * @param vm
 * @param data
 * @returns {*}
 */
export const helpPage = (vm, data) => {
  return vm.$axios.get(server.prefix + server.api.helper.helpPage,
    {
      params: {...data}
    })
}

/**
 * @description 帮助中心分类树
 * @param vm
 * @param data
 * @returns {*}
 */
export const helpCatTree = (vm, data) => {
  return vm.$axios.get(server.prefix + server.api.helper.helpCatTree,
    {
      params: {...data}
    })
}
