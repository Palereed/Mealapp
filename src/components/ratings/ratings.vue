<template>
  <div class="ratings" ref="ratings">
    <div class="rating-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
        	<div class="score-wrapper">
        		<span class="title">服务态度</span>
        		<star :size="36" :score="seller.serviceScore"></star>
        		<span class="score">{{seller.serviceScore}}</span>
        	</div>
        	<div class="score-wrapper">
        		<span class="title">商品评分</span>
        		<star :size="36" :score="seller.foodScore"></star>
        		<span class="score">{{seller.foodScore}}</span>
        	</div>
        	<div class="score-wrapper">
        		<span class="title">送达时间</span>
        		<span class="deliveryTime">{{seller.deliveryTime}}分钟</span>
        	</div>
        </div>
      </div>
      <split></split>
      <ratingselect @select="selectRating" @toggle="toggleContent" :selectType="selectType" :onlyContent="onlyContent" :ratings="ratings"></ratingselect>
      <div class="rating-wrapper">
      	<ul>
      		<li v-for="rating in ratings" v-show="needShow(rating.rateType,rating.text)">
      			<div class="avatar">
      				<img :src="rating.avatar" width="12" height="12">
      			</div>
      			<div class="content">
      				<h1 class="username">{{rating.username}}</h1>
      				<div class="star-wrapper">
      					<star :size="24" :score="rating.score"></star>
      					<span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
      				</div>
      				<p class="text">{{rating.text}}</p>
      				<div class="recommend" v-show="rating.recommend && rating.recommend.length">
	      				<span class="icon-thumb_up"></span>
	              <span class="item" v-for="item in rating.recommend">{{item}}</span>
      			  </div>
      			  <div class="ratetime">
      				  <span class="time">{{rating.rateTime | formatDate}}</span>
      			  </div>
      			</div>
      		</li>
      	</ul>
      </div>
      
    </div>
  </div>
</template>

<!-- <script type="text/ecmascript-6"> -->
<script>
	import star from "@/components/star/star"
	import split from "@/components/split/split"
	import ratingselect from "@/components/ratingselect/ratingselect"
	import BScroll from "better-scroll"
	import {formatDate} from '@/common/js/date'

	const ERR_OK = 0
	const ALL = 2;
  export default {
  	data() {
  		return {
  			ratings:[],
        selectType: ALL,
        onlyContent: true
      }
  	},
    props: {
    	seller: {
         type: Object
    	}
    },
    created() {
      this.$http.get("api/ratings").then( response => {
        response = response.body
        if ( response.errno === ERR_OK ){
        	this.ratings = response.data
        	this.$nextTick( () => {
          	this.scroll = new BScroll(this.$refs.ratings,{
          		click:true 
          	})
          })
        }
      })
    },
    filters:{
      formatDate(time){
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    components:{
      star,
      split,
      ratingselect
    },
    methods:{
    	selectRating(type) {
        this.selectType = type;
      },
      toggleContent() {
        this.onlyContent = !this.onlyContent;
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
      }
    }
  };
  
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .ratings
    position: absolute 
    width: 100% 
    top: 174px 
    left: 0
    bottom: 0
    overflow: hidden
    .overview
      display: flex
      padding: 18px 0 
      .overview-left
        flex: 0 0 137px
        width: 137px
        border-right: 1px solid rgba(7, 17, 27, 0.1)
        text-align: center
        padding: 6px 0
        @media only screen and (max-width: 376px)
          flex: 0 0 120px
          width: 120px
        @media only screen and (max-width: 320px)
          flex: 0 0 110px
          width: 110px  
        .score
          margin-bottom: 6px
          line-height: 28px
          font-size: 24px
          color: rgb(255, 153, 0)
        .title
          line-height: 12px
          font-size: 12px
          color: rgb(7, 17, 27)
          margin-bottom: 8px
        .rank
          line-height: 10px
          font-size: 10px 
          color: rgb(147, 153, 159)
          padding-bottom: 6px
      .overview-right
        flex: 1
        padding: 6px 24px 6px 24px
        @media only screen and (max-width: 320px)
          padding: 6px
        .score-wrapper 
          margin-bottom: 8px 
          font-size: 0
          .title
            display: inline-block
            line-height: 18px 
            font-size: 12px
            color: rgb(7, 17, 27)
            vertical-align: top
          .star 
            display: inline-block
            margin: 0 12px
            vertical-align: top
            @media only screen and (max-width: 376px)
              margin: 0 6px
          .score
            display: inline-block
            vertical-align: top
            font-size: 12px 
            color: rgb(255, 153, 0) 
            line-height: 18px
          .deliveryTime
            font-size: 12px
            color: rgb(147, 153, 159) 
            margin-left: 12px 
            line-height: 18px 
    .rating-wrapper
      padding: 0 18px
      li
        padding: 18px 0
        display: flex
        border-1px(rgba(7, 17, 27, 0.1))
      .avatar
        flex: 0 0 28px
        width: 28px
        margin-right: 12px
        img
          border-radius: 50%
      .content
        flex: 1
        position: relative
        .username
          margin-bottom: 4px
          line-height: 12px
          font-size: 10px
          color: rgb(7, 17, 27) 
        .star-wrapper
          display: flex
          margin-bottom: 6px
          .delivery 
            font-size: 10px
            color: rgb(147, 153, 159)
            line-height: 12px
            font-weight: 200
            margin-left: 6px
        .text
          margin-bottom: 8px
          line-height: 18px
          color: rgb(7, 17, 27)
          font-size: 12px
        .recommend  
          line-height: 16px
          font-size: 0
          .icon-thumb_up, .item
            display: inline-block
            margin: 0 8px 4px 0
            font-size: 9px
          .icon-thumb_up
            color: rgb(0, 160, 220)
          .item
            padding: 0 6px
            border: 1px solid rgba(7, 17, 27, 0.1)
            border-radius: 1px
            color: rgb(147, 153, 159)
            background: #fff
        .ratetime
          position: absolute
          top: 0
          right: 0
          line-height: 12px
          font-size: 10px
          color: rgb(147, 153, 159)
</style>
