<template>
  <div class="clearfix graybg">
    <div class="w1200 dflex " style="margin-bottom: 40px">
      <usernav></usernav>
      <div class="memberInfor ml20  whitebg bdccc  mt20">
        <!--个人信息-->
        <h1 class="fs16 ml25 mt25 pb10 pr" style="border-bottom: 2px solid #DEDEDE;width: 95%;" >求购信息
          <div class="bodbottom" style="width: 8%; height: 2px;"></div>
        </h1>
        <div class="" style="width: 95%; margin: 0 auto;">

          <div class="order_operate">
            <div class="dflex">
              <input type="text" placeholder="输入订单号/商品名称查询" name="" id="" value="" class="orderInput" v-model="skuName"/>
              <div class="check" @click='checked()' style="cursor: pointer;">查看</div>
            </div>
            <!-- <div class="dflex" style="align-items: center;">
              <span style="width: 90px;">起始日期</span><input type="text" class="layui-input" id="test6" placeholder="选择订单时间">
            </div> -->
          </div>

          <!--求购表格-->
          <div class="TableTitle graybg">
            <span style="width: 20%;">商品信息</span>
            <span style="width: 20%;">意向数量(吨)</span>
            <span style="width: 20%;">交货地</span>
            <span style="width: 20%;">意向交货时间</span>
            <span style="width: 20%;">状态</span>
          </div>

          <template v-if="datalist.length > 0">
            <table v-for="(item, index) in datalist" :key="index" class="listT mt10" border="" cellspacing="" cellpadding="">
              <tbody>
                <tr class="detailTable">
                  <td>{{item.skuNo}} {{item.skuName}}</td>
                  <td>{{item.intentionNum}}</td>
                  <td>{{item.warehouseName}}</td>
                  <td>{{item.intentionDate}}</td>
                  <td>
                    <span v-if="item.status == 3" class="greenFont" >{{getOrderState(item.status)}}</span>
                    <span v-else-if="item.status == 0" class="gray" >{{getOrderState(item.status)}}</span>
                    <span v-else class="orangeFont" >{{getOrderState(item.status)}}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </template>
          <template v-else>
            <p style="font-size:14px; text-align:center; width:100%;">暂无任何信息！</p>
          </template>
          <!--页码-->
          <pages :total="total" :show-total="showTotal" @change="changePage" :value="current_page" style="margin-top:20px;"></pages>

        </div>

      </div>

    </div>
  </div>
</template>

<script>
import Navigation from '../../components/navigation'
import { getbuylist, addbuyinfo } from '../../api/buy'
import { getCookies } from '../../config/storage'
import pagination from '../../components/pagination'
import config from '../../config/config'

export default {
  name: "userseek",
	middleware: 'memberAuth',
  layout:'membercenter',
  components:{
    usernav: Navigation.user,
    pages: pagination.pages
  },
  fetch({ store }) {
    return Promise.all([
			//获取顶部、中部、底部导航信息
			store.dispatch('common/getNavList'),
			//获取系统配置
			store.dispatch('common/getSysConfig'),
    ])
  },
  data() {
    return {
      datalist: [],
      current_page: 1,
      page_size:10,
      total: 0,
      skuName:'',
      formSearch: {
        skuName: ''
      }
    }
  },
  methods:{
    showTotal(total) {
        return `全部 ${total} 条`;
    },
    inLogin () {
      let userinfo = !getCookies('userinfor') ? '' : getCookies('userinfor')
      if (!userinfo) {
        this.$router.push('/login')
      }
    },
    checked(){
      this.formSearch.skuName=this.skuName
      this.getSourceData();
    },
     //订单状态
    getOrderState(typeId) {
      if(!typeId) return
      return config.buyState[typeId]
    },
    changePage (row) {
      this.$router.push({name:'usertotalorder',query:{page:row}})
    },
    async getSourceData () {
      let params = {
        current_page: this.current_page,
        page_size: this.page_size,
        ...this.formSearch
      }
      const res= await getbuylist(this, params)
      this.datalist = res.data.items
      this.total = res.data.total
    }
  },
  created(){
    this.inLogin()
    this.getSourceData()
  },
  watch: {
    '$route' (to, from) {
        this.$router.go(0);
    }
  }
}
</script>