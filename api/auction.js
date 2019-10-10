/**
 * @description 系统模块用户内容
 */
import server from '../config/api'
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
 * @description 竞拍列表
 * @param vm
 * @param data
 * @returns {*}
 */
export const auctionPage = (vm, data) => {
  return vm.$axios.get(server.prefix + server.api.Auction.auctionPage,
    {
      params: {...data}
    }).catch((e) => {
    let errorInfo = e.response
    console.log('manageEditErr', errorInfo)
  })
}

/**
 * @description 竞拍单条信息
 * @param vm
 * @param data
 * @returns {*}
 */
export const auctionInfor = (vm, data) => {
  return vm.$axios.get(server.prefix + server.api.Auction.auctionInfor,
    {
      params: {...data}
    }).catch((e) => {
    let errorInfo = e.response
    console.log('manageEditErr', errorInfo)
  })
}
/**
 * @description 竞拍记录信息
 * @param vm
 * @param data
 * @returns {*}
 */
export const auctionRecord = (vm, data) => {
vm.$axios.defaults.headers = {
    'Authorization': getCookie('webtoken') === false ? '' : getCookie('webtoken')
    }
  return vm.$axios.get(server.prefix + server.api.Auction.auctionRecord,
    {
      params: {...data}
    }).catch((e) => {
    let errorInfo = e.response
    console.log('manageEditErr', errorInfo)
  })
}

/**
 * @description 最小竞拍价信息
 * @param vm
 * @param data
 * @returns {*}
 */
export const priceListInfo = (vm, data) => {
  vm.$axios.defaults.headers = {
    'Authorization': getCookie('webtoken') === false ? '' : getCookie('webtoken')
  }
  return vm.$axios.get(server.prefix + server.api.Auction.priceListInfo,
  {
    params: {...data}
  }).catch((e) => {
    let errorInfo = e.response
    console.log('manageEditErr', errorInfo)
  })
}


/**
 * @description 当前价信息
 * @param vm
 * @param data
 * @returns {*}
 */
export const newprice = (vm, data) => {
  vm.$axios.defaults.headers = {
    'Authorization': getCookie('webtoken') === false ? '' : getCookie('webtoken')
  }
  return vm.$axios.get(server.prefix + server.api.Auction.NewPrice,
    {
      params: {...data}
    }).catch((e) => {
    let errorInfo = e.response
    console.log('manageEditErr', errorInfo)
  })
}
/**
 * @description 添加我的出价信息
 * @param vm
 * @param data
 * @returns {*}
 */

export const AddauctionPrice = (vm, data) => {
  vm.$axios.defaults.headers = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    'Authorization': getCookie('webtoken') === false ? '' : getCookie('webtoken')
  }
  return vm.$axios.post(server.prefix + server.api.Auction.AddauctionPrice,
    {
      ...data
    }).catch((e) => {
    let errorInfo = e.response
    console.log('manageEditErr', errorInfo)
  })
}
/**
 * @description 我的出价信息
 * @param vm
 * @param data
 * @returns {*}
 */
export const auctionMineRecord = (vm, data) => {
  vm.$axios.defaults.headers = {
    'Authorization': getCookie('webtoken') === false ? '' : getCookie('webtoken')
  }
  return vm.$axios.get(server.prefix + server.api.Auction.auctionMineRecord,
    {
      params: {...data}
    }).catch((e) => {
    let errorInfo = e.response
    console.log('manageEditErr', errorInfo)
  })
}
/**
 * @description 竞拍个人信息
 * @param vm
 * @param data
 * @returns {*}
 */
export const gainauctionrecord = (vm, data) => {

  vm.$axios.defaults.headers = {

    'Authorization': getCookie('webtoken') === false ? '' : getCookie('webtoken')
  }
  return vm.$axios.get(server.prefix + server.api.Auction.gainauctionrecord,
    {
      params: {...data}
    }).catch((e) => {
    let errorInfo = e.response
    console.log('manageEditErr', errorInfo)
  })
}

/**
 * @description 添加保证金记录
 * @param vm
 * @param data
 * @returns {*}
 */
export const AddBondRecord = (vm, data) => {
  vm.$axios.defaults.headers = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    'Authorization': getCookie('webtoken') === false ? '' : getCookie('webtoken')
  }
  return vm.$axios.post(server.prefix + server.api.Auction.AddBondRecord,
    {
      ...data
    }).catch((e) => {
    let errorInfo = e.response
    console.log('manageEditErr', errorInfo)
  })
}

/**
 * @description 竞拍中标
 * @param vm
 * @param data
 * @returns {*}
 */
export const WinningBid = (vm, data) => {

  vm.$axios.defaults.headers = {
    'Authorization': getCookie('webtoken') === false ? '' : getCookie('webtoken')
  }
  return vm.$axios.get(server.prefix + server.api.Auction.WinningBid,
    {
      params: {...data}
    }).catch((e) => {
    let errorInfo = e.response
    console.log('manageEditErr', errorInfo)
  })
}

/**
 * @description 添加竞拍保证金记录发送短信验证码
 * @param vm
 * @param data
 * @returns {*}
 */
export const BondMessSend = (vm, data) => {

  vm.$axios.defaults.headers = {
    'Authorization': getCookie('webtoken') === false ? '' : getCookie('webtoken')
  }
  return vm.$axios.get(server.prefix + server.api.Auction.BondMessSend,
    {
      params: {...data}
    }).catch((e) => {
    let errorInfo = e.response
    console.log('manageEditErr', errorInfo)
  })
}

/**
 * @description 竞拍验证手机验证码
 * @param vm
 * @param data
 * @returns {*}
 */
export const BondMessageCode = (vm, data) => {
  vm.$axios.defaults.headers = {
    'Authorization': getCookie('webtoken') === false ? '' : getCookie('webtoken')
  }
  return vm.$axios.get(server.prefix + server.api.Auction.BondMessageCode,
    {
      params: {...data}
    }).catch((e) => {
    let errorInfo = e.response
    console.log('manageEditErr', errorInfo)
  })
}

/**
 * @description 根据竞拍计划id获取计划详情
 * @param vm
 * @param data
 * @returns {*}
 */
export const auctionPlanDetail = (vm, data) => {
  vm.$axios.defaults.headers = {
    'Authorization': getCookie('webtoken') === false ? '' : getCookie('webtoken')
  }
  return vm.$axios.get(server.prefix + server.api.Auction.auctionPlanDetail,
    {
      params: {...data}
    }).catch((e) => {
    let errorInfo = e.response
    console.log('manageEditErr', errorInfo)
  })
}

/**
 * @description 客户通过竞拍计划单下单
 * @param vm
 * @param data
 * @returns {*}
 */
export const auctionsubmitOrderL = (vm, data) => {
  vm.$axios.defaults.headers = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    'Authorization': getCookie('webtoken') === false ? '' : getCookie('webtoken')
  }
  return vm.$axios.post(server.prefix + server.api.Auction.auctionsubmitOrderL,
    {
      ...data
    }).catch((e) => {
    let errorInfo = e.response
    console.log('manageEditErr', errorInfo)
  })
}

/**
 * @description 客户通过竞拍计划单下单
 * @param vm
 * @param data
 * @returns {*}
 */
export const auctionOrderList = (vm, data) => {
  vm.$axios.defaults.headers = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    'Authorization': getCookie('webtoken') === false ? '' : getCookie('webtoken')
  }
  return vm.$axios.get(server.prefix + server.api.Auction.auctionOrderList,
    {
      params: {...data}
    }).catch((e) => {
    let errorInfo = e.response
    console.log('manageEditErr', errorInfo)
  })
}
/**
 * @description 我的竞拍列表
 * @param vm
 * @param data
 * @returns {*}GET /myAuctionPlanned/page
 */
export const myAuctionOrderList = (vm, data) => {
  vm.$axios.defaults.headers = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    'Authorization': getCookie('webtoken') === false ? '' : getCookie('webtoken')
  }
  return vm.$axios.get(server.prefix + server.api.Auction.myAuctionOrderList,
    {
      params: {...data}
    }).catch((e) => {
    let errorInfo = e.response
    console.log('manageEditErr', errorInfo)
  })
}



