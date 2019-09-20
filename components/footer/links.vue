<template>
  <div class="ensure-wrap">
    <div class="links">
      <h4 class="mt20 fs16 mb10">友情链接：</h4>
      <div class="list">
        <span v-for="(item, index) in $store.state.common.friendlyList" :key="index">
          <a :href="item.linkUrl" target="_blank">{{ item.name }}</a>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
	export default {
		name: "Links",
	}
</script>