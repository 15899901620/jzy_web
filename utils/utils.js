import Cookie from 'js-cookie'
import server from "../config/api";

export default {
//获取服务端cookie
	getCookiesInServer: function (req) {
		let service_cookie = {};
		req && req.headers.cookie && req.headers.cookie.split(';').forEach(function (val) {
			let parts = val.split('=');
			service_cookie[parts[0].trim()] = (parts[1] || '').trim();
		});
		return service_cookie;
	},
//获取客户端cookie
	getCookiesInClient: function (key) {
		return Cookie.get(key) ? Cookie.get(key) : ''
	},
	setCoolies: function (key, value, attributes) {
		Cookie.set(key, value, attributes)
	},
	getMemberTokenInVm: function (vm) {
		return vm.$cookies.get('webtoken') || ''
	},
	getMemberTokenInServer: function (req) {
		let cookies = this.getCookiesInServer(req)
		return cookies.webtoken ? cookies.webtoken : ''
	},
	getMemberTokenInClient: function () {
		return this.getCookiesInClient('webtoken')
	},
	getMemberInfoInServer: function (req) {
		let cookies = this.getCookiesInServer(req)
		return cookies.memberInfo ? JSON.parse(decodeURIComponent(cookies.memberInfo)) : ''
	},
	getMemberInfoInClient: function () {
		let info = this.getCookiesInClient('userinfor')
		return info ? info : ''
	},
	memberLogout: function () {
		Cookie.set('memberInfo', '')
		Cookie.set('userinfor', '')
		Cookie.set('webtoken', '')
		Cookie.set('websuppliertoken', '')
		location.href='/'
	},

	getSupperTokenInServer: function (req) {
		let cookies = this.getCookiesInServer(req)
		return cookies.websuppliertoken ? cookies.websuppliertoken : ''
	},
	getSupperTokenInClient: function () {
		return this.getCookiesInClient('websuppliertoken')
	},
	getSupperInfoInServer: function (req) {
		let cookies = this.getCookiesInServer(req)
		return cookies.supplierInfor ? JSON.parse(decodeURIComponent(cookies.supplierInfor)) : ''
	},
	getSupperInfoInClient: function () {
		let info = this.getCookiesInClient('supplierInfor')
		return info ? JSON.parse(decodeURIComponent(info)) : ''
	},

	timeBetween : function(beginTime, endTime) {
		if(!beginTime || !endTime){
			return ''
		}
		let minute = 1000 * 60      //把分，时，天，周，半个月，一个月用毫秒表示
		let hour = minute * 60
		let day = hour * 24
		let week = day * 7
		let month = day * 30
		beginTime = new Date(beginTime.replace(/-/g,"/"))
		endTime = new Date(endTime.replace(/-/g,"/"))
		let diffValue = endTime - beginTime//时间差
		if(diffValue < 0){
			return;
		}
		let minC = diffValue/minute;  //计算时间差的分，时，天，周，月
		let hourC = diffValue/hour;
		let dayC = diffValue/day;
		let weekC = diffValue/week;
		let monthC = diffValue/month;
		let result
		if(monthC >= 1 && monthC <= 3){
			result = " " + parseInt(monthC) + "月"
		}else if(weekC >= 1 && weekC <= 3){
			result = " " + parseInt(weekC) + "周"
		}else if(dayC >= 1 && dayC <= 6){
			result = " " + parseInt(dayC) + "天"
		}else if(hourC >= 1 && hourC <= 23){
			result = " " + parseInt(hourC) + "小时"
		}else if(minC >= 1 && minC <= 59){
			result =" " + parseInt(minC) + "分钟"
		}else if(diffValue >= 0 && diffValue <= minute){
			result = "刚刚"
		}
		return result
	},
	amountFormat: function(amount, sign){
		sign = sign || '￥'
		return sign + parseFloat(amount).toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,'$&,')
	},
	dateFormat(date, fmt) {
		if (/(y+)/.test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
		}
		let o = {
			'M+': date.getMonth() + 1,
			'd+': date.getDate(),
			'h+': date.getHours(),
			'm+': date.getMinutes(),
			's+': date.getSeconds()
		};
		for (let k in o) {
			if (new RegExp(`(${k})`).test(fmt)) {
				let str = o[k] + '';
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : ('00' + str).substr(str.length));

			}
		}
		return fmt;
	},
	moneyFormat(n){
        if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n)){
            return ''
        }
            
        var unit="仟佰拾亿仟佰拾万仟佰拾圆角分",str="";
              n += "00";
        var p= n.indexOf('.');
        if(p >=0)
            n=n.substring(0,p)+n.substr(p+1,2);

            unit=unit.substr(unit.length-n.length);

            for(var i=0; i<n.length; i++)
            str +='零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i))+unit.charAt(i);
            return str.replace(/零(仟|佰|拾|角)/g,"零").replace(/(零)+/g,"零").replace(/零(万|亿|圆)/g,"$1").replace(/(亿)万|壹(拾)/g, "$1$2").replace(/^圆零?|零分/g,"").replace(/圆$/g,"圆整");
    },
	dateStrFormat(dateStr, fmt) {
		let date = new Date(Date.parse(dateStr.replace(/-/g, "/")))
		return this.dateFormat(date, fmt)
	},
	reload(){
		location.reload(true)
	},
	sendCurl(vm, apiName, params, isMember){
		isMember = isMember || true
		let authorization = ''

		if(isMember){
			if(process.server){
				authorization = this.getMemberTokenInVm(vm)
			}else{
				authorization = this.getMemberTokenInClient()
			}
		}else{
			authorization = vm.store.state.supplierToken
		}
		if(authorization === false){
			vm.$axios.defaults.headers = {
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
			}
		}else{
			vm.$axios.defaults.headers = {
				'Authorization': authorization,
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
			}
		}

		return vm.$axios.request({
			url: server.prefix + apiName.url,
			method: apiName.method,
			params: {
				...params
			}
		})
	}
}
