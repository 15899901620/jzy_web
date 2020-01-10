<template>
    <div class="my-outbox" style="display: flex">
        <vue-seamless-scroll :data="sendValList"  :class-option="optionSetting" class="table-content"  >
            <ul class="item" style="display: flex; color: #666">
                <li v-for="(item, index) in sendValList" :key="index"   >
                    <span class="mr5 time fwb" v-text="item.time"> </span>
                    <nuxt-link :to="{name:'notice-detail-id', params:{id:item.id}}" :title="item.title" class="content"  :style="item.time==newDate?'color: #e50618;':''" v-text="item.title" >
<!--                      <span  :style="item.time==newDate?'color: #e50618;':''" v-text="item.title"> </span>-->
                    </nuxt-link>
                    <span class='new' :style="item.time==newDate?'display: block':'display: none'"><img src="../../static/img/new_icon.gif"/></span>
                </li>
            </ul>
        </vue-seamless-scroll>
    </div>
</template>

<script>
    import { sendCurl } from '../../api/common'
    import server from '../../config/api'
export default {
    name: "marqueeWrap",
     props: ['sendVal'],
    components:{
     },
    computed:{
        optionSetting () {

            return {

                step: 0.5, // 数值越大速度滚动越快

                limitMoveNum: 2, // 开始无缝滚动的数据量 this.dataList.length

                hoverStop: true, // 是否开启鼠标悬停stop

                direction: 2, // 0向下 1向上 2向左 3向右

                openWatch: true, // 开启数据实时监控刷新dom

                singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1

                singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3

                waitTime: 1000 // 单步运动停止的时间(默认值1000ms)

            }

        }
    },
    data(){
        return{
            // 定时器标识
            nowTime: null,
            animate:false,
            // 每一个内容的宽度
            disArr: [],
            sendValList:[],
            newDate: this.$utils.dateFormat(new Date(), 'MM-dd'),
        }
    },
    mounted(){
        let that = this
        that.getNoticeList()
      //  that.startMove()

     },
    beforeCreate(){

    },
    created () {
        let that=this
        this.getNoticeList()
    },
    beforeDestroy () {
        // 页面关闭清除定时器
        clearInterval(this.nowTime)
        // 清除定时器标识
        this.nowTime = null
    },
    methods:{
        startMove(){
            let that=this
            setTimeout(function () {
                var item = that.$refs.list;
                var len = that.sendVal.length;
                var arr = [];
                var margin = that.getMargin(item[0]) //因为设置的margin值一样，所以取第一个就行。
                for(var i = 0;i < len;i++){
                    arr.push(item[i].clientWidth + margin)//把宽度和 margin 加起来就是每一个元素需要移动的距离
                }
                that.disArr = arr;
                that.moveLeft();
            },500)
        },
        slideStop(){
            clearInterval(this.nowTime)
        },
        slideRun(){
          this.moveLeft()
        },
        async getNoticeList() {
            let that=this
            let params={
                current_page: 1,
                page_size: 10,
                sortBy: 'add_time', desc: true, isShow: 1
            }
            let res = await sendCurl(this, server.api.information.getNoticeCatList, params)
            if (res.status === 200) {
                console.log("getNoticeListres",res)
                that.sendValList=res.data.items
            }
        },
        // 获取margin属性
        getMargin (obj) {
            var marg = window.getComputedStyle(obj, null)['margin-right']
            marg = marg.replace('px', '')
            return Number(marg) // 强制转化成数字
        },
        // 移动的方法
        moveLeft () {
            var that = this
            var outbox = this.$refs.box
            // 初始位置
            var startDis = 0
            this.nowTime = setInterval(function () {
                startDis -= 0.5
                // console.log('初始化移动：', startDis)
                console.log("startDis:",Math.abs(startDis))
                console.log("disArr:", Math.abs(that.disArr[0]))
                if (Math.abs(startDis) > 500) {
                    // 每次移动完一个元素的距离，就把这个元素的宽度
                    that.disArr.push(that.disArr.shift())
                    // 每次移动完一个元素的距离，就把列表数据的第一项放到最后一项
                    that.sendValList.push(that.sendValList.shift())
                    startDis = 0
                    // console.log('移动')
                } else {
                    // console.log('不来不来就不来...')
                }
                // 每次都让盒子移动指定的距离，在我自己做的项目中，这种字符串拼接的方法并没有生效
                // outbox.style = 'transform: translateX3d(' + startDis + 'px)'
                // 后面换了es6的模板字符串就可以了
                outbox.style = `transform: translateX(${startDis}px)`
            }, 1000 / 60)
        }
    },

}
</script>

<style lang="less" scoped>
    .my-outbox{
        /*color: #D7BC8D;*/
        overflow: hidden;
        color: #FFFFFF;
        /*background: #422b02;*/
        width: 86%;
    }
    .table-content{
        overflow: hidden;
        height:30px;
        line-height: 30px;
        ul.item {
            width: 100%;
            list-style: none;
            display: flex;
            li {
                display: flex;
                margin-right: 35px;
                .time{  }
                .content{white-space:nowrap;}
                .new{
                    width: 18px;position:relative; top: -5px;
                    img{width: 100%;}
                }
            }
        }
    }
</style>
