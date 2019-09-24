import utils from '~/utils/utils'

export default function ({route, store, req, res, redirect}) {
	let isClient = process.client
	let redirectURL = '/login'
	let token, path, userInfo

	//在客户端判读是否需要登陆
	if (isClient) {
		path = route.path
		token = utils.getSupperTokenInClient()
		userInfo = utils.getSupperInfoInClient()
	}else{
		token = utils.getSupperTokenInServer(req)
		userInfo = utils.getSupperInfoInServer(req)
	}
	if (path) {
		redirectURL = '/login?ref=' + encodeURIComponent(path)
	}
	//需要进行权限判断的页面开头
	if (!token || (userInfo && userInfo.roleType != 4)) {
		redirect(redirectURL)
	}
}