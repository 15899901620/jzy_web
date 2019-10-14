<template>
  <div class="body">
    <Header title="头部"></Header>
    <div class="container" title="">
      <div class="materials_banner">
        <template v-for="(item,index) in $store.state.common.adList.ad4">
          <img :src="item.adImg"/>
        </template>

      </div>
      <div class="w1200" style="margin-top: 20px">
        <div class="titlelist" v-if="partakeList.length > 0">
          我的竞拍
        </div>
        <table class="bidersTable" style="width: 100%; border: 1px solid #dfdfdf;" v-if="partakeList.length > 0">
          <tbody>
          <tr class="table_title" style="">
            <th style="width: 10%">竞拍编号</th>
            <th style="width: 10%">牌号</th>
            <th style="width: 11%">厂商</th>
            <th style="width: 11%">结束倒计时</th>
            <th style="width: 8%">起拍价</th>
            <th style="width: 8%">我的出价</th>
            <th style="width: 6%">出价数量</th>
            <th style="width: 6%">入局数量</th>
            <th style="width: 7%">竞拍状态</th>
            <th style="width: 6%">我的状态</th>
            <th style="width: 7%">操作</th>
          </tr>

          <tr v-for="(item,index) in partakeList">
            <td>{{item.billNo}}</td>
            <td class="blue">{{item.skuName}}</td>
            <td>{{item.manufacturer}}</td>
            <td><TimeDown :timeStyleType="2" :endTime="item.realEndTime" hoursShow endMsg="已结束"
                          :onTimeOver="reloadPage"></TimeDown></td>
            <td>{{$utils.amountFormat(item.finalPrice)}}</td>
            <td>
              <span v-if="item.bidList.length > 0">{{$utils.amountFormat(item.bidList[0].bidPrice)}}</span>
              <span v-else> - </span>
            </td>
            <td>
              <span v-if="item.bidList.length > 0">{{item.bidList[0].bidNum}}</span>
              <span v-else> - </span>
            </td>
            <td>
              <span v-if="item.bidList.length > 0">{{item.bidList[0].selectedNum}}</span>
              <span v-else> - </span>
            </td>
            <td>
              <span v-if="item.statusType == 1">正在竞拍</span>
              <span v-else-if="item.statusType == 2">即将开始</span>
              <span v-else-if="item.statusType == 3">竞拍结束</span>
            </td>
            <td>
              <span v-if="item.bidList.length > 0">
                <span v-if="item.bidList[0].outStatus == 1">领先</span>
                <span v-else-if="item.bidList[0].outStatus == 2">入围</span>
                <span v-else-if="item.bidList[0].outStatus == 3">出局</span>
              </span>
              <span v-else> 未出价 </span>
            </td>
            <td>
              <a :href="`/bidders/detail/${item.id}`"><span class="see">查看</span></a>
            </td>
          </tr>
          </tbody>
        </table>
        <div class="titlelist mt15">
          竞拍列表
        </div>
        <div style="display: flex;">
          <div style="width: 77%">
            <ul class="acuList" v-if="this.auctionTotal > 0">
              <li v-for="(items,index) in this.auctionList" :key="index">
                <div style="display: flex; position: absolute; align-items: center; margin-top: 20px">
                  <template v-if="items.statusType == '1'">
                    <div class="statusicon startauction">正在竞拍</div>
                    <div class="ml20"><span class="gray">距离结束 ：</span>
                      <span class="fs18">
                        <TimeDown :timeStyleType="2" :endTime="items.realEndTime" hoursShow endMsg="已结束"
                                  :onTimeOver="reloadPage"></TimeDown>
                      </span>
                    </div>
                  </template>
                  <template v-if="items.statusType == '2'">
                    <div class="statusicon vcauction">即将开始</div>
                    <div class="ml20"><span class="gray">距离开始 ：</span>
                      <span class="fs18">
                        <TimeDown :timeStyleType="2" :endTime="items.beginTime" hoursShow endMsg="已开始"
                                  :onTimeOver="reloadPage"></TimeDown>
                      </span>
                    </div>
                  </template>
                  <template v-if="items.statusType == '3'">
                    <div class="statusicon endauction">竞拍结束</div>
                    <div class="ml20">
                      <span>竞拍时间 ：</span>
                      <span class="fs16">{{items.beginTime}}</span>
                    </div>
                  </template>

                  <div class="ml50"><span class="gray">竞拍时长：</span>{{$utils.timeBetween(items.beginTime, items.realEndTime)}}</div>
                </div>

                <div class="acuProduct ">
                  <h1 class=" fs20 mt20">{{items.skuName}}</h1>
                  <div class="mt10 fs14 dflex">
                    <div class="btmunv"><span class="iv_title">起拍价</span> ：<span class="orangeFont fwb fs16">{{items.finalPriceFormat}}</span></div>
                    <div class="fs14 dflex">
                      <span class="iv_title">竞拍数量</span> ：<span class="orangeFont fs16">{{items.totalNum}}</span>{{items.uomName}}
                      <template v-if="items.isAll == 1">
                        <span class="orangeFont fs16 ml30">整单</span>
                      </template>
                    </div>
                  </div>
                  <div class="mt10 fs14 dflex">
                    <div class="btmunv"><span class="iv_title">竞拍编号</span> ：<span class=" fs16">{{items.billNo}}</span></div>
                    <div class="fs14 dflex"><span class="iv_title">厂商</span> ：<span class="orangeFont fs16">{{items.manufacturer}}</span></div>
                  </div>

                </div>
                <div class="acuOpear">
                  <div style="display: flex; flex-direction: column; justify-content: center">
                    <span class="mt10 ">库区：{{items.warehouseName}}</span>
                    <span class="mt5">城市：{{items.warehouseProvince}}</span>
                  </div>
                  <template v-if="items.statusType == '1'">
                    <div class="btnStart startauction" @click="BidersDetail(items.id)">
                      <template v-if="items.depositNum > 0">
                        正在竞拍
                      </template>
                      <template v-else-if="items.isFollow > 0">
                        已关注
                      </template>
                      <template v-else>
                        参与竞拍
                      </template>
                    </div>
                  </template>
                  <template v-if="items.statusType == '2'">
                    <div class="btnStart vcauction" @click="BidersDetail(items.id)">即将开始</div>
                  </template>
                  <template v-if="items.statusType == '3'">
                    <div class="btnStart endauction" @click="BidersDetail(items.id)">竞拍结束</div>
                  </template>
                </div>
              </li>

            </ul>
            <p v-else style="background: none; font-size: 20px;text-align: center; margin:80px auto;">
              暂无任何信息！
            </p>
            <div class="  ovh text-xs-center" style="padding: 18px 0; text-align: center;">
              <pages :total="this.auctionTotal" :show-total="showTotal" :value="current_page"
                     :pageSize="page_size"></pages>
            </div>
          </div>

          <div class="" style="width: 24%; margin-left: 1.5%; display: flex; flex-direction: column">
            <!--  竞拍公告-->
            <div class="Notice whitebg mt15">
              <div class="NoticeTitle">
                <span class="fs16">竞拍公告</span><span class="gray freshicon">换一组</span>
              </div>
              <ul class="NoticeList">
                <li>
                  <span style="width: 17%">LLDPE</span>
                  <span
                      style="width: 56%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">中海壳牌约216.0吨</span>
                  <span style="width:16%;" class="gray">09-26</span>
                </li>
                <li>
                  <span style="width: 17%">LLDPE</span>
                  <span
                      style="width: 56%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">中海壳牌约216.0吨</span>
                  <span style="width:16%;">09-26</span>
                </li>
                <li>
                  <span style="width: 17%">LLDPE</span>
                  <span
                      style="width: 56%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">中海壳牌约216.0吨</span>
                  <span style="width:16%;" class="gray">09-26</span>
                </li>
              </ul>
            </div>

            <div class="NoticeTitleAdv">
              <img src="img/advImg.png">
            </div>

          </div>
        </div>
      </div>
    </div>
    <Footer size="default" title="底部" style="margin-top:18px;"></Footer>
  </div>
</template>

<script>
	import {mapState} from 'vuex'
	import Header from '../../components/header'
	import Footer from '../../components/footer'
	import pagination from '../../components/pagination'
	import TimeDown from '../../components/timeDown'

	export default {
		name: 'bidders',
		components: {
			Header,
			Footer,
			pages: pagination.pages,
			TimeDown
		},
		fetch({store, params, query}) {
			return Promise.all([
				//获取顶部、中部、底部导航信息
				store.dispatch('common/getNavList'),
				//获取系统配置
				store.dispatch('common/getSysConfig'),
				//获取友情链接
				store.dispatch('common/getFriendlyList'),
              //获取轮播图
              store.dispatch('common/getBannerList', 4),
              //获取底部帮助分类
				store.dispatch('helper/getHelpCate', {catId: 0, indexShow: 1}),
				//获取竞拍列表
				store.dispatch('bidders/getAuctionList', {current_page: query.page || 1, page_size: 6}),
        //获取用户参与列表
				store.dispatch('bidders/getPartakeList'),
			])
		},
		data() {
			return {
				CurrSelect: 0,
				current_page: parseInt(this.$route.query.page) || 1,
				page_size: 6,
				NowTime: '',
				Auctionlist: '',
				AuctionTip: '暂无竞拍活动',
				tabMain: ['1', '2', '3'],
				status: 2,
				index: 0,
				AuctionTab: [
					{AuctionName: '竞拍列表', status: 1},
					{AuctionName: '我的竞拍', status: 2}
				]
			}
		},
      created(){},
      computed: {
			...mapState({
				auctionTotal: state => state.bidders.auctionTotal,
				auctionList: state => state.bidders.auctionList,
				partakeList: state => state.bidders.partakeList,
			})

      },
		methods: {
			showTotal(total) {
				return `全部 ${total} 条`;
			},
			reloadPage() {
				location.reload()
			},
			//跳转详情页
			BidersDetail(id) {
				if (this.$store.state.memberToken) {
					location.href = '/bidders/detail/' + id
				} else {
					this.$Modal.confirm({
						title: '提示',
						content: '<p>请登录后参数竞拍！</p>',
						okText: '去登录',
						onOk: () => {
							location.href = '/login'
						}
					});
				}

			}
		},
		watch: {
			'$route'(to, from) {
				this.$router.go(0);
			}
		}
	}
</script>

<style lang="less">
  .ivu-modal-footer {
    border: 0px;
  }

  .titlelist {
    font-size: 16px;
    padding-left: 15px;
    line-height: 33px;
    border-left: 5px solid #ff6c00;
  }

  .bidersTable {
    background-color: #ffffff;
    margin-top: 10px;

    tr td {
      border: 1px solid #dfdfdf;
      text-align: center;
      padding: 10px 0;
    }

    .table_title {
      background-color: #fcfcfc;

      th {
        padding: 15px 0;
        color: #999;
      }
    }

    .see {
      background-color: #007de4;
      color: #fff;
      border: none;
      padding: 3px 20px;
      border-radius: 3px;
      cursor: pointer;
    }
  }

.startauction{background-color: #ff6c00}
.vcauction{background-color: #25a96d}
.endauction{background-color: #cccccc}
  .statusicon{
    width: 80px;

    text-align: center;
    line-height: 40px;
    border-top-right-radius: 22px;
    border-bottom-right-radius: 22px;
    color: #ffff;
  }
  .btmunv{display: flex;width: 250px; }
  .iv_title{
    width: 60px;
    text-align-last: justify;
  }
  .ixebm{
    width: 235px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

  }
  .Notice{
    border: 1px solid #dfdfdf;

    .NoticeTitle {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      background-color: #fcfcfc;
      border-bottom: 1px solid #dfdfdf;

      .freshicon {
        background: url("/img/fresh.png") no-repeat 48px 5px;
        padding-right: 20px;
      }
    }

    .NoticeList {
      width: 90%;
      margin: 0 auto;

      li:last-child {
        border-bottom: none
      }

      li {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px dashed #ccc;
        padding: 13px 0;
      }
    }

  }

  .NoticeTitleAdv {
    height: 135px;
    margin-top: 15px;
  }
</style>
