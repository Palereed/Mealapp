# Mealapp
模仿饿了么App，Vue学习之旅，构建SPA应用。(Vue)
### 项目笔记，以便查阅
---
### 开发技巧
---
1. flex弹性布局
```ruby
<!-- 容器设置flex -->
.good
  display: flex
  <!-- 固定宽度元素设置 0 0 *px，设置 width 是为了兼容性问题 -->
  .menu-wrapper 
    flex: 0 0 80px
    width: 80px
  <!-- 自适应宽度设置 flex: 1 即可 -->
  .foods-wrapper
    flex: 1 
    height: 100%
```
2. css stickyfooter
```ruby
.detail-wrapper clearfix
    min-height: 100%
    <!-- 最小高度充满屏幕，可以防止按钮不在固定位置 -->
    <!-- clearfix可以清除浮动 -->
    <!-- 防止detail-wrapper  margin-top 时父元素也 margin-top -->
.detail-main
    padding-bottom: 64px
    <!-- 布局关键，留白 -->
.detail-close
    margin: -64px auto 0 auto
```
3. 文本显示...，共需要设置三个属性
```ruby
white-space: nowrap
overflow: hidden
text-overflow: ellipsis
``` 
4. 多行文字垂直居中显示
```ruby
<!-- table布局的妙用 -->
.parent
  display: table;
  text-align: center;
  .son
    display: table-cell;
    vertical-align: middle;
```
5. 消除空字符
```ruby
.father
  font-size: 0
  .son1
    font-size: 10px
  .son2
    font-size: 10px
```
>可以将两元素在编辑器中紧贴，也可以消除空白字符。
6. 移动端1px边框
```ruby
<!-- 根据设备dpr纵轴缩放 -->
@media (-webkit-min-device-pixel-ratio: 1.5),(min-device-pixel-ratio: 1.5)
  .border-1px
    &::after
      -webkit-transform: scaleY(0.7)
      transform: scaleY(0.7)
@media (-webkit-min-device-pixel-ratio: 2),(min-device-pixel-ratio: 2)
  .border-1px
    &::after
      -webkit-transform: scaleY(0.5)
      transform: scaleY(0.5)
```
7. IE盒模型
```ruby
<!-- 盒模型四元素content，padding，border，margin -->

box-sizing: content-box <!-- W3C标准盒模型 -->
box-sizing: border-box  <!-- IE盒模型。 -->
```
>IE盒模型内边距与边框都在已设定的高度与宽度内进行绘制，通过已设定的高度与宽度分别减去边框与内边距才可以得到内容高度与宽度。

8. 移动端图片
```ruby
bg-image($url)
  background-image: url($url + "@2x.png")
  @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3)
    background-image: url($url + "@3x.png")
```
9. 移动端头部
```ruby
<meta name="viewport" content="width=device-width,initial-scale=1.0, maximum-scale=1.0,minimum-scale=1.0,user-scalable=no">
``` 
>user-scalable=no 为禁止用户缩放

10.为了界面美观图标设置过于小巧，为图标设置padding，不影响美观性，同时可以方便用户点击。
11. 移动端有dpr，像素密度，设计稿量的像素值除以2。
12. 图标字体制作iconmoon，获得self-icon文件
13. 重置标签样式，index.html 中引用 static/reset.css


### 手机访问Vue项目
---
```ruby
<!-- config/index.js -->
module.exports = {
  dev: {
    <!--  最新版本vue-cli将host默认为loaclhost，导致本地ip无法访问，host重新定义为：0.0.0.0，重启服务。 -->
    host: '0.0.0.0',
    port: 8080,
    ...
    }
```
>本地调试网址改为本机ip:8080，手机与电脑连接同一wifi，将网址直接输入手机浏览器或者生成二维码扫描进入。

### stylus使用注意点
---
>stylus是靠空格来辨识层级关系的，若不是空格，而是缩进，那么类名之间的父子关系则被忽视，甚至报错。
```ruby
<!-- submlie中setting设置 -->
<!-- 将所有tab变为空格 -->
"translate_tabs_to_spaces": true,
<!-- 显示所有空格 -->
"draw_white_space": "all"
```
>以上可以在stylus报错(一般都为缩进与空格杂糅)时方便调试。
```ruby
<!-- main.js -->
import '@/common/stylus/index.styl'

<!-- stylus/index.styl -->
@import "./base"
@import "./icon"
@import "./mixin"

<!-- 以上可以引入stylus样式 -->
<!-- 但在每个组件style中使用css函数定义(mixin.styl)时 -->
@import "../../common/stylus/mixin.styl"
<!-- 此时不可以使用src/的缩写@ -->

<!-- 每个组件编写style，若使用stylus样式，需要 -->
<style lang="stylus" rel="stylesheet/stylus"></style>
```

### vue-router
---
```ruby
<!-- main.js -->
import router from '@/router'
new Vue({
  el: '#app',
  router, 
  render: h => h(App),
});

<!-- router/index.js -->
<!-- 创建路由并配置路由映射，并通过export输出router到main.js文件中 -->
import Vue from 'vue';
import VueRouter from 'vue-router';
import goods from '@/components/goods/goods';
Vue.use(VueRouter);
<!-- routes即路由设置，可以增加一个当前默认页对象，即可在进入网页时，自动加载此路由路径 -->
let routes = [ 
  { path:'/', component: goods },
  { path:'/goods', component: goods }
  ...
]
export default new VueRouter({
  routes,
  linkActiveClass: 'active'
  <!-- 将激活的路由添加一个自定义名称，用于定义当前链接样式 -->
})

<!-- App.vue -->
<!-- 使用 router-link 组件来导航. -->
<!-- 通过传入 `to` 属性指定链接. -->
<!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
<router-link to="/goods">  商品页</router-link>
<router-link to="/ratings">评论页</router-link>
<router-link to="/seller"> 商家页</router-link>
```
### 模拟数据流
---
```ruby
<!-- 需要进行相关配置 -->
<!-- bulid/webpack.dev.conf.js -->
devServer: {
  clientLogLevel: 'warning',
  ...
  before(app) {
    app.get('/api/seller', (req, res) => {
      res.json({
      errno: 0,
      data: seller
      })
      <!-- 接口返回json数据，配置的数据seller就赋值给data请求后调用 -->
    }),
    app.get('/api/goods', (req, res) => {
      res.json({
          errno: 0,
          data: goods
      })
    }),
    app.get('/api/ratings', (req, res) => {
      res.json({
        errno: 0,
        data: ratings
      })
    })
  }
}
```
>配置参考 [https:// www.xiuyuan.info/?p=230](https:// note.youdao.com/)

>json数据被压缩，可以使用谷歌插件 jsonview 格式化  json 数据便于查看。

### vue-resource
---
```ruby
<!-- main.js -->
import VueResource from 'vue-resource';
Vue.use(VueResource);

<!-- App.vue -->
export default { 
 created () {
    this.$http.get('/api/seller').then(response => {
      response = response.body;
      if (response.errno === ERR_OK) {
        this.seller = response.data;
      }
    }, response => {});
  }
}
<!-- goods.vue -->
export default {
  created () {
    this.$http.get('api/goods').then(response => {
      response = response.body
      if( response.errno === ERR_OK ){
        this.goods = response.data
        this.$nextTick(() => {
          this._initScroll();
          this._calculateHeight();
        })
      }
    })  
  }
} 
...
```

### Vue注意点
---
1. components:{ }
>组件使用
```ruby
<!-- 引用组件 -->
import header from '@/components/header/header';
<!-- 注册组件 -->
export default {
  components: {
    v-header: header <!-- header在h5是特殊名,重新命名 -->
  }
}
<!-- 使用组件 -->
<v-header></v-header>
```

2. props: { }
>用于接收来自父组件的数据
```ruby
<!-- header.vue -->
<star :size="48" :score="seller.score"></star>

<!-- star.vue -->
props: {
  size: {
    type: Number, <!-- 不指定格式，会报错 -->
    default: 0    <!-- 数组/函数默认为 default () reutrn{[]}/reutrn{} -->
  },
  score: {
    type: Number,
    default: 0
  }
}

<!-- 这样页面中就可以使用this.size与this.score来使用这些父类传来的数据 -->
```

3. created () { }
>在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图
```ruby
created () {
  <!-- 如下，写在created()中的为初始化属性，用于渲染视图 -->
  this.classMap = ['decrease','discount','special','invoice','guarantee'];
  this.$http.get('api/goods').then(response => {
    response = response.body
    if( response.errno === ERR_OK ){
      this.goods = response.data
      this.$nextTick(() => {
        this._initScroll();
        this._calculateHeight();
      })
    };
  })
}
```
4. 接口$nextTick
>在Vue中，虽然DOM是数据的资源映射，改变数据就改变DOM，但是DOM真正变化是在$nextTick之后。
```ruby
this.$nextTick(() => {
  <!-- 此时DOM已经更新 -->
  this._initScroll();     <!-- 初始化better-scroll -->
  this._calculateHeight();<!-- 计算各层距离顶层高度，导入lineheight[]。 -->
  <!-- 操作DOM时候，当需要计算与DOM相关的东西，保证DOM被渲染，调用此接口，在此接口内部进行操作。 -->
})
```
5. computed: { }
>计算属性

6. methods:{ }
>在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。

7. 自定义属性
>给观测对象自定义添加的属性，是观测不到新增的属性变化，若想要观测到就必须用Vue的一个接口，引入全局Vue
```ruby
import Vue from 'Vue'
Vue.set(this.food，'count'，1)
<!-- 这样就可以通过this.food.count进行相关操作 -->
```
8. 删除$index，
>若需使用遍历索引，使用以下方式
```ruby
v-for="(item, index) in seller.supports"
seller.supports[index]
```
9. 嵌套遍历
```ruby
<ul>
  <li v-for="item in goods" class="food-list">
    <ul>
      <li v-for="food in item.foods" class="food-item"></li>
    </ul>
  </li>
</ul>
```
10. 获取dom
```ruby
ref = "menuWrapper"
this.$refs.menuWrapper
```

### better-scroll
---
```ruby

computed :{
  <!-- :class="{'current':currentIndex === index}" -->
  <!-- 获取当前滑动至商品类别的索引i，此类别li[i]添加current，产生高亮效果。 -->
  currentIndex (){
    for (let i=0; i< this.listHeight.length; i++){
      let height1 = this.listHeight[i];
      let height2 = this.listHeight[i + 1];
      <!-- 滚动高度scrollY与各商品类别距顶部高度比较，确定当前层索引(当前类索引)。 -->
      <!-- !height2 防止最后一层，此时height2不存在，>= 时第一个分类才会有效果 -->
      if ( !height2 || (this.scrollY >= height1 && this.scrollY < height2 ){
        return i
      }
    }
    return 0;
   }
},
methods: {
  <!-- @click="selectMenu(index)" -->
  selectMenu (index){
    <!-- 点击会传递给此方法商品类别索引，即可用better-scroll内置scrollElement滚动至此商品类别。 -->
    let foodList = this.$refs.foodList;
    let element = foodList[index];
    this.foodsScroll.scrollToElement(element, 300)
  },
  <!-- 为左侧商品类别栏与右侧商品栏添加better-scroll -->
  _initScroll() {
    this.menuScroll = new BScroll(this.$refs.menuWrapper, {
      click: true
    });
    this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
      probeType : 3,
      click: true <!-- 这样点击事件才会生效 -->
    };
    <!-- 滚动时，获取滚动高度scrollY -->
    this.foodsScroll.on("scroll", (pos) => {
      this.scrollY = Math.abs( Math.round (pos.y) )
    }) 
  },
  
  _calculateHeight () {
    <!-- 获取各商品类别层高度，累加，计算各类距顶高度，并将其放入数组listHeight[]中 -->
    let foodList = this.$refs.foodList;
    let height = 0 ;
    this.listHeight.push(height);
    for ( let i=0; i < foodList.length; i++){
      let item = foodList[i];
      height += item.clientHeight;
      this.listHeight.push(height);
    }
  }
```

### star组件
---

### :class妙用
---
1. 类名数组
```ruby
this.classMap = ['decrease','discount','special','invoice','guarantee'];
```
2. 等于当前索引index，则有类名，进而设置样式
```ruby
:class="{'current':currentIndex === index}
```
### webpack打包过程
---

