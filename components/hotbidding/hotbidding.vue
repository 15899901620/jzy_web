<template>
  <div style="display: flex">
    <a href="/bidders">
      <div class="Time_Banner pr">
        <img src="/img/index_acution.png" style="width: 100%; height: 100%"/>
      </div>
    </a>
    <div class="ovh pr" style="width: 966px" id="parent" >
      <!--      <div class="Time-limited_back position prve" id='prev' :style="{'display':display}">-->
      <!--        <img src="../../static/img/back.png"/>-->
      <!--      </div>-->
      <template v-if="$store.state.bidders.auctionList.length > 0">
        <ul class="Time-limited_list" :style="{backgroundColor:bgColor,width:TLlength+'px'}" id='TimeL-ul'>
          <li ref="elememt" v-for="(items, index) in $store.state.bidders.auctionList" :key="index">
            <div class="endTime endTimebg dflexAlemJust" v-if="items.statusType == '1'">
              <div class="imgLogo"><img src="/img/cutDown_icon_orange.png"/></div>
              <!--距开始时间 :-->
              <TimeDown :currTime="items.currTime" :timeStyleType="2" :endTime="items.realEndTime" endMsg="已开始"
                        :onTimeOver="reloadPage"></TimeDown>
            </div>
            <div class="endTime endTimebg dflexAlemJust" v-if="items.statusType == '2'">
              <div class="imgLogo"><img src="/img/cutDown_icon_orange.png"/></div>
              <!--距结束时间 :-->
              <TimeDown :currTime="items.currTime" :timeStyleType="2" :endTime="items.beginTime" endMsg="已结束"
                        :onTimeOver="reloadPage"></TimeDown>
            </div>
            <div class="endTime graybg dflexAlemJust" v-if="items.statusType == '3'">
              <div class="imgLogo"><img src="/img/newsTime.png"/></div>
              <div>竞拍结束</div>
            </div>
            <h3 class="fs16 fwb mt10">{{items.skuName}}</h3>
            <div class="limitedPrice">
              <span class="fs18" style="color: #ff6600;">{{items.finalPriceFormat}}元/吨</span><span
                class="fs14"> 起</span>
            </div>
            <div class="NumStore">
              <span>数量 : {{items.totalNum}}{{items.uomName}}</span>
              <span class="mt3">库区 : {{items.warehouseName}}</span>
              <span class="mt3">开始时间 : {{$utils.dateStrFormat(items.beginTime,'yyyy-MM-dd')}}</span>
            </div>
            <div class="Timebtn orangebg" v-if="items.statusType == '1'" @click="acutionDetail(items.id)">正在竞拍</div>
            <div class="Timebtn beginbg" v-if="items.statusType == '2'" @click="acutionDetail(items.id)">即将开始</div>
            <div class="Timebtn endbg" v-if="items.statusType == '3'" @click="acutionDetail(items.id)">竞拍结束</div>
          </li>
        </ul>
      </template>
      <template v-else>
        <ul>
          <li style="text-align: center;padding-top: 100px;font-size: 14px;color: #ccc;">暂无任何信息！</li>
        </ul>
      </template>
      <!--      <div class="Time-limited_next position prve" id='next' :style="{'display':display}">-->
      <!--        <img src="../../static/img/next.png"/>-->
      <!--      </div>-->
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
			reloadPage() {
				location.href.reload()
			},
			acutionDetail(id) {
				location.href = '/bidders/detail/' + id
			}
		},
		created() {

		},
		mounted() {
		},
		destoryed() {
		}
	}
</script>

<style lang="less">
  .imgLogo{
    display: flex;align-items: center;
    width: 15px;
    height: 15px;
    margin-right: 3px;
    img{
      width: 100%;
    }
  }
</style>
