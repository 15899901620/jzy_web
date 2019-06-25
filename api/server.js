/**
 * @description 接口集合转化
 */
let api = {
  /**
   * @description 会员
   */
  user:{
    manageLogin: '/user/m/login',
    supplierLogin: '/user/supplier/login',

    manageReg: '/user/m/register',
    supplierReg: 'user/supplier/m/register',

    userPhoneCheck: '/user/m/check/phone',
    userCodeCheck: '/user/m/checkCode',
    userCodeSend: '/user/m/code',

    supplierCheck: '/user/supplier/check',
    supplierCodeCheck: '/user/supplier/checkCode',
    supplierCodeSend: '/user/supplier/code',

    userRepassWd: '/user/m/updatePwd',
    supplierRepssWd: '/user/supplier/updatePwd'

  },
  /**
   * @description 资讯管理
   */
  information: {
    info: '/web/article/page',
    infodetail: '/web/article/detail',
    infoClick: '/web/article/click',
    cateall: '/web/article_cat/page',

    infocate: '/web/article_cat/tree',

    announcement: '/web/announcement/page'  //网站公告
  },

  /**
   * @description 帮助中心
   */
  helper: {
    helpCatTree: '/web/help_cat/tree',
    helpPage: '/web/help_article/page',
    helpdetail: 'GET /help_article/detail'
  },
  /**
   * @description 商品
   */
  product: {

  },
  /**
   * @description 导航
   */
  navigation: {
    navlist: '/web/nav/list',
    navdetail: '/web/nav/detail'
  },
  /**
   * @description 系统
   */
  sysconf: {
    cooperativeBrand: '/web/coobrand/page'  //网站合作品牌
  }
}

export default {
  api: api,
  prefix: '/api'
}
