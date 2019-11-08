<template>
    <div class="supplierlogin">
        <Form ref="loginsupplierform" :model="loginsupplierform" :rules="ruleCustom">
            <Row  index="">
                <Col span="24">
                    <FormItem prop="username">
                        <Input v-model="loginsupplierform.username"  max="11" placeholder="公司名称" id="input1"/>
                    </FormItem>
                </Col>
            </Row>
            <Row  index="">
                <Col span="24">
                    <FormItem prop="username">
                        <Input v-model="loginsupplierform.username"  max="11" placeholder="联系人" id="input1"/>
                    </FormItem>
                </Col>
            </Row>
            <Row  index="">
                <Col span="24">
                    <FormItem prop="username">
                        <Input v-model="loginsupplierform.username"  max="11" placeholder="手机号码" id="input1"/>
                    </FormItem>
                </Col>
            </Row>
            <Row  index="">
                <Col span="24">
                    <FormItem prop="username">
                        <Input v-model="loginsupplierform.username"  max="11" placeholder="职务" id="input1"/>
                    </FormItem>
                </Col>
            </Row>
            <Row  index="">
              <Col span="24">
                <FormItem prop="mobilecode">
                  <Input v-model="loginsupplierform.mobilecode"  autocomplete="off" placeholder="短信验证码"/>
                </FormItem>
                <Button type="text" class="butGetCode" :disabled='this.btnBoolen' v-on:click="getNoteValue">{{this.btnValue}}</Button>
              </Col>
            </Row>
<!--            <Row  index="">-->
<!--                <Col span="24">-->
<!--                    <FormItem prop="password">-->
<!--                        <Input v-model="loginsupplierform.password" autocomplete="off" type="password" @keyup.native="loginKeyDown"   @keyup.enter.native="LoginsupplyerForm" placeholder="登录密码"/>-->
<!--                        <div style="height:13px; position: relative"><div v-show="bigChar" style="margin-top: -5px; color: #666;">大写锁定已打开</div></div>-->
<!--                    </FormItem>-->

<!--                </Col>-->
<!--            </Row>-->
            <Button type="primary" long v-on:click="purchaseRegister" style="margin: 10px auto">快速注册发布需求</Button>

        </Form>
    </div>
</template>

<script>
    export default {
        name: "purchase",
        data(){
            // const validatePhone = (rule, value, callback) => {
            //     if (value === '') {
            //         callback(new Error('手机号不能为空'));
            //     } else {
            //         if(this.loginsupplierform.username.length != 11){
            //             callback(new Error('请正确填写手机号，需是11位！'));
            //         }else {
            //             var myreg = /^0?(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;
            //             if(!myreg.test(this.loginsupplierform.username)){
            //                 callback(new Error('请正确填写手机号'));
            //             }else{
            //                 callback();
            //             }
            //         }
            //     }
            // };
            // const validateSlide = (rule, value, callback) => {
            //     if(value === 0){
            //         callback(new Error('请滑动完成验证'));
            //     }else{
            //         callback();
            //     }
            // };
            return {
                NameCheck:false,
                passwordTip:false,
                cphones: false,
                btnValue: "发送验证码",
                btnBoolen: false,
                firstTochar:false,
                bigChar:false,
                validWidth: this.$router.history.current.name === 'tendering'?247:263,
                loginsupplierform:{
                    username: '',
                    mobilecode: '',
                    password: '',
                    slidecode: 0
                },
                ruleCustom: {
                    username: [
                        // { validator: validatePhone, trigger: 'blur' }
                    ],
                    slidecode: [
                        // { validator: validateSlide, trigger: 'blur' }
                    ]
                }
            }
        },
        methods:{
            purchaseRegister(){},
        },
    }
</script>

<style lang="less" scoped>
    .supplierlogin {
        margin-top: 20px;
        .butGetCode {
            position: absolute;
            right: 15px;
            z-index: 1111;
            line-height: 14px;
            margin-top: 2px;
            top: 1px;
            border-left: 1px solid #ddd;
        }
        .ivu-form-item {
            margin-bottom: 20px;
        }
        .ivu-form-item-error-tip {
            padding-top:4px;
        }
    }
    .ivu-tag{
        background: none;
        border: none;
    }
</style>
