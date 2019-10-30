<template>
  <div class="hotspot">
    <div class="XhlistTitle">
      <span style="width: 7%;">品种</span>
      <span style="width: 13%;">牌号</span>
      <span style="width: 13%;">厂商</span>
      <span style="width: 10%;">交货仓</span>
      <span style="width: 7%;">包装方式</span>
      <span style="width: 10%;">剩余数量（吨）</span>
      <span style="width: 11%;">单价（元/吨）</span>
      <span style="width: 10%;">距下架时间</span>
      <span style="width: 7%;">提货期限</span>
      <span style="width: 12%;">操作</span>
    </div>
    <ul class="Xhlist">
      <template v-if="$store.state.spot.spotList.length>0">
        <li v-for="(item, index) in $store.state.spot.spotList" :key="index">
          <span style="width: 7%;">{{item.category_name}}</span>
          <span style="width: 13%;">{{item.sku_name}}</span>
          <span
              style="width: 13%;white-space:nowrap;text-overflow:ellipsis;word-break:keep-all;overflow: hidden;">{{item.manufacturer}}</span>
          <span style="width: 10%;">{{item.warehouse_name}}</span>
          <span style="width: 7%;" v-if='item.packing_modes=="1"'>标准包装</span>
          <span style="width: 7%;" v-else>非标准包装</span>
          <span style="width: 10%;">
             <span style="position: relative">{{item.available_num}}
                  <i :title="`限购${item.limit_num}`" v-if="item.available_num > 0 && item.limit_num > 0" style="padding: 0 4px;position: absolute; top: -10px; right: -22px;"><img src="../../static/img/A01.png"/></i>
                  </span>
          </span>
          <span v-if="$store.state.memberToken" class="orangeFont" style="width: 11%;position:relative;text-align:right;padding-right:18px;">
                    <i style="padding-left:30px; position: relative">{{item.finalPriceFormat}}
                        <i v-if="item.is_jry" style="padding: 0 4px;position: absolute; top: -10px; right: -22px;"><img src="../../static/img/B02.png"/></i>
                    </i>
                </span>
          <span v-else class="orangeFont" style="width: 11%;" title="登录后查看">{{item.finalPriceFormat}}</span>
          <span style="width: 10%;">
            <template v-if="item.available_num == 0">
            已售罄
            </template>
            <template v-else-if="item.on_sale == 2 && item.available_num > 0">
            已失效
            </template>
            <template v-else>
              <TimeDown :endTime="item.price_valid_time" hoursShow endMsg="已失效" :onTimeOver="reloadPage"></TimeDown>
            </template>
          </span>
          <span style="width: 7%;">{{item.delivery_deadline}}</span>

          <span style="width: 12%;">
            <div v-if="$store.state.memberToken && (item.available_num < item.min_order || item.on_sale != 1)"
                style="color:#c3c3c3;background:#e7e7e7;cursor:pointer;width:50px;line-height:26px;margin:0 auto;border-radius:3px;">下单</div>
            <div v-else-if="$store.state.memberToken && item.available_num > 0" class="ListBtn"
                 @click="addOrder(item.id)">下单</div>
            <div v-else class="ListBtn" @click="goLogin">登录</div>
          </span>
        </li>
      </template>
      <template v-else>
        <li>
          <p style="width:100%; text-align:center; padding:60px;">
            <img src="../../static/img/nodata.png"/>
          </p>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
	import TimeDown from '../../components/timeDown'

	export default {
		name: 'SpotList',
		components: {
			TimeDown,
		},
		data() {
			return {
				modal_loading: false,
			}
		},

		methods: {
			addOrder(id) {
				location.href='/spot/order/' + id
			},
			reloadPage() {
				this.$router.go(0)
			},
			goLogin(){
				location.href='/login'
      },
		},
	}
</script>
<style lang="less" scoped>
  .hotspot {
    width: 100%;
    overflow: hidden;

    .spothead {
      background: #fafafa;
      color: #333;

      .ivu-col {
        padding: 5px 0px;
        line-height: 42px;
        text-align: center;
        font-size: 14px;
      }
    }

    .spotabody {
      color: #666;

      .ivu-col {
        padding: 5px 0px;
        line-height: 38px;
        text-align: center;
        font-size: 14px;
        border-bottom: 1px solid #eee;
      }
    }

    .spotabody:hover {
      background: #fafafa;
    }
  }
</style>
