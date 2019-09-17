<template>
    <!--出价提示-->
    <Modal
        title="新增货物需求"
        v-model="loading"
        @on-cancel="AddressCancel"
        :width='700'
        class-name="vertical-center-modal">
        <p slot="header" style="color:#666; text-align:left; font-size:14px;">
            <Icon type="ios-create" style="font-size:18px;" />
            <span>新增货物需求</span>
        </p>
        <div class="">
            <Form ref="formAddress" :model="formAddress" :label-width="100"  :rules="ruleValidate">
                <Row index="0">
                    <Col span="22">
                        <FormItem label="收货人姓名" >
                            <Input v-model="formAddress.contact"   placeholder="请输入收货人的姓名"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row index="1">
                    <Col span="22">
                        <FormItem label="联系电话" prop="phone">
                            <Input v-model="formAddress.phone"   placeholder="请输入收货人的联系电话"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row index="2">
                    <Col span="12">
                        <FormItem label="用车开始时间" >
                                <Date-picker v-model="formAddress.demandBeginDate" format="yyyy-MM-dd HH:mm:ss" type="datetime" placement="bottom-end" placeholder="用车开始时间" style="width: 168px" @on-change="formAddress.demandBeginDate=$event"></Date-picker>
                        </FormItem>
                    </Col> 
                </Row>
                <Row index="3">
                    <Col span="12">
                        <FormItem label="用车开始最终时间" >
                                <Date-picker v-model="formAddress.demandEndDate" format="yyyy-MM-dd HH:mm:ss" type="datetime" placement="bottom-end" placeholder="用车开始最终时间" style="width: 168px" @on-change="formAddress.demandEndDate=$event"></Date-picker>
                        </FormItem>
                    </Col> 
                </Row>
                <Row index="4">
                    <Col>
                        <FormItem label="地址" prop="pickupMode">
                            <address-from
                                :country="1"
                                :isshow="this.isAddressFormShow"
                                @selectAddress="getSelectCountry"
                            >
                            </address-from>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        </div>
        <p slot="footer" style="text-align:center">
            <Button type="primary" @click="AddressOk">添加货物需求</Button>
        </p>
    </Modal>
</template>

<script>
import AddressFrom from "../address-from";
import { getCookies } from '../../config/storage'
import { sendHttp } from "../../api/common";
import server from "../../config/api";
export default {
    name: 'AddressDialog',
    components:{
        AddressFrom
    },
    data() {
           // 收货人姓名
        const validatename = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('收货人姓名不能为空'));
            } else {
                callback();
            }
        };
        //收货人电话
        const validatephone = (rule, value, callback) => {
            if (!value) {
                callback('电话不能为空'); // 校验不通过
                return false;
            } else {
                const isPhone = /^([0-9]{3,4}-)?[0-9]{7,8}$/; // 0571-86295197
                const isPhone02 = /^\d{3,4}-\d{3,4}-\d{3,4}$/; // 4001-550-520
                const isMob=/^1[0-9]{10}$/;
                const valuePhone = value.trim();
                if (isMob.test(valuePhone) || isPhone.test(valuePhone) || isPhone02.test(valuePhone)) { // 正则验证
                    callback(); // 校验通过
                    return true;
                } else {
                    callback('请输入正确手机号或座机电话'); // 校验不通过
                    return false;
                }
            }  
        };
   
        //国家
        const validatecountryId=(rule, value, callback) => {
            if (value === '') {
                callback(new Error('国家不能为空'));
            } else {
                callback();
            }
        };
        //身份证号
        const validateidNumber=(rule, value, callback) => {
            if (value === '') {
                callback(new Error('身份证号不能为空'));
            } 
            if(value.length == 15){
                var  patrn= /^[1-9]\d{5}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}$/
                if (!patrn.exec(value)) {
                     callback(new Error('请输入正确的身份证号'));   
                }else{
                    callback();
                }
            }else if(value.length == 18){
                var  patrn= /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
                if (!patrn.exec(value)) {
                    callback(new Error('请输入正确的身份证号'));   
                }else{
                    callback();
                }
            }else{
                callback(new Error('请输入正确的身份证号'));   
            }

        };
        const validateaddress=(rule, value, callback) => {
            if (value === '') {
                callback(new Error('详细地址不能为空'));
            } else {
                callback();
            }
        };
        return {
            isAddressFormShow: false,
            loading: false,
        
            formAddress:{
                memberId: '',
                contact: '',    //收货人姓名
                phone: '',   //收货人电话
                idNumber:'',  //身份证
                countryId:'',   //国家
                state: '', //省
                city: '',     //市
                district: '',      //区县
                address: '',//详细地址
                defaultAddress: false,    //设置默认地址
                demandBeginDate:'',
                demandEndDate:'',
                alias:''             //别名
            },
            ruleValidate: {
                name: [
                    { validator: validatename, trigger: 'blur' }
                ],
                phone:[
                    { validator: validatephone, trigger: 'blur' }
                ],
                countryId:[
                    { validator: validatecountryId, trigger: 'blur' }
                ],
                idNumber:[
                    { validator: validateidNumber, trigger: 'blur' }
                ],
                address:[
                    { validator: validateaddress, trigger: 'blur' }
                ],
            }
        }
    },
    props:{
        isshow: {
            type: Boolean,
            default: false
        },
       datalist: {
            type: Object
        }
    },
    methods:{
        getSelectCountry(res){
            this.formAddress.countryId = res.countryId
            this.formAddress.state = res.provinceId
            this.formAddress.city = res.cityId
            this.formAddress.district = res.areaId
        },
        AddressCancel() {
            this.loading = false
            this.$emit('unChange', false)
        },
        cancelDelay(){

        },
        async AddressOk() {
            //设置别名
           if(!this.formAddress.phone){
                this.$Notice.warning({
                    title: '联系电话不能为空',
                    duration: 5,
                    closable: true
                });
                return
            }else if(!this.formAddress.countryId){
                this.$Notice.warning({
                    title: '请选择国家',
                    duration: 5,
                    closable: true
                });
                return
            }else if(!this.formAddress.state){
                this.$Notice.warning({
                    title: '请选择省份',
                    duration: 5,
                    closable: true
                });
                return
            }else if(!this.formAddress.city){
                this.$Notice.warning({
                    title: '请选择城市',
                    duration: 5,
                    closable: true
                });
                return
            }else if(!this.formAddress.district){
                this.$Notice.warning({
                    title: '请选择区/县',
                    duration: 5,
                    closable: true
                });
                return
            }else {
                let params = {
                    orderId:this.datalist.id,
                    contact:this.formAddress.contact,
                    phone: this.formAddress.phone,   //收货人电话
                    receiptCountryId: this.formAddress.countryId,   //国家
                    receiptState: this.formAddress.state, //省
                    receiptCity: this.formAddress.city,     //市
                    receiptDistrict: this.formAddress.district,      //区县
                    demandBeginDate:this.formAddress.demandBeginDate,
                    demandEndDate:this.formAddress.demandEndDate,
                }
            //   const res = await addressAdd(this, params)

              const res = await sendHttp(this, true, server.api.biddding.freightDemand,params,1)
              console.log(res)
                if(res) {
                    this.$Modal.success({
                        title: '提示',
                        content: '添加成功',
                        duration: 5,
                        closable: true
                    })
                    this.loading = false
                    this.$emit('unChange', false)
                }else{
                    this.$Modal.warning({
                        title: '提示',
                        title: '添加地址失败，请联系客服',
                        duration: 5,
                        closable: true
                    });
                    return
                }
            }
        }
    },
    watch: {
        isshow: function (e) {
            if (e === true) {
                this.loading = true
                this.isAddressFormShow = true
            } else {
                this.loading = false
            }
        }
    },
}

</script>
<style lang="less">
.vertical-center-modal{
    display: flex;
    align-items: center;
    justify-content: center;

    .ivu-modal{
        top: 0;
        .ivu-modal-content {
            .ivu-modal-header {
                border-top-left-radius: 6px;
                border-top-right-radius: 6px;
                background-color: #f9f9f9;
            }
        }
    }
}
</style>