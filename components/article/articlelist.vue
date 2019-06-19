<template>
      <li v-for="(item, index) in datalist" :key="index">
          <div class="newsImg">
            <img src={{ item.image }} />
          </div>
          <div class="News_content">
           <h2><nuxt-link to="/">{{item.title}}}</nuxt-link></h2>
            <div class="NewsList_text">{{item.seoDescription}}</div>
            <div class=" mt20">
              <div class="dflexAlem fl"><img src="../assets/img/newsTime.png"/><span class="gray ml10">{{item.addTime}}</span></div><div class="gray fl ml30">来源：{{item.author}}</div><a class="blueFont fr">阅读更多</a>
            </div>
          </div>
        </li>
</template>

<script>
    export default {
        name: "articlelist"
    }
</script>

<style scoped>

</style>
