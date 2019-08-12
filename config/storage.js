import Cookies from 'js-cookie'
import { parse, stringify } from 'qs'

/**
 * 存储数据
 * @param {*} name 
 * @param {*} content 
 * @param {*} time  分
 */
export const setStore = (name, content, time=0) => {
    if (!name) return
    if (typeof content !== 'string') {
        content = stringify(content)
    }
    if(time > 0) {
        let exp = Date.now() + 1000*60*time
        content = {
            data: parse(content),
            exptime: exp
        }
        content = stringify(content)
    }
    window.localStorage.setItem(name, content)
}

/**
 * 判断是否有效
 * @param {*} name 
 */
export const hasStore = (name) => {
    if (!name) return
    let data =  window.localStorage.getItem(name)
    if (!data) {
        return false
    }
    
    let pdata = parse(data)
    if (typeof pdata !== 'string') {
        if(pdata.exptime){
            let time = pdata.exptime - Date.now()
            if(time > 0){
                return true
            } else {
                return false
            }
        }else{
            return true
        }
    } else {
        return true
    }
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
    let expdata = parse(data)
    if(expdata.exptime){
        return expdata.data
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
    if (typeof data == 'string') {
        return parse(data)
    }
    return data
}
