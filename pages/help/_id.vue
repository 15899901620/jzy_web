<template>
<div>
    <div>
        <ul v-if="datalist">
            <li v-for="(item, index) in datalist" :key="index">
                <h4>{{item.title}}</h4>
                <p v-for="(items, index2) in item.clist" :key="index2">
                    <nuxt-link :to="{name: 'help-id',params:{ id: items.id }}">{{ items.title }}</nuxt-link>
                </p>
            </li>
        </ul>
    </div>
    <div style="width: 1200px; margin: 0px auto;">
        <h3>{{this.detail.title}}</h3>
        <div v-html="this.detail.content"></div>
    </div>
</div>
</template>

<script>
import { helpPage, helpCatTree, helpdetail} from '../../api/helper'
import server from '../../api/server'
export default {
    data(){
        return{
            detail: {},
            datalist: [],
            // helpid: params.id
        }
    },
    methods: {
        async sourceDetail () {
            let params = {
                id: this.$route.params.id,
            }
            const res = await helpdetail(this, params)
            if (res.status == 200) {
                this.detail = res.data
            }
        },
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
        }
    },
    mounted () {
        this.sourceDetail()
        this.sourceData()
    }
}
</script>