/**
 * @description 系统模块配置内容
 */
import axios from '@/libs/api.request'
import server from './server'

/**
 * @description 系统配置
 * @param data
 * @returns {*|never}
 */
export const system = (data) => {
  return axios.request({
    url: server.api.sysconf.system,
    params: {
      ...data
    },
    method: 'get'
  })
}

/**
 * @description 更新保存
 * @param data
 * @returns {*|never}
 */
export const systemedit = data => {
  return axios.request({
    url: server.api.sysconf.systemedit,
    method: 'post',
    params: {
      ...data
    }
  })
}
