/**
 * @description 接口集合转化
 */
let api = {
  /**
   * @description 求购
   */
  buy: {
    buylist: '/bill/goodsDemand/page',
    addbuy: '/bill/goodsDemand'
  },
  search: {
    hotsearch: '/web/hotSearch/list',
    getHotSearch: {'url':'/web/hotSearch/list', 'method':'get'},
    addsearch: '/web/hotSearch/add'
  },
  /**
   * @description 会员
   */
  user:{
    carrierRegcode: '/user/supplier/c/code',   //承运商注册发送短信验证码
    carrierreg: '/user/supplier/c/register',   //
    carrierreCode: '/user/supplier/c/updatePwd/code',
    manageLogin: '/user/auth/member/accredit',
    supplierLogin: '/user/auth/supplier/accredit',
    memberValid: '/user/auth/member/verify',
    manageReg: '/user/m/register',
    supplierReg: '/user/supplier/register',
    supplierValid:'/user/auth/supplier/verify',
    userPhoneCheck: '/user/m/check/phone',
    userlabel:'/item/category/tree',
    userValid: '/user/m/check/userName',
    userCodeCheck: '/user/m/checkCode',
    userCodeSend: '/user/m/code',
    userLoginCodeSend: '/user/m/login/code',
    gainuserInfor:'/user/m/info',
    getuserInforId:'/user/m/info/id',
    editAvatar:'/user/m/editAvatar',
    supplierCheck: '/user/supplier/check',
    supplierdataCheck: '/user/supplier/check/data',
    supplierNature: '/user/dictionary/code/value/supplierNature',
    supplierCodeCheck: '/user/supplier/checkCode',   //验证手机验证码
    supplierRegCode: '/user/supplier/code',          //供应商注册发送短信验证码
    supplierCodeSend: '/user/supplier/login/code', //供应商登录发送短信验证码
    supplierInfor:'/user/supplier/info',
    supplierEdit: '/user/supplier/edit',
    userRepassWd: '/user/m/updatePwd',
    userRECodeSend:'/user/m/updatePwd/code',
    userEditPhoneSend:'/user/m/editPhone/code',
    userRephone:'/user/m/editPhone',
    supplierRepssWd: '/user/supplier/updatePwd',
    supplierRECodeSend:'/user/supplier/updatePwd/code',
    manageEdit: '/user/m/edit',    //会员自己修改会员信息
  },
  /**
   * @description 订单管理
   */
  order: {
    getMemberOrderList:{'url':'/bill/orderInfo/getOrderInfoByCurrMemberId', 'method':'get'} ,
    getOrderInfoById:{'url':'/bill/orderInfo/getOrderInfoById', 'method':'get'} ,
		getMemberOrderCount:{'url':'/bill/orderInfo/getMemberOrderCount', 'method':'get'} ,
		getOrderPayInfo:{'url':'/bill/orderInfo/getOrderPayInfo', 'method':'get'} ,
    orderPayment:{'url':'/bill/orderInfo/payment', 'method':'get'} ,
    monthorder:{'url':'/bill/orderInfo/page', 'method':'get'} ,
    orderlist: '/bill/orderInfo/list',
    orderpage: '/bill/orderInfo/getOrderInfoByCurrMemberId',
    Nopay: '/bill/orderInfo/getUnPayAmountByCurrMemberId',
    orderCount: '/bill/orderInfo/getMemberOrderCount',
    orderDetail: '/bill/orderInfo/detail',
    checkIsRelease: '/bill/bookingPlan/checkIsRelease',
    getTurnoverInfo:  {'url':'/bill/orderInfo/getTurnoverInfo', 'method':'get'},
    payment: '/bill/orderInfo/payment',
    paycheckCode: '/bill/orderInfo/payment/checkCode',
    paycode: '/bill/orderInfo/payment/code',
    cancel: {'url':'/bill/orderInfo/cancel', 'method':'get'}
  },

	seal:{
		getMemberSealInfo : {'url':'/user/seal/getSealInfo', 'method':'get'},
		register : {'url':'/user/seal/addRegister', 'method':'get'},
		getVerifyUrl : {'url':'/user/seal/getVerifyUrl', 'method':'get'},
	},
  /**
   * @description 会员地址
   */
  Address:{
    addressList:'/bill/address/list',  //地址列表
    addressAdd:'/bill/address/save',       //添加地址信息
    addressEdit:'/bill/address/edit',      //修改地址信息
    addressDelete:'/bill/address/delete',    //删除地址列表
    addressDefault:'/bill/address/default/set',   // 设置默认地址
    addressSigle:'/bill/address/detail',  //获取单条信息
    countryData:'/item/country/list',        //国家
    provinceData:'/item/region/country',        //省份
    cityregionData:'/item/region/region',        //市/区/县
    countryList: '/item/country/list',
    countryRegion: '/item/region/country',
    getregion: '/item/region/region'
  },
	contract: {
		getSealType: {'url':'/bill/contract/sealType', 'method':'get'},
		applySave: {'url':'/bill/contract/save', 'method':'post'},
		applyElcSave: {'url':'/bill/contract/saveElc', 'method':'post'},
	},
  /**
   * @description 现货超市
   */
  spot: {
    filterConditon: '/bill/spot/filter/condition',
    getFilterConditon: {'url':'/bill/spot/filter/condition', 'method':'get'},
    spotList: '/bill/spot/list/page/onSale',
    initSpotList: {'url':'/bill/spot/list/page/onSale', 'method':'get'},
    categoryList: '/item/spot/goods/category',
    spotDetail: '/bill/spot/order',
    getSpotInfoToOrder: {'url':'/bill/spot/order', 'method':'get'},
    freightList: '/bill/freightList/orderFreightInfo',
    spotSubmitOrder: '/bill/spot/order/create',
    createOrderByQuote: {'url':'/bill/spot/order/create', 'method':'post'},
    getContractInfo:{'url':'/bill/spotPlan/getContractInfo', 'method':'get'} ,
    getPlanTotalNumByQuoteId: {'url':'/bill/spotPlan/getPlanTotalNumByQuoteId', 'method':'get'},
    spotPlanList: {'url':'/bill/spotPlan/user/list/page', 'method':'get'},
    spotPlanDetail: {'url':'/bill/spotPlan/user/detail', 'method':'get'},
    spotPlanCloseApply: {'url':'/bill/plan/close/apply/member/save', 'method':'get'},
    createOrderByPlan: {'url':'/bill/spotPlan/order/create', 'method':'post'},
  },
  /**
   * @description 预售商口
   */
  advance: {
    getSaleList: {'url':'/bill/booking/list/page/onSale', 'method':'get'},
    bookingPlanclose: {'url':'/bill/bookingPlan/close/apply/member/save', 'method':'get'},
    planAdd: {'url':'/bill/booking/plan/add', 'method':'post'},
    getMemberPlanList: {'url':'/bill/bookingPlan/member/list', 'method':'get'},
    getContractInfo: {'url':'/bill/bookingPlan/getContractInfo', 'method':'get'},
    getFeedingByPlan: {'url':'/bill/bookingFeeding/saleListByPlan', 'method':'post'},
    getSalePlanDetail: {'url':'/bill/bookingPlan/salePlanDetail', 'method':'get'},
    createOrder: {'url':'/bill/bookingPlan/order/create', 'method':'post'},
    detail: {'url':'/bill/bookingPlan/detail', 'method':'GET'},
		getMemberFeedingList: {'url':'/bill/bookingPlan/getMyPlanList/page', 'method':'get'},
		getPlanByFeeding: {'url':'/bill/bookingPlan/saleListByFeeding', 'method':'post'},
  },
  /**
   * @description 竞拍管理
   */
  Auction:{
    auctionList:'/bill/auction/list',   //竞拍列表--无分页
    auctionPage:'/bill/auction/web/page',    //竞拍列表--有分页
    getAuctionList:{'url':'/bill/auction/web/page','method':'get'},    //竞拍列表--有分页
    getAuctionfollow:'/bill/auction/followList',    //竞拍列表，获取当前登录用户已关注列表
    getAuctionunfollow:'/bill/auction/unFollowList',    //竞拍列表，获取当前登录用户未关注列表
    getAuctionInfo:{'url':'/bill/auction/sale/info','method':'get'},
		getAuctionPlan:{'url':'/bill/auctionPlanned/getMyList/page','method':'get'},    //获取竞拍记录
		getPlanDetail:{'url':'/bill/auctionPlanned/user/detail', 'method':'get'},
		createOrderByPlan: {'url':'/bill/orderInfo/auction/create', 'method':'post'},
		getPartakeList: {'url':'/bill/auction/partake', 'method':'get'},
		getContractInfo: {'url':'/bill/auctionPlanned/getContractInfo', 'method':'get'},


    cancelfollow: {'url':'/bill/auctionFollow/cancel', 'method':'post'},        //取消关注
    getfollow: {'url':'/bill/auctionFollow/save', 'method':'post'},        //添加关注
    membercurr: {'url':'/bill/member_deposits/curr/page', 'method':'get'},        //合约保证金
    auctioncurr:{'url': '/bill/auctionDeposits/curr/page', 'method':'get'},      //竞拍保证金
    memberDefaults:{'url': '/bill/member_defaults/curr/page', 'method':'get'},      //违约单
    auctionDelete:'/bill/auction',  //删除竞拍
    auctionAdd:'/bill/auction',  //添加竞拍
    auctionEdit:'/bill/auction',  //编辑竞拍
    auctionInfor:'/bill/auction/detail',  //获取单条信息
    priceListInfo:'/bill/priceList/getPrice', //查询物料价目信息
    NewPrice:'/bill/auctionBid/getCurrBid',   //获取最新的竞拍价
    auctionRecord:'/bill/auctionBid/page',    //获取竞拍记录
    AddauctionPrice:'/bill/auctionBid',        // 添加我的出价记录
    gainauctionrecord:'/bill/auctionBid/getMyBid',  //获取出价记录
    AddBondRecord:'/bill/auctionDeposit',           //添加保证金记录
    WinningBid:'/bill/auctionPlanned/getWinBid',  //中标信息
    BondMessSend:'/bill/auctionDeposit/code',      //添加竞拍保证金记录发送短信验证码
    BondMessageCode:'/bill/auctionDeposit/checkCode',    //验证手机验证码
    auctionPlanDetail:'/bill/auctionPlanned/info',    //根据竞拍计划id获取计划详情
    auctionsubmitOrderL:'/bill/orderInfo/auction/create',    //客户通过竞拍计划单下单
    auctionOrderList:'/bill/auctionPlanned/page',        //客户通过竞拍订单列表
    myAuctionOrderList:'/bill/auctionPlanned/getMyList/page',

  },
  /**GET /auctionPlanned/getMyList/page
   * @description 资讯管理
   */
  information: {
    getArticleList:{'url': '/web/article/page', 'method': 'get'},
    info:'/web/article/page',
    infos:{'url': '/web/article/page', 'method': 'get'},
    infodetail: '/web/article/detail',
    infoClick: '/web/article/click',
    cateall: '/web/article_cat/page',
    infocate: '/web/article_cat/tree',
    announcement: '/web/announcement/page',  //网站列表
    announcementdetail: '/web/announcement/detail',
    noticeclick: '/web/announcement/click',
    articleCatDetail:'/web/article_cat/detail',
    getArticleCatList:{'url': '/web/article_cat/page', 'method': 'get'},
    getNoticeCatList:{'url': '/web/announcement/page', 'method': 'get'},


  },
  /**
   * @description 帮助中心
   */
  helper: {
    helpCatTree: '/web/help_cat/getHelpCatatByParentId',
    getHelpCatTree: {'url':'/web/help_cat/getHelpCatatByParentId','method':'get'},
    getHelpPage: {'url':'/web/help_article/getHelpArticleByCatId','method':'get'},
    helpPage: '/web/help_article/getHelpArticleByCatId',
    helpdetail: '/web/help_article/detail'
  },

    /**
     * @description 专料
     */
    special: {
        saleListByPlan: {'url':'/bill/yearlyFeeding/saleListByPlan', 'method':'post'},
        getContractInfo: {'url':'/bill/yearPlanned/getContractInfo', 'method':'GET'},
        monthContractInfo: {'url':'/bill/monthPlanned/getContractInfo', 'method':'GET'},
        monthaddPlan:{'url':'/bill/yearPlanned/getCanAddMonthPlanListByMemberId/page', 'method':'get'},
        initSpotList: {'url':'/bill/yearlyFeeding/saleList', 'method':'get'},
        // specialList: '/bill/yearlyFeeding/saleList',
        yeardetail:{ 'url': '/bill/yearPlanned/detail', 'method': 'get'},
        initsaleList: {'url':'/bill/monthPlanned/getWebMonthPlanListByMemberId', 'method':'get'},
        specialList: '/bill/monthPlanned/getMonthPlanCatListByMemberId',
        myYearList: '/bill/myYearPlanned/page',
        specialDetail: '/bill/yearlyFeeding/detail',
        monthspecialDetail: '/bill/monthPlanned/salePlanDetail',
        submitOrder: '/bill/monthPlanned/order/create'
    },
     /**
     * @description 招标
     */
    biddding:{
       bidddingList:{'url': '/bill/bidding/web/list/page', 'method': 'get'},
       save:{'url': '/bill/bid/save', 'method': 'post'},
       bidDetail:{'url': '/bill/bid/detail', 'method': 'get'},
       bidddingDetail:{'url': '/bill/bidding/detail', 'method': 'get'},
       bidWinDetail:{'url': '/bill/bidding/webDetail', 'method': 'get'},
       bidList:{'url': '/bill/bidding/getMyBiddingList/page', 'method': 'get'},
       BySupplier:{'url': '/bill/bid/getInfoBySupplierId', 'method': 'get'},
       bidddingCount:{'url': '/bill/bidding/getMyBiddingListCount', 'method': 'get'},
       freightDemand:{'url': '/bill/freightDemand/save', 'method': 'post'},
    },

    freight:{
      freightDemand:{'url': '/bill/freightDemand/detail', 'method': 'get'},
      freightMyList:{'url': '/bill/freightDemand/myList/page', 'method': 'get'},
      InfoByOrderId:{'url': '/bill/freightDemand/getDemandInfoByOrderId', 'method': 'get'},
      cancel:{'url': '/bill/freightDemand/cancel', 'method': 'post'},
      setSelected:{'url': '/bill/freightOffer/setSelected', 'method': 'post'},
      freightList:{'url': '/bill/freightDemand/list/page', 'method': 'get'},
      getPageList: {'url': '/bill/freightDemand/getPageListBySupplierId/page', 'method': 'get'},
    },
    /**
     * @description 货物需求报价
     */
    freightOffer:{
      offerMyList:{'url': '/bill/freightOffer/myList/page', 'method': 'get'},
      offerList:{'url': '/bill/freightOffer/list', 'method': 'get'},
      freightListpage:{'url': '/bill/freightOffer/list/page', 'method': 'get'},
      save:{'url': '/bill/freightOffer/save', 'method': 'post'},
    },
    /**
     * @description 周计划
     */
    week: {
        getWeek: '/bill/getWeekPlannedByMember'
    },
     /**
     * @description 周计划
     */
    month: {
      freightListpage:{'url': '/bill/myMonthPlanned/page', 'method': 'get'},
      MonthPlannedByYearPlanId:{'url': '/bill/getMonthPlannedByYearPlanId', 'method': 'get'},
      yeardetail: { 'url': '/bill/yearPlanned/detail', 'method': 'get'},
      monthadd: { 'url': '/bill/monthPlanned', 'method': 'post'},
      monthedit: { 'url': '/bill/monthPlanned', 'method': 'PUT'},
    },

  /**
   * @description 商品(物性表)
   */
  product: {
    productlist: '/item/goods/list/page',
    productdetail: '/item/goods/sku/info',
    skuInfoBIddetail: '/item/goods/querySkuInfoById',
    productgoods: {'url': '/item/goods/list/page', 'method': 'get'},
    skuInfoBId: {'url': '/item/goods/querySkuInfoById', 'method': 'get'},
    inspectionCheck: '/item/inspection_sheet/list/page',
    demandadd: '/bill/goodsDemand/add',
    // goodsHot: '/item/goods/hotGoods',
    goodsHot: {'url': '/item/goods/hotGoods', 'method': 'get'},
    categoryList: {'url': '/item/category/list', 'method': 'get'},
    cateHot: {'url': '/item/category/hotCate', 'method': 'get'},
    // attrlist: '/item/spec/value'
    attrlist: {'url': '/item/spec/value', 'method': 'get'},
    goodslist: {'url': '/item/goods/list/page', 'method': 'get'},
  },
  /**
   * @description 质检单(表)
   */
  inspection:{
    inspectionlist:'/item/inspection_sheet/list',  //质检单列表
    //inspectionlistPage:'/item/inspection_sheet/list/page',  //质检单列表(分页)
    inspectionlistPage: {'url': '/item/inspection_sheet/list/page', 'method': 'get'},  //质检单列表(分页)
  },
  /**
   * @description 导航
   */
  navigation: {
    getNavList: {'url':'/web/nav/list','method':'get'},
    navlist: '/web/nav/list',
    navdetail: '/web/nav/detail'
  },
  /**
   * @description 系统
   */
  sysconf: {
    cooperativeBrand: '/web/coobrand/page',  //网站合作品牌
    friendlink: '/web/friendlink/list', //友情链接
    getFriendLink: {'url':'/web/friendlink/list','method':'get'}, //友情链接
    systemcof: '/web/config/getAll',
    getSysConfig: {'url':'/web/config/getAll', 'method':'get'},
    getConfigValues: '/web/config/getValues',

  },
  /**
   * @description 广告位管理
   */
  ad: {
    adposition: '/web/ad/list',
		getAdList:{'url':'/web/ad/list', 'method':'get'}
  },
  /**
   * @description 资金管理
   */
  capital: {
    myCapital: {'url': '/user/m/capital/self', 'method':'get'},
    capitalinfo: '/user/m/capital/self',
    capitaldetail: '/bill/getFundByCompanyName'
  },
    /**
     * @description 物流找车
     */
    logistics: {
        warehouseList: '/item/warehouse/list',
        erpCategoryList: '/item/category/sysMiddleCate',
        searchFreightFee: '/bill/freightList/searchFreightFee'
    },
  /**
   * @description 运费
   */

  extra:{
    extraDetail:'/bill/freightList/orderFreightInfo',
  },
}

export default {
  api: api,
  prefix: '/api'
}
