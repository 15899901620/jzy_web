/**
 * @description 系统模块友情链接内容
 */
import axios from '@/libs/api.request'
import server from './server'

/**
 * @description 友情链接列表
 * @param data
 * @returns {*|never}
 */
export const linkslist = (data) => {
  return axios.request({
    url: server.api.sysconf.links,
    params: {
      ...data
    },
    method: 'get'
  })
}

/**
 * @description 添加友情链接
 * @param data
 * @returns {*|never}
 */
export const linksadd = data => {
  return axios.request({
    url: server.api.sysconf.linksadd,
    method: 'post',
    params: {
      ...data
    }
  })
}

/**
 * @description 编辑友情链接
 * @param data
 * @returns {*|never}
 */
export const linksedit = data => {
  return axios.request({
    url: server.api.sysconf.linksedit,
    method: 'post',
    params: {
      ...data
    }
  })
}

/**
 * @description 删除友情链接
 * @param data
 * @returns {*|never}
 */
export const linksdel = data => {
  return axios.request({
    url: server.api.sysconf.linksdel,
    method: 'post',
    params: {
      ...data
    }
  })
}
