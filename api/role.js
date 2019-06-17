/**
 * @description 系统模块账号内容
 */
import axios from '@/libs/api.request'
import server from './server'

/**
 * @description 获取所有角色
 * @param data
 * @returns {*|never}
 */
export const roleall = () => {
  return axios.request({
    url: server.api.sysconf.roleall,
    method: 'get'
  })
}

/**
 * @description 角色列表
 * @param data
 * @returns {*|never}
 */
export const rolelist = (data) => {
  return axios.request({
    url: server.api.sysconf.role,
    params: {
      ...data
    },
    method: 'get'
  })
}

/**
 * @description 添加角色
 * @param data
 * @returns {*|never}
 */
export const roleadd = data => {
  return axios.request({
    url: server.api.sysconf.roleadd,
    method: 'post',
    params: {
      ...data
    }
  })
}

/**
 * @description 编辑角色
 * @param data
 * @returns {*|never}
 */
export const roleedit = data => {
  return axios.request({
    url: server.api.sysconf.roleedit,
    method: 'post',
    params: {
      ...data
    }
  })
}

/**
 * @description 删除角色
 * @param data
 * @returns {*|never}
 */
export const roledel = data => {
  return axios.request({
    url: server.api.sysconf.roledel,
    method: 'post',
    params: {
      ...data
    }
  })
}
