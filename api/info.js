/**
 * @description 系统模块资讯内容
 */
import server from './server'

/**
 * @description 资讯列表
 * @param data
 * @returns {*|never}
 */
export const infolist = (vm, data) => {
  return vm.$axios.get(
    server.api.information.info,
    {
      ...data
    }
  )
}

/**
 * @description 添加资讯
 * @param data
 * @returns {*|never}
 */
export const infoadd = data => {
  return this.$axios.post(
    server.api.information.info,
    {
      ...data
    }
  )
}

/**
 * @description 编辑资讯
 * @param data
 * @returns {*|never}
 */
export const infoedit = data => {
  return this.$axios.post(
    server.api.information.infoedit,
    {
      ...data
    }
  )
}

/**
 * @description 删除资讯
 * @param data
 * @returns {*|never}
 */
export const infodel = data => {
  return this.$axios.post(
    server.api.information.infodel,
    {
      ...data
    }
  )
}

/**
 * @description 更新状态
 * @param data
 * @returns {*|never}
 */
export const infoup = data => {
  return this.$axios.post(
    server.api.information.infoup,
    {
      ...data
    }
  )
}
