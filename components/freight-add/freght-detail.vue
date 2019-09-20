<template>
    <!--出价提示-->
    <Modal
        title="需求详情"
        v-model="loading"
        @on-cancel="AddressCancel"
        :width='700'
        class-name="vertical-center-modal">
        <p slot="header" style="color:#666; text-align:left; font-size:14px;">
            <Icon type="ios-create" style="font-size:18px;" />
            <span>查看货物需求</span>
        </p>
        <div >
            <Form ref="formAddress" :model="formAddress" :label-width="100" style="font-size:14px; padding-left:18px;"  >
                <Row index="0" >
                    <Col span="12">
                        <span>订单号:</span>
                         <span>{{OrderList.billNo}}</span>
                    </Col>
                    <Col span="12">
                        <span>货物名称:</span>
                         <span>{{OrderList.freightGoods}}</span>
                    </Col>
                </Row>
                <Row index="0">
                    <Col span="12">
                        <span>数量:</span>
                        <span>{{OrderList.weight}}</span>
                    </Col>
                    <Col span="12">
                        <span>提货仓库:</span>
                        <span>{{OrderList.dispatchFullAddress}}</span>
                    </Col>
                </Row>
                <Row index="0">
                    <Col span="12">
                         <span>联系人姓名:</span>
                        <span>{{OrderList.contact}}</span>
                    </Col>
                     <Col span="12">
                       <span>联系电话:</span>
                        <span>{{OrderList.phone}}</span>
                    </Col>
                </Row>
                <Row index="2">
                    <Col span="12">
                        <span>用车开始时间:</span>
                        <span>{{OrderList.demandBeginDate}}</span>
                    </Col> 
                    <Col span="12">
                        <span>用车结束时间:</span>
                        <span>{{OrderList.demandEndDate}}</span>

                    </Col>
                </Row>
                <Row index="3">
                     <Col span="12">
                        <span>询价截止时间:</span>
                        <span>{{OrderList.inquiryMinute}}</span>
                    </Col>
                    <Col span="12">
                        <span>是否含税:</span>
                        <span v-if='OrderList.isTax==0'>否</span>
                        <span v-else>是</span>
                    </Col>
                </Row>
                <Row index="4">
                    <Col span="12">
                        <span>收货地址:</span>
                        <span>{{OrderList.receiptFullAddress}}</span>
                    </Col>
                    <Col span="12">
                        <span>提货地址:</span>
                        <span>{{OrderList.dispatchFullAddress}}</span>
                    </Col>
                </Row>
            </Form>
        </div>
          <div class="whitebg mt20" style="padding:0px 18px 18px;">
                    <h3 class="fs16 " style="line-height: 46px; border-bottom: 1px solid #ddd;">报价信息</h3>
                    <div style="line-height:32px; ">
                        <Row index="" style="background: #fafafa;line-height: 42px;text-align: center; border-bottom: 1px solid #eee;">
                            <Col span="4">货物名称</Col>
                            <Col span="3">金额</Col>
                            <Col span="6">联系人名称</Col>
                            <Col span="4">联系人手机号</Col>
                            <Col span="3">状态</Col>
                            <Col span="3">操作</Col>

                        </Row>
                        <Row  v-for="(item, index) in OrderList.freightOffers" :key='index' index="" style="line-height: 32px;text-align: center;border-bottom: 1px solid #eee;">
                            <Col span="4">{{item.freightGoods}}</Col>
                            <Col span="3">{{item.price}}</Col>
                            <Col span="6">{{item.memberName}}</Col>
                            <Col span="4">{{item.memberPhone}}</Col>
                            <Col span="3" >
                                 <span v-if="item.status==0">取消</span>
                                 <span v-if="item.status==1">待报价</span>
                                 <span v-if="item.status==2">已选择</span>
                            </Col>
                            <Col span="3" >
                                <span v-if='item.status==1'><a style="background-color: #23aa36;padding: 4px 18px; color: #fff; border-radius: 3px;" @click='setSelected(items)'>入 选</a></span>
                                <span v-else><a style="background-color: #23aa36;padding: 4px 18px; color: #fff; border-radius: 3px;" >已入选</a></span>
                            </Col>
                        </Row>
                        <Row>
                            <Col v-if='this.datalist==null'> <p style="font-size:14px; text-align:center; width:100%;">暂无任何信息！</p></Col>

                        </Row>
                    </div>
                    </div>  
                   
         <p slot="footer" style="text-align:center">
        
        </p>
    </Modal>
</template>

<script>
import AddressFrom from "../address-from";
import { getCookies } from '../../config/storage'
import { sendHttp } from "../../api/common";
import server from "../../config/api";

export default {
    name: 'AddressDetail',
    components:{
        AddressFrom
    },
    data() {
    
        
        return {
            options4: {
                disabledDate: date => {
                    // this成功指向vue实例
                    return date && date.valueOf() > this.date  ||  date && date.valueOf() < Date.now() - 86400000; 
                }
            },
            detailloading:false,
            tax_id:0,
            isAddressFormShow: false,
            loading: false,
            localList: [
                 '30',
                 '60',
                 '120'
            ],
            taxList:[
                 '否',
                 '是',        
            ],
            tax:'否',
            title:'60',
            OrderList:{},
            date:'',
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
        demandDate(e){
            this.formAddress.demandBeginDate=e[0]
            this.formAddress.demandEndDate=e[1]
        } , 
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
        selectLang(e){
            this.title=this.localList[e]
        },
        selectTax(e){
            this.tax=this.taxList[e]
            this.tax_id=e
        },
       async dataList(){
            let params = {
                orderId:this.datalist.id,
            }
            const res = await sendHttp(this, true, server.api.freight.InfoByOrderId,params,1)
           
            this.OrderList=  res.data
            this.formAddress.phone=  res.data.phone
            this.formAddress.contact=  res.data.contact
            this.formAddress.demandBeginDate=  res.data.demandBeginDate
            this.formAddress.demandEndDate=  res.data.demandEndDate
            // var date= new Date(Date.parse(res.data.demandEndDate.replace(/-/g, "/")))
            let t= new Date(res.data.demandEndDate)
            this.date = t.getTime();
       
        },
        setSelected(row){
         this.$Modal.confirm({
          title: '警告',
          content: '<p>是否进行入选</p>',
                  onOk: () => {
              sendHttp(this,true,server.api.freight.setSelected, {id: row.id},1).then(response => {
                  this.loading = false
                }).catch(err=>{
                  this.$Notice.warning({
                    title: '警告',
                    desc: err.response.data.message
                  })
                  this.freight();
                  this.loading = false
              })
          
          }
          })
    
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
                    inquiryMinute:this.title,
                    tax_id:this.tax_id,
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
                this.dataList();
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