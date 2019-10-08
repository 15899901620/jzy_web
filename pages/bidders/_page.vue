<template>
  <div class="body">
    <Header title="头部"></Header>
    <div class="container" title="">
      <div class="materials_banner">
        <img src="/img/auctionBanner.png"/>
      </div>
      <div class="w1200" style="margin-top: 20px">
        <div class="titlelist">
          我的竞拍
        </div>
        <table class="bidersTable" style="width: 100%; border: 1px solid #dfdfdf;">
          <tr class="table_title" style="">
            <th style="width: 8%">竞拍编号</th>

            <th style="width: 7%">牌号</th>
            <th style="width: 7%">厂商</th>
            <th style="width: 11%">结束倒计时</th>
            <th style="width: 10%">起拍价</th>
            <th style="width: 10%">我的出价</th>
            <th style="width: 6%">出价数量</th>
            <th style="width: 6%">入局数量</th>
            <th style="width: 7%">当前状态</th>

            <th style="width: 8%">我的状态</th>
            <th style="width: 10%">操作</th>
          </tr>
          <tr>
            <td>0000012</td>

            <td class="blue">L5E89</td>
            <td>巨正源</td>
            <td>0天23时12分36秒</td>
            <td>￥10400.00/吨</td>
            <td>￥10400.00/吨</td>
            <td>50吨</td>
            <td>30吨</td>
            <td>竞拍结束</td>

            <td>出局</td>
            <td><button class="see">查看</button></td>
          </tr>
          <tr>
            <td>0000012</td>

            <td class="blue">L5E89</td>
            <td>巨正源</td>
            <td>0天23时12分36秒</td>
            <td>￥10400.00/吨</td>
            <td>￥10400.00/吨</td>
            <td>50吨</td>
            <td>30吨</td>
            <td>竞拍结束</td>

            <td>出局</td>
            <td><button class="see">查看</button></td>
          </tr>
          <tr>
            <td>0000012</td>

            <td class="blue">L5E89</td>
            <td>巨正源</td>
            <td>0天23时12分36秒</td>
            <td>￥10400.00/吨</td>
            <td>￥10400.00/吨</td>
            <td>50吨</td>
            <td>30吨</td>
            <td>竞拍结束</td>

            <td>出局</td>
            <td><button class="see">查看</button></td>
          </tr>


        </table>
        <div class="titlelist mt15">
          竞拍列表
        </div>
        <div style="display: flex;">
          <div style="width: 77%">
            <ul class="acuList" v-if="$store.state.bidders.auctionList.length >0">
              <li v-for="(items,index) in $store.state.bidders.auctionList" :key="index">

                <div style="display: flex; position: absolute; align-items: center; margin-top: 20px">
                  <template v-if="items.statusType == '1'">
                    <div class="statusicon startauction">正在竞拍</div>
                  </template>
                  <template v-if="items.statusType == '2'">
                    <div class="statusicon vcauction">即将开始</div>
                  </template>
                  <template v-if="items.statusType == '3'">
                    <div class="statusicon endauction">竞拍结束</div>
                  </template>
                  <div class="ml20"><span class="gray">距离开始 ：</span>
                  <span class="fs18"><span class="orangeFont">00</span>时<span class="orangeFont">24</span>分<span class="orangeFont">30</span>秒</span></div>
                  <div class="ml50"><span class="gray">竞拍时长：</span>2小时</div>
                </div>

                <div class="acuProduct ">
                  <h1 class=" fs20 mt20">{{items.skuName}}</h1>
                  <div class="mt10 fs14 dflex">
                    <div class="btmunv"><span class="iv_title">起拍价</span> ：<span class="orangeFont fwb fs16">{{items.finalPriceFormat}}</span></div>
                    <div class="fs14 dflex"><span class="iv_title">竞拍数量</span> ：<span class="orangeFont fs16">{{items.totalNum}}</span>{{items.uomName}}</div>
                  </div>
                  <div class="mt10 fs14 dflex">
                    <div class="btmunv"><span class="iv_title">竞拍编号</span> ：<span class=" fs16">{{items.billNo}}</span></div>
                    <div class="fs14 dflex"><span class="iv_title">厂商</span> ：<span class="orangeFont fs16">{{items.manufacturer}}</span></div>
                  </div>

                </div>
                <div class="acuOpear">
                  <div style="display: flex; flex-direction: column; justify-content: center">
                    <span class="mt10 ixebm ">库区：{{items.warehouseName}}</span>
                    <span class="mt5 ixebm ">城市：{{items.manufacturer}}</span>
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
              <pages :total="$store.state.bidders.auctionList.length" :show-total="showTotal" :pageSize="6" @change="changePage" :value="currPage"></pages>
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
                  <span style="width: 56%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">中海壳牌约216.0吨</span>
                  <span style="width:16%;" class="gray">09-26</span>
                </li>
                <li>
                  <span style="width: 17%">LLDPE</span>
                  <span style="width: 56%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">中海壳牌约216.0吨</span>
                  <span style="width:16%;">09-26</span>
                </li>
                <li>
                  <span style="width: 17%">LLDPE</span>
                  <span style="width: 56%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">中海壳牌约216.0吨</span>
                  <span style="width:16%;" class="gray">09-26</span>
                </li>
              </ul>
            </div>

            <div class="NoticeTitleAdv">
                  <img src="img/advImg.png">
            </div>

          </div>
        </div>
<!--        <div class="AuctionTime mt35">-->
<!--          <ul>-->
<!--            <li v-for="(items,index) in AuctionTab" @click="AuctionList(items.status,index)"-->
<!--                :class="{curr:CurrSelect == index}" :key="index">-->
<!--              <div class="fs20">-->
<!--                {{items.AuctionName}}-->
<!--              </div>-->
<!--            </li>-->
<!--          </ul>-->
<!--        </div>-->



      </div>

      <Modal
          v-model="!$store.state.memberToken"
          title="提示"
          width='380px'
          @on-cancel="MoreCancel"
          :mask-closable="false"
          :styles="{top:'280px'}">
        <p slot="header" style="color:#333;text-align:left;font-size:16px">
          <Icon type="ios-information-circle"></Icon>
          <span>提示</span>
        </p>
        <p style="font-size:16px; line-height:32px; text-align:center; color:#666; ">您尚未登录巨正源，请你登录后在进行竞拍！</p>
        <div slot="footer" style="text-align:center;">
          <!-- <Button type="primary" size="large" @click="gotIt" >知道了</Button> -->
          <Button type="default" size="large" @click="goLogin">去登录</Button>
        </div>
      </Modal>

    </div>
    <Footer size="default" title="底部" style="margin-top:18px;"></Footer>
  </div>
</template>

<script>
	import {mapState} from 'vuex'
	import Header from '../../components/header'
	import Footer from '../../components/footer'
	import pagination from '../../components/pagination'
	import {auctionPage} from '../../api/auction'
	import Cookies from 'js-cookie'

	export default {
		name: 'bidders',
		data() {
			return {
				CurrSelect: 0,
				current_page: '',
				page_size: '',
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

		fetch({store, params, query}) {
			return Promise.all([
				//获取顶部、中部、底部导航信息
				store.dispatch('common/getNavList'),
				//获取系统配置
				store.dispatch('common/getSysConfig'),
				//获取友情链接
				store.dispatch('common/getFriendlyList'),
				//获取底部帮助分类
				store.dispatch('helper/getHelpCate', {
					catId: 0,
					indexShow: 1
				}),
				//获取竞拍列表
				store.dispatch('bidders/getAuctionList', {
					current_page: 1,
					page_size: 10
				}),
				//store.dispatch('bidders/getBiddersList', {current_page: 1, page_size: 60})
			])
		},
		components: {
			Header,
			Footer,
			pages: pagination.pages
		},
		computed: {
			...mapState({
                currPage:  state => state.bidders.currPage,
				biddersbeingData: state => state.bidders.biddersbeingData,
				bidderssoonData: state => state.bidders.bidderssoonData,
				biddersendData: state => state.bidders.biddersendData
			})

		},
		methods: {
          showTotal(total) {

            console.log('total',this.$store.state.bidders.auctionList)
            return `全部 ${total} 条`;
          },
          changePage (row) {
            let id = this.$route.params.id
            this.$router.push({name:'bidders-detail-id',params:{id:id},query:{page:row}})
          },
			//跳转详情页
			BidersDetail(id) {
				if (Cookies.get('userinfor') && Cookies.get('webtoken')) {
					this.$router.push({name: 'bidders-detail-id', params: {id: id}})
				} else {
					this.loginInfo = true
					// this.$Modal.confirm({
					//     title: '提示',
					//     content: '<p>您的登录已超时，请重新登录</p>',
					//     okText:'去登录',
					//     onOk: () => {
					//     this.$router.push({name:'login'});
					//     },

					// });
				}

			},
          MoreCancel(){},
          //去登录
          goLogin(){
            this.$router.push({name:'login'});
          },
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
  .titlelist{
    font-size: 16px;
    padding-left: 15px;
    line-height: 33px;
    border-left: 5px solid #ff6c00;
  }

  .bidersTable{
    background-color: #ffffff;
    margin-top: 10px;
    tr td{
      border: 1px solid #dfdfdf;
      text-align: center;
      padding: 10px 0;
    }
    .table_title{
      background-color: #fcfcfc;
        th{
          padding: 15px 0;
          color: #999;
        }
    }
    .see{
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
    .NoticeTitle{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      background-color: #fcfcfc;
      border-bottom: 1px solid #dfdfdf;
      .freshicon{
        background: url("/img/fresh.png")no-repeat 48px 5px;
        padding-right: 20px;
      }
    }
    .NoticeList{
      width: 90%;
      margin: 0 auto;
      li:last-child{border-bottom: none}
      li{
        display: flex;
        justify-content: space-between;
        border-bottom: 1px dashed #ccc;
        padding: 13px 0;
      }
    }

  }
  .NoticeTitleAdv{height: 135px; margin-top: 15px;}
</style>
