<template>
  <div>
      <h2>News Index page</h2>
      <p>NewsID:{{$route.params.newsId}}</p>
       <ul>
        <li><a href="/">Home</a></li>
      </ul>
  </div>
</template>

<script>
  export default {
      name: "_detail"
  }
</script>

<style scoped>

</style>
