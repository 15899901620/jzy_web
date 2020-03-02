<template>

  <div class="whitebg">
    <h1 class="tac pt20">{{dataList.title}}</h1>
    <div class="mt20 mb40 fs14" v-html="dataList.content"></div>
    <div style="display: inline-flex;    margin-left: 10px;position: absolute;" v-if="this.dataList.appendix">
      <Button type="warning" size="large" @click='download()'>下载模板</Button>
    </div>
    <div style="text-align: center;" >
      <Button v-if="this.canBid" type="primary" @click="showBidDialog" size="large">投标</Button>
      <Button v-if="this.canEdit" class="inquiryFree" type="primary" @click="showBidDialog">修改投标</Button>
      <Button v-if="this.canView" class="inquiryFree" type="primary" @click="showBidDialog">查看投标</Button>
    </div>

    <!--招标出价-->
    <Modal
        title="投标"
        v-model="bidersloading"
        :mask-closable="false"
        :loading="loading"
        ok-text="提交投标"
        :footer-hide="this.canView"
        @on-ok="confirmShow"
        class-name="vertical-center-modal">
      <p slot="header" style="color:#666; text-align:left; font-size:14px;">
        <Icon type="md-chatboxes" style="font-size:18px;"/>
        <span>投标</span>
      </p>
      <div>
        <Form ref="formCustom" :model="formCustom" :label-width="100" :rules="ruleValidate">
          <Row>
            <Col span="24">
              <FormItem label="数量" prop="num" >
                <Input :disabled="canView" v-model="formCustom.num" placeholder="请输入投标数量"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="24">
              <FormItem label="投标总价" prop="totalAmount" >
                <Input :disabled="canView" v-model="formCustom.totalAmount" placeholder="请输入投标总价(万)">
                  <Select v-model="formCustom.currency" slot="append" style="width: 100px">
                    <Option value="万人民币">万人民币</Option>
                    <Option value="万美元">万美元</Option>
                    <Option value="万欧元">万欧元</Option>
                    <Option value="万日元">万日元</Option>
                    <Option value="万英镑">万英镑</Option>
                  </Select>
                </Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="24">
              <FormItem label="交货期" prop="deliveryDate" >
                <Input :disabled="canView" v-model="formCustom.deliveryDate" placeholder="请输入交货期">
                  <Select v-model="deliveryCurrency" slot="append" style="width: 50px">
                    <Option value="天">天</Option>
                    <Option value="月">月</Option>
                  </Select>
                </Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="24">
              <FormItem label="交货地点" prop="deliveryPoint" >
                <Input :disabled="canView" v-model="formCustom.deliveryPoint" placeholder="请输入交货地点"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="24">
              <FormItem label="付款方式" prop="paymentType" >
                <Input :disabled="canView" v-model="formCustom.paymentType" placeholder="请输入付款方式"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="24">
              <FormItem label="技术偏离" prop="technicalDeviate" >
                <Select :disabled="canView" v-model ="this.formCustom.technicalDeviate">
                  <Option v-for="(item, index) in trueFalseOption" :value="item.value" :key="index">{{item.name}}</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="24">
              <FormItem label="商务偏离" prop="appendixDeviate">
                <Select :disabled="canView" v-model="this.formCustom.appendixDeviate">
                  <Option v-for="(item, index) in trueFalseOption" :value="item.value" :key="index">{{item.name}}</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="14" >
              <FormItem label="上传技术文件" prop="technicalDoc">
                <Upload
                    ref="upload"
                    action="/api/upload/file"
                    :on-success="handleFile"
                    :max-size="2048">
                  <Button type="primary" size="large">上传技术文件</Button>
                </Upload>
              </FormItem>
            </Col>
            <Col span="10" >
              <span v-if="this.formCustom.technicalDoc">
                <a target="_blank" :href="this.formCustom.technicalDoc">{{this.formCustom.technicalName}}</a>
              </span>
            </Col>
          </Row>
          <Row>
            <Col span="14" >
              <FormItem label="上传商务文件" prop="appendix">
                <Upload
                    ref="upload"
                    action="/api/upload/file"
                    :on-success="handleOtherFile"
                    :max-size="2048">
                  <Button type="primary" size="large">上传商务文件</Button>
                </Upload>
              </FormItem>
            </Col>
            <Col span="10" >
              <span v-if="this.formCustom.appendix"><a target="_blank" :href="this.formCustom.appendix">{{this.formCustom.appendixName}}</a></span>
            </Col>
          </Row>
          <Row>
            <Col span="14" >
              <FormItem label="上传报价文件" prop="bidFile">
                <Upload
                    ref="upload"
                    action="/api/upload/file"
                    :on-success="handleBidFile"
                    :max-size="2048">
                  <Button type="primary" size="large">上传报价文件</Button>
                </Upload>
              </FormItem>
            </Col>
            <Col span="10" >
              <span v-if="this.formCustom.bidFile"><a target="_blank" :href="this.formCustom.bidFile">{{this.formCustom.bidFileName}}</a></span>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal>

    <!--出价提示-->
    <Modal
        title="报价确认提示"
        v-model="confirmLoading"
        :mask-closable="false"
        ok-text="确认报价"
        @on-ok="fileUpdate"
        class-name="vertical-center-modal">
      <p slot="header" style="color:#666; text-align:left; font-size:14px;">
        <Icon type="md-chatboxes" style="font-size:18px;"/>
        <span>报价确认提示</span>
      </p>
      <div>
        <p style="font-size:14px; line-height:28px;"><span style="color:red;">请确保上传文件和所填数据正确无误，否则直接影响开标结果！！！</span></p>
        <p style="font-size:14px; line-height:28px;"><span style="color:#666;">数量：</span>{{this.formCustom.num}}</p>
        <p style="font-size:14px; line-height:28px;"><span style="color:#666;">投标总价：</span>{{this.formCustom.totalAmount}}{{this.formCustom.currency}}</p>
        <p style="font-size:14px; line-height:28px;"><span style="color:#666;">交货期：</span>{{this.formCustom.deliveryDate}}{{this.deliveryCurrency}}</p>
        <p style="font-size:14px; line-height:28px;"><span style="color:#666;">交货地点：</span>{{this.formCustom.deliveryPoint}}</p>
        <p style="font-size:14px; line-height:28px;"><span style="color:#666;">付款方式：</span>{{this.formCustom.paymentType}}</p>
      </div>
    </Modal>
  </div>

</template>

<script>

import {sendHttp} from "../../../api/common";
import server from "../../../config/api";

const appConfig = require('../../../config/app.config')
export default {
	name: "DetailsBidding",
	data() {
		return {
			id: !this.$route.query.id ? 1 : this.$route.query.id,
      canBid: false,
      canEdit: false,
      canView: false,
			dataList: {},
			uploadUrl: '',
			loading: true,
			bidersloading: false,
			confirmLoading: false,
			deliveryCurrency: '天',

			trueFalseOption : [
				{value: 0, name:'否'},
				{value: 1, name:'是'}
			],

			formCustom: {
				id: 0,
				num: '',
				totalAmount: '',
				currency: '万人民币',
				deliveryDate: '',
				deliveryPoint: '',
				appendix: '',
				appendixName: '',
				appendixSize: '',
				appendixDeviate: 1,
				technicalDoc: '',
				technicalName: '',
				technicalSize: '',
				technicalDeviate: 1,
        bidFile: '',
				bidFileName: '',
				bidFileSize: '',
				paymentType: ''
			},
			ruleValidate: {
				num: [
					{ required: true, message: '投标数量不能为空', trigger: 'blur' }
				],
				totalAmount: [
					{ required: true, message: '投标总金额不能为空', trigger: 'blur' }
				],
				deliveryDate: [
					{ required: true, message: '交货期不能为空', trigger: 'blur' }
				],
				deliveryPoint: [
					{ required: true, message: '交货地点不能为空', trigger: 'blur' }
				],
				paymentType : [
					{ required: true, message: '付款方式不能为空', trigger: 'blur' }
				],
				bidFile: [
					{ required: true, message: '报价文件不能为空', trigger: 'blur' }
				]
			}
		};
	},
	methods: {
		getUploadURL() {
			if (process.env.NODE_ENV === 'development') {
				this.uploadUrl = appConfig.system.UPLOAD_URL.dev
			} else if (process.env.NODE_ENV === 'testprod') {
				this.uploadUrl = appConfig.system.UPLOAD_URL.test
			} else {
				this.uploadUrl = appConfig.system.UPLOAD_URL.pro
			}
		},
		handleFile(res) {
			this.formCustom.technicalDoc = res.url
			this.formCustom.technicalName = res.fileName
			this.formCustom.technicalSize = res.fileSize
		},
		handleOtherFile(res) {
			this.formCustom.appendix = res.url
      this.formCustom.appendixName = res.fileName
      this.formCustom.appendixSize = res.fileSize
		},
		handleBidFile(res) {
			this.formCustom.bidFile = res.url
			this.formCustom.bidFileName = res.fileName
			this.formCustom.bidFileSize = res.fileSize
		},
		showBidDialog() {
			this.bidersloading = true
		},
		download() {
			if (!this.dataList.appendix) {
				return
			}

			window.open(this.dataList.appendix);
		},
    confirmShow(){
			this.loading = true
			this.$refs['formCustom'].validate((valid) => {
        if (valid) {
          this.confirmLoading = true
					setTimeout(() => {
						this.loading = false
						this.$nextTick(() => {
							this.loading = true;
						});
					})
        }else{
          setTimeout(() => {
            this.loading = false
            this.$nextTick(() => {
              this.loading = true;
            });
          })
        }
			})
    },
		fileUpdate() {
			this.loading = true
			this.$refs['formCustom'].validate(async (valid) => {
				if (valid) {
					let params = {
						id: this.formCustom.id,
						biddingId: this.id,
						num: this.formCustom.num,
						totalAmount: this.formCustom.totalAmount,
						currency: this.formCustom.currency,
						deliveryDate: this.formCustom.deliveryDate+this.deliveryCurrency,
						deliveryPoint: this.formCustom.deliveryPoint,
            paymentType: this.formCustom.paymentType,
						technicalDoc: this.formCustom.technicalDoc,
            technicalName: this.formCustom.technicalName,
            technicalSize: this.formCustom.technicalSize,
            technicalDeviate: this.formCustom.technicalDeviate,
						appendix: this.formCustom.appendix,
						appendixName: this.formCustom.appendixName,
						appendixSize: this.formCustom.appendixSize,
						appendixDeviate: this.formCustom.appendixDeviate,
            bidFile: this.formCustom.bidFile,
						bidFileName: this.formCustom.bidFileName,
						bidFileSize: this.formCustom.bidFileSize,
					};

					const res = await sendHttp(this, true, server.api.biddding.save, params, 2)
					this.loading = false
					if (res.status === 200 && (res.data.errorcode||0) == 0) {
						this.$Message.info({
							content: '投标成功',
							duration: 5,
							closable: true
						})
            this.bidersloading = false
						window.location.reload()
					}else{
						if (res.data.errorcode) {
							this.$Notice.warning({
								title: res.data.message,
								duration: 5
							});
							return
						}
          }
				}else{
					setTimeout(() => {
						this.loading = false
						this.$nextTick(() => {
							this.loading = true;
						});
					})
        }
			})
		},
		async SourceData() {
			let params = {
				id: this.id,
			};
			const res = await sendHttp(this, false, server.api.biddding.bidddingDetail, params, 2)
			this.dataList = res.data
      if(this.dataList.myBid){
				this.formCustom.id = this.dataList.myBid.id
        this.formCustom.num = this.dataList.myBid.num
        this.formCustom.totalAmount = this.dataList.myBid.totalAmount
        this.formCustom.currency = this.dataList.myBid.currency
        this.formCustom.deliveryDate = this.dataList.myBid.deliveryDate
        this.formCustom.deliveryPoint = this.dataList.myBid.deliveryPoint
        this.formCustom.paymentType = this.dataList.myBid.paymentType
        this.formCustom.technicalDoc = this.dataList.myBid.technicalDoc
        this.formCustom.technicalName = this.dataList.myBid.technicalName
        this.formCustom.technicalSize = this.dataList.myBid.technicalSize
        this.formCustom.technicalDeviate = this.dataList.myBid.technicalDeviate
        this.formCustom.appendix = this.dataList.myBid.appendix
        this.formCustom.appendixName = this.dataList.myBid.appendixName
        this.formCustom.appendixSize = this.dataList.myBid.appendixSize
        this.formCustom.appendixDeviate = this.dataList.myBid.appendixDeviate
        this.formCustom.bidFile = this.dataList.myBid.bidFile
        this.formCustom.bidFileName = this.dataList.myBid.bidFileName
        this.formCustom.bidFileSize = this.dataList.myBid.bidFileSize

				if(this.formCustom.deliveryDate){
					this.deliveryCurrency = this.formCustom.deliveryDate.substr(-1)
					this.formCustom.deliveryDate = this.formCustom.deliveryDate.substr(0, this.formCustom.deliveryDate.length-1)
        }

				if(this.dataList.myBid.createTime == this.dataList.myBid.updateTime && (new Date() < new Date(this.dataList.lastEndTime.replace(/-/g,'\/')))){
					this.canEdit = true
        }else{
					this.canView = true
        }
      }else{
      	if(new Date() < new Date(this.dataList.lastEndTime.replace(/-/g,'\/'))){
					this.canBid = true
        }
      }
		},
	},
	mounted() {
		this.getUploadURL()
		this.SourceData()
	}
}
</script>

<style scoped>

</style>
