<template>
  <v-carousel hide-controls style="height: 320px">
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
      style="background: none;height: 320px"
    ></v-carousel-item>
  </v-carousel>
</template>

<script>
    export default {
        name: "Indexbanner",

      data () {
        return {
          items: [
            {
              src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg'
            },
            {
              src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg'
            },
            {
              src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg'
            },
            {
              src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg'
            }
          ]
        }
      }
    }
</script>

<style >



</style>
