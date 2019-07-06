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
    memberValid: '/auth/member/verify',
    manageReg: '/user/m/register',
    supplierReg: '/user/supplier/register',
    supplierValid:'/auth/supplier/verify',
    userPhoneCheck: '/user/m/check/phone',
    userValid: '/user/m/check/userName',
    userCodeCheck: '/user/m/checkCode',
    userCodeSend: '/user/m/code',
    gainuserInfor:'/user/m/info',

    supplierCheck: '/user/supplier/check',
    supplierdataCheck: '/user/supplier/check/data',
    supplierNature: '/user/dictionary/code/value/supplierNature',
    supplierCodeCheck: '/user/supplier/checkCode',
    supplierCodeSend: '/user/supplier/code',
    supplierInfor:'/user/supplier/info',
    supplierEdit: '/user/supplier/edit',

    userRepassWd: '/user/m/updatePwd',
    userRECodeSend:'/user/m/updatePwd/code',
    supplierRepssWd: '/user/supplier/updatePwd',
    supplierRECodeSend:'/user/supplier/updatePwd/code',
    manageEdit: '/user/m/edit',

  },

  /**
   * @description 会员地址
   */

  Address:{
    addressList:'/bill/address/list',  //地址列表
    addressAdd:'/bill/address',       //添加地址信息
    addressEdit:'/bill/address',      //修改地址信息
    addressDelete:'/bill/address',    //删除地址列表
    addressDefault:'/bill/address',   // 设置默认地址
    addressSigle:'/bill/address/detail',  //获取单条信息

    countryData:'/item/country/list',        //国家
    provinceData:'/item/region/country',        //省份
    cityregionData:'/item/region/region',        //市/区/县


  },
  /**
   * @description 竞拍管理
   */
  Auction:{

    auctionList:'/bill/auction/list',   //竞拍列表--无分页

    auctionPage:'/auction/page',    //竞拍列表--有分页

    auctionDelete:'/bill/auction',  //删除竞拍

    auctionAdd:'/bill/auction',  //添加竞拍

    auctionEdit:'/bill/auction',  //编辑竞拍

    auctionInfor:'/bill/auction/detail',  //获取单条信息

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
    capitalinfo: '/bill/getFund',
    capitaldetail: '/bill/getFundByCompanyName'
  }
}

export default {
  api: api,
  prefix: '/api'
}
