<template>
  <div class="beginner">
    <ul v-if="datalist">

      <li v-for="(item, index) in datalist" :key="index">
        <h4>{{item.title}}</h4>
        <p v-for="(items, index2) in item.clist" :key="index2">
           <nuxt-link :to="{name: 'help-id',params:{ id: items.id }}">{{ items.title }}</nuxt-link>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import { helpPage, helpCatTree} from '../../../api/helper'
export default {
  name: "helpnav",
  data () {
    return {
      datalist: [],
    }
  },
  methods: {
    async sourceData() {
      let params = {
        parentId: 0,
        indexShow: 1
      }
      const res = await helpCatTree(this, params)
      let cateData = res.data
      for (let k in cateData){
          let paramst = {
            catId: cateData[k].id,
            indexShow: 1
          }
          const rest = await helpPage(this, paramst)
          let restdata = rest.data
          cateData[k]['clist'] = restdata
      }
      this.datalist = cateData
      console.log('data', cateData)
    }
  },
  mounted () {
    this.sourceData()
  }
}
</script>

<style scoped>
.beginner ul{ display: flex;}
.beginner li {float: left;width: 160px;}
.beginner li h4 {font-size: 16px;  padding-bottom: 10px; color: #333333;}
.beginner li a {  color: #666; display: block;}
</style>
