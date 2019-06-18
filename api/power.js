/**
 * @description 系统模块权限内容
 */
import axios from '@/libs/api.request'
import server from './server'

/**
 * @description 获取所有权限
 * @param data
 * @returns {*|never}
 */
export const powerall = () => {
  return axios.request({
    url: server.api.sysconf.powerall,
    method: 'get'
  })
}

/**
 * @description 权限列表
 * @param data
 * @returns {*|never}
 */
export const powerlist = (data) => {
  return axios.request({
    url: server.api.sysconf.power,
    params: {
      ...data
    },
    method: 'get'
  })
}

/**
 * @description 添加权限
 * @param data
 * @returns {*|never}
 */
export const poweradd = data => {
  return axios.request({
    url: server.api.sysconf.poweradd,
    method: 'post',
    params: {
      ...data
    }
  })
}

/**
 * @description 编辑权限
 * @param data
 * @returns {*|never}
 */
export const poweredit = data => {
  return axios.request({
    url: server.api.sysconf.poweredit,
    method: 'post',
    params: {
      ...data
    }
  })
}

/**
 * @description 删除权限
 * @param data
 * @returns {*|never}
 */
export const powerdel = data => {
  return axios.request({
    url: server.api.sysconf.powerdel,
    method: 'post',
    params: {
      ...data
    }
  })
}
