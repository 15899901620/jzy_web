<template>
  <div class="TopSearch">
    <div style="display: flex;">
      <input class="search-text" autocomplete="off" id="keyword" v-model="keyword" type="text" name="keyword"
             placeholder="请输入牌号、厂商进行搜索">
      <input class="search-btn" id="search_submit" type="button" @click="gotoSearch" value="搜  索">
    </div>
    <div class="HotTip mt5 fs12" style="display: flex;">
      <span>热门搜索 :</span>
      <ul>
        <li v-for="(item, index) in $store.state.common.hotSearch" :key="index">
          <a :href="`/spot?keyword=${item.searchKey}`">{{ item.searchKey }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
	export default {
		name: "search",
		data() {
			return {
				keyword: this.$route.query.keyword || ''
			}
		},

		methods: {
			gotoSearch() {
				let kd = this.keyword
				// if (!kd) return false;
				this.$router.push({name: 'spot-page', query: {keyword: kd}})
			}
		},
		mounted() {
			this.$store.dispatch('common/getHotSearch')
		}
	}
</script>
