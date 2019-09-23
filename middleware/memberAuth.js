import utils from '~/utils/utils'

export default function ({store, route, req, res, redirect}) {
	let isClient = process.client;
	let redirectURL = '/login';
	var token, path

	token = store.state.memberAuth
	//在客户端判读是否需要登陆
	if (isClient) {
		path = route.path;
	}
	if (path) {
		redirectURL = '/login?ref=' + encodeURIComponent(path)
	}
	//需要进行权限判断的页面开头
	if (!token) {
		redirect(redirectURL)
	}
}