<template>
  <div class="Logo">
    <a href="/">
      <img :src="$store.state.common.sysConfig.WEBLOGO" alt="巨正源" style="width: 100%; height: 100%">
    </a>
  </div>
</template>

<script>
	export default {
		name: "Logo",
		data() {
			return {}
		}
	}
</script>
