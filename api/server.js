/**
 * @description 接口集合转化
 */
let api = {
  /**
   * @description 登录
   */
  login: '/auth/user/accredit', //1

  /**
   * @description 会员信息
   */
  getUserinfo: '/auth/user/verify', //1

  /**
   * @description 校验用户是否存在s
   */
  isCheckUser: '/user/admin/check', //1
  /**
   * @description 会员
   */
  user:{
    sendsms: '/user/m/code',
  },
  /**
   * @description 资讯管理
   */
  information: {
    info: '/web/article/page',
    infoDetail: '/web/article/detail',
    infoadd: '/web/article/add',
    infoedit: '/web/article/update',
    infodel: '/info/del',
    infoup: '/web/article/enable',
    cateall: '/web/article_cat/page',
    cate: '/web/article_cat/page',
    cateadd: '/web/article_cat/add',
    cateedit: '/web/article_cat/update',
    catedel: '/cate/del',
    cateup: '/web/article_cat/enable',
    announcement: '/web/announcement/page',  //网站公告
    cooperativeBrand: '/web/coobrand/page'  //网站合作品牌
  },
  /**
   * @description 商品
   */
  product: {

  },

  /**
   * @description 系统
   */
  sysconf: {

  }
}

export default {
  api: api,
  prefix: '/api',
}
