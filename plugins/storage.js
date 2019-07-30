import Cookies from 'js-cookie'

/**
 * 存储localStorage
 */
const setStore = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)
}

/**
 * 获取localStorage
 */
const getStore = name => {
  if (!name) return
  return window.localStorage.getItem(name)
}

/**
 * 删除localStorage
 */
const removeStore = name => {
  if (!name) return
  window.localStorage.removeItem(name)
}

/**
 * 设置cookies
 * @param name
 * @param content
 * @param time
 */
const setCookie = (name, content, time) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  Cookies.set(name, content, time)
}

/**
 * 读取cookies
 * @param name
 * @returns {*}
 */
const getCookie = (name) => {
  if (!name) return
  let data = Cookies.get(name)
  if (!data) {
    return false
  }
  if (typeof data !== 'string') {
    return JSON.parse(data)
  }
  return data
}


export default {
  setStore,
  getStore,
  removeStore,
  setCookie,
  getCookie
}