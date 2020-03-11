<template>
  <!--纸质合同-->
  <Modal
      title="纸质合同盖章"
      :loading="paperLoading"
      v-model="paperContractLoading"
      :mask-closable="false"
      ok-text="提交申请"
      @on-ok="toSavePagerApplyContract"
      class-name="vertical-center-modal">
    <p slot="header" style="color:#666; text-align:left; font-size:14px;">
      <Icon type="md-chatboxes" style="font-size:18px;"/>
      <span>纸质合同盖章申请</span>
    </p>
    <div>
      <Form ref="formContract" :model="formContract" :label-width="100" :rules="rulePageContractValidate">
        <Row>
          <Col span="14">
            <FormItem label="初始盖章合同" prop="source_pic" >
              <Upload
                  ref="upload"
                  action="/api/upload/image"
                  :on-success="handleUpdateSourceFile"
                  accept=".jpg,.png,.jpeg,.pdf"
                  :format="['jpg','png','jpeg','pdf']"
                  :on-format-error="handleFormatError"
                  :max-size="2048">
                <Button type="primary" size="large">上传初始盖章合同</Button>
              </Upload>
            </FormItem>
          </Col>
          <Col span="10" >
            <a v-if="this.formContract.source_pic" :href="this.formContract.source_pic" target="_blank">
              <template v-if="this.formContract.source_pic.indexOf('.pdf') != -1">
                <img width="100" :src="pdf_path"/>
              </template>
              <template v-else>
                <img width="100" :src="this.formContract.source_pic"/>
              </template>
            </a>
          </Col>
        </Row>
      </Form>
    </div>
  </Modal>
</template>

<script>
import server from '../../config/api'
import {sendHttp} from "../../api/common"
import pdf_path from '@/assets/images/pdf.jpg'
export default {
	name: 'paperApply',
	props: {
		isShow: {
			type: Boolean,
			default: false
		},
		planId: {
			type: Number,
		},
		planType: {
			type: Number
		}
	},
	data() {
		return {
			pdf_path,
			paperLoading: true,
			paperContractLoading: false,
			formContract: {
				source_pic: ''
			},
			rulePageContractValidate: {
				source_pic: [
					{ required: true, message: '初始盖章合同不能为空', trigger: 'blur' }
				]
			}
    }
	},
  methods : {
		handleFormatError (file) {
			this.$Notice.warning({
				title: '文件格式错误',
				desc: '选择文件（' + file.name + '） 不正确,请选择图片或PDF文件上传'
			});
		},
		handleUpdateSourceFile(res) {
			if ((res.errorcode || 0) == 0) {
				this.formContract.source_pic = res.url
			}else{
				alert(res.message)
			}
		},
		toSavePagerApplyContract(){
			this.paperLoading = false
			this.$refs['formContract'].validate((valid) => {
				if (valid) {
					let params = {
						plan_id : this.planId,
						plan_type: this.planType,
						contract_source_pic: this.formContract.source_pic
					}
					sendHttp(this, true, server.api.contract.applySave, params).then(response => {
						if (response.status === 200) {
							window.location.reload()
						}
					})
				}else{
					setTimeout(() => {
						this.paperLoading = false
						this.$nextTick(() => {
							this.paperLoading = true;
						});
					})
				}
			})
		}
  },
	watch: {
		isShow: function (e) {
			if (e === true) {
				this.paperContractLoading = true
			} else {
				this.paperContractLoading = false
			}
		}
	}
}
</script>
