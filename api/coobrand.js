/**
 * @description 系统模块合作品牌内容
 */
import server from './server'

/**
 * @description 合作品牌列表
 * @param vm => this
 * @param data
 * @returns {*|never}
 */
export const cooperativeBrand = (vm, data) => {
  return vm.$axios.get(server.prefix + server.api.sysconf.cooperativeBrand,
    {
      params: {...data}
    })
};
