<template>
  <!-- 倒计时组件 -->
  <div style="display: inline-block;">
    <template class="downTime-wrapper">
      <!-- 这里是显示还未结束时的内容 -->
      <div :class='[timeStyleType==2?"wrapper2":"",timeStyleType==3?"wrapper3":""]' v-show="!isStop" v-html="displayStr">

      </div>
      <!-- 这里是显示结束后的内容 -->
      <span class="second" v-show="isStop">{{clocker}}</span>
    </template>
  </div>
</template>

<script>
export default {
	name: 'downTime',

	props: { // 接收父组件传递过来的参数,这里传了  结束时间 - 开始时间 - 结束后显示的内容
		formatStr: {
			type: String,
			default: '{H} : {M} : {S}'
		},
		timeStyleType: {
			type: Number,
			default: 1
		},
		endTime: {
			type: String,
		},
		currTime: {
			type: String,
		},
		endMsg: {
			type: String
		},
	},

	data() {
		return {
			isStop: false, // 控制显示结束或还未结束显示的内容
			clocker: '', // 结束后显示的内容
			timeObj: null, // 时间对象,下方会用到
			myDay: 0, // 我定义来接收计算出来的 天 的
			myHours: 0, // 我定义来接收计算出来的 小时 的
			myMinutes: 0, // 我定义来接收计算出来的 分钟 的
			mySeconds: 0, // 我定义来接收计算出来的 秒钟 的

			t: ''
		}
	},
	computed: {
		displayStr: function () {
			if (this.formatStr) {
				if (this.timeStyleType != '0') {
					let rs = this.formatStr.replace(new RegExp("\\{D\\}", "g"), '<span class="day">' + this.myDay + '</span>')
					rs = rs.replace(new RegExp("\\{H\\}", "g"), '<span class="hour">' + this.myHours + '</span>')
					rs = rs.replace(new RegExp("\\{M\\}", "g"), '<span class="minute">' + this.myMinutes + '</span>')
					rs = rs.replace(new RegExp("\\{S\\}", "g"), '<span class="second">' + this.mySeconds + '</span>')
					return rs
				} else {
					//自定义样式
					let rs = this.formatStr.replace(new RegExp("\\{D\\}", "g"), this.myDay)
					rs = rs.replace(new RegExp("\\{H\\}", "g"), this.myHours)
					rs = rs.replace(new RegExp("\\{M\\}", "g"), this.myMinutes)
					rs = rs.replace(new RegExp("\\{S\\}", "g"), this.mySeconds)
					return rs
				}
			}
		}
	},
	methods: {
		restart() {
			let self = this
			if (this.t) {
				clearTimeout(this.t)
			}

			if (this.endTime) {
				let nowTime = new Date().getTime()
				if (this.currTime) {
					nowTime = new Date(Date.parse(this.currTime.replace(/-/g, "/"))).getTime()
				}
				let end = new Date(Date.parse(this.endTime.replace(/-/g, "/"))).getTime()
				// 计算时间差
				let timeLag = (end - nowTime) / 1000
				// 判断当前是否时分秒的值是否大于10
				let add = num => {
					return num < 10 ? '0' + num : num
				}
				// 时间倒计时运算的方法
				let timeFunction = () => {
					let time = timeLag--
					this.timeObj = { // 时间对象
						seconds: Math.floor(time % 60),
						minutes: Math.floor(time / 60) % 60,
						hours: Math.floor(time / 60 / 60) % 24,
						days: Math.floor(time / 60 / 60 / 24)
					}
					// 计算出时分秒
					this.myDay = this.timeObj.days
					this.myHours = `${add(this.timeObj.hours)}`
					this.myMinutes = `${add(this.timeObj.minutes)}`
					this.mySeconds = `${add(this.timeObj.seconds)}`
					// 当时间差小于等于0时,停止倒计时
					if (time <= 0) {
						this.isStop = true
						this.clocker = this.endMsg || '已结束'
						self.$emit('onTimeOver', '')
					} else {
						this.t = setTimeout(function () {
							timeFunction();
						}, 1000)
					}
				}
				// 开始执行倒计时
				timeFunction()
			}
		}
	},
	mounted() {
		this.restart()
	},
	watch: {
		endTime: function (e) {
			this.restart()
		},
		downTime: function (e) {
			this.restart()
		}
	}
}
</script>

<style lang="scss">
  .downTime-wrapper {
    .day {
    }

    .hour {
    }

    .minute {
    }

    .second {
    }
  }

  .wrapper2 {
    color: red;

    .day, .hour, .minute, .second {
      color: white;
      padding: 0px 5px;
      border-radius:5px;
      background-color: rgb(235, 62, 61);
    }
  }

  .wrapper3 {
    color: #635959;
    font-weight:bold;

    .day, .hour, .minute, .second {
      color: white;
      padding: 3px 8px;
      border-radius:5px;
      background-color: #635959;
    }
  }
</style>
