import Cookies from 'js-cookie'
import { parse, stringify } from 'qs'
export const setStore = (name, content) => {
    if (!name) return
      if (typeof content !== 'string') {
        content = stringify(content)
      }
      window.localStorage.setItem(name, content)
  }
  
  /**
   * 获取localStorage
   */
  export const getStore = (name) => {
    if (!name) return
    let data =  window.localStorage.getItem(name)
    if (!data) {
      return false
    }
    if (typeof data !== 'string') {
      return parse(data)
    }
    return data
  }
  
  /**
   * 删除localStorage
   */
  export const removeStore = name => {
    if (!name) return
    window.localStorage.removeItem(name)
  }
  

  /**
 * 设置cookies
 * @param name
 * @param content
 * @param time
 */
export const setCookies = (name, content, time) => {
    if (!name) return
    if (typeof content !== 'string') {
      content = stringify(content)
    }
    Cookies.set(name, content, time)
  }
  
  /**
   * 读取cookies
   * @param name
   * @returns {*}
   */
  export const getCookies = (name) => {
    if (!name) return
    let data = Cookies.get(name)
    if (!data) {
      return false
    }
    // console.log('10000', typeof data)
    // console.log('tag', typeof data !== 'string')
    if (typeof data == 'string') {
      return parse(data)
    }
    return data
  }
  