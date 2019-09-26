<template>
  <div style="display: flex">
      <a   href="/bidders">
    <div class="Time_Banner pr">
      <img src="/img/Time_banner.jpg"/>

    </div>
      </a>
    <div class="ovh pr" style="width: 966px" id="parent" @mouseenter="mouseEnter" @mouseleave="mouseLeave">
      <div class="Time-limited_back position prve" id='prev' :style="{'display':display}">
        <img src="../../static/img/back.png"/>
      </div>
      <template v-if="$store.state.bidders.auctionList.length > 0">
        <ul class="Time-limited_list" :style="{backgroundColor:bgColor,width:TLlength+'px'}" id='TimeL-ul'>
          <li ref="elememt" v-for="(items, index) in $store.state.bidders.auctionList" :key="index">
            <div class="endTime endTimebg" v-if="items.type===1">
              <!--距开始时间 :-->
              <TimeDown :timeStyleType="2" :endTime="items.beginTime" dayShow hoursShow endMsg="" :onTimeOver="reloadPage"></TimeDown>
            </div>
            <div class="endTime endTimebg" v-if="items.type===2">
              <!--距结束时间 :-->
              <TimeDown :timeStyleType="2" :endTime="items.reservationEndTime" dayShow hoursShow endMsg="" :onTimeOver="reloadPage"></TimeDown>
            </div>
            <div class="endTime graybg" v-if="items.type===3">
              竞拍结束
            </div>
            <h3 class="fs16 fwb mt20">{{items.manufacturer}} {{items.skuName}}</h3>
            <div class="limitedPrice">
              <span class="fs14">起拍价 : </span><span class="fs18" style="color: #ff6600;">{{items.startPrice}}元/吨</span>
            </div>
            <div class="NumStore">
              <span>数量 : {{items.totalNum}}吨</span>
              <span>库区 : {{items.warehouseName}}</span>
            </div>
            <div class="Timebtn beginbg" v-if="items.type===1" @click="acutionDetail(items.id)">即将开始</div>
            <div class="Timebtn orangebg" v-if="items.type===2" @click="acutionDetail(items.id)">竞拍中</div>
            <div class="Timebtn endbg" v-if="items.type===3" @click="acutionDetail(items.id)">竞拍结束</div>
          </li>
        </ul>
      </template>
      <template v-else>
        <ul>
          <li>暂无任何信息！</li>
        </ul>
      </template>
      <div class="Time-limited_next position prve" id='next' :style="{'display':display}">
        <img src="../../static/img/next.png"/>
      </div>
    </div>
  </div>
</template>

<script>
	import TimeDown from '../../components/timeDown'
	const prefixCls = 'ant-hotbidding'

	export default {
		name: 'hotbidding',
		components: {
			TimeDown
		},
		data() {
			return {
				display: "none",
				TLlength: '',
				bgColor: '#fff',
				indexAuction: {},
				actEndTimeList: [],
				countDownList: []
			}
		},
		computed: {
			classes() {
				return [
					`${prefixCls}`,
					{[`${prefixCls}-hotbidding`]: this.vertical},
				];
			},
		},
		methods: {
			reloadPage(){
				location.href.reload()
      },
			mouseEnter() {
				var ul = document.getElementById('TimeL-ul')
				var li = ul.getElementsByTagName('li')
				if (li.length >= 5) {
					this.display = "flex";
				} else {
					this.display = "none";
				}
			},
			mouseLeave() {
				this.display = "none";
			},
			acutionDetail(id) {
				this.$router.push({name: 'bidders-detail-id', params: {id: id}})
			}
		},
      created(){

      },
		mounted() {
			if(this.$store.state.bidders.auctionList.length > 0){
			  console.log("auctionList",this.$store.state.bidders.auctionList)
				setTimeout(function () {
					var chefElement = {
						minSpeed: 10,//每次移动的距离
						//获取页面元素
						prev: document.getElementById('prev'),
						next: document.getElementById('next'),
						parent: document.getElementById('parent'),
						ul: document.getElementById('TimeL-ul'),
						li: document.getElementById('TimeL-ul').getElementsByTagName('li'),
						liWidth: document.getElementById('TimeL-ul').getElementsByTagName('li')[0].offsetWidth,
						type: true,
						nextTimer: null,
						prevTimer: null,
						parent_n: null
					}

					chefElement.prev.onclick = function () {
						if (chefElement.type) {
							clearInterval(chefElement.prevTimer);
							chefElement.ul.insertBefore(chefElement.li[chefElement.li.length - 1], chefElement.li[0]);
							chefElement.liWidth = chefElement.li[0].offsetWidth;
							chefElement.ul.style.left = '-' + chefElement.liWidth + 'px';
							chefElement.prevTimer = setInterval(pre, chefElement.animationSpeed);
							chefElement.type = false;
						}
					};
					next.onclick = function () {

						if (chefElement.type) {
							chefElement.liWidth = 0;
							clearInterval(chefElement.nextTimer);
							chefElement.nextTimer = setInterval(nex, chefElement.animationSpeed);
							chefElement.type = false;
						}
					};

					//next动画函数
					function nex() {

						chefElement.ul.style.left = '-' + chefElement.liWidth + 'px';
						chefElement.liWidth += chefElement.minSpeed;
						if (chefElement.liWidth >= chefElement.li[0].offsetWidth) {
							clearInterval(chefElement.nextTimer);
							chefElement.ul.appendChild(chefElement.li[0]);
							chefElement.ul.style.left = 0;
							chefElement.type = true;
						}
					}

					//prev动画函数
					function pre() {

						chefElement.ul.style.left = '-' + chefElement.liWidth + 'px';
						chefElement.liWidth -= chefElement.minSpeed;
						if (chefElement.liWidth <= -1) {
							chefElement.ul.style.left = 0;
							clearInterval(chefElement.prevTimer);
							chefElement.type = true;
						}
					}

// *****限时竞拍******



				}, 2000)
          var that = this
          let TL = document.getElementsByClassName('Time-limited_list')[0].getElementsByTagName('li')

            let TLWidth = TL[0].offsetWidth

            that.TLlength = TL.length * TLWidth

      }
		},
		destoryed() {
			clearTimeout()
		}
	}
</script>

<style>

</style>
