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
