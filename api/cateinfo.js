/**
 * @description 系统模块资讯分类内容
 */
import axios from '@/libs/api.request'
import server from './server'

/**
 * @description 所有资讯分类
 * @param data
 * @returns {*|never}
 */
export const cateall = (data) => {
  return axios.request({
    url: server.api.information.cateall,
    params: {
      ...data
    },
    method: 'get'
  })
}

/**
 * @description 资讯分类列表
 * @param data
 * @returns {*|never}
 */
export const catelist = (data) => {
  return axios.request({
    url: server.api.information.cate,
    params: {
      ...data
    },
    method: 'get'
  })
}

/**
 * @description 添加资讯分类
 * @param data
 * @returns {*|never}
 */
export const cateadd = data => {
  return axios.request({
    url: server.api.information.cateadd,
    method: 'post',
    params: {
      ...data
    }
  })
}

/**
 * @description 编辑资讯分类
 * @param data
 * @returns {*|never}
 */
export const cateedit = data => {
  return axios.request({
    url: server.api.information.cateedit,
    method: 'post',
    params: {
      ...data
    }
  })
}

/**
 * @description 删除资讯分类
 * @param data
 * @returns {*|never}
 */
export const catedel = data => {
  return axios.request({
    url: server.api.information.catedel,
    method: 'post',
    params: {
      ...data
    }
  })
}
