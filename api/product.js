/**
 * @description 商品模块内容
 */
import axios from '@/libs/api.request'
import server from './server'

/**
 * @description 商品列表
 * @param data
 * @returns {*|never}
 */
export const productlist = (data) => {
  return axios.request({
    url: server.api.product.product,
    params: {
      ...data
    },
    method: 'get'
  })
}

/**
 * @description 添加商品接口
 * @param data
 * @returns {*|never}
 */
export const productadd = data => {
  return axios.request({
    url: server.api.product.productadd,
    method: 'post',
    params: {
      ...data
    }
  })
}

/**
 * @description 编辑商品
 * @param data
 * @returns {*|never}
 */
export const productedit = data => {
  return axios.request({
    url: server.api.product.productedit,
    method: 'post',
    params: {
      ...data
    }
  })
}

/**
 * @description 下架
 * @param data
 * @returns {*|never}
 */
export const productdown = data => {
  return axios.request({
    url: server.api.product.productdown,
    method: 'post',
    params: {
      ...data
    }
  })
}

/**
 * @description 删除
 * @param data
 * @returns {*|never}
 */
export const productdel = data => {
  return axios.request({
    url: server.api.product.productdel,
    method: 'post',
    params: {
      ...data
    }
  })
}

/**
 * @description 品牌列表
 * @param data
 * @returns {*|never}
 */
export const brand = data => {
  return axios.request({
    url: server.api.product.brand,
    method: 'post',
    params: {
      ...data
    }
  })
}

/**
 * @description 所有品牌列表
 * @param data
 */
export const brandall = () => {
  return axios.request({
    url: server.api.product.brandall,
    method: 'get'
  })
}

/**
 * @description 分类
 * @param data
 * @returns {*|never}
 */
export const category = data => {
  return axios.request({
    url: server.api.product.category,
    method: 'get',
    params: {
      ...data
    }
  })
}

/**
 * @description 添加分类
 * @param data
 * @returns {*|never}
 */
export const categoryadd = data => {
  return axios.request({
    url: server.api.product.categoryadd,
    method: 'post',
    params: {
      ...data
    }
  })
}

/**
 * @description 编辑分类
 * @param data
 * @returns {*|never}
 */
export const categoryedit = data => {
  return axios.request({
    url: server.api.product.categoryedit,
    method: 'post',
    params: {
      ...data
    }
  })
}

/**
 * @description 删除分类
 * @param data
 * @returns {*|never}
 */
export const categorydel = data => {
  return axios.request({
    url: server.api.product.categorydel,
    method: 'post',
    params: {
      ...data
    }
  })
}

/**
 * @description 所有分类
 * @param data
 * @returns {*|never}
 */
export const categoryall = data => {
  return axios.request({
    url: server.api.product.categoryall,
    method: 'get',
    params: {
      ...data
    }
  })
}

/**
 * @description 属性列表
 * @param data
 * @returns {*|never}
 */
export const attr = data => {
  return axios.request({
    url: server.api.product.attr,
    method: 'get',
    params: {
      ...data
    }
  })
}

/**
 * @description 添加属性
 * @param data
 * @returns {*|never}
 */
export const attradd = data => {
  return axios.request({
    url: server.api.product.attradd,
    method: 'post',
    params: {
      ...data
    }
  })
}

/**
 * @description 编辑属性
 * @param data
 * @returns {*|never}
 */
export const attredit = data => {
  return axios.request({
    url: server.api.product.attredit,
    method: 'post',
    params: {
      ...data
    }
  })
}

/**
 * @description 删除属性
 * @param data
 * @returns {*|never}
 */
export const attrdel = data => {
  return axios.request({
    url: server.api.product.attrdel,
    method: 'post',
    params: {
      ...data
    }
  })
}

/**
 * @description 属性值添加
 * @param data
 * @returns {*|never}
 */
export const attrval = data => {
  return axios.request({
    url: server.api.product.attrval,
    method: 'post',
    params: {
      ...data
    }
  })
}

/**
 * @description 全部属于
 * @param data
 * @returns {*|never}
 */
export const attrall = () => {
  return axios.request({
    url: server.api.product.attrall,
    method: 'get'
  })
}

/**
 * @description 质检单
 * @param data
 * @returns {*|never}
 */
export const quality = data => {
  return axios.request({
    url: server.api.product.quality,
    method: 'post',
    params: {
      ...data
    }
  })
}

/**
 * @description 质检单添加
 * @param data
 * @returns {*|never}
 */
export const qualityadd = data => {
  return axios.request({
    url: server.api.product.qualityadd,
    method: 'post',
    params: {
      ...data
    }
  })
}

/**
 * @description 质检单编辑
 * @param data
 * @returns {*|never}
 */
export const qualityedit = data => {
  return axios.request({
    url: server.api.product.qualityedit,
    method: 'post',
    params: {
      ...data
    }
  })
}

/**
 * @description 质检单删除
 * @param data
 * @returns {*|never}
 */
export const qualitydel = data => {
  return axios.request({
    url: server.api.product.qualitydel,
    method: 'post',
    params: {
      ...data
    }
  })
}
