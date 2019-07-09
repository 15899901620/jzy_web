<template>
  <div class="ass_menu">
    <div class="menu_items" @mouseleave="oneMouseout" @mouseenter="oneMouseOver">
      <div class="menu_items_text">
        <i class="see_icon"></i><span class="ml10" style="width: 80%;">查产品</span><i class="next"></i>
      </div>
      <div class="product_assortment assortment"  v-show="seen" style="display: block;">
        <ul class="AssProduct">
          <li>

            <div class="ass-ty2-p 1">
              <p class="fs16"><i></i>热门品质:</p>
              <p style="word-wrap:break-word">
                <a href="#">PP</a>
                <a href="#">HDPE</a>
                <a href="#">LLDPE</a>
                <a href="#">EVA</a>
                <a href="#">LDPE</a>
                <a href="#">MDPE</a>
                <a href="#">PC</a>
                <a href="#">PVC</a>
                <a href="#">HIPS</a>
                <a href="#">GPPS</a>
                <a href="#">ABS</a>
              </p>
            </div>
          </li>
          <li>
            <div class="ass-ty2-p 1">
              <p class="fs16 mt10"><i></i>热门牌号:</p>
              <p style="word-wrap:break-word">
                <a href="#">PP</a>
                <a href="#">HDPE</a>
                <a href="#">LLDPE</a>
                <a href="#">EVA</a>
                <a href="#">LDPE</a>
                <a href="#">MDPE</a>
                <a href="#">PC</a>
                <a href="#">PVC</a>
                <a href="#">HIPS</a>
                <a href="#">GPPS</a>
                <a href="#">ABS</a>
              </p>
            </div>
          </li>
          <li>
            <div class="ass-ty2-p level 1">
              <p class="fs16 mt10"><i></i>加工级别:</p>
              <p style="word-wrap:break-word">
                <a href="#">挤出</a>
                <a href="#">注塑</a>
                <a href="#">吹塑</a>
                <a href="#">中空</a>
                <a href="#">拉丝</a>
                <a href="#">发泡</a>
                <a href="#">涂覆</a>
                <a href="#">热熔</a>
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="menu_items" @mouseleave="twoMouseout" @mouseenter="twoMouseOver">
      <div class="menu_items_text">
        <i class="freight_icon"></i><span class="ml10" style="width: 80%;">查运费</span><i class="next"></i>
      </div>

      <div class="freight_assortment assortment" v-show="seentwo"  >
        <div class="mt20 ml20">
            <span class="mr10">装点</span>
            <i-select :model.sync="model1" style="width:32%;height: 32px">
              <i-option v-for="(item, index) in cityList" :value="item.value"  :key="index">{{ item.label }}</i-option>
            </i-select>
            <span class="ml5">-</span>
            <span class="ml5 mr5">卸点</span>
              <i-select :model.sync="model1" style="width:32%;height: 32px">
              <i-option v-for="(item, index) in cityList" :value="item.value"  :key="index">{{ item.label }}</i-option>
            </i-select>

        </div>
        <div class="mt20 ml20 dflexAlem">
             <span class="mr10">货物</span>

          <div class="freeselect">
            <select name="cars">
              <option v-for="(item,index) in Addritems" :key="index">{{item}}</option>
            </select>
          </div>
        </div>
        <div class="mt20 ml20">
            <span class="mr10">吨位</span>
            <input type="text" style="width: 80%; height: 32px; border: 1px solid #DEDEDE; border-radius: 2px;padding-left: 10px;box-sizing: border-box;" name=""   value="" />
        </div>

        <div class="freigth_query">查询</div>
        <div class="dflexAlem" style="height: 80px;background-color: #fbfbfb;">
          <div class="dflex" style="flex-direction: column; width: 47%;">
            <div class="SaveTime ml20"><img src="../../../assets/img/savetime.png" /><span class="ml5 fs16">省时</span></div>
            <p class="ml20 gray mt3">当天下单 当天派车</p>
          </div>
          <div class="linefreig"></div>
          <div class="dflex" style="flex-direction: column; width: 35%; margin: 0 auto;">
            <div class="SaveTime"><img src="../../../assets/img/savefir.png" /><span class="ml5 fs16">省力</span></div>
            <p class="gray mt3">塑料专车 说走就走</p>
          </div>
        </div>
      </div>
    </div>
    <div class="menu_items" @mouseleave="threeMouseout" @mouseenter="threeMouseOver">
      <div class="menu_items_text">
        <i class="Text_icon"></i><span class="ml10" style="width: 80%;">查质检单</span><i class="next"></i>
      </div>

      <div class="assortment qualityBg" v-show="seenthree"  >

          <ul class="qualityListindex">
            <li>
              <span class="quality_title">日期</span>
              <row>
                <i-col span="12">
                  <Date-picker type="date" placeholder="选择日期" style="width: 217px" v-model="qualityForm.qualityDate"  format="yyyy-MM-dd" @on-change="QDate"></Date-picker>
                </i-col>
              </row>
<!--              <span class="ml10 mr10">-</span><span>今天</span>-->
            </li>
            <li>
              <span class="quality_title"  >批次号</span>
              <div style="display: flex;flex-direction: column; position: relative">
                <input type="text" class="batchNumber" v-model="qualityForm.qualityNo" name=""  value="" />
                <i class="redFont fs12" v-show="datePif" style="position: absolute;bottom: -20px">日期和批次号不能为空</i>
              </div>


            </li>
          </ul>
          <div class="qualityQuality" @click="Quality()">查 询</div>

      </div>
    </div>
    <div class="menu_items">
      <div class="menu_items_text">
        <i class="capital_icon"></i><span class="ml10" style="width: 80%;">查资金</span><i class="next"></i>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "servicecate",
      data() {
        return {
          seen:false,
          seentwo:false,
          seenthree:false,
          datePif:false,
          cityList:[],
          model1: '',

          qualityForm:{
            qualityDate:'',
            qualityNo:'',
          },
          Addritems: ['Foo', 'Bar', 'Fizz', 'Buzz']
        };
      },
      created(){
      },
      methods:{

        oneMouseout:function(){
          this.seen = false;
        },
        oneMouseOver:function(){
          this.seen = true;
        },
        twoMouseout:function(){
          this.seentwo = false;
        },
        twoMouseOver:function(){
          this.seentwo = true;
        },
        threeMouseout:function(){
          this.seenthree = false;
        },
        threeMouseOver:function(){
          this.seenthree = true;
        },

        QDate(date){
          this.qualityForm.qualityDate=date
        },

         //质检单页面
        Quality(){

          console.log('qualityDate',this.qualityForm.qualityDate)
          console.log('qualityNo',this.qualityForm. qualityNo)
          if(this.qualityForm. qualityDate || this.qualityForm. qualityNo){
            this.$router.push({name:'QualityForm', query:{qualityForm:this.qualityForm}})
            this.datePif=false
          }else{
            this.datePif=true
          }
          this.qualityForm.qualityDate=''
          this.qualityForm.qualityNo=''

        },



      },
    }
</script>

<style scoped>
  .ass_menu { width: 100%; background-color: #020308; position: absolute;left: 0; top: 40px; height: 320px; z-index: 1;}
  .menu_items{height: 80px;border-bottom: 1px solid #2c2e37; position: relative; box-sizing: border-box;}
  .menu_items.curr{background-color: #007de4;}
  .menu_items_text{width: 100%; display: flex; height: 100%; padding-left: 30px;font-size: 16px;
    color: #fff;	padding-right: 20px; align-items: center; box-sizing: border-box;}
  .assortment{position: absolute;  left: 235px;background-color: #fff;}
  .product_assortment{width: 345px; top: 0px;}
  .product_assortment .AssProduct{margin: 20px 20px 4px 20px;}
  .product_assortment .AssProduct li{border-bottom: 1px solid #DEDEDE;}
  .product_assortment .AssProduct li:last-child{border-bottom: none;}
  .level a{border: 1px solid #D2D2D2; border-radius: 3px; padding: 2px 10px; color: #666; font-size: 12px;}
  .freight_assortment{width: 388px;top: -79px;}
  .see_icon{width: 20px;height: 15px;background: url(../../../assets/img/icon.png)no-repeat -100px -2px;}
  .capital_icon{width: 16px;height: 18px;background: url(../../../assets/img/icon.png)no-repeat -197px -3px;}
  .Text_icon{width: 16px;height: 17px;background: url(../../../assets/img/icon.png)no-repeat -164px -3px;}
  .freight_icon{width: 20px;height: 16px;background: url(../../../assets/img/icon.png)no-repeat -131px -3px;}
  .next{ width: 8px; height: 13px; background: url(../../../assets/img/icon.png)no-repeat -227px -5px; }
  /*热门品质*/
  .ass-ty2-p{ line-height: 30px;overflow: hidden;   clear: both; padding-bottom: 5px;}
  .ass-ty2-p a { padding-right: 10px; color: #666;}
  /*查运费*/
  .freightselect{ width: 120px; background-color: #ffffff; background-image: none !important;
    filter: none !important; border-radius: 3px;    border: 1px solid #e5e5e5; outline: none; height: 30px !important;line-height: 30px;}

  /*查询*/
  .freigth_query{ margin-top: 20px;margin-bottom: 30px; border-radius:3px;    margin-left: 58px;width: 76%;background-color: #007de4; line-height: 32px;text-align: center;color: #fff;}
  .SaveTime{display: flex; align-items: center;}
  .linefreig{width: 1px;height: 18px;background-color: #dfdfdf;}
  /*查质检单*/
  .qualityBg{ top: -159px;width: 450px;height: 326px;background: url(../../../assets/img/QualityBg.png)no-repeat;}
  .quality_title{width: 56px;margin-right: 15px;text-align: right;}
  .layui-input{height: 32px;}
  .qualityListindex{margin-top: 40px;margin-left: 20px;}
  .qualityListindex li{display: flex;align-items: center; margin-top: 20px; background: none;}

  .qualityListindex li .batchNumber{width: 217px;height: 32px;border: 1px solid #DEDEDE; border-radius: 3px;background-color: #fff;padding-left: 10px;box-sizing: border-box;}
  .qualityQuality{ cursor: pointer;   margin-left: 93px;  margin-top: 30px; border-radius: 3px; text-align: center;line-height: 32px; width: 90px;height: 32px;background-color: #007de4; color: #FFFFFF;}


  .freeselect{display: inline-block;
    width: 80%;
    position: relative;
    vertical-align: middle;
    padding: 0;
    overflow: hidden;
    background-color: #fff;
    color: #555;
    border: 1px solid #DEDEDE;
    text-shadow: none;
    border-radius: 4px;
    transition: box-shadow 0.25s ease;
    z-index: 2;}
  .freeselect:hover {
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
  }

  .freeselect:before {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border: 8px solid transparent;
    border-top-color: #ccc;
    top: 13px;
    right: 10px;
    cursor: pointer;
    z-index: -2;
  }
  .freeselect select {
    cursor: pointer;
    padding: 5.5px 8px;
    width: 100%;
    border: none;
    background: transparent;
    background-image: none;
    -webkit-appearance: none;
    -moz-appearance: none;
  }

  .freeselect select:focus {
    outline: none;
  }
</style>
