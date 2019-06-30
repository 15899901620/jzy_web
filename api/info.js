/**
 * @description 系统模块资讯内容
 */
import server from './server'

/**
 * @description 资讯列表
 * @param vm => this
 * @param data
 * @returns {*|never}
 */
export const infolist = (vm, data) => {
  return vm.$axios.get(server.prefix + server.api.information.info,
    {
      params: {...data}
    }).catch((e) => {
      let errorInfo = e.response
      console.log('infolistErr', errorInfo)
    })
};

/**
 * @description 资讯详情
 * @param vm
 * @param data
 * @returns {*}
 */
export const infodetail = (vm, data) => {
  return vm.$axios.get(server.prefix + server.api.information.infodetail,
    {
      params: {...data}
    }).catch((e) => {
      let errorInfo = e.response
      console.log('infodetailErr', errorInfo)
    })
};

/**
 * @description 资讯详情点击量（访问量）
 * @param vm
 * @param data
 * @returns {*}
 */
export const infoClick = (vm, data) => {
  return vm.$axios.post(server.prefix + server.api.information.infoClick,
    {
      ...data
    }).catch((e) => {
      let errorInfo = e.response
      console.log('infoClickErr', errorInfo)
    })
};

/**
 * @description 资讯分类树
 * @param vm
 * @param data
 * @returns {*}
 */
export const infocate = (vm, data) => {
  return vm.$axios.get(server.prefix + server.api.information.infocate,
    {
      params: {...data}
    }).catch((e) => {
      let errorInfo = e.response
      console.log('infocateErr', errorInfo)
    })
};

/**
 * @description 网站公告列表 （可以用于首页）
 * @param data
 * @returns {*|never}
 */
export const announcement = (vm, data) => {
  return vm.$axios.get(server.prefix + server.api.information.announcement,
    {
      params: {...data}
    }).catch((e) => {
      let errorInfo = e.response
      // console.log('announcementErr', errorInfo)
    })
}

/**
 * @description 公告详情
 * @param vm
 * @param data
 * @returns {*}
 */
export const announcementdetail = (vm, data) => {
  return vm.$axios.get(server.prefix + server.api.information.announcementdetail,
    {
      params: {...data}
    }).catch((e) => {
      let errorInfo = e.response
      console.log('announcementdetailErr', errorInfo)
    })
}




