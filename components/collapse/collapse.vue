<template>
  <div :class="classes" :style="{ display: openCol }">
    <div class="menu_items" @mouseleave="oneMouseout" @mouseenter="oneMouseOver">
      <div class="menu_items_text">
        <i class="see_icon"></i><span class="ml10" style="width: 80%;">查产品</span><i class="next"></i>
      </div>
      <div class="product_assortment assortment" v-show="seen" style="display: block; height: 320px; overflow:hidden;">
        <ul class="AssProduct">
          <li>
            <div class="ass-ty2-p 1">
              <p class="fs16"><i></i>热门分类:</p>
              <p style="word-wrap:break-word" v-for="(items,index) in $store.state.common.hotCategory" :key="index">
                <a style="float:left" :href="`/spot?category_id=${items.id}`">{{items.name}}</a>
              </p>
            </div>
          </li>
          <li>
            <div class="ass-ty2-p 1">
              <p class="fs16 mt10"><i></i>热门牌号:</p>
              <p style="word-wrap:break-word" v-for="(items,index) in $store.state.common.hotProduct" :key="index">
                <a style="float:left" :href="`/spot?keyword=${items.title}`">{{items.title}}</a>
              </p>
            </div>
          </li>
          <li>
            <div class="ass-ty2-p level 1">
              <p class="fs16 mt10"><i></i>加工级别:</p>
              <div style="margin-left: -10px;">
                <p style="word-wrap:break-word" v-for="(items,index) in $store.state.common.productLevelValues"
                   :key="index">
                  <a style="float:left" :href="`/spot?level_id=${items.id}`">{{items.value}}</a>
                </p>
              </div>

            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="menu_items" @mouseleave="twoMouseout" @mouseenter="twoMouseOver">
      <div class="menu_items_text">
        <i class="freight_icon"></i><span class="ml10" style="width: 80%;">查运费</span><i class="next"></i>
      </div>
      <div class="freight_assortment assortment" v-show="seentwo" @click="toLogistics">
        <div class="mt20 ml20">
          <span class="mr10">装点</span>
          <i-select style="width:32%;height: 32px">
          </i-select>
          <span class="ml5">-</span>
          <span class="ml5 mr5">卸点</span>
          <i-select style="width:32%;height: 32px">
          </i-select>

        </div>
        <div class="mt20 ml20 dflexAlem">
          <span class="mr10">类目</span>

          <div class="freeselect">
            <select name="cars">
            </select>
          </div>
        </div>
        <div class="mt20 ml20">
          <span class="mr10">吨位</span>
          <input type="text"
                 style="width: 80%; height: 32px; border: 1px solid #DEDEDE; border-radius: 2px;padding-left: 10px;box-sizing: border-box;"
                 name="" value=""/>
        </div>

        <div class="freigth_query">查询</div>
        <div class="dflexAlem" style="height: 80px;background-color: #fbfbfb;">
          <div class="dflex" style="flex-direction: column; width: 47%;">
            <div class="SaveTime ml20"><img src="../../static/img/savetime.png"/><span class="ml5 fs16">省时</span></div>
            <p class="ml20 gray mt3">当天下单 当天派车</p>
          </div>
          <div class="linefreig"></div>
          <div class="dflex" style="flex-direction: column; width: 35%; margin: 0 auto;">
            <div class="SaveTime"><img src="../../static/img/savefir.png"/><span class="ml5 fs16">省力</span></div>
            <p class="gray mt3">塑料专车 说走就走</p>
          </div>
        </div>
      </div>
    </div>
    <div class="menu_items" @mouseleave="threeMouseout" @mouseenter="threeMouseOver">
      <div class="menu_items_text">
        <i class="Text_icon"></i><span class="ml10" style="width: 80%;">查质检单</span><i class="next"></i>
      </div>
      <div class="assortment qualityBg" v-show="seenthree">
        <ul class="qualityListindex">
          <li>
            <span class="quality_title">日期</span>
            <row>
              <i-col span="12">
                      <DatePicker type="month" placement="bottom-end" placeholder="生产日期至"  @on-change="QDate" style="width: 217px"></DatePicker>
              </i-col>
            </row>
          </li>
          <li>
            <span class="quality_title">批次号</span>
            <div style="display: flex;flex-direction: column; position: relative">
              <input type="text" class="batchNumber" v-model="qualityForm.qualityNo" name="" value=""/>
            </div>
          </li>
        </ul>
        <div class="qualityQuality" @click="Quality()">查 询</div>
      </div>
    </div>
    <div class="menu_items">
      <div class="menu_items_text">
        <i class="capital_icon"></i>
        <span class="ml10" style="width: 80%;">
          <a href='/users/usercapitalmanage' style="color:#fff;">查资金</a>
        </span>
        <i class="next"></i>
      </div>
    </div>
  </div>
</template>

<script>
	const prefixCls = 'ant-collapse'

	export default {
		name: 'collapse',
		data() {
			return {
				current_page: 1,
				page_size: 10,
				seen: false,
				seentwo: false,
				attrlist: {},
				seenthree: false,
				datePif: false,
				qualityForm: {
					qualityDate: '',
					qualityNo: '',
				},

			};
		},
		props: {
			openCol: {
				type: String,
				default: 'none'
			}
		},
		computed: {
			classes() {
				return [
					`${prefixCls}`,
					{[`${prefixCls}-collapse`]: this.vertical},
				];
			},
		},
		methods: {
			oneMouseout: function () {
				this.seen = false;
			},
			oneMouseOver: function () {
				this.seen = true;
			},
			twoMouseout: function () {
				this.seentwo = false;
			},
			twoMouseOver: function () {
				this.seentwo = true;
			},
			threeMouseout: function () {
				this.seenthree = false;
			},
			threeMouseOver: function () {
				this.seenthree = true;
			},
			QDate(date) {
				this.qualityForm.qualityDate = date
			},
			//质检单页面
			Quality() {
				this.$router.push({
					name: 'quality',
					query: {batchNo: this.qualityForm.qualityNo, productionDate: this.qualityForm.qualityDate}
				})
				this.qualityForm.qualityDate = ''
				this.qualityForm.qualityNo = ''
			},
			toLogistics() {
				window.location.href = '/logistics'
			}

		},
		mounted() {
			this.$store.dispatch('common/getHotCategory')
			this.$store.dispatch('common/getHotProduct')
			this.$store.dispatch('common/getProductLevelValues')
		},
	}
</script>

<style>

</style>
