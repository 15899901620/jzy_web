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
   * @description 资讯管理
   */
  information: {
    info: '/web/article/page',
    infoadd: '/web/article/add',
    infoedit: '/web/article/update',
    infodel: '/info/del',
    infoup: '/web/article/enable',
    cateall: '/web/article_cat/page',
    cate: '/web/article_cat/page',
    cateadd: '/web/article_cat/add',
    cateedit: '/web/article_cat/update',
    catedel: '/cate/del',
    cateup: '/web/article_cat/enable'
  },
  /**
   * @description 商品
   */
  product: {
    product: 'product',
    productadd: 'product/add',
    productedit: 'product/edit',
    productdown: 'product/down',
    productdel: 'product/del',
    category: 'category',
    categoryadd: 'category/add',
    categoryedit: 'category/edit',
    categorydel: 'category/del',
    categoryall: 'category/all',
    brand: 'brand',
    brandadd: 'brand/add',
    brandedit: 'brand/edit',
    branddel: 'brand/del',
    brandall: 'brand/all',
    attr: 'attr',
    attradd: 'attr/add',
    attredit: 'attr/edit',
    attrdel: 'attr/del',
    attrval: 'attr/addval',
    attrall: 'attr/all',
    quality: 'quality',
    qualityadd: 'quality/add',
    qualityedit: 'quality/edit',
    qualitydel: 'quality/del'
  },

  /**
   * @description 系统
   */
  sysconf: {
    powerall: '/user/permission/list',
    power: '/user/permission/list/page',
    poweradd: '/user/permission/save',
    poweredit: '/user/permission/edit',
    powerdel: '/user/permission/del',
    roleall: '/user/role/list',
    role: '/user/role/list/page',
    roleadd: '/user/role/save',
    roleedit: '/user/role/edit',
    roledel: '/user/role/del',
    roleAddPower: '/user/role/addPermission',
    getRoleidPower: '/user/role/rolePermission',
    getRoleUID: '/user/role/list/userid',
    worker: '/user/admin/list/page',
    workeradd: '/user/admin/register',
    workeredit: '/user/admin/register',
    workerup: '/user/admin/active',
    warehouse: '/item/warehouse/list/page',
    system: '/web/config/list',
    systemedit: 'sysconf/edit',
    links: '/web/friendlink/page',
    linksadd: '/web/friendlink/add',
    linksedit: '/web/friendlink/update',
    linksdel: '/web/friendlink/delete',
    adsite: '/web/ad_position/list',
    ad: '/web/ad/page',
    adadd: '/web/ad/add',
    adedit: '/web/ad/update',
    addel: '/web/ad/delete',
    adup: '/web/ad/enable',
    plan: '/web/bill_type/page',
    planedit: '/web/bill_type/update',
    coded: '/web/sequence/page',
    codededit: '/web/sequence/update',
    cobrand: '/web/coobrand/page',
    cobrandadd: '/web/coobrand/add',
    cobrandedit: '/web/coobrand/update',
    cobranddel: '/web/coobrand/delete',
    syslog: '/log/log/page',
    nav: '/web/nav/page',
    navadd: '/web/nav/add',
    navedit: '/web/nav/update',
    navdel: '/web/nav/delete',
    navup: '/web/nav/enable'
  }
}

export default {
  api: api,
  prefix: '/api',
}
