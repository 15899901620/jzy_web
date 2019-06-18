/**
 * @description 系统模块广告内容
 */
import axios from '@/libs/api.request'
import server from './server'

/**
 * @description 获取所有广告位置
 * @param data
 * @returns {*|never}
 */
export const adsite = () => {
  return axios.request({
    url: server.api.sysconf.adsite,
    method: 'get'
  })
}

/**
 * @description 广告列表
 * @param data
 * @returns {*|never}
 */
export const adlist = (data) => {
  return axios.request({
    url: server.api.sysconf.ad,
    params: {
      ...data
    },
    method: 'get'
  })
}

/**
 * @description 添加广告
 * @param data
 * @returns {*|never}
 */
export const adadd = data => {
  return axios.request({
    url: server.api.sysconf.adadd,
    method: 'post',
    params: {
      ...data
    }
  })
}

/**
 * @description 编辑广告
 * @param data
 * @returns {*|never}
 */
export const adedit = data => {
  return axios.request({
    url: server.api.sysconf.adedit,
    method: 'post',
    params: {
      ...data
    }
  })
}

/**
 * @description 删除广告
 * @param data
 * @returns {*|never}
 */
export const addel = data => {
  return axios.request({
    url: server.api.sysconf.addel,
    method: 'post',
    params: {
      ...data
    }
  })
}

/**
 * @description 更新广告状态
 * @param data
 * @returns {*|never}
 */
export const adup = data => {
  return axios.request({
    url: server.api.sysconf.adup,
    method: 'post',
    params: {
      ...data
    }
  })
}
