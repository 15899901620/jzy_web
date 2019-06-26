/**
 * @description 系统模块资讯内容
 */
import server from './server'

/**
 * @description 物性表列表
 * @param vm => this
 * @param data
 * @returns {*|never}
 */
export const productlist = (vm, data) => {
  return vm.$axios.get(server.prefix + server.api.product.productlist,
    {
      params: {...data}
    })
}

/**
 * @description 物性表详情
 * @param vm
 * @param data
 * @returns {*}
 */
export const productdetail = (vm, data) => {
  return vm.$axios.get(server.prefix + server.api.product.productdetail,
    {
      params: {...data}
    })
}
