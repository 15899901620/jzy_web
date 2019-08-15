<template>
    <div>
       <Row :gutter="24" index="1">
         <Col span="5" style="padding:0px;">
            <Select v-model="countryId">
                <Option  v-for="item in countryData" :value="item.id" :key="item.id" >{{ item.name }}</Option>
            </Select>
         </Col>
         <Col span="5"  style="padding:0px; margin-left: 3px">
            <Select v-model="provinceId" >
                <Option v-for="(item, index) in provinceData" :value="item.regionId" :key="index" >{{ item.regionName }}</Option>
            </Select>
         </Col>
        <Col span="5" style="padding:0px; margin-left: 3px">
            <Select v-model="cityId" >
                <Option v-for="(item, index) in cityData" :value="item.regionId" :key="index" >{{ item.regionName }} </Option>
            </Select>
         </Col>
          <Col span="5" style="padding:0px; margin-left: 3px">
            <Select v-model="areaId" >
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
      country:{
        type:Number,
        default:1
      },
      province:{
        type:Number,
        default:1
      },
      city:{
        type:Number,
        default:1
      },
      area:{
        type:Number,
      },
      street:{
        type:Number,
      }

    },
    data() {
        return {
            countryData:[],
            provinceData:[],
            cityData: [],
            areaData: [],
            streetData: [],
            countryId: 0,
            provinceId: 0,
            cityId:0,
            areaId:0,
            streetId:0,
        }
    },
    methods: {
        async getCountryData () {
           let res = await countryList(this, {})
           this.countryData = res.data
        },
        async getProvinceData () {
            let params = {
                countryId: this.countryId
            }
            let res = await countryRegion(this,params)
            this.provinceData = res.data
        },
        async getCityData () {
            let params = {
                parentId: this.provinceId
            }
            let res = await getRegion(this,params)
            this.cityData = res.data
        },
        async getAreaData () {
            let params = {
                parentId: this.cityId
            }
            let res = await getRegion(this,params)
            this.areaData = res.data
        }
    },
    created () {
      this.getCountryData()
    },
    mounted () {

    },
    watch: {
      country (newval, oldval) {
        this.countryId=newval
        this.getProvinceData()
      },
      province (newval, oldval) {
        this.provinceId=newval
        this.getCityData()
      },
      city (newval, oldval) {
        this.cityId=newval
        this.getAreaData()
      },
      area (newval, oldval) {
        this.areaId=newval
      },
      countryId (newval, oldval) {
        this.getProvinceData()
        this.$emit('SelectCountry', newval)
      },
      provinceId (newval, oldval) {
        this.getCityData()
        this.$emit('SelectProvince', newval)
      },
      cityId (newval, oldval) {
        this.getAreaData()
        this.$emit('SelectCity', newval)
      },
      areaId (newval, oldval) {
        this.$emit('SelectArea', newval)
      },
    },
    destroyed: function () {

    }
}
</script>

