<template>
  <div :class="classes" :test="this.friendListProp.length">
    <ul class="coorperatTitle">
      <li
        :class="{tabs_tab_active: currentValue === index}"
        v-for="(item,index) in coorper"
        :key="index"
        @click="handleChange(index)"
      >{{item.name}}</li>
    </ul>

    <ul class="coorperList" v-show="currentValue === 0">
      <template v-for="item in brandList">
        <li v-for="(items, k) in item" :key="k">
          <template v-if="k < 14">
            <template v-if="items.url">
              <a :href="items.url" target="_blank" :title="items.brief">
                <img :src="items.image" />
              </a>
            </template>
            <template else>
              <a href="javascript:void(0)" :title="items.brief">
                <img :src="items.image" />
              </a>
            </template>
          </template>
        </li>
      </template>
    </ul>

    <ul class="Link" v-show="currentValue === 1">
      <li v-for="item in friendListProp" :key="item.name">
        <a :href="item.linkUrl" target="_blank">{{item.name}}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import carousel from "../carousel";
const prefixCls = "ant-cobrands";
import { mapState } from "vuex";
import { parse } from "qs";
import { cooperativeBrand } from "~/api/coobrand";
import Swiper from "swiper";

export default {
  name: "cobrands",
  components: {
    carousel,
    carouselItem: carousel.item
  },
  props: {
    isDelivery: {
      default: "0"
    },
    brandListProp: {
      type: Array
    },
    friendListProp: {
      type: Array
    }
  },

  data() {
    return {
      display: "none",
      brandList: [],
      cobrandData: [],
      currlist: [],
      coorper: [{ name: "合作品牌" }, { name: "友情链接" }],
      currentValue: 0
    };
  },
  computed: {
    ...mapState({
      cobrandsInfo: state => state.home.cobrandsInfo
    }),
    classes() {
      return [`${prefixCls}`, { [`${prefixCls}-cobrands`]: this.vertical }];
    }
  },
  methods: {
    mouseEnter() {
      var ul = document.getElementById("TimeL-ul");
      var li = ul.getElementsByTagName("li");
      if (li.length >= 5) {
        this.display = "flex";
      } else {
        this.display = "none";
      }
    },
    mouseLeave() {
      this.display = "none";
    },
    //点击tab标题触发
    handleChange: function(index) {
      this.currentValue = index;
    },
    returnImage(res) {
      return parse(res).image;
    },
    async cooperatbrand() {
      let cobrand,total
      if(!this.brandListProp){
        let params = {
          current_page: 1,
          page_size: 52,
          isDelivery: this.isDelivery
        }
        const res = await cooperativeBrand(this, params);
        cobrand = res.data.items
        total = res.data.total
      }else{
        cobrand = this.brandListProp
        total = this.brandListProp.length
      }
      
      if (cobrand) {
        let i = 0;
        let a = 14;
        let b = 0;
        let da = [];
        let ba = [];
        if (total > a) {
          let towdata = [];
          let showdata = [];
          let m = [];
          for (let k in cobrand) {
            if (i < a) {
              towdata.push(Object.assign({}, cobrand[k]));
              m[b] = towdata;
              i = i + 1;
            } else {
              towdata = [];
              b = b + 1;
              i = 0;
            }
          }
          this.brandList = m;
        } else {
          let onedata = [];
          for (let k in cobrand) {
            onedata.push(Object.assign({}, cobrand[k]));
          }
          this.brandList.push(onedata);
        }
      }
    }
  },
  mounted() {
    new Swiper(".swiper-container", {
      loop: true,
      // 如果需要分页器
      pagination: ".swiper-pagination",
      // 如果需要前进后退按钮
      nextButton: ".swiper-button-next",
      prevButton: ".swiper-button-prev",
      // 如果需要滚动条
      scrollbar: ".swiper-scrollbar"
    });
  },
  created() {
    this.cooperatbrand()
  }
}
</script>

<style lang="less">
</style>
