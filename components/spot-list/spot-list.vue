<template>
  <div class="hotspot">
    <!--<Row :gutter="24" index="0" class="spothead">
      <Col span="2">品种</Col>
      <Col span="4">牌号</Col>
      <Col span="4">厂商</Col>
      <Col span="3">交货仓</Col>
      <Col span="2">包装方式</Col>
      <Col span="2">数量（吨）</Col>
      <Col span="3">单价（元/吨）</Col>
      <Col span="2">距下架时间</Col>
      <Col span="2">提货期限</Col>
      <Col span="2">操作</Col>
    </Row>
    <Row :gutter="24" v-for="(item, index) in $store.state.spot.spotList" :key="index" :index="index+1" class="spotabody">
      <Col span="3">{{item.category_name}}</Col>
      <Col span="4">{{item.sku_name}}</Col>
      <Col span="4">{{item.manufacturer}}</Col>
      <Col span="3">{{item.warehouse_name}}</Col>
      <Col span="2" v-if='item.packing_modes=="1"'>标准包装</Col>
      <Col span="2" v-else>非标准包装</Col>
      <Col span="2">{{item.available_num}}</Col>
      <Col span="3" v-if='$store.state.memberToken'>
        <Tag v-if="item.is_jry" color="error"
             style="padding:1px 5px;line-height:20px;float:left;position:absolute;left:5px;top:-3px;">易</Tag>
        {{item.finalPriceFormat}}
      </Col>
      <Col span="3" v-else>
        {{item.finalPriceFormat}}
      </Col>
      <Col span="2"><TimeDown :endTime="item.price_valid_time" hoursShow endMsg="已失效" :onTimeOver="reloadPage"></TimeDown></Col>
      <Col span="2">{{item.delivery_deadline}}</Col>
      <Col span="2">
        <Button disabled v-if="$store.state.memberToken && item.available_num < item.delivery_min"
                type="primary" size="small">下单</Button>
        <Button v-else-if="$store.state.memberToken && item.available_num > 0"
                type="primary" v-on:click="addOrder(item)" size="small">下单</Button>
        <Button v-else-if="$store.state.memberToken && item.available_num == 0"
                type="primary" disabled size="small">已售完</Button>
        <Button v-else-if="$store.state.memberToken && item.available_num == 0"
                type="primary" size="small" @click="toLogin">登录</Button>
      </Col>
    </Row>-->
    <div class="XhlistTitle">
      <h1 style="width: 10%;">品种</h1>
      <h1 style="width: 16%;">牌号</h1>
      <h1 style="width: 16%;">厂商</h1>
      <h1 style="width: 10%;">交货仓</h1>
      <h1 style="width: 6%;">包装方式</h1>
      <h1 style="width: 9%;">剩余数量（吨）</h1>
      <h1 style="width: 11%;">单价（元/吨）</h1>
      <h1 style="width: 8%;">距下架时间</h1>
      <h1 style="width: 7%;">提货期限</h1>
      <h1 style="width: 7%;">操作</h1>
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
          <span v-else class="orangeFont" style="width: 11%;" title="登录后查看">{{item.finalPriceFormat}}</span>
          <span style="width: 8%;">
            <template v-if="item.on_sale == 2 && item.available_num == 0">
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
          <span style="width: 7%;">
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
          <p style="width:100%; text-align:center">暂无任何有效的报价信息！</p>
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
      mounted(){
		  console.log('spotList',this.$store.state.spot.spotList)
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
