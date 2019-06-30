/**
 * @description 系统模块用户内容
 */
import server from './server'
import { Message } from 'iview'
import Cookies from 'js-cookie'

const getCookie = name => {
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

/**
 * @description 会员登录
 * @param vm
 * @param data
 * @returns {*}
 */
export const manageLogin = (vm, data) => {
  return vm.$axios.post(server.prefix + server.api.user.manageLogin,
    {
      ...data,
      headers: {
        'Authorization':  getCookie('webtoken') === false ? '' : getCookie('webtoken')
      }
    }).catch((e) => {
      let errorInfo = e.response
      if(errorInfo.status == '410'){
        Message.warning(errorInfo.data.message)
      }
      console.log('manageLoginErr', errorInfo)
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
      ...data
    }).catch((e) => {
      let errorInfo = e.response
      console.log('supplierLoginErr', errorInfo)
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
      ...data
    }).catch((e) => {
      let errorInfo = e.response
      console.log('manageRegErr', errorInfo)
    })
}
/**
 *
 * @description 公司审核
 * @param vm
 * @param data
 * @returns {*}
 */
export const userValid = (vm, data) => {
  return vm.$axios.get(server.prefix + server.api.user.userValid,
    {
      params: {...data}
    }).catch((e) => {
    let errorInfo = e.response
    console.log('manageRegErr', errorInfo)
  })
}
/**
 *
 * @description 会员验证
 * @param vm
 * @param data
 * @returns {*}
 */
export const memberValid = (vm, data) => {
  return vm.$axios.get(server.prefix + server.api.user.memberValid,
    {
      params: {...data}
    }).catch((e) => {
    let errorInfo = e.response
    console.log('manageRegErr', errorInfo)
  })
}

/**
 *
 * @description 供应商注册
 * @param vm
 * @param data
 * @returns {*}
 */
export const supplierReg = (vm, data) => {
  return vm.$axios.post(server.prefix + server.api.user.supplierReg,
    {
      ...data
    }).catch((e) => {
      let errorInfo = e.response
      console.log('supplierRegErr', errorInfo)
    })
}

/**
 *
 * @description 供应商验证（手机号/验证名称）
 * @param vm
 * @param data
 * @returns {*}
 */
export const supplierdataCheck = (vm, data) => {
  return vm.$axios.get(server.prefix + server.api.user.supplierdataCheck,
    {
      params: {...data}
    }).catch((e) => {
    let errorInfo = e.response
    console.log('supplierRegErr', errorInfo)
  })
}

export const supplierValid = (vm, data) => {
  return vm.$axios.get(server.prefix + server.api.user.supplierValid,
    {
      params: {...data}
    }).catch((e) => {
    let errorInfo = e.response
    console.log('supplierRegErr', errorInfo)
  })
}
/**
 * @description 验证手机是否存在
 * @param vm
 * @param data
 * @returns {*}
 */
export const userPhoneCheck = (vm, data) => {
  return vm.$axios.get(server.prefix + server.api.user.userPhoneCheck,
    {
      params: {...data}
    }).catch((e) => {
      let errorInfo = e.response
      console.log('userPhoneCheckErr', errorInfo)
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
      ...data
    }).catch((e) => {
      let errorInfo = e.response
      console.log('userCodeCheckErr', errorInfo)
    })
}

/**
 * @description 会员发送短信
 * @param vm
 * @param data
 * @returns {*}
 * @
 */
export const userCodeSend = (vm, data) => {
   return vm.$axios.post(server.prefix +  server.api.user.userCodeSend,
    {
      ...data
    }).catch((e) => {
      let errorInfo = e.response
      console.log('userCodeSendErr', errorInfo)
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
      ...data
    }).catch((e) => {
      let errorInfo = e.response
      console.log('supplierCheckErr', errorInfo)
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
      ...data
    }).catch((e) => {
      let errorInfo = e.response
      console.log('supplierCodeCheckErr', errorInfo)
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
      ...data
    }).catch((e) => {
      let errorInfo = e.response
      console.log('supplierCodeSendErr', errorInfo)
    })
}
/**
 * @description 供应商性质
 * @param vm
 * @param data
 * @returns {*}
 */
export const supplierNature = (vm, data) => {
  return vm.$axios.get(server.prefix + server.api.user.supplierNature,
    {
      params: {...data}
    }).catch((e) => {
    let errorInfo = e.response
    console.log('supplierCodeSendErr', errorInfo)
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
      ...data
    }).catch((e) => {
      let errorInfo = e.response
      console.log('userRepassWdErr', errorInfo)
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
      ...data
    }).catch((e) => {
      let errorInfo = e.response
      console.log('supplierRepssWdErr', errorInfo)
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
      ...data
    }).catch((e) => {
      let errorInfo = e.response
      console.log('manageEditErr', errorInfo)
    })
}
