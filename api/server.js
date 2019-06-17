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
  getUserinfo: 'auth/user/verify', //1

  /**
   * @description 校验用户是否存在s
   */
  isCheckUser: '/user/admin/check', //1

  /**
   * @description 资讯管理
   */
  information: {
    info: 'info',
    infoadd: 'info/add',
    infoedit: 'info/edit',
    infodel: 'info/del',
    infoup: 'infoup',
    cateall: 'cate/all',
    cate: 'cate',
    cateadd: 'cate/add',
    cateedit: 'cate/edit',
    catedel: 'cate/del'
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
    powerall: 'powerall',
    power: 'power',
    poweradd: 'power/add',
    poweredit: 'power/edit',
    powerdel: 'power/del',
    roleall: '/user/role/list', //1
    role: 'role',
    roleadd: 'role/add',
    roleedit: 'role/edit',
    roledel: 'role/del',
    worker: 'worker',
    workeradd: 'worker/add',
    workeredit: 'worker/edit',
    workerdel: 'worker/del',
    workerup: 'worker/up',
    warehouse: 'warehouse',
    system: 'sysconf',
    systemedit: 'sysconf/edit',
    links: 'links',
    linksadd: 'links/add',
    linksedit: 'links/edit',
    linksdel: 'links/del',
    adsite: 'adsite',
    ad: 'ad',
    adadd: 'ad/add',
    adedit: 'ad/edit',
    addel: 'ad/del',
    adup: 'ad/up',
    plan: 'plan',
    planedit: 'plan/edit',
    coded: 'coded',
    codededit: 'coded/edit'
  }
}

export default {
  api: api
}
