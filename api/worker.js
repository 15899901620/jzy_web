/**
 * @description 系统模块账号内容
 */
import axios from '@/libs/api.request'
import server from './server'

/**
 * @description 账号列表
 * @param data
 * @returns {*|never}
 */
export const workerlist = (data) => {
  return axios.request({
    url: server.api.sysconf.worker,
    params: {
      ...data
    },
    method: 'get'
  })
}

/**
 * @description 添加账号
 * @param data
 * @returns {*|never}
 */
export const workeradd = data => {
  return axios.request({
    url: server.api.sysconf.workeradd,
    method: 'post',
    params: {
      ...data
    }
  })
}

/**
 * @description 编辑账号
 * @param data
 * @returns {*|never}
 */
export const workeredit = data => {
  return axios.request({
    url: server.api.sysconf.workeredit,
    method: 'put',
    params: {
      ...data
    }
  })
}

/**
 * @description 删除账号
 * @param data
 * @returns {*|never}
 */
export const workerdel = data => {
  return axios.request({
    url: server.api.sysconf.workerdel,
    method: 'post',
    params: {
      ...data
    }
  })
}

/**
 * @description 账号状态更新
 * @param data
 * @returns {*|never}
 */
export const workerup = data => {
  return axios.request({
    url: server.api.sysconf.workerup,
    method: 'post',
    params: {
      ...data
    }
  })
}
