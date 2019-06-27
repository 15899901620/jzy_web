/**
 * @description 系统模块内容
 */
import server from './server'
/**
 * @description 友情链接
 * @param vm
 * @param data
 * @returns {*}
 */
export const friendlink = (vm, data) => {
  return vm.$axios.get(server.prefix + server.api.sysconf.friendlink,
    {
        params: {...data}
    }).catch((e) => {
        let errorInfo = e.response
        console.log('manageLoginErr', errorInfo)
    })
}