<template>
  <div class="clearfix graybg">
    <div class="w1200 dflex " style="margin-bottom: 40px">
      <usernav></usernav>
      <div class="memberInfor ml20  whitebg bdccc  mt20">
        <!--个人信息-->
        <h1 class="fs16 ml25 mt25 pb10 pr" style="border-bottom: 2px solid #DEDEDE;width: 95%;" >我的竞拍
          <div class="bodbottom" style="width: 8%; height: 2px;"></div>
        </h1>

        <div class="" style="width: 95%; margin: 0 auto;">

          <div class="order_operate">
            <div class="dflex">
              <input type="text" placeholder="输入竞拍计划编号查询"  v-model="auctionNoSearch" ref="searchval" class="orderInput"  @keyup="auctionOrderList" />
              <div class="check">查看</div>
            </div>
            <div class="dflex" style="align-items: center;">
              <span style="width: 90px;">起始日期</span><input type="text" class="layui-input" id="test6" placeholder="选择订单时间">
            </div>
          </div>
          <div class="TableTitle graybg">
            <span style="width: 15%;">商品信息</span>
            <span style="width: 15%;">单价(元)</span>
            <span style="width: 15%;">竞拍数量(吨)</span>
            <span style="width: 15%;">冻结金额</span>
            <span style="width: 15%;">库区</span>
            <span style="width: 15%;">产品等级</span>
            <span style="width: 15%;">状态</span>
            <span style="width: 15%;">操作</span>
          </div>

          <table class="listT mt10" border="" cellspacing="" cellpadding="" v-for="(item, index) in AuctionOrder" :key="index">
            <tbody>
            <tr class="Ttitle graybg"   >
              <td colspan="8">
                <span class="ml10">计划编号：<span class="gray">{{item.auctionNo}}</span></span>
                <span class="ml15">下单时间：<span class="gray">{{item.createTime}}</span></span>
                <span class="fr mr15"><span class="gray">距离最后付款时间还剩：</span>
                   {{countDownList[index].day}}天{{countDownList[index].hou}}时{{countDownList[index].min}}分{{countDownList[index].sec}}秒</span>
<!--                  <span class="orangeFont">02</span>小时<span class="orangeFont">30</span>分<span class="orangeFont">25</span>秒</span>-->
              </td>
            </tr>
            <tr class="detailTable">
              <td>{{item.skuName}}</td>
              <td><span class="orangeFont">￥{{item.bidPrice}}元</span>/{{item.uomName}}</td>
              <td>
                 <p>总数：{{item.totalNum}}{{item.uomName}}</p>
                <p>已提：{{item.takenNum}}{{item.uomName}}</p>
                <p>未提：{{item.availableNum}}{{item.uomName}}</p>
              </td>
              <td>
                <span v-if="item.isUnfreeze ===0">{{item.depositAmount}}</span>
                <span v-if="item.isUnfreeze ===1">0</span>
              </td>
              <td>{{item.warehouseName}}</td>
              <td>
                <span v-if="item.productGrade ===1">优等品</span>
                <span v-if="item.productGrade ===2">一等品</span>
                <span v-if="item.productGrade ===3">合格品</span>
              </td>
              <td>
                <span class="gray" v-if="item.status === 0">已取消</span>
                <span class="gray" v-if="item.status === 1">待转订单</span>
                <span class="gray" v-if="item.status === 2">已完成</span>


              </td>
              <td class="operate">
                <div v-if="item.status === 0">
                  <a class="Paybtn mt15 CarCurr">已取消</a>
                </div>
                <div v-if="item.status === 1">
                  <a class="Paybtn mt15 CarCurr" @click="qrOrder(item.id)">去提货</a>
                </div>
                <div v-if="item.status === 2">
                  <a class="Paybtn mt15 CarCurr">已完成</a>
                </div>

                <a class="mt5">查看详情</a>
              </td>
            </tr>
            </tbody>
          </table>
          <!--页码-->
          <ul class="pagination">
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
            <div class="ml30">转到第<input type="text" class="pageText bdccc" />页</div>
            <a class="PageNext graybg">Go</a>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from '../../components/navigation'
import { auctionOrderList } from '../../api/auction'
import Cookies from 'js-cookie'

export default {
  name: "userauction",
  layout:'membercenter',
  components:{
    usernav: Navigation.user
  },
  fetch({ store }) {
    return Promise.all([
      store.dispatch('system/getSystemCnf'),
      store.dispatch('menu/getMenuList')
    ])
  },
  data(){
    return{
      counter:100,
      value:5,
      auctionNoSearch:'',   //竞拍计划编号
      skuNo:'',    //商品编码
      auctionId:'',   //竞拍活动ID
      status:'',       //状态 0-已取消 1-待转订单 2-已完成
      currentPage:1,
      pageSize:5,
      orderType:3,
      AuctionOrder:{},
      actEndTimeList: [],
      list:[
        {a:1},
        {b:1},
        {c:1},
      ]
    }
  },
  methods:{
    //提货_跳转到下单页
    qrOrder(id){
      this.$router.push({name:"Biders-BidersSubmit",query:{id:id}})
    },
      async auctionOrderList(){
        console.log('searchval',  this.$refs.searchval.value)
        this.auctionNoSearch=this.$refs.searchval.value
        console.log('auctionNoSearch', this.auctionNoSearch)
        if(Cookies.get('userinfor') && Cookies.get('webtoken')){
          let params={
            planNo: this.auctionNoSearch,       //订单编号
            skuName:this.skuName,                  //商品名称
            current_page:this.currentPage,        //当前页
            orderType:this.orderType,
            page_size:this.pageSize,           //每页显示的条数
          }
          let res = await  auctionOrderList(this,params)
          console.log('res',res)
          this.AuctionOrder=res.data.items
          var arrayData=[]
          for (var i=0;i<this.AuctionOrder.length;i++){
            if(i<this.pageSize){
              arrayData.push(this.AuctionOrder[i])
            }

          }
          console.log('arrayData',arrayData)
          var TimeArray= arrayData.map(function(v){
            return v.lastDeliveryTime
          })
          console.log('TimeArray',TimeArray)
          this.actEndTimeList =TimeArray
          console.log('actEndTimeList',this.actEndTimeList)
          this.countDown();
        }else{
          this.$Modal.confirm({
            title: '提示',
            content: '<p>您尚未登录，请先登录</p>',
            okText:'去登录',
            onOk: () => {
              this.$router.push({name:'login'});
            },

          });
        }

      },


    timeFormat(param) {
      return param < 10 ? '0' + param : param;
    },


    countDown(it) {

      // 获取当前时间，同时得到活动结束时间数组
      let newTime = new Date().getTime();
        // console.log('newTime', newTime)
      let endTimeList = this.actEndTimeList;
        //console.log('endTimeList', endTimeList)
      let countDownArr = [];
      // 对结束时间进行处理渲染到页面
      endTimeList.forEach(o => {
        let endTime = new Date(o).getTime();

        let obj = null;
        // 如果活动未结束，对时间进行处理
        if (endTime - newTime > 0) {

          let time = (endTime - newTime) / 1000;

          // 获取天、时、分、秒
          let day = parseInt(time / (60 * 60 * 24));
          let hou = parseInt(time % (60 * 60 * 24) / 3600);
          let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
          let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
          obj = {
            day: this.timeFormat(day),
            hou: this.timeFormat(hou),
            min: this.timeFormat(min),
            sec: this.timeFormat(sec)
          };
          console.log('obj',obj)
        } else { // 活动已结束，全部设置为'00'
          obj = {
            day: '00',
            hou: '00',
            min: '00',
            sec: '00'
          };
        }
        countDownArr.push(obj);
      });
      this.countDownList = countDownArr;
      setTimeout(this.countDown, 1000);

    },
  },
  mounted(){
    this.auctionOrderList()
  //  this.$store.commit('increment', {value:5})
  //  this.$store.dispatch('increment', {value:5})

  },
  destoryed () {
    clearTimeout()
  },
  computed:{

  }

}
</script>

<style scoped>
  .memberInfor{width: 83%;}

  .memberList h1.curr{border-bottom: 1px solid #DEDEDE;}
  .bodbottom{ position: absolute; bottom: -2px;width: 80%; height: 4px; background-color: #007de4;}

  .order_operate{display: flex;justify-content: space-between; align-items: center; margin: 20px auto; font-size: 14px}
  .orderInput{width: 286px; border: 1px solid #DEDEDE; padding-left: 10px;box-sizing: border-box;}
  .check{ color: #fff; width: 60px;line-height: 32px; background-color: #007de4;text-align: center;margin-left: 5px;border-radius: 3px;}

  .TableTitle{margin: 10px auto; padding: 10px 0; display: flex;}
  .TableTitle span{text-align: center; font-size: 14px;}

  .listT{width: 100%;border: none; font-size: 14px;}
  .listT:last-child{margin-bottom: 30px;}
  .listT .Ttitle td{padding: 10px 0;}
  .listT td{width: 12%; }

  .detailTable{height: 80px;}
  .detailTable td{text-align: center;overflow: hidden; padding: 10px 0;}
  .detailTable .operate .Paybtn{ width: 64%; margin: 0 auto;  padding: 4px 6px; color: #666; border-radius: 3px;display: inherit; }
  .detailTable .operate .PayCurr{background-color: #e93131; color: #fff;}
  .detailTable .operate .CarCurr{background-color: #007de4; color: #fff;}

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
