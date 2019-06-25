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
      params: {...data}
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
    })
};

/**
 * @description 网站首页公告
 * @param data
 * @returns {*|never}
 */
export const announcement = (data) => {
  return vm.$axios.get(server.prefix + server.api.information.announcement,
    {
      params: {...data}
    })
}



