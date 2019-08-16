<template>
    <!--出价提示-->
    <Modal
        title="编辑地址"
        v-model="loading"
        @on-cancel="AddressCancel"
        :width='700'
        class-name="vertical-center-modal">
        <p slot="header" style="color:#666; text-align:left; font-size:14px;">
            <Icon type="ios-create" style="font-size:18px;" />
            <span>编辑地址</span>
        </p>
        <div class="">
            <Form ref="formAddress" :model="formAddress" :label-width="100"  :rules="ruleValidate">
                <Row index="0">
                    <Col span="22">
                        <FormItem label="收  货  人" prop="name">
                            <Input v-model="formAddress.name"   placeholder="请输入收货人"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row index="1">
                    <Col span="22">
                        <FormItem label="手机号码" prop="phone">
                            <Input v-model="formAddress.phone"   placeholder="请输入手机号码"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row index="2">
                    <Col span="22">
                        <FormItem label="身份证" prop="phone">
                            <Input v-model="formAddress.idNumber"   placeholder="请输入身份证"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row index="3">
                    <Col span="22">
                        <FormItem label="别名" prop="alias">
                            <Input v-model="formAddress.alias"   placeholder="请输入别名"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row index="4">
                    <Col>
                        <FormItem label="地址" prop="pickupMode">
                            <address-from
                                :country="this.formAddress.countryId"
                                :province="this.formAddress.state"
                                :city="this.formAddress.city"
                                :area="this.formAddress.district"
                                @SelectCountry="getCountry"
                                @SelectProvince="getProvince"
                                @SelectCity="getCity"
                                @SelectArea="getArea">
                            </address-from>
                        </FormItem>
                    </Col>
                </Row>
                <Row index="5">
                    <Col span="22">
                        <FormItem label="详情地址" prop="address">
                            <Input v-model="formAddress.address"   placeholder="请输入详情地址"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row index="6">
                    <Col span="22">
                        <FormItem label="默认地址" prop="defaultAddress">
                            <i-switch size="large" v-model="formAddress.defaultAddress"></i-switch>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        </div>
        <p slot="footer" style="text-align:center">
            <Button type="primary" @click="AddressOk">编辑地址</Button>
        </p>
    </Modal>
</template>

<script>
import AddressFrom from "../address-from";
import { getCookies } from '../../config/storage'
import { addressEdit, addressInfor } from '../../api/users'
export default {
    name: 'AddressDialogEdit',
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
            if (value === '') {
                callback(new Error('收货人电话不能为空'));
            } else {
                callback();
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
            } else {
                callback();
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
            loading: false,
            formAddress:{
                id: 0,
                memberId: '',
                name: '',    //收货人姓名
                phone: 0,   //收货人电话
                idNumber: 0,  //身份证
                countryId: 0,   //国家
                state: 0, //省
                city: 0,     //市
                district: 0,      //区县
                address: '',//详细地址
                defaultAddress: false,    //设置默认地址
                alias: ''             //别名
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
        datalist: {
            type:Object
        },
        isshow: {
            type: Boolean,
            default: false
        }
    },
    methods:{
        async getAddressDetail(){
            let params= {
                id: this.formAddress.id
            }
            let res = await addressInfor(this, params)
            this.formAddress.id = res.data.id
            this.formAddress.memberId = res.data.memberId
            this.formAddress.name = res.data.name
            this.formAddress.phone = res.data.phone
            this.formAddress.idNumber = res.data.idNumber
            this.formAddress.countryId = res.data.countryId
            this.formAddress.state = res.data.state
            this.formAddress.city = res.data.city
            this.formAddress.district = res.data.district
            this.formAddress.address = res.data.address
            this.formAddress.defaultAddress = res.data.defaultAddress == 1 ? true : false
            this.formAddress.alias = res.data.alias
            console.log("gt",this.formAddress)
        },
        getCountry(res){
            this.formAddress.countryId = res
        },
        getProvince(res){
            this.formAddress.state = res
            this.formAddress.alias = res
        },
        getCity(res){
            this.formAddress.city = res
            this.formAddress.alias = this.formAddress.alias +' '+res
        },
        getArea(res){
            this.formAddress.district = res
        },
        AddressCancel() {
            this.loading = false
            this.$emit('unChange', false)
        },
        async AddressOk() {

            //设置别名
            if(!this.formAddress.name){
                this.$Notice.warning({
                    title: '收货人不能为空',
                    duration: 5,
                    closable: true
                });
                return
            }else if(!this.formAddress.phone){
                this.$Notice.warning({
                    title: '手机号码不能为空',
                    duration: 5,
                    closable: true
                });
                return
            }else if(!this.formAddress.idNumber){
                this.$Notice.warning({
                    title: '身份证不能为空',
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
            }else if(!this.formAddress.address){
                this.$Notice.warning({
                    title: '请填写详细地址',
                    duration: 5,
                    closable: true
                });
                return
            }else {
                let userinfo = !getCookies('userinfor') ? '' : getCookies('userinfor')

                let params = {
                    memberId: userinfo.id,
                    name: this.formAddress.name,    //收货人姓名
                    phone: this.formAddress.phone,   //收货人电话
                    idNumber: this.formAddress.idNumber,  //身份证
                    countryId: this.formAddress.countryId,   //国家
                    state: this.formAddress.state, //省
                    city: this.formAddress.city,     //市
                    district: this.formAddress.district,      //区县
                    address: this.formAddress.address,//详细地址
                    defaultAddress: this.formAddress.defaultAddress === false ? 0 : 1,    //设置默认地址
                    alias:this.formAddress.alias
                }
                const res = await addressEdit(this, params)
                if(res) {
                    this.$Modal.success({
                        title: '提示',
                        content: '编辑成功',
                        duration: 5,
                        closable: true
                    })
                    this.loading = false
                    this.$emit('unChange', false)
                }else{
                    this.$Modal.warning({
                        title: '提示',
                        title: '编辑地址失败，请联系客服',
                        duration: 5,
                        closable: true
                    });
                    return
                }
            }
        }
    },
    watch: {
        datalist: {
            handler (newValue, oldValue) {
                this.formAddress.id = newValue.id
                console.log(this.formAddress)
            }
        },
        isshow: function (e) {
            if (e === true) {
                this.loading = true
                this.getAddressDetail()
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