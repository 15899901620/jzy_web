<template>
  <div class="w1200 ">
    <div class="ListTitle  whitebg mt20">
      <div class="TitleName">合作品牌</div>
    </div>
  <div class="coorperMain" id="Coorparent" @mouseenter="mouseEnter" @mouseleave="mouseLeave">
    <div class="Time-limited_back position" style="top: 66px" id="Coorprev" :style="{'display':display}">
      <img src="../assets/img/back.png" />
    </div>
    <ul class="coorperList" id="Coor-ul">
      <li>
        <a v-for="(item, index) in brandList" :key="index"><img :src="item.image"/></a>
      </li>
      <li v-if="brandList01.length >=  1">
        <a v-for="(item, index) in brandList01" :key="index"><img :src="item.image"/></a>
      </li>
    </ul>


    <div class="Time-limited_next position" style="top: 66px" id="Coornext" :style="{'display':display}">
      <img src="../assets/img/next.png" />
    </div>
  </div>
  </div>
</template>

<script>
  import { cooperativeBrand } from '../api/info'
    export default {
          name: "cooperatbrand",
      data(){
          return{
            display: "none",

            brandList:[],
            brandList01:[]
          }
      },
      methods:{
        //鼠标移入
        mouseEnter(){
          var ul=document.getElementById('Coor-ul')
          var li=ul.getElementsByTagName('li')
          if(li.length>=2){
            this.display = "flex";
          }else{
            this.display = "none";
          }
        },
        //   鼠标移除
        mouseLeave(){
          this.display = "none";
        },

          async cooperatbrand() {
            let params = {
              current_page: 1,
              page_size: 14,
            }
            const res = await cooperativeBrand(params)
            console.log('合作品牌-res', res)
            this.brandList = res.items

          },
        async cooperatbrand01() {
          let params = {
            current_page: 2,
            page_size: 14,
          }
          const res = await cooperativeBrand(params)
          console.log('合作品牌-res01', res)
          this.brandList01 = res.items
          console.log('brandList01', this.brandList01.length)
        },


      },
      mounted () {
            this.cooperatbrand()
        this.cooperatbrand01()

          // *****合作品牌******
          var chefElement = {
            minSpeed: 10,//每次移动的距离
            //获取页面元素
            prev:document.getElementById('Coorprev'),
            next:document.getElementById('Coornext'),
            parent:document.getElementById('Coorparent'),
            ul:document.getElementById('Coor-ul'),
            li:document.getElementById('Coor-ul').getElementsByTagName('li'),
            liWidth:document.getElementById('Coor-ul').getElementsByTagName('li')[0].offsetWidth,
            type:true,
            nextTimer:null,
            prevTimer:null,
            parent_n:null
          }

          chefElement.prev.onclick = function(){
            if(chefElement.type){
              clearInterval(chefElement.prevTimer);
              chefElement.ul.insertBefore(chefElement.li[chefElement.li.length-1],chefElement.li[0]);
              chefElement.liWidth = chefElement.li[0].offsetWidth;
              chefElement.ul.style.left = '-'+chefElement.liWidth+'px';
              chefElement.prevTimer = setInterval(pre,chefElement.animationSpeed);
              chefElement.type = false;
            }
          };
        chefElement.next.onclick = function(){
            if(chefElement.type){
              chefElement.liWidth = 0;
              clearInterval(chefElement.nextTimer);
              chefElement.nextTimer = setInterval(nex,chefElement.animationSpeed);
              chefElement.type = false;
            }
          };
          //next动画函数
          function nex(){
            chefElement.ul.style.left = '-'+chefElement.liWidth+ 'px';
            chefElement.liWidth += chefElement.minSpeed ;
            if(chefElement.liWidth >= chefElement.li[0].offsetWidth){
              clearInterval(chefElement.nextTimer);
              chefElement.ul.appendChild(chefElement.li[0]);
              chefElement.ul.style.left = 0;
              chefElement.type = true;
            }
          }
          //prev动画函数
          function pre(){
            chefElement.ul.style.left = '-'+chefElement.liWidth+'px';
            chefElement.liWidth -= chefElement.minSpeed ;
            if(chefElement.liWidth <= -1){
              chefElement.ul.style.left = 0;
              clearInterval(chefElement.prevTimer);
              chefElement.type = true;
            }
          }
// *****合作品牌******

        }
    }
</script>

<style scoped>
  .coorperMain{position: relative;overflow: hidden;}
  .coorperList{display: flex; flex-wrap: wrap; position: relative; width: 2400px;}
  .coorperList li{display: flex; flex-wrap: wrap;width: 1200px;}
  .coorperList li a{ margin-top: 1px; margin-right: 1px; width: 170.4px; height: 85px; background-color: #fff; display: flex;justify-content: center;align-items: center;}
  .coorperList li a img{ height: 65%;}

  /*左右箭头切换*/
  .position{cursor: pointer; display: flex; justify-content: center; align-items: center; position: absolute;top: 92px;width: 24px;height: 40px;background: rgba(146,146,146,0.8); opacity: 0.5;z-index: 10;}

</style>
