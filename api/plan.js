/**
 * @description 系统模块文件类型内容
 */
import axios from '@/libs/api.request'
import server from './server'

/**
 * @description 文件类型列表
 * @param data
 * @returns {*|never}
 */
export const planlist = (data) => {
  return axios.request({
    url: server.api.sysconf.plan,
    params: {
      ...data
    },
    method: 'get'
  })
}

/**
 * @description 编辑文件类型
 * @param data
 * @returns {*|never}
 */
export const planedit = data => {
  return axios.request({
    url: server.api.sysconf.planedit,
    method: 'post',
    params: {
      ...data
    }
  })
}

/**
 * 系列管理列表
 * @param data
 * @returns {*|never}
 */
export const codedlist = (data) => {
  return axios.request({
    url: server.api.sysconf.coded,
    params: {
      ...data
    },
    method: 'get'
  })
}

/**
 * 系列管理编辑
 * @param data
 * @returns {*|never}
 */
export const codededit = data => {
  return axios.request({
    url: server.api.sysconf.codededit,
    method: 'post',
    params: {
      ...data
    }
  })
}
