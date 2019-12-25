<template>
  <div class="body">
    <Header name="头部"></Header>
    <div class="container" title="">
      <div class="w1200">
        <div class="mt10">
          <breadcrumb>
            <breadcrumb-item><i type="home"></i>
              <nuxt-link to="/">巨正源</nuxt-link>
            </breadcrumb-item>
            <breadcrumb-item>预售专栏</breadcrumb-item>
          </breadcrumb>
        </div>
      </div>
      <div class='w1200'>
    <table class="bidersTable" style="width: 100%; border: 1px solid #dfdfdf;" v-if="feedingList.length > 0">
          <tbody>
          <tr class="table_title" style="">
            <th style="width: 12%">合约编号</th>
            <th style="width: 12%">提货仓库</th>
            <th style="width: 8%">包装方式</th>
            <th style="width: 8%">单价</th>
            <th style="width: 8%">全部数量</th>
            <th style="width: 8%">待转数量</th>
            <th style="width: 6%">资源池</th>
            <th style="width: 6%">执行进度</th>
            <th style="width: 10%;"><span>操作</span>
              <span class="ml20" style="border-bottom: 1px solid #FFFFFF; cursor: pointer;"><nuxt-link class="whiteFont"  target="_target" :to="{name: 'advance-feeding-page'}">更多</nuxt-link></span>
            </th>
          </tr>


          <tr v-for="(items,index) in feedingList" :key="index">
            <td>
                <a :href="`/users/plan/advance/${items.id}`" ><span >{{items.plan_no}}</span></a>
            </td>
            <td class="blue">{{items.warehouse_name}}</td>
            <td>{{items.packing_modes == 1?'标准包装':'非标准包装'}}</td>
            <td>{{$utils.amountFormat(items.final_price)}}</td>
            <td> {{items.total_num}}{{items.uom_name}}</td>
            <td>{{items.available_num}}{{items.uom_name}}</td>
            <td>
                {{items.feeding_num}}{{items.uom_name}}
            </td>

            <td>
                <div   style="width: 200px; padding:0 20px;" :title="`合约量：${items.total_num}，待转单：${items.available_num}`">
                    <template v-if="items.total_num==0 && items.available_num==0 " >
                            <Progress :percent="0" :stroke-width="10"/>
                    </template>
                    <template v-else >
                          <Progress :percent="((items.total_num - items.available_num)*100/items.total_num).toFixed(2)" :stroke-width="10"/>
                   </template>
                </div>
            </td>
            <td>
                <Button v-if="items.feeding_num > 0" type="dashed"  @click="getSaleFeedingList(items.id)">下单</Button>
                <Button type="primary"  v-else disabled>下单</Button>
            </td>
          </tr>
          </tbody>
        </table>
        </div>
      <div class="w1200 dflex" style="margin-top: 10px;">

        <div style="width: 77%">
          <div class="titlelist mt15">
            <span class="titlelist_txt">预售列表</span>
            <a style="color:#eb3e3d; margin-left: 20px;" href="/help/20">预售规则</a>
          </div>

          <ul class="acuList" v-if="this.total > 0">
            <li v-for="(items, index) in advanceList" :key="index">
              <div style="display: flex; position: absolute; align-items: center; margin-top: 20px;z-index: 1;">
                <template v-if="items.statusType == '1'">
                  <div class="statusicon startauction">正在预售</div>
                  <div class="ml20">
                    <span class="fs18 orangeFont">{{items.sku_name}}</span>
                  </div>
                  <div class="ml20"><span>距离结束 ：</span>
                    <span class="fs18">
                        <TimeDown :timeStyleType="2" :endTime="items.price_valid_time" endMsg="已结束"
                                  :onTimeOver="reloadPage"></TimeDown>
                    </span>
                  </div>
                </template>
                <template v-if="items.statusType == '2' || items.statusType == '3'">
                  <div class="statusicon vcauction">已售罄</div>
                  <div class="ml20">
                    <span class="fs18 orangeFont">{{items.sku_name}}</span>
                  </div>
                  <div class="ml20">
                    <span class="gray">距离结束 ：</span>
                    <span class="fs16">已结束</span>
                  </div>
                </template>
                <template v-if="items.statusType == '4'">
                  <div class="statusicon endauction">已结束</div>
                  <div class="ml20">
                    <span class="fs18 orangeFont">{{items.sku_name}}</span>
                  </div>
                  <div class="ml20">
                    <span>结束时间 ：</span>
                    <span class="fs16">{{items.price_valid_time}}</span>
                  </div>
                </template>
              </div>

              <div class="acuProduct ">
                  <span class="fs20" style="position: relative;margin-top: 15px">{{items.skuName}} <i
                      v-if="items.is_jry"
                      style="width: 15px; height: 18px; position: absolute; top: -6px;   background:url('/img/Yi_icon.png')no-repeat;"></i></span>
                <div class="mt10 fs14 dflexAlem">
                  <div class="btmunv"><span class="iv_title">预售价</span> ：<span class="orangeFont fwb fs16">{{$utils.amountFormat(items.final_price)}}</span>
                  </div>
                  <div class="fs14 dflexAlem" style="position: relative;">
                    <span class="iv_title">预售总数</span> ：
                    <span class="pr">
                    <span class="orangeFont fs16">{{items.total_num}}</span>{{items.uom_name}}
                    <i :title="`限购${items.limit_num}`" v-if="items.limit_num > 0" style="width: 15px; height: 18px; position: absolute; top: -7px;   background:url('/img/Xian_icon.png')no-repeat;"></i>
                   </span>
                  </div>
                </div>
                <div class="mt10 fs14 dflexAlem">
                  <div class="btmunv" style="position: relative; ">
                    <span class="iv_title">可售数量</span> ：
                    <span class="pr">
                      <span class="orangeFont fwb fs16">{{items.available_num}}</span>{{items.uom_name}}
                      <i :title="`限购${items.limit_num}`" v-if="items.available_num > 0 && items.limit_num > 0" style="width: 15px; height: 18px; position: absolute; top: -7px;  background:url('/img/Xian_icon.png')no-repeat;"></i>
                    </span>
                  </div>
                  <div class="fs14 dflexAlem">
                    <span class="iv_title">起订量</span> ：<span class="orangeFont fs16">{{items.min_order}}</span>{{items.uom_name}}
                    <span class=" ml20">保证金</span> ：<span class="orangeFont fs16">{{items.margin_ratio}}%</span>
                  </div>
                </div>
                <div class="mt10 fs14 dflexAlem">
                  <div class="btmunv"><span class="iv_title">预售编号</span> ：<span class="">{{items.bill_no}}</span>
                  </div>
                  <div class="fs14 dflex"><span class="iv_title">厂商</span> ：<span
                      class=" fs16">{{items.manufacturer}}</span></div>
                </div>
                <div class="mt10 fs14 dflexAlem">
                  <div class="btmunv"><span class="iv_title">包装方式</span> ：<span>{{items.packing_modes == 1?'标准包装':'非标准包装'}}</span>
                  </div>
                   <div class="btmunv dflexAlem">
                     <span class="iv_title">产品等级</span> :
                      <span class="" v-if="items.product_grade == 1">优等品</span>
                    <span class="" v-if="items.product_grade == 2">一等品</span>
                    <span class="" v-if="items.product_grade == 3">合格品</span>
                  </div>
                </div>
                  <div class="mt10 fs14 dflexAlem">

                  <div class="fs14 dflexAlem"><span class="iv_title">提货日期</span> ：<span class="orangeFont">{{items.delivery_start}} ~ {{items.delivery_deadline}}</span></div>

                   <div class="btmunv" >
                        <a v-if="items.desc_url" class="fs16"  :href="items.desc_url" style="color:#ff7300;margin-left: 30px;">预售说明</a>
                    </div>
                </div>
              </div>
              <div class="acuOpear">
                <div style="display: flex; flex-direction: column; justify-content: center">
                  <span class="mt10 ">库区：{{items.warehouse_name}}</span>
                  <span class="mt5">城市：{{items.warehouse_city}}</span>
                </div>
                <template v-if="items.statusType == '1'">
                  <div class="btnStart startauction" @click="toPlan(items)">
                    <template v-if="items.planned_total_num > 0">
                      追加预定
                    </template>
                    <template v-else>
                      参加预定
                    </template>
                  </div>
                </template>
                <template v-else>
                  <div class="btnStart endauction">预售结束</div>
                </template>

                <span v-if="items.planned_total_num > 0" style="color:#eb3e3d">已预购{{items.planned_total_num}}吨</span>
              </div>
            </li>

          </ul>
          <p v-else style="background: none; font-size: 20px;text-align: center; margin:80px auto;">
            目前暂无预售活动！
          </p>
          <div class="text-xs-center" style="padding: 18px 0; text-align: center;">
            <pages :total="total" :show-total="showTotal" :value="current_page"
                   :pageSize="pageSize"></pages>
          </div>
        </div>

        <div class="" style="width: 24%; margin-left: 1.5%; display: flex; flex-direction: column">
          <!-- 放料专场 -->
          <div class="Discharge">
            <div class="title">预售专场</div>
            <div class="text">好商品 好价格 好服务</div>

            <button class="dischargeBtn" @click="FeedIng">预售合约转单</button>
          </div>
          <!--  竞拍公告-->
          <div class="Notice whitebg mt15">
            <div class="NoticeTitle">
              <span class="fs16">求购信息</span>
            </div>
            <purchasing></purchasing>
          </div>
        </div>
      </div>
    </div>
    <advancePay :isShow="DepositShow" :dataList='DepositData' @unChange="unDepositShow"></advancePay>
    <Footer size="default" title="底部" style="margin-top:18px;"></Footer>
  </div>
</template>

<script>
	import { mapState } from 'vuex'
	import Header from '../../components/header'
	import Footer from '../../components/footer'
	import pagination from '../../components/pagination'
	import purchasing from '../../components/purchasing'
	import breadcrumb from '../../components/breadcrumb'
	import TimeDown from '../../components/timeDown'
	import advancePay from '../../components/paydeposit/advancePay'

	export default {
		name: "advance",
		fetch({store, params, query}) {
			return Promise.all([
				//获取顶部、中部、底部导航信息
				store.dispatch('common/getNavList'),
				//获取系统配置
				store.dispatch('common/getSysConfig'),
				//获取友情链接
				store.dispatch('common/getFriendlyList'),
				store.dispatch('helper/getHelpCate', {
					catId: 0,
					indexShow: 1
				}),
				// 获取预售
				store.dispatch('advance/getAdvanceList', {
					current_page: query.page || 1,
					page_size: 10
        }),
        //获取放料列表
         store.dispatch('advance/getFeedingList', {
            current_page: query.page || 1,
						page_size: 6,
						statusType:9
					}
				),
			])
		},
		components: {
			Header,
			Footer,
			pages: pagination.pages,
			TimeDown,
			purchasing,
			breadcrumbItem: breadcrumb.item,
			breadcrumb,
			advancePay
		},
		computed: {
			...mapState({
				total: state => state.advance.total,
        advanceList: state => state.advance.advanceList,
        feedingList: state => state.advance.feedingList,
			})
		},
		data() {
			return {
				current_page: parseInt(this.$route.query.page) || 1,
				pageSize: 10,

				DepositData: {
					advance_id: '',
					bill_no: '',
					sku_name: '',
          min_num: 0,
					max_num: 0,
					basePrice: 0,
					Bond: 0,   //保证金比例
				},
				DepositShow: false,
			}
		},
		methods: {
			toPlan(row) {
				if (this.$store.state.memberToken) {
					this.DepositShow = true
					this.DepositData.advance_id = row.id
					this.DepositData.bill_no = row.bill_no
					this.DepositData.sku_name = row.sku_name
					this.DepositData.min_num = row.min_order
					this.DepositData.max_num = row.available_num
					this.DepositData.basePrice = row.final_price
					this.DepositData.Bond = row.margin_ratio
				} else {
					this.$Modal.confirm({
						title: '提示',
						content: '<p>请登录后参与预售！</p>',
						okText: '去登录',
						onOk: () => {
							location.href = '/login'
						}
					});
				}
			},
			unDepositShow(row) {
				this.DepositShow = row
				location.reload()
			},
			showTotal(total) {
				return `全部 ${total} 条`;
			},
			reloadPage() {
				this.$router.go(0)
			},
			async spotData() {
				let params = {
					current_page: this.currentPage,
					page_size: this.pageSize
				};

				this.$store.dispatch('advance/getAdvanceList', params)
			},
          FeedIng(){
            location.href = '/advance/feeding'
          },

		},
		watch: {
			'$route'(to, from) {
				this.$router.go(0);
			}
		},
		created() {
      console.log('advanceList:', this.advanceList)
		},
		head() {
			return {
				title: '巨正源-化工交易平台',
				page: 10,
				meta: [
					{name: 'viewport', content: 'width=device-width, initial-scale=1'},
					{name: 'keywords', content: '化工, 交易, 丙烷脱氢'},
					{hid: 'description', name: 'description', content: '巨正源-化工交易平台，提供丙烷脱氢,石化产品贸易、仓储服务、成品油运输服务'}
				]
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
    background-color: #ffffff; margin-top: 8px;
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
    align-items: center;
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

  .Discharge{
    width: 280px;
    height: 148px;
    margin-top: 15px;
    display: flex;
    text-align: center;
    flex-direction: column;
    background: url("/img/Discharge.png")no-repeat;
    color: #FFFFFF;
    .title{
      font-size: 18px;
      margin-top: 30px;
      margin-bottom: 2px;
      font-weight: bold;
    }
    .text{
      font-size: 14px;
    }
    .dischargeBtn{
      font-size: 14px;
      color: #258ef9;
      background-color: #fff;
      border:none;
      width: 47%;
      font-weight: bold;
      margin: 10px auto 0px;
      padding: 7px 0;
      border-radius: 3px;
      box-shadow: 0px 1px 1px #333;
    }
    .dischargeBtn:hover{
      cursor: pointer;
    }

  }
</style>
