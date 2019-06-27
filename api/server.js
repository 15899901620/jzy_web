/**
 * @description 接口集合转化
 */
let api = {
  /**
   * @description 会员
   */
  user:{
    manageLogin: '/auth/member/accredit',
    supplierLogin: '/auth/supplier/accredit',
    manageReg: '/user/m/register',
    supplierReg: 'user/supplier/m/register',
    userPhoneCheck: '/user/m/check/phone',
    userCodeCheck: '/user/m/checkCode',
    userCodeSend: '/user/m/code',
    supplierCheck: '/user/supplier/check',
    supplierCodeCheck: '/user/supplier/checkCode',
    supplierCodeSend: '/user/supplier/code',
    userRepassWd: '/user/m/updatePwd',
    supplierRepssWd: '/user/supplier/updatePwd',
    manageEdit: '/user/m/edit'
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
    announcement: '/web/announcement/page',  //网站列表
    announcementdetail: '/web/announcement/detail'
  },
  /**
   * @description 帮助中心
   */
  helper: {
    helpCatTree: '/web/help_cat/getHelpCatatByParentId',
    helpPage: '/web/help_article/getHelpArticleByCatId',
    helpdetail: '/web/help_article/detail'
  },
  /**
   * @description 商品(物性表)
   */
  product: {
    productlist: '/item/goods/list/page',
    productdetail: '/item/goods/sku/info',
    inspectionCheck: '/item/inspection_sheet/list/page',
    goodsHot: '/item//goods/hotGoods',
    cateHot: '/category/hotCate',
    attrlist: '/item/spec/value'
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
    cooperativeBrand: '/web/coobrand/page',  //网站合作品牌
    friendlink: '/web/friendlink/list' //友情链接
  },
  /**
   * @description 广告位管理
   */
  ad: {
    adposition: '/web/ad/list'
  },
  /**
   * @description 资金管理
   */
  capital: {
    capitalinfo: '/web/getFund',
    capitaldetail: '/web/getFundByCompanyName'
  }
}

export default {
  api: api,
  prefix: '/api'
}
