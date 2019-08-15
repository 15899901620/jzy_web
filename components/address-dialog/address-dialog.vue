<template>
    <!--出价提示-->
    <Modal
        title="出价提示"
        v-model="loading"
        ok-text="确认出价"
        @on-cancel="AddressCancel"
        @on-ok="AddressOk"
        :width='700'
        class-name="vertical-center-modal">
        <p slot="header" style="color:#666; text-align:left; font-size:14px;">
            <Icon type="ios-create" style="font-size:18px;" />
            <span>新增地址</span>
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
                        <!-- <FormItem label="默认地址" prop="defaultAddress"> -->
                            <Switch size="large"  >
                                <span slot="true">开启</span>
                                <span slot="false">关闭</span>
                            </Switch>
                            <!-- <Switch/> -->
                        <!-- </FormItem> -->
                    </Col>
                </Row>

                    

            </Form>
        </div>
        <p slot="footer" style="text-align:center">
            <Button type="primary">新增地址</Button>
        </p>
    </Modal>
</template>

<script>
import AddressFrom from "../address-from";
export default {
    name: 'AddressDialog',
    components:{
        AddressFrom
    },
    data() {
        return {
            loading: false,
            formAddress:{
                memberId: '',
                name: '',    //收货人姓名
                phone: '',   //收货人电话
                idNumber:'',  //身份证
                countryId:'',   //国家
                state: '', //省
                city: '',     //市
                district: '',      //区县
                address: '',//详细地址
                defaultAddress: false,    //设置默认地址
                alias:''             //别名
            },
            ruleValidate: {

            }
        }
    },
    props:{
        isshow: {
            type: Boolean,
            default: false
        }
    },
    methods:{
        getCountry(res){

        },
        getProvince(res){
            
        },
        getCity(res){
            
        },
        getArea(res){
            
        },
        AddressCancel() {
            this.loading = false
            this.$emit('unChange', false)
        },
        AddressOk() {
            this.loading = false
            this.$emit('unChange', false)
        }
    },
    watch: {
        isshow: function (e) {
            if (e === true) {
                this.loading = true
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