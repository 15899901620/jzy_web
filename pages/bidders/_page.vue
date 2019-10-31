<template>
  <div class="body">
    <Header name="头部"></Header>
    <div class="container" title="">
      <template v-for="(item,index) in $store.state.common.adList.ad4">
        <div class="materials_banner" :style="{background:'url(' + item.adImg + ')no-repeat center;'}">
          <!-- <img :src="item.adImg"/>-->
        </div>
      </template>
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
            <td>
              <TimeDown :timeStyleType="2" :endTime="item.realEndTime" hoursShow endMsg="已结束"
                        :onTimeOver="reloadPage"></TimeDown>
            </td>
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

        <div style="display: flex;">
          <div style="width: 77%">
            <div class="titlelist mt15">
              <span class="titlelist_txt">竞拍列表</span>
              <div class="auction_screen">

                <template>
                  <Dropdown @on-click="handleStatusTypeOption" placement="bottom-start">
                    <a href="javascript:void(0)">
                      {{statusTypeName}}
                      <Icon type="ios-arrow-down"></Icon>
                    </a>
                    <DropdownMenu slot="list">
                      <DropdownItem name="0">全部竞拍</DropdownItem>
                      <DropdownItem name="2">即将开始</DropdownItem>
                      <DropdownItem name="1">正在竞拍</DropdownItem>
                      <DropdownItem name="3">竞拍结束</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                  <Dropdown @on-click="handlePlanTypeOption" style="margin-left: 20px">
                    <a href="javascript:void(0)">
                      {{planTypeName}}
                      <Icon type="ios-arrow-down"></Icon>
                    </a>
                    <DropdownMenu slot="list">
                      <DropdownItem name="0">我的竞拍</DropdownItem>
                      <DropdownItem name="1">已中标</DropdownItem>
                      <DropdownItem name="2">未中标</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>

                </template>
              </div>
            </div>

            <ul class="acuList" v-if="this.auctionTotal > 0">
              <li v-for="(items,index) in this.auctionList" :class="getIcon(items)" :key="index">
                <div style="display: flex; position: absolute; align-items: center; margin-top: 20px;z-index: 1;">
                  <template v-if="items.statusType == '1'">
                    <div class="statusicon startauction">正在竞拍</div>
                    <div class="ml20"><span class="gray">距离结束 ：</span>
                      <span class="fs18">
                        <TimeDown :currTime="items.currTime" :timeStyleType="2" :endTime="items.realEndTime" hoursShow endMsg="已结束"
                                  :onTimeOver="reloadPage"></TimeDown>
                      </span>
                    </div>
                  </template>
                  <template v-if="items.statusType == '2'">
                    <div class="statusicon vcauction">即将开始</div>
                    <div class="ml20"><span class="gray">距离开始 ：</span>
                      <span class="fs18">
                        <TimeDown :currTime="items.currTime" :timeStyleType="2" :endTime="items.beginTime" hoursShow endMsg="已开始"
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
                  <div class="cancel_follow " v-if="items.statusType != '3' && (items.isFollow ? 1 : 0) " @click="Bidersdelete(items,index)">已关注</div>
                  <div class="follow" v-else-if="items.statusType != '3' && (items.isFollow ? 0 : 1) " @click="BidersAdd(items,index)">关注</div>
                 </div>

                <div class="acuProduct ">
                  <span class="fs20" style="position: relative;margin-top: 15px">{{items.skuName}} <i
                      v-if="items.is_jry"
                      style="width: 15px; height: 18px; position: absolute; top: -6px;   background:url('/img/Yi_icon.png')no-repeat;"></i></span>
                  <div class="mt10 fs14 dflex">
                    <div class="btmunv"><span class="iv_title">起拍价</span> ：<span class="orangeFont fwb fs16">{{items.finalPriceFormat}}</span>
                    </div>
                    <div class="fs14 dflex">
                      <span class="iv_title">竞拍数量</span> ：<span class="orangeFont fs16">{{items.totalNum}}</span>{{items.uomName}}
                      <template v-if="items.isAll == 1">
                        <span class="orangeFont fs16 ml30">整单</span>
                      </template>
                    </div>
                  </div>
                  <div class="mt10 fs14 dflex">
                    <div class="btmunv"><span class="iv_title">竞拍编号</span> ：<span class=" fs16">{{items.billNo}}</span>
                    </div>
                    <div class="fs14 dflex"><span class="iv_title">厂商</span> ：<span
                        class=" fs16">{{items.manufacturer}}</span></div>
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
              目前暂无竞拍活动！
            </p>
            <div class="text-xs-center" style="padding: 18px 0; text-align: center;">
              <pages :total="auctionTotal" :show-total="showTotal" :value="current_page"
                     :pageSize="page_size" :otherParams="`statusType=${this.statusType}&planType=${this.planType}`"></pages>
            </div>
          </div>

          <div class="" style="width: 24%; margin-left: 1.5%; display: flex; flex-direction: column">
            <!--  竞拍公告-->
            <div class="Notice whitebg mt15">
              <div class="NoticeTitle">
                <span class="fs16">竞拍公告</span>
                <span class="gray"><a href="/notice/list">更多...</a></span>
              </div>
              <ul class="NoticeList">
                <li v-for="(item,index) in noticeList" :key="index">
                  <span
                      style="width: 82%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"
                      :title="item.title"><a :href="`/notice/detail/${item.id}`">{{item.title}}</a></span>
                  <span style="width:16%;" class="gray">{{item.time}}</span>
                </li>
              </ul>
            </div>

            <template v-if="this.sideadvImg.length>0">
              <div class="NoticeTitleAdv" v-for="(item, index) in this.sideadvImg" :key="index"
                   @click="Tospot(item.adLink)">
                <img :src="item.adImg">
              </div>
            </template>

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
	import server from "../../config/api";
	import {sendCurl} from '../../api/common'


	export default {
		name: 'bidders',
		components: {
			Header,
			Footer,
			pages: pagination.pages,
			TimeDown
		},

		data() {
			return {
				CurrSelect: 0,
				current_page: parseInt(this.$route.query.page) || 1,
				page_size: 6,
				page: 1,
				NowTime: '',
				Auctionlist: '',
				AuctionTip: '暂无竞拍活动',
				tabMain: ['1', '2', '3'],
				status: 2,
				index: 0,
				isFollow: 0,
				aclist: '',

        statusType: this.$route.query.statusType || 0,
        planType: this.$route.query.planType || 0
			}
		},
		fetch({store, params, query}) {
			return Promise.all([
				// 获取顶部、中部、底部导航信息
				store.dispatch('common/getNavList'),
				// 获取系统配置
				store.dispatch('common/getSysConfig'),
				// 获取友情链接
				store.dispatch('common/getFriendlyList'),
				// 获取轮播图
				store.dispatch('common/getBannerList', 4),
				// 获取底部帮助分类
				store.dispatch('helper/getHelpCate', {catId: 0, indexShow: 1}),
				store.dispatch('article/getindexArticleList', {catId: 8}),
				// 获取竞拍列表
				store.dispatch('bidders/getAuctionList', {current_page: query.page || 1, page_size: 6, status_type: query.statusType,plan_type: query.planType,}),
				// 网站公告
				store.dispatch('article/getNoticeList', {typeId: 4, current_page: 1, page_size: 15, sortBy:'add_time', desc:'1'}),
				// 获取用户参与列表
				store.dispatch('bidders/getPartakeList'),
				// 侧边广告栏
				store.dispatch('system/getBannerInfo', {
					positionId: 6
				}),
			])
		},
		created() {
			this.SourceData()
		},
		mounted() {
		},
		computed: {
			...mapState({
				auctionTotal: state => state.bidders.auctionTotal,
				auctionList: state => state.bidders.auctionList,

				biddersbeingData: state => state.bidders.biddersbeingData,
				bidderssoonData: state => state.bidders.bidderssoonData,
				biddersendData: state => state.bidders.biddersendData,
				bannerinfo: state => state.system.bannerinfo,      // 页面banner
				noticeList: state => state.article.noticeList,     // 侧边竞拍广告

				partakeList: state => state.bidders.partakeList,  // 我的竞拍
				sideadvImg: state => state.system.bannerinfo,    // 侧边广告栏
			}),
			statusTypeName: function(){
				let type = this.statusType
				if(type == '0'){
          return '全部竞拍'
				}else if(type == '1'){
					return '正在竞拍'
				}else if(type == '2'){
					return '即将开始'
				}else if(type == '3'){
					return '竞拍结束'
				}
      },
			planTypeName: function(){
				let type = this.planType
				if(type == '0'){
					return '我的竞拍'
				}else if(type == '1'){
					return '已中标'
				}else if(type == '2') {
					return '未中标'
				}
			}
		},
		methods: {
      Tospot(link){
        if(link){
          this.$router.push({name:link})
        }
      },
      showTotal(total) {
          return `全部 ${total} 条`;
      },
      reloadPage() {
          location.reload()
      },
			getIcon(items){
      	if(this.$store.state.memberToken) {
      		if(items.statusType == '1' || items.statusType == '2'){
						if(items.depositNum > 0){
							return 'auction_over_01'
            }
          }else{
						if(items.totalPlanNum > 0){
							return 'auction_over_02'
						}else{
							if(items.depositNum > 0){
								return 'auction_over_03'
							}
            }
          }
				}
      },
			handleStatusTypeOption(type){
				this.statusType = type
        location.href = '/bidders?page='+this.current_page+'&statusType='+this.statusType+"&planType="+this.planType
      },
			handlePlanTypeOption(type){
				this.planType = type
				location.href = '/bidders?page='+this.current_page+'&statusType='+this.statusType+"&planType="+this.planType
			},

      async BidersAdd(items,index){
         let params={
          auctionIds:items.id
        }
        const res = await sendCurl(this,server.api.Auction.getfollow,params,false)
         if(!res.data.errorCode && res.data){
             this.$store.dispatch('bidders/getAuctionList', {current_page: this.current_page || 1, page_size: 6})
         }

      },
      async Bidersdelete(items,index){
         let params={
          auctionId:items.id
        }
        const res = await sendCurl(this,server.api.Auction.cancelfollow,params,false)
         if(!res.data.errorCode && res.data){
             this.$store.dispatch('bidders/getAuctionList', {current_page: this.current_page || 1, page_size: 6})
         }

      },
      async BidersCancel(items,index){
        let params={
          auctionId:items.id
        }
        const res = await sendCurl(this,server.api.Auction.cancelfollow,params,false)
        if(!res.data.errorCode && res.data){
          this.$store.dispatch('bidders/getAuctionList', {current_page: this.current_page || 1, page_size: 6})
        }else{
          this.$Notice.warning({
            title: res.message,
           });
        }

      },
      async SourceData() {
        let params={
          catId:8
        }
         const res = await sendCurl(this,server.api.information.getArticleList,params,false)
        this.aclist = res.data.items
      },
			//跳转详情页
			BidersDetail(id) {

				if (this.$store.state.memberToken) {
					location.href = '/bidders/detail/' + id
				} else {
					this.$Modal.confirm({
						title: '提示',
						content: '<p>请登录后参与竞拍！</p>',
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
      background-color: #ff6c00;

      th {
        padding: 15px 0;
        color: #fff;
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

  .startauction {
    background-color: #ff6c00
  }

  .vcauction {
    background-color: #25a96d
  }

  .endauction {
    background-color: #cccccc
  }

  .statusicon {
    width: 80px;
    cursor: pointer;
    text-align: center;
    line-height: 40px;
    border-top-right-radius: 22px;
    border-bottom-right-radius: 22px;
    color: #ffff;
  }

  .btmunv {
    display: flex;
    width: 250px;
  }

  .iv_title {
    width: 60px;
    text-align-last: justify;
  }

  .ixebm {
    width: 235px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

  }

  .Notice {
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

  .follow {
    cursor: pointer;
    border: 1px solid #d9d9d9;
    margin-left: 15px;
    padding: 1px 12px;
    font-size: 12px;
    background: url("/img/add_follow.png") no-repeat 9px 5px;
    padding-left: 25px;
  }

  .cancel_follow {
    cursor: pointer;
    border: 1px solid #d9d9d9;
    margin-left: 15px;
    padding: 1px 10px;
    font-size: 12px;
    background: url("/img/cancel_follow.png") no-repeat 6px 5px;
    padding-left: 22px;
  }
</style>
