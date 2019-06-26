import qs from 'qs';

export default function (app) {
  const axios = app.$axios
  axios.defaults.timeout = 100000
  axios.defaults.method = 'get'
  axios.defaults.method = 'post'
  axios.defaults.headers = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  }
  // 请求回调
  axios.onRequest(config => {
    config.data = qs.stringify(config.data, {
      allowDots: true //Option allowDots can be used to enable dot notation
    });
    return config;
  })
  // 返回回调
  axios.onResponse(res => {
    const {data, status} = res
    return {data, status}
  })
  // 错误回调
  axios.onError(error => {
    return Promise.reject(error);
  })
}
