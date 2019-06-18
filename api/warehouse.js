/**
 * @description 系统模块仓库内容
 */
import axios from '@/libs/api.request'
import server from './server'

/**
 * @description 仓库列表
 * @param data
 * @returns {*|never}
 */
export const warehouselist = (data) => {
  return axios.request({
    url: server.api.sysconf.warehouse,
    params: {
      ...data
    },
    method: 'get'
  })
}
