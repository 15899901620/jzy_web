<template>
  <treeselect v-model="selectValue" placeholder="选择用户标签" noChildrenText="无子标签" :disabled="isReadOnly" :multiple="isMultiple"
              :options="treeData" @close="myClose" :load-options="loadOptions"/>
</template>
<script>
import Treeselect from '@riophae/vue-treeselect'
// import the styles
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { userlabel} from '../../api/label'
export default {
    name: 'MemberLabelSelect',
    components: { Treeselect },
    props: {
      value: {
        type: String,
        default: ''
      },
      isMultiple: {
        type: Boolean,
        default: false
      },
      isReadOnly: {
        type: Boolean,
        default: false
      }
    },
    data() {
        return {
          treeData: [],
          selectValue: []
        }
    },
    created: function(){
      this.initData()
    },
    methods: {
      initData () {
        userlabel(this,{}).then(response => {
          if (response.status === 200) {
            this.treeData = response.data
          }
        }).catch(err => {
          if (err) {
            this.$Notice.warning({
              title: '提醒',
              desc: '获取标签不成功！'
            })
          }
        })
      },
      loadOptions({ action, parentNode, callback }) {
          parentNode.children = []
          callback()
      },
      myClose(){
        this.$emit('onChange', this.selectValue.join(','))
      },
    },
    watch: {
      value: function (e) {
        console.log('watch', e)
        if(e != ''){
          this.selectValue = e.split(',')
        }else{
          this.selectValue = []
        }
      },
    }
}
</script>

