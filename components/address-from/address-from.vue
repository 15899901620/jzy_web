<template>
    <div>
        <Row :gutter="24" index="1">
            <Col span="5" style="padding:0px;">
                <Select :value="selectValue.countryId" @on-change="countryChange">
                    <Option v-for="item in countryData" :value="item.id" :key="item.id" >{{ item.name }}</Option>
                </Select>
            </Col>
            <Col span="5" style="padding:0px; margin-left: 3px">
                <Select :value="selectValue.provinceId" @on-change="provinceChange">
                    <Option v-for="(item, index) in provinceData" :value="item.regionId" :key="index" >{{ item.regionName }}</Option>
                </Select>
            </Col>
            <Col span="5" style="padding:0px; margin-left: 3px">
                <Select :value="selectValue.cityId" @on-change="cityChange">
                    <Option v-for="(item, index) in cityData" :value="item.regionId" :key="index" >{{ item.regionName }} </Option>
                </Select>
            </Col>
            <Col span="5" style="padding:0px; margin-left: 3px">
                <Select :value="selectValue.areaId" @on-change="areaChange">
                    <Option v-for="(item, index) in areaData" :value="item.regionId" :key="index"  >{{ item.regionName }} </Option>
                </Select>
            </Col>
       </Row>
    </div>
</template>
<script>
import { countryList, countryRegion, getRegion } from '../../api/helper'
export default {
    name: 'AddressFrom',
    props: {
        country: {
            type: Number
        },
        province: {
            type: Number,
            default:1
        },
        city: {
            type: Number,
            default:1
        },
        area: {
            type: Number,
        },
        street:{
            type: Number,
        },
        isshow: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            isInit: false,
            datainRow:{},
            countryData:[],
            provinceData:[],
            cityData: [],
            areaData: [],
            streetData: [],
            selectValue: {
                countryId: 1,
                provinceId: 440000,
                cityId:0,
                areaId:0,
                streetId:0,
            }
        }
    },
    methods: {
        async getCountryData () {
           let res = await countryList(this, {})
           this.countryData = res.data
        },
        async getProvinceData () {
            if(this.selectValue.countryId > 0){
                let params = {
                    countryId: this.selectValue.countryId
                }
                let res = await countryRegion(this,params)
                this.provinceData = res.data
            }else{
                this.provinceData = []
            }

        },
        async getCityData () {
            if(this.selectValue.provinceId > 0){
                let params = {
                    parentId: this.selectValue.provinceId
                }
                let res = await getRegion(this,params)
                this.cityData = res.data
            }else{
                this.cityData = []
            }
        },
        async getAreaData () {
            if(this.selectValue.cityId > 0) {
                let params = {
                    parentId: this.selectValue.cityId
                }
                let res = await getRegion(this, params)
                this.areaData = res.data
            }else{
                this.areaData = []
            }
        },
        countryChange(val){
            this.selectValue.countryId = val
            this.selectValue.provinceId = 0
            this.selectValue.cityId = 0
            this.selectValue.areaId = 0
            this.getProvinceData()
            this.$emit('selectAddress', this.selectValue)
        },
        provinceChange(val){
            this.selectValue.provinceId = val
            this.selectValue.cityId = 0
            this.selectValue.areaId = 0
            this.getCityData()
            this.$emit('selectAddress', this.selectValue)
        },
        cityChange(val){
            this.selectValue.cityId = val
            this.selectValue.areaId = 0
            this.getAreaData()
            this.$emit('selectAddress', this.selectValue)
        },
        areaChange(val){
            this.selectValue.areaId = val
            this.$emit('selectAddress', this.selectValue)
        }
    },
    created () {
        this.getCountryData()
    },
    mounted () {
    },
    watch: {
        isshow: function (e) {
            if (e === true) {
                this.selectValue.countryId = this.country
                this.getProvinceData()
                this.selectValue.provinceId = this.province
                this.getCityData()
                this.selectValue.cityId = this.city
                this.getAreaData()
                this.selectValue.areaId = this.area
                this.isInit = true
            }else{
                this.isInit = false
            }
        }
    },
    destroyed: function () {

    }
}
</script>

