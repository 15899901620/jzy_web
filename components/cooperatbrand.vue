<template>
  <div class="w1200 ">
    <div class="ListTitle  whitebg mt20">
      <div class="TitleName">合作品牌</div>
    </div>
    <div class="coorperMain" id="Coorparent">
      <Carousel
        v-model="value3"
        :autoplay="setting.autoplay"
        :autoplay-speed="setting.autoplaySpeed"
        :dots="setting.dots"
        :radius-dot="setting.radiusDot"
        :trigger="setting.trigger"
        :arrow="setting.arrow">
        <CarouselItem>
          <ul class="coorperList">
            <li>
              <a v-for="(item, index) in brandList" :key="index"><img :src="item.image"/></a>
            </li>
          </ul>
        </CarouselItem>
        <CarouselItem>
          <ul class="coorperList">
            <li v-if="brandList01 >=  1">
              <a v-for="(item, index) in brandList01" :key="index"><img :src="item.image"/></a>
            </li>
          </ul>
        </CarouselItem>
      </Carousel>
    </div>
  </div>
</template>

<script>
import { cooperativeBrand } from '../api/coobrand'
export default {
  name: "cooperatbrand",
  data(){
    return{
      value3: 0,
      setting: {
        autoplay: false,
        autoplaySpeed: 2000,
        dots: 'inside',
        radiusDot: true,
        trigger: 'click',
        arrow: 'hover'
      },
      display: "none",
      brandList:[],
      brandList01:[]
    }
  },
  methods: {
    async cooperatbrand() {
      let params = {
        current_page: 1,
        page_size: 14,
      }
      const res = await cooperativeBrand(this, params)
      this.brandList = res.items
    },
  }
}
</script>

<style scoped>
  .coorperMain{position: relative;overflow: hidden;}
  .coorperList{display: flex; flex-wrap: wrap; position: relative; width: 2400px;}
  .coorperList li{display: flex; flex-wrap: wrap;width: 1200px;}
  .coorperList li a{ margin-top: 1px; margin-right: 1px; width: 170.4px; height: 85px; background-color: #fff; display: flex;justify-content: center;align-items: center;}
  .coorperList li a img{ height: 65%;}
  /*左右箭头切换*/
  .position{cursor: pointer; display: flex; justify-content: center; align-items: center; position: absolute;top: 92px;width: 24px;height: 40px;background: rgba(146,146,146,0.8); opacity: 0.5;z-index: 10;}

</style>
