/**
 * @description 系统模块资讯内容
 */
import server from './server'
import axios from '../libs/axios';

/**
 * @description 资讯列表
 * @param data
 * @returns {*|never}
 */
export const infolist = (data) => {
  console.log(data)
  return axios({
    url: server.prefix + server.api.information.info,
    method: 'get',
    data
  })
}


/**
 * @description 资讯详情
 * @param data
 * @returns {*|never}
 */
export const infoDetail = (data) => {
  console.log(data)
  return axios({
    url: server.prefix + server.api.information.infoDetail,
    method: 'get',
    data
  })
}


/**
 * @description 网站公告
 * @param data
 * @returns {*|never}
 */
export const announcement = (data) => {
  console.log('网站公告data', data)
  return axios({
    url: server.prefix + server.api.information.announcement,
    method: 'get',
    data
  })
}

/**
 * @description 合作品牌
 * @param data
 * @returns {*|never}
 */
export const cooperativeBrand	 = (data) => {
  console.log('合作品牌data', data)
  return axios({
    url: server.prefix + server.api.information.cooperativeBrand,
    method: 'get',
    data
  })
}



