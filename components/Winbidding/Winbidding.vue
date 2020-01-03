<template>
    <div class="graybg ovh" >
        <div class="w1200" style="margin-bottom: 50px">
            <div class="ListTitle whitebg mt20">
                <div class="TitleName">中标公告</div>
                <!-- <a class="mr20 mt15 mb15 gray fs14" @click="WineBid">更多</a> -->
            </div>
            <div class="graybg trendlistTitle">
                <span style="width:15%; padding-left: 65px">中标编号</span>
                <span class="tac" style="width:25%;">中标名称</span>

                <span class="tac" style="width: 10%">招标状态</span>
                <span class="tar" style="width: 17%">招标时间</span>
                <span class="tac" style="width:25%;">中标信息</span>
            </div>
            <div id="box">
                <vue-seamless-scroll :data="dataList"  :class-option="optionSetting" class="table-content"  >
                    <ul class="trendlist" >
                      <template v-if='dataList.length>0'>
                          <li   v-for="(item, index) in dataList" :key="index"  ref="con3" >
                            <span  style="width: 15%;padding-left: 45px">{{item.biddingNo}}</span>
                            <span class="tac" style="width:25%;">{{item.title}}</span>

                            <span class="tac" style="width: 10%">{{item.statusName}}</span>
                            <span class="tar" style="width:20%">{{item.beginTime}}</span>
                            <span class="tac" style="width: 20%">
                               <span><Button type="error" label="small" @click="WineDetail(item)">中标公告</Button></span>
                            </span>
                          </li>
                      </template>
                      <template v-else>
                          <li style="justify-content: center; color: #999"><span>暂无中标数据</span></li>
                      </template>
                    </ul>
                </vue-seamless-scroll>
            </div>


        </div>
    </div>
</template>

<script>
    import { sendHttp } from "../../api/common";
    import server from "../../config/api";
    import TimeDown from '@/components/timeDown'
    import Cookies from "js-cookie";
      export default {
        name: "Winbidding",
        components:{
            TimeDown,
         },
        data() {
            return {
                animate:false,
                activeIndex: 0,
                intnum: null, 
                dataList:{},
                SupplierInfor: Cookies.get("supplierInfor"),
            };
        },
         computed: {
             top () {
                 return -this.activeIndex * 50 + 'px'
             },
              optionSetting () {
                 return {

                     step: 0.5, // 数值越大速度滚动越快

                     limitMoveNum: 2, // 开始无缝滚动的数据量 this.dataList.length

                     hoverStop: true, // 是否开启鼠标悬停stop

                     direction: 1, // 0向下 1向上 2向左 3向右

                     openWatch: true, // 开启数据实时监控刷新dom

                     singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1

                     singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3

                     waitTime: 1000 // 单步运动停止的时间(默认值1000ms)

                 }
              },
         },
        methods:{
            async SourceData() {

                let params={
                    type:2
                }
                console.log("params:", params)
                console.log("SupplierInfor:", this.SupplierInfor)
                if(this.SupplierInfor){
                    const res = await sendHttp(this, true, server.api.biddding.bidList,params,2)
                    this.dataList = res.data.items
                }else{
                    const res = await sendHttp(this, false, server.api.biddding.bidList,params)
                    this.dataList = res.data.items
                }
            },
            WineDetail(row){
                console.log("row",row)
                this.$router.push({
                        name: 'WinAnnoun-id',
                        query: {
                            id: row.id
                        }
                    })
            },
        },
        mounted(){
            let that=this
            that.SourceData()
        },
         create(){
         }
    }
</script>

<style scoped>
.trendlistTitle {
    display: flex;
}
.trendlistTitle span {
    padding: 20px 0;
    font-size: 16px;
}
.trendlist {
    font-size: 14px;
}
.trendlist li {
    padding: 24px 0;
    display: flex;
    margin-bottom: 1px;
}
.trendlist li:hover {
    background-color: #f2f8fe;
}
scroll-content {
    position: relative;
    transition: top 0.5s;
}

#box{
    width: 100%;
    overflow: hidden;
    background-color: #fff;
    height:230px;
}
.anim{
    transition: all 0.5s;
}
#con1 li{
    list-style: none;
    border-bottom: 1px solid #f7f7f7;
}
</style>
