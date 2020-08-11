/**
 * @description 系统模块用户内容
 */
import server from '../config/api'

import Cookies from 'js-cookie'
import { stringify } from 'qs'
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
  vm.$axios.defaults.headers = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
  }
  return vm.$axios.post(server.prefix + server.api.user.manageLogin,
    {
        ...data
    }).catch((e) => {
      let errorInfo = e.response
      console.log('manageLoginErr', errorInfo)
    })
}

/**
 * @description 承运注册
 * @param vm
 * @param data
 * @returns {*}
 */
export const carrierRegister = (vm, data) => {
  return vm.$axios.post(server.prefix + server.api.user.carrierreg,
    {
      ...data
    }).catch((e) => {
      let errorInfo = e.response
      console.log('supplierLoginErr', errorInfo)
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


export const carrierCodes = (vm, data) => {
    return vm.$axios.post(server.prefix + server.api.user.carriercode,
        {
            ...data
        }).catch((e) => {
        let errorInfo = e.response
        console.log('manageRegErr', errorInfo)
    })
}

export const userLoginCodeSend = (vm, data) => {
    return vm.$axios.post(server.prefix + server.api.user.userLoginCodeSend,
        {
            ...data
        }).catch((e) => {
        let errorInfo = e.response
        console.log('manageRegErr', errorInfo)
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
  vm.$axios.defaults.headers = {
    'Authorization': getCookie('webtoken') === false ? '' : getCookie('webtoken')
  }
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
 * @description 获取会员信息
 * @param {*} vm
 * @param {*} data
 */
export const getGainuserInfor = (vm, data) => {
  vm.$axios.defaults.headers = {
    'Authorization': getCookie('webtoken') === false ? '' : getCookie('webtoken')
  }
  return vm.$axios.get(server.prefix + server.api.user.gainuserInfor,
    {
        params: {...data}
    }).catch((e) => {
    let errorInfo = e.response
    console.log('supplierRegErr', errorInfo)
  })
}
/**
 * @description 根据id获取会员信息
 * @param {*} vm
 * @param {*} data
 */
export const getuserInforId = (vm, data) => {
  vm.$axios.defaults.headers = {
    'Authorization': getCookie('webtoken') === false ? '' : getCookie('webtoken')
  }
  return vm.$axios.get(server.prefix + server.api.user.getuserInforId,
    {
        params: {...data}
    }).catch((e) => {
    let errorInfo = e.response
    console.log('supplierRegErr', errorInfo)
  })
}


/**
 * @description 上传头像
 * @param {*} vm
 * @param {*} data
 */
export const editAvatar = (vm, data) => {
  vm.$axios.defaults.headers = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    'Authorization': getCookie('webtoken') === false ? '' : getCookie('webtoken')
  }
  return vm.$axios.put(server.prefix + server.api.user.editAvatar,
    {
      ...data
    }).catch((e) => {
      let errorInfo = e.response
      console.log('editAvatar', errorInfo)
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

  vm.$axios.defaults.headers = {
    'Authorization': getCookie('websuppliertoken') === false ? '' : getCookie('websuppliertoken')
  }
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
    }
    ).catch((e) => {
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
 * @description 供应商注册发送短信
 * @param vm
 * @param data
 * @returns {*}
 */
export const supplierRegCode = (vm, data) => {
    return vm.$axios.post(server.prefix + server.api.user.supplierRegCode,
        {
            ...data
        }).catch((e) => {
        let errorInfo = e.response
        console.log('supplierRegCodeSendErr', errorInfo)
    })
}
/**
 * @description 承运商注册发送短信
 * @param vm
 * @param data
 * @returns {*}
 */
export const carrierRegcode = (vm, data) => {
    return vm.$axios.post(server.prefix + server.api.user.carrierRegcode,
        {
            ...data
        }).catch((e) => {
        let errorInfo = e.response
        console.log('supplierRegCodeSendErr', errorInfo)
    })
}
/**
 * @description 供应商登录发送短信
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
 * @description 供应商重置密码发送短信
 * @param vm
 * @param data
 * @returns {*}
 */
export const supplierReCodeSend = (vm, data) => {
  vm.$axios.defaults.headers = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
  }
  return vm.$axios.post(server.prefix + server.api.user.supplierRECodeSend,
    {
      ...data
    }).catch((e) => {
    let errorInfo = e.response
    console.log('supplierCodeSendErr', errorInfo)
  })
}

/**
 * @description 供应商信息
 * @param vm
 * @param data
 * @returns {*}
 */
export const supplierInfor = (vm, data) => {
  vm.$axios.defaults.headers = {
    'Authorization': getCookie('websuppliertoken') === false ? '' : getCookie('websuppliertoken')
  }
  return vm.$axios.put(server.prefix + server.api.user.supplierInfor,
    {
      ...data
    }).catch((e) => {
    let errorInfo = e.response
    console.log('supplierCodeSendErr', errorInfo)
  })
}

/**
 * @description 修改供应商信息
 * @param vm
 * @param data
 * @returns {*}
 */
export const supplierEdit = (vm, data) => {
  vm.$axios.defaults.headers = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    'Authorization': getCookie('websuppliertoken') === false ? '' : getCookie('websuppliertoken')
  }
  return vm.$axios.put(server.prefix + server.api.user.supplierEdit,
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
 * @description 会员找回密码短信验证码
 * @param vm
 * @param data
 * @returns {*}
 */
export const userSeekPassword = (vm, data) => {
  return vm.$axios.post(server.prefix + server.api.user.userRECodeSend,
    {
      ...data
    }).catch((e) => {
    let errorInfo = e.response
    console.log('userRepassWdErr', errorInfo)
  })
}
/**
 * @description 会员修改手机号短信验证码
 * @param vm
 * @param data
 * @returns {*}
 */
export const userEditPhoneSend = (vm, data) => {
  vm.$axios.defaults.headers = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    'Authorization': getCookie('webtoken') === false ? '' : getCookie('webtoken')
  }
  return vm.$axios.post(server.prefix + server.api.user.userEditPhoneSend,
    {
      ...data
    }).catch((e) => {
    let errorInfo = e.response
    console.log('userRepassWdErr', errorInfo)
  })
}

/**
 * @description 会员找回密码
 * @param vm
 * @param data
 * @returns {*}
 */
export const userRepassWd = (vm, data) => {
  return vm.$axios.get(server.prefix + server.api.user.userRepassWd,
    {
      params: {...data}
    }).catch((e) => {
      let errorInfo = e.response
      console.log('userRepassWdErr', errorInfo)
    })
}

/**
 * @description 会员换绑手机号
 * @param vm
 * @param data
 * @returns {*}
 */
export const userRephone = (vm, data) => {
  vm.$axios.defaults.headers = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    'Authorization': getCookie('webtoken') === false ? '' : getCookie('webtoken')
  }
  return vm.$axios.put(server.prefix + server.api.user.userRephone,
    {
      ...data
    }).catch((e) => {
      let errorInfo = e.response
      console.log('userRephoneErr', errorInfo)
    })
}
/**
 * @description 会员找回密码短信验证码
 * @param vm
 * @param data
 * @returns {*}
 */
export const userRECodeSend = (vm, data) => {
  return vm.$axios.post(server.prefix + server.api.user.userRECodeSend,
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
  return vm.$axios.get(server.prefix + server.api.user.supplierRepssWd,
    {
      params: {...data}
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
  vm.$axios.defaults.headers = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    'Authorization': getCookie('webtoken') === false ? '' : getCookie('webtoken')
  }
  return vm.$axios.put(server.prefix + server.api.user.manageEdit,
    {
      ...data
    }).catch((e) => {
      let errorInfo = e.response
      console.log('manageEditErr', errorInfo)
    })
}

/**
 * @description 添加会员地址
 * @param vm
 * @param data
 * @returns {*}
 */
export const addressAdd = (vm, data) => {
  vm.$axios.defaults.headers = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    'Authorization': getCookie('webtoken') === false ? '' : getCookie('webtoken')
  }
  return vm.$axios.post(server.prefix + server.api.Address.addressAdd,
    {
      ...data
    }).catch((e) => {
    let errorInfo = e.response
    console.log('manageEditErr', errorInfo)
  })
}


export const addressEdit = (vm, data) => {
    vm.$axios.defaults.headers = {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      'Authorization': getCookie('webtoken') === false ? '' : getCookie('webtoken')
    }
    return vm.$axios.post(server.prefix + server.api.Address.addressEdit,
      {
        ...data
      }).catch((e) => {
      let errorInfo = e.response
      console.log('manageEditErr', errorInfo)
    })
  }

/**
 * @description 会员地址列表
 * @param vm
 * @param data
 * @returns {*}
 */
export const addressList = (vm, data) => {
  vm.$axios.defaults.headers = {
    'Authorization': getCookie('webtoken') === false ? '' : getCookie('webtoken')
  }
  return vm.$axios.get(server.prefix + server.api.Address.addressList,
    {
      params: {...data}
    }).catch((e) => {
    let errorInfo = e.response
    console.log('manageEditErr', errorInfo)
  })
}

/**
 * @description 删除地址
 * @param vm
 * @param data
 * @returns {*}
 */
export const addressDelete = (vm, data) => {
  vm.$axios.defaults.headers = {
   'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    'Authorization': getCookie('webtoken') === false ? '' : getCookie('webtoken')
  }
  console.log('data', data)
  return vm.$axios.post(server.prefix + server.api.Address.addressDelete,
    {
      ...data
    }).catch((e) => {
    let errorInfo = e.response
    console.log('manageEditErr', errorInfo)
  })
}

/**
 * @description 获取单条地址信息
 * @param vm
 * @param data
 * @returns {*}
 */
export const addressInfor = (vm, data) => {
  vm.$axios.defaults.headers = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    'Authorization': getCookie('webtoken') === false ? '' : getCookie('webtoken')
  }
  return vm.$axios.get(server.prefix + server.api.Address.addressSigle,
    {
      params:{...data}
    }).catch((e) => {
    let errorInfo = e.response
    console.log('manageEditErr', errorInfo)
  })
}


/**
 * @description 设为默认地址
 * @param vm
 * @param data
 * @returns {*}
 */
export const addressDefault = (vm, data) => {
  vm.$axios.defaults.headers = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    'Authorization': getCookie('webtoken') === false ? '' : getCookie('webtoken')
  }
  return vm.$axios.get(server.prefix + server.api.Address.addressDefault,
    {
        params:{...data}
    }).catch((e) => {
    let errorInfo = e.response
    console.log('manageEditErr', errorInfo)
  })
}

/**
 * @description 绑定银行卡列表
 * @param vm
 * @param data
 * @returns {*}
 */
export const alreadyBindList = (vm, data) => {
  vm.$axios.defaults.headers = {
    'Authorization': getCookie('webtoken') === false ? '' : getCookie('webtoken')
  }
  return vm.$axios.get(server.prefix + server.api.user.alreadyBindList,
    {
      params: {...data}
    }).catch((e) => {
    let errorInfo = e.response
    console.log('alreadyBindList', errorInfo)
  })
}

/**
 * @description 添加绑定银行卡
 * @param vm
 * @param data
 * @returns {*}
 */
export const addBindBank = (vm, data) => {
  vm.$axios.defaults.headers = {
    'Authorization': getCookie('webtoken') === false ? '' : getCookie('webtoken')
  }
  return vm.$axios.get(server.prefix + server.api.user.addBindBank,
    {
      params: {...data}
    }).catch((e) => {
    let errorInfo = e.response
    console.log('addBindBank', errorInfo)
  })
}

/**
 * @description 回填验证码
 * @param vm
 * @param data
 * @returns {*}
 */
export const codeBindBank = (vm, data) => {
  vm.$axios.defaults.headers = {
    'Authorization': getCookie('webtoken') === false ? '' : getCookie('webtoken')
  }
  return vm.$axios.get(server.prefix + server.api.user.codeBindBank,
    {
      params: {...data}
    }).catch((e) => {
    let errorInfo = e.response
    console.log('codeBindBank', errorInfo)
  })
}

/**
 * @description 解绑银行卡
 * @param vm
 * @param data
 * @returns {*}
 */
export const unsetBindBank = (vm, data) => {
  vm.$axios.defaults.headers = {
    'Authorization': getCookie('webtoken') === false ? '' : getCookie('webtoken')
  }
  return vm.$axios.get(server.prefix + server.api.user.unsetBindBank,
    {
      params: {...data}
    }).catch((e) => {
    let errorInfo = e.response
    console.log('unsetBindBank', errorInfo)
  })
}

/**
 * @description 国家、省、市、县/区
 * @param vm
 * @param data
 * @returns {*}
 */
export const countryData = (vm, data) => {
  return vm.$axios.get(server.prefix + server.api.Address.countryData,
    {
      params: {...data}
    }).catch((e) => {
    let errorInfo = e.response
    console.log('manageEditErr', errorInfo)
  })
}

export const provinceData = (vm, data) => {
  return vm.$axios.get(server.prefix + server.api.Address.provinceData,
    {
      params: {...data}
    }).catch((e) => {
    let errorInfo = e.response
    console.log('manageEditErr', errorInfo)
  })
}

export const cityregionData = (vm, data) => {
  return vm.$axios.get(server.prefix + server.api.Address.cityregionData,
    {
      params: {...data}
    }).catch((e) => {
    let errorInfo = e.response
    console.log('manageEditErr', errorInfo)
  })
}


/**
 * @description 质检单列表
 * @param vm
 * @param data
 * @returns {*}
 */
export const inspectionlistPage = (vm, data) => {
  return vm.$axios.get(server.prefix + server.api.inspection.inspectionlistPage,
    {
      params: {...data}
    }).catch((e) => {
    let errorInfo = e.response
    console.log('manageEditErr', errorInfo)
  })
}






/**
 * @description 订单支付
 * @param vm
 * @param data
 * @returns {*}
 */
export const orderPayment = (vm, data) => {
    vm.$axios.defaults.headers = {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      'Authorization': getCookie('webtoken') === false ? '' : getCookie('webtoken')
    }
    return vm.$axios.get(server.prefix + server.api.order.payment,
      {
        params:{...data}
      }).catch((e) => {
      let errorInfo = e.response
      console.log('manageEditErr', errorInfo)
    })
  }

  /**
 * @description 订单支付
 * @param vm
 * @param data
 * @returns {*}
 */
export const orderPayCheckCode = (vm, data) => {
    vm.$axios.defaults.headers = {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      'Authorization': getCookie('webtoken') === false ? '' : getCookie('webtoken')
    }
    return vm.$axios.get(server.prefix + server.api.order.paycheckCode,
      {
        params:{...data}
      }).catch((e) => {
      let errorInfo = e.response
      console.log('manageEditErr', errorInfo)
    })
  }

    /**
 * @description 发送短信
 * @param vm
 * @param data
 * @returns {*}
 */
export const orderPayCode = (vm, data) => {
    vm.$axios.defaults.headers = {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      'Authorization': getCookie('webtoken') === false ? '' : getCookie('webtoken')
    }
    return vm.$axios.get(server.prefix + server.api.order.paycode,
      {
        params:{...data}
      }).catch((e) => {
      let errorInfo = e.response
      console.log('manageEditErr', errorInfo)
    })
  }
   /**
 * @description 获取保证金信息
 * @param vm
 * @param data
 * @returns {*}GET /bookingPlan/checkIsRelease
 */
export const checkIsRelease = (vm, data) => {
  vm.$axios.defaults.headers = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    'Authorization': getCookie('webtoken') === false ? '' : getCookie('webtoken')
  }
  return vm.$axios.get(server.prefix + server.api.order.checkIsRelease,
    {
      params:{...data}
    }).catch((e) => {
    let errorInfo = e.response
    console.log('manageEditErr', errorInfo)
  })
}