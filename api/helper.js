/**
 * @description 系统模块导航内容
 */
import server from '../config/api'

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

/**
 * @description 根据ID获取帮助中心详情内容
 * @param {*} vm 
 * @param {*} data 
 * @returns {*}
 */
export const helpdetail = (vm, data) => {
  return vm.$axios.get(server.prefix + server.api.helper.helpdetail,
    {
      params: {...data}
    })
}


/**
 * @description 热门搜索显示
 * @param {*} vm 
 * @param {*} data 
 */
export const gethotsearch = (vm, data) => {
    return vm.$axios.get(server.prefix + server.api.search.hotsearch).catch((e) => {
      let errorInfo = e.response
      console.log('manageEditErr', errorInfo)
    })
  }



/**
 * @description 获取国家列表
 * @param data
 * @returns {*|never}
 */
export const countryList = (vm, data) => {
    return vm.$axios.get(server.prefix + server.api.Address.countryList,{params: {...data}}).catch((e) => {
        let errorInfo = e.response
        console.log('manageEditErr', errorInfo)
    })
}
  
/**
 * @description 获取省列表
 * @param data
 * @returns {*|never}
 */
export const countryRegion = (vm, data) => {
    return vm.$axios.get(server.prefix + server.api.Address.countryRegion,{params: {...data}}).catch((e) => {
        let errorInfo = e.response
        console.log('manageEditErr', errorInfo)
    })
}
  
  
/**
 * @description 获取父及ID获取子集内容
 * @param data
 * @returns {*|never}
 */
export const getRegion = (vm, data) => {
    return vm.$axios.get(server.prefix + server.api.Address.getregion,{params: {...data}}).catch((e) => {
        let errorInfo = e.response
        console.log('manageEditErr', errorInfo)
    })
}