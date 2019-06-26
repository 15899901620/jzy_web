/**
 * @description 系统模块用户内容
 */
import server from './server'

/**
 * @description 会员登录
 * @param vm
 * @param data
 * @returns {*}
 */
export const manageLogin = (vm, data) => {
  return vm.$axios.post(server.prefix + server.api.user.manageLogin,
    {
      params: {...data}
    })
}
/**
 * @description 供应商登录
 * @param vm
 * @param data
 * @returns {*}
 */
export const supplierLogin = (vm, data) => {
  return vm.$axios.post(server.prefix + server.api.user.supplierLogin,
    {
      params: {...data}
    })
}

/**
 * @description 会员注册
 * @param vm
 * @param data
 * @returns {*}
 */
export const manageReg = (vm, data) => {
  return vm.$axios.post(server.prefix + server.api.user.manageReg,
    {
      params: {...data}
    })
}

/**
 * @description 供应商注册
 * @param vm
 * @param data
 * @returns {*}
 */
export const supplierReg = (vm, data) => {
  return vm.$axios.post(server.prefix + server.api.user.supplierReg,
    {
      params: {...data}
    })
}

/**
 * @description 验证手机是否存在
 * @param vm
 * @param data
 * @returns {*}
 */
export const userPhoneCheck = (vm, data) => {
  return vm.$axios.post(server.prefix + server.api.user.userPhoneCheck,
    {
      params: {...data}
    })
}

/**
 * @description 会员短信验证码验证
 * @param vm
 * @param data
 * @returns {*}
 */
export const userCodeCheck = (vm, data) => {
  return vm.$axios.post(server.prefix + server.api.user.userCodeCheck,
    {
      params: {...data}
    })
}

/**
 * @description 会员发送短信
 * @param vm
 * @param data
 * @returns {*}
 * @ server.prefix + server.api.user.userCodeSend
 */
export const userCodeSend = (vm, data) => {
  return vm.$axios.post('http://192.168.40.31:10010/api/user/m/code',
    {
      params: {...data}
    })
}


/**
 * @description 供应商验证（1，供应商名称，2手机验证）
 * @param vm
 * @param data
 * @returns {*}
 */
export const supplierCheck = (vm, data) => {
  return vm.$axios.post(server.prefix + server.api.user.supplierCheck,
    {
      params: {...data}
    })
}

/**
 * @description 供应商短信验证码验证
 * @param vm
 * @param data
 * @returns {*}
 */
export const supplierCodeCheck = (vm, data) => {
  return vm.$axios.post(server.prefix + server.api.user.supplierCodeCheck,
    {
      params: {...data}
    })
}

/**
 * @description 供应商发送短信
 * @param vm
 * @param data
 * @returns {*}
 */
export const supplierCodeSend = (vm, data) => {
  return vm.$axios.post(server.prefix + server.api.user.supplierCodeSend,
    {
      params: {...data}
    })
}

/**
 * @description 会员找回密码
 * @param vm
 * @param data
 * @returns {*}
 */
export const userRepassWd = (vm, data) => {
  return vm.$axios.post(server.prefix + server.api.user.userRepassWd,
    {
      params: {...data}
    })
}

/**
 * @description 供应商找回密码
 * @param vm
 * @param data
 * @returns {*}
 */
export const supplierRepssWd = (vm, data) => {
  return vm.$axios.post(server.prefix + server.api.user.supplierRepssWd,
    {
      params: {...data}
    })
}

/**
 * @description 会员信息编辑
 * @param vm
 * @param data
 * @returns {*}
 */
export const manageEdit = (vm, data) => {
  return vm.$axios.post(server.prefix + server.api.user.manageEdit,
    {
      params: {...data}
    })
}
