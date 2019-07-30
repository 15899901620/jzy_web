# COMPONENTS

** 新增一些公益模块 **
#### carousel ---  走马灯
```
API
Carousel Props
    参数	说明	类型	默认值
    value	幻灯片的索引，从 0 开始，可以使用 v-model 双向绑定数据	Number	0
    height	走马灯的高度，可填 auto 或具体高度数值，单位 px	String	Number
    autoplay	是否自动切换	Boolean	false
    autoplaySpeed	自动切换的时间间隔，单位为毫秒	Number	2000
    dots	指示器的位置，可选值为 inside （内部），outside（外部），none（不显示）	String	inside
    trigger	指示器的触发方式，可选值为 click（点击），hover（悬停）	String[]	click
    arrow	切换箭头的显示时机，可选值为 hover（悬停），always（一直显示），never（不显示）	String	hover
    easing	动画效果	String	ease
    vertical	垂直显示	Boolean	false
Carousel Events
    事件	说明	参数
    change	幻灯片切换时触发	(oldValue, value)
```

#### breadcrumb ---  面包屑
```
API
 Breadcrumb Props
参数	说明	类型	默认值
separator	分隔符自定义	string	'/'
href	跳转地址	string	-
```