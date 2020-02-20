<template>

  <div class="whitebg">
    <h1 class="tac pt20">{{dataList.title}}</h1>
    <div class="mt20 mb40 fs14" v-html="dataList.content"></div>
    <div style="display: inline-flex;    margin-left: 10px;position: absolute;" v-if="this.dataList.appendix">
      <Button type="warning" size="large" @click='download()'>下载模板</Button>
    </div>
    <div style="text-align: center;" v-if="dataList.statusName=='未投标'">
      <Button type="primary" @click="showBidDialog" size="large">投标</Button>
    </div>
    <!--招标出价-->
    <Modal
        title="投标"
        v-model="bidersloading"
        :loading="loading"
        ok-text="确认投标"
        @on-ok="fileUpdate"
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
                <Input v-model="formCustom.num" placeholder="请输入投标数量">
                </Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="24">
              <FormItem label="投标总价" prop="totalAmount" >
                <Input v-model="formCustom.totalAmount" placeholder="请输入投标总价">
                  <Select v-model="currency" slot="append" style="width: 70px">
                    <Option value="人民币">人民币</Option>
                    <Option value="美元">美元</Option>
                    <Option value="欧元">欧元</Option>
                    <Option value="日元">日元</Option>
                    <Option value="英镑">英镑</Option>
                  </Select>
                </Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="24">
              <FormItem label="交货期" prop="deliveryDate" >
                <DatePicker type="date" transfer :value="formCustom.deliveryDate" :options="pickerOptionsDisabled"
                            format="yyyy-MM-dd" @on-change="formCustom.deliveryDate = $event"></DatePicker>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="24">
              <FormItem label="交货地点" prop="deliveryPoint" >
                <Input v-model="formCustom.deliveryPoint" placeholder="请输入交货地点"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="24" >
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
          </Row>
          <Row>
            <Col span="24" >
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
          </Row>
          <Row>
            <Col span="24" >
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
          </Row>
        </Form>
      </div>
    </Modal>
  </div>

</template>

<script>

import {sendHttp} from "../../../api/common";
import server from "../../../config/api";
import Cookies from "js-cookie";

const appConfig = require('../../../config/app.config')
export default {
	name: "DetailsBidding",
	data() {
		return {
			id: !this.$route.query.id ? 1 : this.$route.query.id,
			dataList: {},
			uploadUrl: '',
			loading: true,
			bidersloading: false,
			pickerOptionsDisabled: {
				disabledDate(time) {
					return time.getTime() < new Date(new Date().toLocaleDateString()).getTime()
				}
			},
			currency: '人民币',
			formCustom: {
				num: '',
				totalAmount: '',
				deliveryDate: '',
				deliveryPoint: '',
				appendix: '',
				technicalDoc: '',
        bidFile: ''
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
				appendix: [
					{ required: true, message: '技术文件不能为空', trigger: 'blur' }
				],
				technicalDoc: [
					{ required: true, message: '商务文件不能为空', trigger: 'blur' }
				],
				bidFile: [
					{ required: true, message: '报价文件不能为空', trigger: 'blur' }
				]
			},
			SupplierInfor: Cookies.get("supplierInfor"),
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
		},
		handleOtherFile(res) {
			this.formCustom.appendix = res.url
		},
		handleBidFile(res) {
			this.formCustom.bidFile = res.url
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
		fileUpdate() {
			this.loading = true
			this.$refs['formCustom'].validate((valid) => {
				if (valid) {
					let params = {
						supplierId: this.$store.state.supplierInfo.id,
						biddingId: this.id,
						num: this.formCustom.num,
						totalAmount: this.formCustom.totalAmount + this.currency,
						deliveryDate: this.formCustom.deliveryDate,
						deliveryPoint: this.formCustom.deliveryPoint,
						technicalDoc: this.formCustom.technicalDoc,
						appendix: this.formCustom.appendix,
            bidFile: this.formCustom.bidFile,
						supplierName: this.$store.state.supplierInfo.username
					};

					const res = sendHttp(this, true, server.api.biddding.save, params, 2)
					this.loading = false
					if (res.status === 200 && res.data.errorcode||0 == 0) {
						this.$Message.info({
							content: '投标成功',
							duration: 5,
							closable: true
						})
            this.bidersloading = false
					}else{
						if (res.data.errorcode) {
							this.$Notice.warning({
								title: res.data.message,
								duration: 5
							});
							return
						}
          }
					this.SourceData();
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
		},
		// async BySupplier() {
		//     let params = {
		//       biddingId: this.id,
		//     };
		//     const res = await sendHttp(this, false, server.api.biddding.BySupplier,params)
		//     this.dataList = res.data
		// },

	},
	mounted() {
		this.getUploadURL()
		this.SourceData()
		// this.BySupplier()
	}
}
</script>

<style scoped>

</style>
