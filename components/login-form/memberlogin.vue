<template>
  <div class="memberlogin">
    <Form ref="loginform" :model="loginform" :rules="ruleCustom">
      <Row :gutter="24" index="">
        <Col span="24">
          <FormItem prop="username">
            <Input v-model="loginform.username" max="11" placeholder="手机号"/>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="24" index="">
        <Col span="24">
          <FormItem prop="slidecode">
            <slide-verify @onChange="onTime" :width="260"></slide-verify>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="24" index="">
        <Col span="24">
          <FormItem prop="mobilecode">
            <Input v-model="loginform.mobilecode" autocomplete="off" placeholder="短信验证码"/>
          </FormItem>
          <Button type="text" class="butGetCode" :disabled='this.btnBoolen' v-on:click="getNoteValue">
            {{this.btnValue}}
          </Button>
        </Col>
      </Row>
      <Row :gutter="24" index="">
        <Col span="24">
          <FormItem prop="password">
            <Input v-model="loginform.password" type="password" @keyup.enter.native="LoginForm" placeholder="登录密码"/>
          </FormItem>
        </Col>
      </Row>
      <Button type="primary" long v-on:click="LoginForm">登录</Button>
      <Row :gutter="24" index="">
        <Col span="12" style="text-align:left; margin:10px auto;">
          <a href="/forgotpwd?type=users">忘记密码</a>
        </Col>
        <Col span="12" style="text-align:right; margin:10px auto;">
          <a href="/register?type=users">注册新账号</a>
        </Col>
      </Row>
    </Form>
  </div>
</template>

<script>
	import {manageLogin, getGainuserInfor, userLoginCodeSend, userPhoneCheck} from '../../api/users'
	import Cookies from 'js-cookie'
	import {mapState, mapMutations, mapActions, mapGetters} from 'vuex';
	import {parse, stringify} from 'qs'
	import SlideVerify from '../slide-verify'

	export default {
		name: "login",
		components: {
			SlideVerify
		},
		data() {
			const validatePhone = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('手机号不能为空'));
				} else {
					if (this.loginform.username.length != 11) {
						callback(new Error('请正确填写手机号，需是11位！'));
					} else {
						var myreg = /^0?(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;
						if (!myreg.test(this.loginform.username)) {
							callback(new Error('请正确填写手机号'));
						} else {
							callback();
						}
					}
				}
			};
			const validateSlide = (rule, value, callback) => {
			  console.log("value",value)
				if (value === 0) {
					callback(new Error('请滑动完成验证'));
				} else {
					callback();
				}
			};
			return {
				NameCheck: false,
				passwordTip: false,
				cphone: false,
				passwordName: '',
				auth_time: 0,
				loginform: {
					username: '',
					mobilecode: '',
					password: '',
					slidecode: 0
				},
				btnValue: "发送验证码",
				btnBoolen: false,
				btnClassName: "btn",
				second: 60,
				ruleCustom: {
					username: [
						{validator: validatePhone, trigger: 'blur'}
					],
					slidecode: [
						{validator: validateSlide, trigger: 'blur'}
					]
				}
			};
		},
		computed: {
			...mapState([
				'slidecode'
			])
		},
		methods: {
			...mapMutations('login', [
				'updateUserInfof'
			]),
			onTime(res) {
			  console.log("res",res)
				if (res) {
					this.loginform.slidecode = res
				} else {
					this.$Modal.warning({
						title: '提示',
						content: '验证失败！',
						duration: 5,
						styles: 'top:300px'
					});
				}
			},
			async LoginForm() {
			  console.log("***LoginForm***")
				if (!this.loginform.username) {
					this.$Modal.info({
						title: '提示',
						content: '手机号不能为空!'
					});
					return false
				}
				if (!this.loginform.slidecode) {
					this.$Modal.info({
						title: '提示',
						content: '滑块验证未完成!'
					});
					return false
				}
				if (!this.loginform.mobilecode) {
					this.$Modal.info({
						title: '提示',
						content: '验证码不能为空!'
					});
					return false
				}
				if (!this.loginform.password) {
					this.$Modal.info({
						title: '提示',
						content: '密码不能为空!'
					});
					return false
				}
				var myreg = /^0?(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;
				if (!myreg.test(this.loginform.username)) {
					this.$Modal.info({
						title: '提示',
						content: '手机号格式不正确!'
					});
					return false
				} else {
					this.NameCheck = false
					let params = {
						username: this.loginform.username.replace(/^\s+|\s+$/g, ""),
						code: this.loginform.mobilecode,
						password: this.loginform.password.replace(/^\s+|\s+$/g, "")
					}
					const res = await manageLogin(this, params)
					if (res.data.data === null && res.status === 200) {
						this.$Modal.info({
							title: '提示',
							content: '账号密码或验证码错误！'
						});
						return false
					} else {
						var authres = res.data
						if (res.status === 200 && authres) {
							let expires = new Date((new Date()).getTime() + 5 * 60 * 60000);
							Cookies.set('webtoken', authres, {expires: expires})
							const res = await getGainuserInfor(this, {})
							if (res.status === 200 && res.data) {
								let auth = stringify(res.data)
								Cookies.set('userinfor', auth, {expires: expires})
								Cookies.set('memberInfo', res.data, {expires: expires})
								this.updateUserInfof(res.data)
                                  location.href = '/'
								//this.$router.push({name: 'index'})
							} else {
								this.passwordTip = true
								this.passwordName = '登录失败请与管理员联系！'
								return
							}
						}
					}
				}
			},
			//忘记密码
			ForgotPassword() {
				this.$router.push({name: 'ForgotPassword-ForgotPassword', query: {params: 'Member'}})
			},
			//跳转注册页面
			Register() {
				this.$router.push({name: 'register-supplyRegister'})
			},
			//获取短信验证码
			async getNoteValue() {
				const that = this
				this.$refs.loginform.validate((valid) => {
					if (valid) {
						//正常情况下，检查是否已经是注册用户，如何不是中断不发送
						let params = {
							phone: that.loginform.username
						}
						let isPhone = true
						userPhoneCheck(that, params).then(function (res) {
							if (res.data === false) {
								that.cphone = true
								that.$Modal.info({
									title: '提示',
									content: '该账号尚未注册，请您先注册'
								});
								return false
							} else {
								//发送
								let data = {
									phone: that.loginform.username
								}
								userLoginCodeSend(that, data).then(function (res) {
									if (res.status === 200 && res.data) {
										let countdown = 60
										var timer = setInterval(() => {
											countdown = countdown - 1
											if (countdown <= 0) {
												clearInterval(timer)
												that.btnBoolen = false;
												that.btnClassName = "btns"
												that.btnValue = "发送验证码"
											} else {
												that.btnBoolen = true;
												that.btnValue = `已发送(${countdown})S`
												that.btnClassName = "btn"
											}
										}, 1000)
									} else {
										that.$Modal.info({
											title: '提示',
											content: '短信发送失败'
										});
									}
								})
							}
						})
					}
				})
			}
		},
		mounted() {

			// this.updateUserInfof('11111')
		}
	}
</script>

<style lang="less" scoped>
  .memberlogin {

    .butGetCode {
      position: absolute;
      right: 15px;
      z-index: 1111;
      line-height: 14px;
      margin-top: 2px;
      top: 1px;
      border-left: 1px solid #ddd;
    }

    .ivu-form-item {
      margin-bottom: 20px;
    }

    .ivu-form-item-error-tip {
      padding-top: 4px;
    }
  }
</style>
