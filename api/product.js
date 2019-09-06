/**
 * @description 系统模块导航内容
 */
import server from '../config/api'

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


export const manageReg = (vm, data) => {
  return vm.$axios.post(server.prefix + server.api.user.manageReg,
    {
      ...data
    }).catch((e) => {
      let errorInfo = e.response
      console.log('manageRegErr', errorInfo)
    })
}