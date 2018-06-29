<template>
	<transition name="moveIn">
		<div class="food" v-show="showFood" ref="food">
			<div class="food-content">
				<div class="image-header">
					<img :src="food.image">
					<div class="return">
						<i class="icon-close" @click="ifshow"></i>
				  </div>
				</div>
				<div class="content">
					<h1 class="name">{{food.name}}</h1>
					<div class="detail">
					  <span>月售{{food.sellCount}}份</span><span class="rating">好评率{{food.rating}}%</span>
				  </div>
				  <div class="price">
				  	<span class="now">￥{{food.price}}</span>
					  <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
            <transition name="fade">
              <div class="addcart" v-show="!food.count" @click="addCart">加入购物车</div>
            </transition>
					  <div class="cart-wrapper" v-show="food.count">
					  	<cartcontrol :food="food" @add="addFood"></cartcontrol>
					  </div>
				  </div>
				</div>
				<split v-show="food.info"></split>
				<div class="foodinfo" v-show="food.info">
			  	<h1 class="title">商品介绍</h1>
			  	<p class="text">{{food.info}}</p>
			  </div>
			  <split></split>
			  <div class="rating">
			  	<div class="title">商品评价</div>
          <ratingselect  @select="selectRating" @toggle="toggleContent" :selectType="selectType" :onlyContent="onlyContent" :desc="desc" :ratings="food.ratings"></ratingselect>
          <div class="rating-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings" class="rating-item">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img class="avatar" width="12" height="12" :src="rating.avatar"></img>
                </div>
                <div class="time">
                  {{rating.rateTime | formatDate}}
                </div>
                <p class="text">
                  <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>
                  {{rating.text}}
                </p>
              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
          </div>
			  </div>
      </div>
		</div>
  </transition>
</template>
<!-- <script type="text/ecmascript-6"> -->
<script>
	import BScroll from 'better-scroll';
	import Vue from 'vue';
  import {formatDate} from '@/common/js/date';
	import cartcontrol from '@/components/cartcontrol/cartcontrol';
  import ratingselect from '@/components/ratingselect/ratingselect';
	import split from '@/components/split/split';
  const ALL = 2;
  export default{
		props:{
			food: {
        type:Object,
        default:{}
			}
		},
		components:{
			cartcontrol,
			split,
      ratingselect
		},
		data () {
			return {
				showFood: false,
        selectType: ALL,
        onlyContent: false,
        desc:{
          all:"全部",
          positive:"满意",
          negative:"吐槽"
        }
			}
		},
    filters:{
      formatDate(time){
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
		methods:{
			ifshow (){
				this.showFood = !this.showFood
			},
			foodScroll (){
        this.selectType = ALL
        this.onlyContent = false
				this.$nextTick(() => {
				  if( !this.scroll ){
				  	this.scroll = new BScroll(this.$refs.food, {
              click: true
            });
				  } else {
				  	this.scroll.refresh()
				  }
				})
			},
			addCart (event){
        this.$emit('add', event.target);
        Vue.set(this.food, 'count', 1)
			},
      addFood(target) {
        this.$emit('add', target);
      },
      needShow(type,text){
        if(this.onlyContent && !text){
            return false
        }
        if (this.selectType === ALL){
            return true
        } else {
            return type === this.selectType
        }
      },
      selectRating(type) {
        this.selectType = type;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      toggleContent() {
        this.onlyContent = !this.onlyContent;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      }
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .food
    position: fixed
    top: 0
    left: 0
    bottom: 48px
    width: 100%
    z-index: 30
    background: #fff
    overflow: hidden
    transform: translateY(0)
    &.moveIn-enter-active, &.moveIn-leave-active
      transition: all 0.2s linear
    &.moveIn-enter, &.moveIn-leave-to
      transform: translateY(100%)
    .image-header
      position: relative
      width: 100%
      padding-top: 100%
      height: 0
      img
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
      .return
        position: absolute
        top: 10px
        right: 10px
        background: rgba(7, 17, 27, 0.3)
        width: 24px
        height: 24px
        border-radius: 50%
        display: flex
        justify-content: center
        align-items: center
        i
          font-size: 18px
          color: #fff	
    .content
      padding: 18px 18px 0 18px
      .name
        height: 14px
        line-height: 14px
        margin-bottom: 8px
        font-size: 14px
        font-weight: 700
        color: rgb(7, 17, 27)
      .detail
        height: 10px
        line-height: 10px
        font-size: 10px
        color:rgb(147, 153, 159)	
        .rating
          margin-left: 12px
      .price
        padding: 18px 0
        height: 24px
        line-height: 24px
        font-size: 0
        position: relative
        .now
          color: rgb(240, 20, 20)
          font-size: 14px
        .old
          font-size: 10px
          text-decoration: line-through
          color:rgb(147, 153, 159)
        .addcart
          position: absolute
          top: 18px
          right: 0
          z-index: 35
          width: 74px
          height: 24px
          line-height: 24px
          text-align: center
          background: rgb(0, 160, 220)
          color: #fff	
          font-size: 10px
          border-radius: 12px
          &.fade-enter-active, &.fade-leave-active
            transition: all 0.2s linear
          &.fade-enter, &.fade-leave-to
            opacity: 0
        .cart-wrapper
          position: absolute
          top: 12px
          right: -6px	
    .foodinfo
      padding: 18px	
      .title
        font-size: 14px
        font-weight: 700
        color: rgb(7, 17, 27)
      .text
        padding: 6px 6px 0 8px
        text-align: justify
        font-size: 12px
        line-height: 24px
        font-weight: 200
        color: rgb(77, 85, 93)
    .rating
      padding-top: 18px
      .title
        line-height: 14px
        margin-left: 18px
        font-size: 14px
        color: rgb(7, 17, 27)
        font-weight: 700 
      .rating-wrapper
        padding: 0 18px
        .rating-item
          position: relative
          padding: 16px 0
          border-1px( rgba(7, 17, 27, 0.1) ) 
          .user
            position: absolute
            right: 0
            top: 16px
            line-height: 12px
            font-size: 0 
            .name
              display: inline-block
              vertical-align: top
              font-size: 10px
              color:rgb(147, 153, 159)
              margin-right: 6px
            .avatar
              border-radius:50%    
          .time
            line-height: 12px
            font-size: 10px
            color: rgb(147, 153, 159)
            margin-bottom 6px
          .text
            line-height: 16px
            color: rgb(7, 17, 27)
            font-size: 12px   
            .icon-thumb_up,.icon-thumb_down
              line-height: 24px
              margin-right: 4px  
              font-size: 12px 
            .icon-thumb_up  
              color: rgb(0, 160, 220)
            .icon-thumb_down
              color: rgb(147, 153, 159)  
          &:last-child
            border-none()
        .no-rating  
          padding: 16px 0
          font-size: 12px 
          color: rgb(147, 153, 159)     
</style>