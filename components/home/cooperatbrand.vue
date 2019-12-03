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
          
            <ul class="coorperList" v-show="currentValue === 0">
                <template v-for="(item, index) in brandList"  >
                    <li v-for="(items, k) in item" :key="k" v-if="k<14">
                        <template v-if="items.url">
                            <a :href="items.url" target="_blank" :title="items.brief"><img :src="items.image"/></a>
                        </template>
                        <template else>
                              <a  href="javascript:void(0)" :title="items.brief"><img :src="items.image"/></a>
                        </template>
                       
                    </li>
                </template>
            </ul>
        </CarouselItem>
      </Carousel>
    </div>
  </div>
</template>

<script>
import { cooperativeBrand } from '~/api/coobrand'
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
    }
  },
  methods: {
    async cooperatbrand() {
      let params = {
        current_page: 1,
        page_size: 42,
      }
      const res = await cooperativeBrand(this, params)
      this.brandList = res.data.items
    },
  },
  mounted () {
    this.cooperatbrand()
  },
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
