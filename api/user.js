import axios from '@/libs/api.request'
import server from './server'

/**
 * @description 登录会员
 * @param userName
 * @param password
 * @returns {*|never}
 */
export const login = ({ userName, password }) => {
  const data = {
    username: userName,
    password: password
  }
  return axios.request({
    url: server.api.login,
    params: {
      ...data
    },
    method: 'post'
  })
}

/**
 * @description 获取用户信息
 * @param token
 * @returns {*|never}
 */
export const getUserInfo = (token) => {
  return axios.request({
    url: server.api.getUserinfo,
    params: {
      token
    },
    method: 'get'
  })
}

/**
 * @description 校验用户是否存在
 * @param token
 * @returns {*|never}
 */
export const checkUser = (token) => {
  return axios.request({
    url: server.api.isCheckUser,
    method: 'post'
  })
}

/**
 * @description 获取信息数
 * @returns {*|never}
 */
export const getUnreadCount = () => {
  return axios.request({
    url: 'message/count',
    method: 'get'
  })
}

export const getMessage = () => {
  return axios.request({
    url: 'message/init',
    method: 'get'
  })
}

export const getContentByMsgId = msg_id => {
  return axios.request({
    url: 'message/content',
    method: 'get',
    params: {
      msg_id
    }
  })
}

export const hasRead = msg_id => {
  return axios.request({
    url: 'message/has_read',
    method: 'post',
    data: {
      msg_id
    }
  })
}

export const removeReaded = msg_id => {
  return axios.request({
    url: 'message/remove_readed',
    method: 'post',
    data: {
      msg_id
    }
  })
}

export const restoreTrash = msg_id => {
  return axios.request({
    url: 'message/restore',
    method: 'post',
    data: {
      msg_id
    }
  })
}
