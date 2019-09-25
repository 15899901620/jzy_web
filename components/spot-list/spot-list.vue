<template>
  <div class="hotspot">
    <div class="XhlistTitle">
      <span style="width: 10%;">品种</span>
      <span style="width: 16%;">牌号</span>
      <span style="width: 16%;">厂商</span>
      <span style="width: 10%;">交货仓</span>
      <span style="width: 6%;">包装方式</span>
      <span style="width: 9%;">剩余数量（吨）</span>
      <span style="width: 9%;">单价（元/吨）</span>
      <span style="width: 8%;">距下架时间</span>
      <span style="width: 7%;">提货期限</span>
      <span style="width: 12%;">操作</span>
    </div>
    <ul class="Xhlist">
      <template v-if="$store.state.spot.spotList.length>0">
        <li v-for="(item, index) in $store.state.spot.spotList" :key="index">
          <span style="width: 10%;">{{item.category_name}}</span>
          <span style="width: 16%;">{{item.sku_name}}</span>
          <span
              style="width: 16%;white-space:nowrap;text-overflow:ellipsis;word-break:keep-all;overflow: hidden;">{{item.manufacturer}}</span>
          <span style="width: 10%;">{{item.warehouse_name}}</span>
          <span style="width: 6%;" v-if='item.packing_modes=="1"'>标准包装</span>
          <span style="width: 6%;" v-else>非标准包装</span>
          <span style="width: 9%;">{{item.available_num}}</span>
          <span v-if="$store.state.memberToken" class="orangeFont"
                style="width: 11%;position:relative;text-align:right;padding-right:18px;">
                    <Tag v-if="item.is_jry" color="error"
                         style="padding:1px 5px;line-height:20px;float:left;position:absolute;left:5px;top:-3px;">易</Tag>
                    <i style="padding-left:30px;">{{item.finalPriceFormat}}</i>
                </span>
          <span v-else class="orangeFont" style="width: 9%;" title="登录后查看">{{item.finalPriceFormat}}</span>
          <span style="width: 8%;">
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
            <div
                v-if="($store.state.memberToken && item.available_num < item.delivery_min) || item.on_sale != 1"
                style="color: white;background: gray; cursor: pointer;width: 76px;line-height: 30px;margin: 0 auto; border-radius: 3px;">下单</div>
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

    <Modal v-model="ISlogin" width="400">
      <p slot="header" style="color:#666;text-align:left">
        <Icon type="ios-information-circle"></Icon>
        <span>提示</span>
      </p>
      <div style="text-align:center; font-size:14px;">
        <p>你未登录会员无法下单，请您登录后再下单！</p>
      </div>
      <div slot="footer">
        <Button type="primary" :loading="modal_loading" @click="goLogin">去登录</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
	import {getCookies} from '../../config/storage'
	import TimeDown from '../../components/timeDown'

	export default {
		name: 'SpotList',
		components: {
			TimeDown
		},
		data() {
			return {
				modal_loading: false,
				ISlogin: false
			}
		},

		methods: {
			addOrder(id) {
				location.href='/spot/order/'+id
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
