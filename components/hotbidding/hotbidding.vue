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
            <div class="endTime endTimebg" v-if="items.statusType == '1'">
              <!--距开始时间 :-->
              <TimeDown :timeStyleType="2" :endTime="items.realEndTime" dayShow hoursShow endMsg="已开始"
                        :onTimeOver="reloadPage"></TimeDown>
            </div>
            <div class="endTime endTimebg" v-if="items.statusType == '2'">
              <!--距结束时间 :-->
              <TimeDown :timeStyleType="2" :endTime="items.beginTime" dayShow hoursShow endMsg="已结束"
                        :onTimeOver="reloadPage"></TimeDown>
            </div>
            <div class="endTime graybg" v-if="items.statusType == '3'">
              竞拍结束
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
            <div class="Timebtn beginbg" v-if="items.statusType == '1'" @click="acutionDetail(items.id)">正在竞拍</div>
            <div class="Timebtn orangebg" v-if="items.statusType == '2'" @click="acutionDetail(items.id)">即将开始</div>
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
				this.$router.push({name: 'bidders-detail-id', params: {id: id}})
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

<style>

</style>
