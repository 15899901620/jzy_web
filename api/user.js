import axios from '../libs/axios';
import server from './server'

/**
 * @description 短信验证码
 * @param data
 * @returns {*|never}
 */
export const sendsms = (data) => {
  console.log(data)
  return axios({
    url: server.prefix + server.api.user.sendsms,
    method: 'post',
    data
  })
}


