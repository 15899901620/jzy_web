<template>
    <div class="graybg ovh" >
        <div class="w1200" style="margin-bottom: 50px">
            <div class="ListTitle whitebg mt20">
                <div class="TitleName">中标公告</div>
                <!-- <a class="mr20 mt15 mb15 gray fs14" @click="WineBid">更多</a> -->
            </div>
            <div class="graybg trendlistTitle">
                <span style="width:15%; padding-left: 65px">招标编号</span>
                <span class="tac" style="width:25%;">招标名称</span>
                <span class="tac" style="width:20%;">距招标结束</span>
                <span class="tac" style="width: 10%">招标状态</span>
                <span class="tar" style="width: 17%">招标时间</span>
            </div>
            <div  id="box"   >
                <div  id="con1">
                    <ul class="trendlist"  ref="con1"   @mouseenter="mEnter" @mouseleave="mLeave">
                        <template v-if='WinbidList.length>0'>
                        <li  @click="WineDetail(item)" v-for="(item, index) in WinbidList" :key="index"  ref="con3" >
                             <span  style="width: 15%;padding-left: 45px">{{item.biddingNo}}</span>
                            <span class="tac" style="width:25%;">{{item.title}}</span>
                            <span class="tac" style="width: 20%">
                          <template >
                            <TimeDown  :endTime="item.endTime" formatStr='{D}天{H}小时{M}分{S}秒' endMsg="已结束" :onTimeOver="reloadPage"></TimeDown>
                          </template>
                      </span>
                            <span class="tac" style="width: 10%">
                            {{item.statusName}}
                      </span>
                            <span class="tar gray pr10" style="width: 20%">{{item.beginTime}}</span>

                      </li>
                        </template>
                        <template v-else>
                            <li style="justify-content: center;">
                            <sapn  >暂无中标数据</sapn>
                            </li>
                        </template>
                    </ul>
                </div>
            </div>
<!--            <div style="text-align: center;" v-else>-->
<!--                <sapn  >暂无中标数据</sapn>-->
<!--            </div>-->

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
        props:{

        },
        data() {
            return {
                animate:false,
                activeIndex: 0,
                intnum: null,
                WinbidList:{},
                SupplierInfor: Cookies.get("supplierInfor"),
            };
        },
         computed: {
             top () {
                 return -this.activeIndex * 50 + 'px'
             }
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
                console.log( this.dataList)
                 this.WinbidList= this.dataList.filter(function (item) { return item.statusName === '已中标'; });
                console.log("WinbidList:", this.WinbidList)
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
                if(that.WinbidList.length>5){
                    that.timer1= setInterval(this.scroll,1000)
                }
             },
        },
        mounted(){
            let that=this

            that.SourceData()

            if(that.WinbidList.length>5){
                this.timer1= setInterval(this.scroll,1000)
            }
        },
         create(){
             let that=this
             that.SourceData()
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
    transition: all 0.5s;
    overflow: hidden;
    height: 355px;
    background-color: #fff;
}
.anim{
    transition: all 0.5s;
}
#con1 li{
    list-style: none;
    border-bottom: 1px solid #f7f7f7;
}
</style>
