/**
 * @description 系统模块商品内容
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

/**
 * @description 质检单查询
 * @param vm
 * @param data
 * @returns {*}
 */
export const inspectionCheck = (vm, data) => {
  return vm.$axios.get(server.prefix + server.api.product.inspectionCheck,
    {
      params: {...data}
    })
}

/**
 * @description 热门商品
 * @param vm
 * @param data
 * @returns {*}
 */
export const goodsHot = (vm, data) => {
  return vm.$axios.get(server.prefix + server.api.product.goodsHot,
    {
      params: {...data}
    })
}

/**
 * @description 热门分类
 * @param vm
 * @param data
 * @returns {*}
 */
export const cateHot = (vm, data) => {
  return vm.$axios.get(server.prefix + server.api.product.cateHot,
    {
      params: {...data}
    })
}

/**
 * @description 规格查询（输入值1）
 * @param vm
 * @param data
 * @returns {*}
 */
export const attrlist = (vm, data) => {
  return vm.$axios.get(server.prefix + server.api.product.attrlist,
    {
      params: {...data}
    })
}
