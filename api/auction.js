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
 * @description 竞拍列表
 * @param vm
 * @param data
 * @returns {*}
 */
export const auctionPage = (vm, data) => {
  console.log('data', data)
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
export const NewPrice = (vm, data) => {
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
export const GainauctionRecord = (vm, data) => {

  vm.$axios.defaults.headers = {

    'Authorization': getCookie('webtoken') === false ? '' : getCookie('webtoken')
  }
  return vm.$axios.get(server.prefix + server.api.Auction.GainauctionRecord,
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

