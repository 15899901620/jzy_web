export default {
  /**
   * @description 存储在浏览器中的缓存过期时间
   * @type (mm) 毫秒
   */
  TIMEOUT: 10000,
  /**
   * @description 配置显示在浏览器标签的title
   */
  title: '巨正源管理后台',

  /**
   * 默认表单条数
   */
  defaultStrip: 20,

  /**
   *
   */
  dropDown: [12, 20, 50, 100, 200, 300],

  /**
   * @description token在Cookie中存储的天数，默认1天
   */
  cookieExpires: 5,

  /**
   * @description api请求基础路径
   */
  BASE_URL: {
    // dev: 'https://www.easy-mock.com/mock/5add9213ce4d/0e69998a6f51/iview-admin/',
    // dev: 'http://rap2api.taobao.org/app/mock/177310/',
    dev: 'http://192.168.40.31:10010/',
    pro: 'https://192.168.40.14:8000/'
  },

}
