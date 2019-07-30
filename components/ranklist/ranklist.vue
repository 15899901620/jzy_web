<template>
    <div>
        <ul>
            <li v-for="(item, index) in datalist" :key="index">
                {{index+1}}<a href="">{{item.title}}}</a>
            </li>
        </ul>
    </div>
</template>
<<script>
import { mutations } from 'vuex'

export default {
    name: 'ranklist',
    data: () => ({
        title: '热点推荐',
        datalist: [
            {id:1,title:'超四十款终端预年内上市百亿',},
            {id:2,title:'2019 中国地产智能家居高峰'},
            {id:3,title:'捷报！巨正源荣获2018中国'},
            {id:4,title:'四川茂县叠溪镇领导一行到访'},
            {id:5,title:'国庆物流发货公告'},
            {id:6,title:'中秋物流延迟公告'},
            {id:7,title:'利用安防监控助力食品安全'},
            {id:8,title:'弱电计算机机房工程施工方案'},
            {id:9,title:'超四十款终端预年内上市百亿'}
        ]
    }),
    props: {
    },
    created() {
        commit('updateListName', '11111111')
    },
    computed: {
        ...mutations(
            'updateListName'
        )
    },
    watch: {
    }
    methods: {
    }

}
</script>