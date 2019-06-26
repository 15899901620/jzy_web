/**
 * @description 系统模块导航内容
 */
import server from './server'

/**
 * @description 广告列表
 * @param vm
 * @param data {}
 * @returns {*}
 */
export const adposition = (vm, data) => {
  return vm.$axios.get(server.prefix + server.api.ad.adposition,
    {
      params: {...data}
    })
}
