import Cookie from 'js-cookie'

export default {
//获取服务端cookie
	getCookiesInServer: function (req) {
		let service_cookie = {};
		req && req.headers.cookie && req.headers.cookie.split(';').forEach(function (val) {
			let parts = val.split('=');
			service_cookie[parts[0].trim()] = (parts[1] || '').trim();
		});
		return service_cookie;
	}
	,
//获取客户端cookie
	getCookiesInClient: function (key) {
		return Cookie.get(key) ? Cookie.get(key) : ''
	}
	,
	setCoolies: function (key, value, attributes) {
		Cookie.set(key, value, attributes)
	}
	,
	getMemberTokenInServer: function (req) {
		let cookies = this.getCookiesInServer(req)
		return cookies.webtoken ? cookies.webtoken : ''
	}
	,
	getMemberTokenInClient: function () {
		return this.getCookiesInClient('webtoken')
	}
	,
	getMemberInfoInServer: function (req) {
		let cookies = this.getCookiesInServer(req)
		return cookies.memberInfo ? JSON.parse(decodeURIComponent(cookies.memberInfo)) : ''
	}
	,
	getMemberInfoInClient: function () {
		let info = this.getCookiesInClient('userinfor')
		return info ? info : ''
	}
	,
}