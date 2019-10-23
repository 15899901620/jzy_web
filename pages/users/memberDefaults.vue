<template>
  <div class="clearfix graybg">
    <div class="w1200 dflex " style="margin-bottom: 40px">
      <usernav></usernav>
      <div class="memberInfor ml20  whitebg bdccc  mt20">
        <!--个人信息-->
        <h1 class="fs16 ml25" style="margin-top:15px">违约单</h1>
        <div class="TableList">
          <div class="order_operate">
            <Form :label-width="80">
              <Row>
                <Col span="8">
                  <FormItem label="违约单状态">
                    <Select v-model="formSearch.status" >
                      <Option v-for="item in autionType" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                  </FormItem>
                </Col>
				<Col span="8">
                  <FormItem label="公司名称">
                    <Input type="text" v-model="formSearch.companyName" placeholder="公司名称" name="" value="" style="width:200px "/>
                  </FormItem>
                </Col>
				<Col span="8">
                  <FormItem label="">
                    <div class="check" @click="onSearch" style="cursor: pointer;    margin-left: 22px;">查询</div>
                  </FormItem>
                </Col>

              
              </Row>
            </Form>
          </div>
          <div class="TableTitle graybg">
            <!-- <span style="width: 10%;">单据类型</span> -->
			<span style="width: 15%;">竞拍编号</span>
			<span style="width: 17%;">公司名称</span>
			<span style="width: 17%;">创建时间</span>
            <span style="width: 16%;">保证金金额</span>
            <span style="width: 14%;">状态</span>
			<span style="width: 20%;">描述</span>
          

          </div>
          <template v-if="$store.state.member.DefaultsCurr.length > 0">
            <table v-for="(item, index) in $store.state.member.DefaultsCurr" :key="index" class="listT mt10" border=""
                   cellspacing=""
                   cellpadding="">
              <tbody>
              <tr class="detailTable">
                <!-- <td>{{detailOrderType(item.orderType)}}</td> -->
				<td>{{item.billNo}}</td>		
                <td>{{item.companyName}}</td>
				<td><span class="orangeFont">{{item.createTime}}</span></td>
			
          
                <td>{{item.amountFormat}}</td>
                <td>
					<span v-if="item.status == 0">
						取消
					</span>
                  	<span v-if="item.status == 1">
						待扣除(待对接)
					</span>
					<span v-if="item.status == 2">
						已冻结
					</span>
					<span v-if="item.status == 3">
						已退还
					</span>
					<span v-if="item.status == 4">
						已抵扣
					</span>
					<span v-if="item.status == 5">
						已扣除(违约)
					</span>
                </td>
               <td>{{item.content}}</td>
              </tr>
              </tbody>
            </table>
            <!--页码-->
            <Page style="margin:20px auto; float:right;" :total="$store.state.member.DefaultsTotal"
                  :current="current_page" @on-change="changePage"
                  :page-size="page_size" @on-page-size-change="changePageSize"></Page>
          </template>
          <template v-else>
            <p style="font-size:14px; text-align:center; width:100%;">暂无任何信息！</p>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
	import Navigation from '../../components/navigation'
	import config from '../../config/config'
	import {sendCurl} from '../../api/common'
	import utils from '../../plugins/common'
	import server from '../../config/api'

	export default {
		name: "usertotalorder",
		middleware: 'memberAuth',
		layout: 'membercenter',
		components: {
			usernav: Navigation.user
		},
		fetch({store}) {
			return Promise.all([
				//获取顶部、中部、底部导航信息
				store.dispatch('common/getNavList'),
				//获取系统配置
				store.dispatch('common/getSysConfig'),
				
			])
		},
		data() {
			return {
				payOrderID: 0,

				autionType: [
					{'label': '取消', 'value': 0},
					{'label': '待扣除（待对接）', 'value': 1},
					{'label': '已扣除','value': 2},
				],
				payInfo: {},
				addList: {},
				current_page: 1,
				page_size: 5,
				currTabs: 0,
				formSearch: {
					status: '',
					companyName: ''
				},
			}
		},
		methods: {
			async getSourceData() {
				let params = {
					current_page: this.current_page,
					page_size: this.page_size,
					...this.formSearch
				}
				this.$store.dispatch('member/getmemberDefaults', params)
			},

			amountFormat: function (amount, sign) {
				return utils.amountFormat(amount, sign)
			},
			unPayOrder(row) {
				this.payLoading = row
				this.getSourceData()
			},
			addAddress() {
				this.addloading = true
			},
			unaddChange(res) {
				this.getSourceData()
				this.addloading = res
			},
			undetailChange(res) {
				this.detailloading = res
			},

			addLog(row) {
				this.addList = {
					...row
				}
				this.addloading = true
			},
			setTabs(res) {
				if (res == '1') {
					this.formSearch.status = ''
					this.currTabs = 0
				} else if (res == '2') {
					this.formSearch.status = 2
					this.currTabs = 1
				} else if (res == '3') {
					this.formSearch.status = 3
					this.currTabs = 2
				} else if (res == '0') {
					this.formSearch.status = '0'
					this.currTabs = 3
				}
				this.getSourceData()
			},
			detailLog(row) {
				this.addList = {
					...row
				}
				this.detailloading = true
			},


			onSearch() {
				this.current_page = 1
				this.page_size = 20
				this.getSourceData()
			},
			closeSearch() {
				this.current_page = 1
				this.page_size = 20
				this.getSourceData()
			},
			changePage(row) {
				this.current_page = row
				this.getSourceData()
			},
			changePageSize(row) {
				this.page_size = row
				this.getSourceData()
			}
		},
		mounted() {
			let status = this.$route.query.status
			if (status == 2) {
				this.formSearch.status = 2
				this.currTabs = 1
			}
			this.getSourceData()

		},
		watch: {
			'$route'(to, from) {
				this.$router.go(0);
			}
		}
	}
</script>