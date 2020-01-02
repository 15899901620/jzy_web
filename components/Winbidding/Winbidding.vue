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
                <vue-seamless-scroll :data="WinbidList"  :class-option="optionSetting" class="table-content"  @copy-data="listData4 = listData4.concat(listData4)">
                    <ul class="trendlist" >
                      <template v-if='WinbidList.length>0'>
                          <li   v-for="(item, index) in WinbidList" :key="index"  ref="con3" >
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
                WinbidList:{},
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
                if(this.SupplierInfor){
                    const res = await sendHttp(this, true, server.api.biddding.bidddingList,'',2)
                    this.dataList = res.data.items
                }else{
                    const res = await sendHttp(this, false, server.api.biddding.bidddingList)
                    this.dataList = res.data.items
                }

                this.WinbidList= this.dataList.filter(function (item) { return item.statusName === '已中标'; });

            },
            WineBid(){},
            reloadPage(){},
            scroll(){
                var that = this; // 在异步函数中会出现this的偏移问题，此处一定要先保存好this的指向
                let con1 = this.$refs.con1;
                let con3 = this.$refs.con3;
                setTimeout(function(){
                        // // 每次移动完一个元素的距离，就把这个元素的宽度
                        // that.disArr.push(that.disArr.shift())
                        // // 每次移动完一个元素的距离，就把列表数据的第一项放到最后一项
                        that.WinbidList.push(that.WinbidList[0]);
                        that.WinbidList.shift();
                        that.animate=!that.animate; // 这个地方如果不把animate 取反会出现消息回滚的现象，此时把ul 元素的过渡属性取消掉就可以完美实现无缝滚动的效果了
                },500)
            },
            mEnter () {
                clearInterval(this.timer1)
            },
            mLeave () {
                let that=this
                if(that.WinbidList.length>3){
                    that.timer1= setInterval(this.scroll,1000)
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
