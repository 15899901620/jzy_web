<template>
  <div class="clearfix graybg">
    <div class="w1200 dflex " style="margin-bottom: 40px">
       <usernav></usernav>
      <div class="memberInfor ml20  whitebg bdccc  mt20">
        <!--物流管理-->
        <h1 class="fs16 ml25 mt25 bb1 pb10" >用车</h1>
        <div class="TableList">
          <div class="titleOrder mt15" >
            <ul class="dflex">
              <li v-for="(item,index) in orderTabs"  :class=" index === currTabs ? 'curr' : ''" :key="index" @click="setTabs(item.status)">{{item.name}}</li>
            </ul>
            <a>查看全部订单 ></a>
          </div>

          <div class="order_operate">
            <div class="dflex">
              <input type="text" placeholder="输入货运需求编号" name="" id="" value=""  v-model='billNo'  class="orderInput" /><div class="check" @click='check()'>查看</div>
            </div>
            <div class="dflex" style="align-items: center;">
              <span style="width: 65px;">订单筛选:</span>

            </div>

          </div>
          <!--表格标题-->
          <div class="TableTitle graybg">
            <span style="width: 12%;">装货点</span>
            <span style="width: 12%;">卸货点</span>
            <span style="width: 12%;">货物名称</span>
            <span style="width: 12%;">重量/吨</span>
            <span style="width: 12%;">承运商</span>
            <span style="width: 12%;">联系电话</span>
            <span style="width: 12%;">订单状态</span>
            <span style="width: 12%;">订单操作</span>
          </div>

          <ul class="logistics mt10" v-for="(item, index) in dataList" :key="index">
            <h2>
              <span>编号：<span class="gray">{{item.billNo}}</span></span><span>发布时间：<span class="gray">{{item.createTime}}</span></span>
            </h2>
            <li >
              <div class="priOpen">
                <span>{{item.dispatchFullAddress}} </span><span>{{item.receiptFullAddress}}</span><span>{{item.freightGoods}}</span><span>{{item.weight}}</span>
                <span>{{item.supplierName}}</span><span>{{item.supplierMobile}}</span>
                <div v-if='item.status==0'>
                      <span>取消</span>
                </div>
                <div v-if='item.status==1'>
                      <span>报价中</span>
                </div>
                <div v-if='item.status==2'>
                      <span>已选择</span>
                </div>
                <span><a class="logBtn redbg" @click='cancel(item)'>取消</a></span>
                <span><a class="logBtn greenbg" @click="detailLog(item)">用车详情</a></span>
              </div>
              <div class="pro_jmts">
                <ul>
                  <li v-for="(items, index) in dataList[index].freightOffers" :key="index">
                    <span style="width: 40%; text-align: left;margin-left: 10px;">{{items.supplierName}}</span>
                    <span>￥{{items.price}}</span>
                    <span>{{item.contact}}</span>
                    <span>{{item.phone}}</span>
                    <span v-if='items.status==1'><a class="logBtn greenbg" @click='setSelected(items)'>入 选</a></span>
                    <span v-else><a class="logBtn greenbg" >已入选</a></span>
                  </li>
                </ul>
              </div>

            </li>
          </ul>

            <pages :total="total" :show-total="showTotal" @change="changePage" :value="current_page" style="margin-top:20px;"></pages>
          <!-- <ul class="pagination">
            <li><a href="#">首页</a></li>
            <li><a href="#">上一页</a></li>
            <li><a href="#">1</a></li>
            <li><a class="active" href="#">2</a></li>
            <li><a href="#">3</a></li>
            <li><a href="#">4</a></li>
            <li><a href="#">5</a></li>
            <li><a href="#">6</a></li>
            <li><a href="#">7</a></li>
            <li><a href="#">下一页</a></li>
            <li><a href="#">尾页</a></li>
            <li class="ml10">共40页</li>
            <div class="ml30">转到第<input type="text" class="pageText" />页</div>
            <a class="PageNext">Go</a>
          </ul> -->


        </div>
      <Address-Detail :isshow="detailloading" @unChange="undetailChange" :datalist='addList'></Address-Detail>
     </div>
    </div>

  </div>
</template>

<script>
import Navigation from '../../components/navigation'
import { getCookies } from '../../config/storage'
import { sendHttp } from "../../api/common";
import server from "../../config/api";
import pagination from '../../components/pagination'
import AddressDetail from '../../components/freight-add/freght-detail'
export default {
  name: "userlog",
	middleware: 'memberAuth',
  layout:'membercenter',
  components:{
      AddressDetail,
    pages: pagination.pages,
     usernav: Navigation.user
  },
  fetch({ store }) {
    return Promise.all([
			//获取顶部、中部、底部导航信息
			store.dispatch('common/getNavList'),
			//获取系统配置
			store.dispatch('common/getSysConfig'),
    ])
  },
    data(){
        return{
            addList:{},
            billNo:"",
            detailloading:false,
            showcancel_pop:false,
            showEditpop:false,
            TipAddress:'',
            AddressNum:0,
            addressList:[],
            addressDefault:false,
            currTabs:0,
            addressId:0,
            total: 0,
            page_size:10,
            current_page:1,
            dataList:{},
            status:'',
            orderTabs:[
                {value: 0, name:'全部状态', status: 1},
                {value: 0, name:'报价中', status: 2},
                {value: 0, name:'已完成', status: 3},
                {value: 0, name:'已取消', status: 0},
            ],
            formAddress:{
                id:0,
                memberId: '',
                name: '',    //收货人姓名
                phone: '',   //收货人电话
                idNumber:'',  //身份证
                countryId: 0,   //国家
                state: 0, //省
                city: 0,     //市
                district: 0,      //区县
                address: '',//详细地址
                defaultAddress: 0,    //设置默认地址
                alias:''             //别名
            },
            formEditAddress:{},
        }
    },
  methods:{
    isLogin () {
        let userinfo = !getCookies('userinfor') ? '' : getCookies('userinfor')
        if (!userinfo) {
            return false
        }
        this.userinfo = userinfo
        return true
    },
    showTotal(total) {
            return `全部 ${total} 条`;
        },
    changePage (row) {
				this.current_page = row
				this.freight()
    },
    undetailChange(res) {

        this.detailloading = res
    },
    check(){
        this.freight();
    },
    detailLog(row){
         row.id=row.orderId
          this.addList = {
              ...row
          }
          this.detailloading = true
      },
    cancel(row){
         this.$Modal.confirm({
          title: '警告',
          content: '<p>确定要取消信息吗</p>',
                  onOk: () => {
              sendHttp(this,true,server.api.freight.cancel, {id: row.id},1).then(response => {
                  this.loading = false
                }).catch(err=>{
                  this.$Notice.warning({
                    title: '警告',
                    desc: err.response.data.message
                  })
                  this.freight();
                  this.loading = false
              })

          }
          })

    },
    setSelected(row){
         this.$Modal.confirm({
          title: '警告',
          content: '<p>是否进行入选</p>',
                  onOk: () => {
              sendHttp(this,true,server.api.freight.setSelected, {id: row.id},1).then(response => {
                  this.loading = false
                }).catch(err=>{
                  this.$Notice.warning({
                    title: '警告',
                    desc: err.response.data.message
                  })
                  this.freight();
                  this.loading = false
              })

          }
          })

    },
    setTabs(res){
            if(res == '1'){
                 this.status = ''
                this.currTabs = 0
            }else if(res == '2'){
                 this.status = 1
                this.currTabs = 1
            }else if(res == '3'){
                 this.status = 2
                this.currTabs = 2
            }else if(res == '0'){
                 this.status = 0
                this.currTabs = 3
            }
            this.freight()
    },
    async freight(){
        let params={
            status:this.status,
            billNo:this.billNo,
            current_page:this.current_page,
            page_size:this.page_size
        }
        const res = await sendHttp(this, true, server.api.freight.freightMyList,params,1)
        this.dataList=res.data.items;
        this.total=res.data.total

    }
  },
  created(){

    if(this.isLogin()){
      this.freight();
    }else{
       // window.location.href = '/login'
    }
  }
}
</script>

<style scoped>
.memberInfor{width: 83%;}

  .TableList{width: 95%;  margin: 0 auto;}
  .titleOrder{ display: flex; justify-content: space-between; align-items: center;  border-bottom: 2px solid #007de4; }
  .titleOrder li{padding: 8px 20px; font-size: 14px;}
  .titleOrder li.curr{background-color: #007de4; color: #fff;}

  .order_operate{display: flex;justify-content: space-between; align-items: center; margin: 20px auto;}
  .orderInput{width: 286px; border: 1px solid #DEDEDE; padding-left: 10px;box-sizing: border-box;}
  .check{ color: #fff; width: 60px;line-height: 32px; background-color: #007de4;text-align: center;margin-left: 5px;border-radius: 3px;}


    .TableTitle{margin: 10px auto; padding: 10px 0; display: flex;}
    .TableTitle span{text-align: center; font-size: 14px}
    .listT{width: 100%;border: none; }
    .listT:last-child{margin-bottom: 30px;}
    .listT .Ttitle td{padding: 10px 0;}
    .listT td{width: 15%; }
    .detailTable{height: 80px;}
    .detailTable td{text-align: center;overflow: hidden; padding: 10px 0;}
    .detailTable .operate .Paybtn{ width: 64%; margin: 0 auto;  padding: 4px 6px; color: #666; border-radius: 3px;display: inherit; }
    .detailTable .operate .PayCurr{background-color: #e93131; color: #fff;}
    .detailTable .operate .CarCurr{background-color: #007de4; color: #fff;}

    .logistics h2{ padding: 13px 10px; background-color: #f4f4f4;display: flex;justify-content: space-between; font-size: 14px;}
    .logistics li{border: 1px solid #e6e6e6;box-sizing: border-box; display: flex; flex-direction: column;   box-sizing: border-box; font-size: 14px;}
    .logistics li:hover{background-color: #fcfeff;}
    .logistics li>span{margin: 20px 4px;width: 18%;text-align: center;}
    .logBtn{padding: 4px 18px; color: #fff; border-radius: 3px;}
    .logistics li .priOpen{display: flex;align-items: center;width: 100%;}
    .logistics li .priOpen span{margin: 20px 4px;width: 18%; text-align: center;}
    .greenbg{background-color: #23aa36;}

    .pro_jmts ul{ background-color: #fff; border: 1px solid #e6f1f7;width: 95%;margin: 0 auto;margin-bottom: 10px;}
    .pro_jmts li{border: none; border-bottom: 1px solid #e6f1f7; display: flex; flex-direction: row;}
    .pro_jmts li:last-child{border-bottom: none;}

    /*页码*/
    ul.pagination {  display: inline-block;  padding: 0;   margin: 30px auto;display: flex;justify-content: center;}
    ul.pagination li{display: flex;align-items: center;}
    ul.pagination li a {background-color: #efefef;padding: 5px 11px;}
    ul.pagination li a{  color: #333;border: 1px solid #efefef; border-radius: 4px; padding: 8px 10px;
      text-decoration: none;transition: background-color .3s;  margin: 0 8px;}
    ul.pagination li a.active{background-color: #007de4; color: #fff;  border: 1px solid #007de4;}
    ul.pagination li a:hover:not(.active){background-color: #007de4; color: #fff;border: 1px solid #007de4;}
    ul.pagination .pageText{width: 40px;height: 35px; margin: 0 8px; border-radius:3px;    box-sizing: border-box; border: 1px solid #dededede;
      background-color: #fff;text-align: center;}
    ul.pagination .PageNext{border-radius: 2px; color: #666; width: 40px;height: 35px; line-height: 35px; margin: 0 15px; text-align: center;
      border: 1px solid #dededede;box-sizing: border-box;background-color: #efefef;}

</style>
