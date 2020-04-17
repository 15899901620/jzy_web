<template>
  <div class="my-outbox" style="display: flex">
    <vue-seamless-scroll :data="newsListProp" :class-option="optionSetting" class="table-content">
      <ul class="item" style="display: flex; color: #666">
        <li v-for="(item, index) in newsListProp" :key="index">
          <span class="mr5 time fwb" v-text="item.time"></span>
          <a :href="`/notice/detail/`+item.id"
            :title="item.title"
            class="content"
            :style="item.time==newDate?'color: #e50618;':''"
          >{{item.title}}</a>
          <span class="new" :style="item.time==newDate?'display: block':'display: none'">
            <img src="../../static/img/new_icon.gif" />
          </span>
        </li>
      </ul>
    </vue-seamless-scroll>
  </div>
</template>

<script>
export default {
  name: "marqueeWrap",
  props: {
    newsListProp: {
      type: Array
    }
  },
  computed: {
    optionSetting() {
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
  data() {
    return {
      newDate: this.$utils.dateFormat(new Date(), "MM-dd")
    }
  }
}
</script>

<style lang="less" scoped>
.my-outbox {
  /*color: #D7BC8D;*/
  overflow: hidden;
  color: #ffffff;
  /*background: #422b02;*/
  width: 86%;
}
.table-content {
  overflow: hidden;
  height: 30px;
  line-height: 30px;
  ul.item {
    width: 100%;
    list-style: none;
    display: flex;
    li {
      display: flex;
      margin-right: 35px;
      .time {
      }
      .content {
        white-space: nowrap;
      }
      .new {
        width: 18px;
        position: relative;
        top: -5px;
        img {
          width: 100%;
        }
      }
    }
  }
}
</style>
