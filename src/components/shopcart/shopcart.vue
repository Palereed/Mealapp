<template>
  <div>
    <div class="shopcart">
      <div class="content" @click="toggleList">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{'active':totalCount > 0}">
              <i class="icon-shopping_cart" :class="{'active':totalCount > 0}"></i>
            </div>
            <div class="num" v-show="totalCount > 0">
              {{totalCount}}
            </div>
          </div>
          <div class="price" :class="{'active':totalPrice > 0}">￥{{totalPrice}}</div>
          <div class="line"></div>
          <div class="description">另需要配送费￥{{deliveryPrice}}元</div>
        </div>
        <div class="content-right">
          <div class="pay" :class="{'enough':isEnough}" @click.stop.prevent="pay">{{payDesc}}</div>
        </div>
      </div>
      <div class="ball-container">
        <div v-for="ball in balls">
          <transition @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
            <div class="ball" v-show="ball.show">
              <div class="inner inner-hook"></div>
            </div>
          </transition>
        </div>
      </div>
      <transition name="fold">
        <div class="cart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list-content" ref="listContent">
            <ul>
              <li v-for="food in selectFoods">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  ￥{{food.price*food.count}}
                </div>
                <div class="cart-wrapper">
                    <cartcontrol :food="food" @add="addFood"></cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
  	</div>
    <transition name="misk">
      <div class="listmisk" v-show="listShow" @click="hide">
      </div>
    </transition>
  </div>
</template>

<!-- <script type="text/ecmascript-6"> -->
<script>
   import BScroll from 'better-scroll';
   import cartcontrol from "@/components/cartcontrol/cartcontrol"
   export default {
   	props: {
   		selectFoods :{
   			type: Array,
   			default () {
   				return []
   			}
   		},
		  deliveryPrice: {
		  	type: Number,
		  	default: 0
		  },
		  minPrice: {
		  	type: Number,
		  	default: 0
		  }
		},
    data() {
      return {
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        dropBalls: [],
        fold: true
      };
    },
    computed: {
			totalPrice () {
				let total = 0;
        this.selectFoods.forEach( (food) => {
					total += food.price * food.count
				})
        return total
			},
			totalCount () {
				let count = 0;
				this.selectFoods.forEach( (food) => {
					 count += food.count
				})  
        return count
      },
			payDesc () {
				if ( this.totalPrice === 0) {
					return `￥${this.minPrice}起送`
				} else if ( this.totalPrice < this.minPrice){
					let need = this.minPrice - this.totalPrice
					return `还差￥${need}起送`
				} else {
					return '结算'
				}
			},
      isEnough (){
        if (this.totalPrice >= this.minPrice) {
          return true 
        } else {
          return false
        }
      },
      listShow (){
        if ( !this.totalCount ){
          this.fold = true;
          return false;
        } else {
          let show = !this.fold;
          if (show) {
            this.$nextTick(()=>{
              if( !this.scroll ){
                this.scroll = new BScroll(this.$refs.listContent, {
                  click: true
                })
              } else {
                this.scroll.refresh();
              }
            })
          }
          return show;
        }
      }
		},
    components:{
      cartcontrol
    },
    methods:{
      drop(el) {
        for(let i = 0; i < this.balls.length; i++){
          let ball = this.balls[i]
          if(!ball.show){
            ball.show = true;
            ball.el = el;
            this.dropBalls.push(ball);
            return 
          }
        }
      },
      beforeDrop(el) {
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect();
            let x = rect.left - 32;
            let y = -(window.innerHeight - rect.top - 22);
            el.style.display = '';
            el.style.webkitTransform = `translate3d(0,${y}px,0)`;
            el.style.transform = `translate3d(0,${y}px,0)`;
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
            inner.style.transform = `translate3d(${x}px,0,0)`;
          }
        }
      },
      dropping(el, done) {
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight;
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)';
          el.style.transform = 'translate3d(0,0,0)';
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = 'translate3d(0,0,0)';
          inner.style.transform = 'translate3d(0,0,0)';
          el.addEventListener('transitionend', done);
        });
      },
      afterDrop(el) {
        let ball = this.dropBalls.shift();
        if (ball) {
          ball.show = false;
          el.style.display = 'none';
        }
      },
      toggleList () {
        if ( !this.totalCount ){
          return;
        } else {
          this.fold = !this.fold
        }
      },
      empty (){
        this.selectFoods.forEach( (food) => {
          food.count = 0
        })
      },
      hide (){
        this.fold = true
      },
      pay () {
        if( this.totalPrice < this.minPrice) {
          return
        } else {
          
          window.confirm(`是否支付${this.totalPrice}元？`)
        }
      },
      addFood(target) {
        this.$nextTick(() => {
          this.drop(target);
        })
      }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .shopcart
    position: fixed
    left: 0
    bottom: 0
    width: 100%
    height: 48px
    z-index: 50
    .content
      display: flex
      background: #141d27
      color: rgba(255, 255, 255, 0.4)
      .content-left
        flex: 1
        font-size: 0
        .logo-wrapper
          display: inline-block
          position: relative
          top: -10px
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          // vertical-align: top
          border-radius: 50%
          box-sizing: border-box
          background: #141d27
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            background: #2b333b
            text-align: center
            &.active
              background: rgb(0, 160, 220)
            .icon-shopping_cart
              line-height: 44px
              font-size: 24px
              &.active
                color: #fff
          .num
            position:absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            line-height: 16px
            text-align: center
            border-radius: 16px
            background: rgb(240, 20, 20)
            font-size: 9px
            font-weight: 700
            color: #fff
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
          display: inline-block
          vertical-align: top
          line-height: 48px
          box-sizing: border-box
          font-size: 16px
          font-weight: 700
          &.active
            color: #fff
        .line
          display: inline-block
          vertical-align: top
          margin: 12px 
          height:24px
          border-right: 1px solid rgba(255, 255, 255, 0.1)  
        .description
          display: inline-block
          vertical-align: top
          line-height: 48px
          font-size: 10px
      .content-right
        flex: 0 0 105px
        width: 105px
        line-height: 48px
        .pay
          line-height: 48px
          text-align: center
          font-size: 12px
          font-weight: 700
          background: #2b333b
          &.enough
            background: #00b43c
            color: #fff
    .ball-container
      .ball
        position: fixed
        left: 32px
        bottom: 22px
        z-index: 200
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
        .inner
          width: 16px
          height: 16px
          border-radius: 50%
          background: rgb(0, 160, 220)
          transition: all 0.4s linear      
    .cart-list
      position:absolute
      top: 0
      left: 0
      width: 100%
      z-index: -1
      transform: translate3d(0, -100%, 0)
      &.fold-enter-active, &.fold-leave-active
        transition: all 0.5s
      &.fold-enter, &.fold-leave-to
        transform: translate3d(0, 0, 0)
      .list-header
        background:#f3f5f7
        height: 40px
        line-height: 40px
        padding:0 18px
        border-bottom:1px solid rgba(7, 17, 27, 0.1)
        .title
          color: rgb(7, 17, 27)
          font-weight: 200
          font-size: 14px
          float: left
        .empty
          color: rgb(0, 160, 220)
          font-size: 12px
          float: right
      .list-content
        position: relative  
        background: #fff
        padding: 0 18px
        max-height: 217px
        overflow: hidden
        font-size: 0
        li
          position: relative
          padding: 12px 0
          box-sizing: border-box
          line-height: 24px
          border-1px(rgba(7, 17, 27, 0.1)) 
          font-size: 14px
          .name
            font-size: 14px
            color: rgb(7, 17, 27)
          .price
            position: absolute
            right: 90px
            top: 12px
            color: rgb(240, 20, 20) 
            font-weight: 700
          .cart-wrapper
            position: absolute
            right: 0
            top: 6px
  .listmisk
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    background:rgba(7, 17, 27, 0.6)
    z-index: 45
    &.misk-enter-active, &.misk-leave-active
      transition: all 0.5s
    &.misk-enter, &.misk-leave-to
      opacity: 0
</style>
