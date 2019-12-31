<template>
    <div class="my-outbox">
        <div class="my-inbox" ref='box'>
            <div class="my-list"   v-for="(item,index) in sendValList " :key='index' ref='list' @mouseenter="slideStop" @mouseleave="slideRun">
                <!--{{item.name}}刚刚购买了产品-->
                <span class="my-uname">
                    <span>{{item.time}}</span>
                    <nuxt-link :to="{name:'notice-detail-id', params:{id:item.id}}" :title="item.title">
                      <span  :style="item.time==newDate?'color: #e50618;':''">{{item.title}}</span>
                    </nuxt-link>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    import { sendCurl } from '../../api/common'
    import server from '../../config/api'
export default {
    name: "marqueeWrap",
     props: ['sendVal'],
    data(){
        return{
            // 定时器标识
            nowTime: null,
            animate:false,
            // 每一个内容的宽度
            disArr: [],
            sendValList:[],
            newDate: this.$utils.dateFormat(new Date(), 'MM-dd')
        }
    },
    mounted(){
        let that = this
        that.getNoticeList()
        that.startMove()

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
                if (Math.abs(startDis) > Math.abs(that.disArr[0])) {
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
        width: 90%;
        .my-inbox{
            width: 1500px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            white-space: nowrap;
            .my-list{
                width: 20%;
                margin-right: 25px;
                display: flex;
                justify-content: center;
                font-size: 0.3rem;
                transition: left 0.5s;
                .my-uname{
                    /*color: #FF8900;*/
                    color: #666666;
                }
            }
        }
    }
</style>
